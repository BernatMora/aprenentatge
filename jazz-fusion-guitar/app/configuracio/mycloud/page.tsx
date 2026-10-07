"use client";

import { useState } from "react";
import { Network, HardDrive, FolderOpen, Terminal, CheckCircle, AlertCircle, Info } from "lucide-react";
import Link from "next/link";

type Step = {
  id: number;
  title: string;
  description: string;
  commands: string[];
  notes?: string[];
  verify?: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Comprovar que el bernat-pc veu el My Cloud Home",
    description:
      "Un cop connectat el My Cloud Home a la xarxa de l'hort, hem de verificar que el bernat-pc el pot veure. Tots dos han d'estar a la mateixa xarxa LAN o Tailscale.",
    commands: [
      "# Veure la xarxa actual del bernat-pc",
      "ip addr show | grep -E 'inet ' | grep -v '127.0.0.1'",
      "",
      "# Comprovar si el My Cloud Home és visible per hostname",
      "ping -c 2 mycloud",
      "ping -c 2 mycloud.local",
      "",
      "# Si no respon per hostname, provar per IP directa",
      "# Primer, troba la IP al router o amb una app mòbil WD",
      "ping -c 2 192.168.1.XXX  # substitueix XXX per la IP real",
    ],
    notes: [
      "Si el ping no funciona, comprova que el My Cloud Home està encès i connectat al router amb cable Ethernet.",
      "Per trobar la IP: obre la app WD My Cloud al mòbil o mira la llista DHCP del router.",
      "Tailscale pot ser útil si el MyCloud està a una xarxa diferent.",
    ],
    verify: "Hauries de veure '2 packets transmitted, 2 received, 0% packet loss'",
  },
  {
    id: 2,
    title: "Descobrir els serveis disponibles al MyCloud (SMB/AFP/WebDAV)",
    description:
      "El My Cloud Home ofereix diversos protocols. SMB (Samba) és el més compatible amb Linux.",
    commands: [
      "# Instal·lar eines necessàries (només la primera vegada)",
      "sudo apt update",
      "sudo apt install -y cifs-utils smbclient rsync",
      "",
      "# Llistar compartits SMB disponibles",
      "smbclient -L //mycloud -N",
      "smbclient -L //192.168.1.XXX -N  # o per IP",
      "",
      "# Si tens credencials:",
      "smbclient -L //mycloud -U bernat",
    ],
    notes: [
      "El My Cloud Home pot tenir compartits com 'Public', 'Music', 'Backup', etc.",
      "Si demana usuari/contrasenya, són les del compte WD.",
      "Si no tens permisos, pot ser que hagis d'activar SMB al panell web del MyCloud (http://mycloud.local).",
    ],
    verify: "Hauries de veure una llista amb 'Public', 'Music', 'SmartWare' o similar",
  },
  {
    id: 3,
    title: "Crear el punt de muntatge i muntar el My Cloud",
    description:
      "Crearem una carpeta fixa al bernat-pc on el MyCloud serà accessible, i configurarem el muntatge automàtic.",
    commands: [
      "# Crear la carpeta de muntatge",
      "sudo mkdir -p /mnt/mycloud",
      "sudo chown bernat:bernat /mnt/mycloud",
      "",
      "# Muntar el compartit 'Public' (o 'Music' si existeix)",
      "sudo mount -t cifs //mycloud/Public /mnt/mycloud \\",
      "  -o username=bernat,password=EL_TEU_PASSWORD,uid=bernat,gid=bernat,iocharset=utf8",
      "",
      "# Si el compartit és 'Music'",
      "sudo mount -t cifs //mycloud/Music /mnt/mycloud \\",
      "  -o username=bernat,password=EL_TEU_PASSWORD,uid=bernat,gid=bernat,iocharset=utf8",
      "",
      "# Comprovar que s'ha muntat correctament",
      "ls /mnt/mycloud",
      "df -h /mnt/mycloud",
    ],
    notes: [
      "⚠️ Seguretat: escriure la contrasenya directament no és segur. Alternativa: crear un fitxer de credencials.",
      "Per muntar sense contrasenya visible, crea /etc/samba/mycloud-credentials amb:",
      "  username=bernat",
      "  password=EL_TEU_PASSWORD",
      "I fes: sudo chmod 600 /etc/samba/mycloud-credentials",
      "Després munta amb -o credentials=/etc/samba/mycloud-credentials",
    ],
    verify: "La comanda 'ls /mnt/mycloud' hauria de mostrar els teus fitxers",
  },
  {
    id: 4,
    title: "Fer el muntatge persistent (s'arrenca automàticament)",
    description:
      "Perquè el MyCloud es munti cada vegada que el bernat-pc arrenqui, afegirem una entrada a fstab.",
    commands: [
      "# Primer, desmuntar el muntatge temporal",
      "sudo umount /mnt/mycloud",
      "",
      "# Editar fstab amb nano o vi",
      "sudo nano /etc/fstab",
      "",
      "# Afegir aquesta línia al final (ajusta la IP si cal):",
      "//mycloud/Public  /mnt/mycloud  cifs  credentials=/etc/samba/mycloud-credentials,uid=bernat,gid=bernat,iocharset=utf8,_netdev,x-systemd.automount,x-systemd.requires=network-online.target  0  0",
      "",
      "# Si no tens fitxer de credencials, pots fer-ho menys segur amb:",
      "//mycloud/Public  /mnt/mycloud  cifs  username=bernat,password=EL_TEU_PASSWORD,uid=bernat,gid=bernat,iocharset=utf8,_netdev  0  0",
      "",
      "# Provar que fstab funciona sense reiniciar",
      "sudo mount -a",
      "ls /mnt/mycloud",
    ],
    notes: [
      "Les opcions _netdev i x-systemd.* asseguren que el muntatge esperi a tenir xarxa.",
      "Si el bernat-pc arrenca sense xarxa, pot trigar una mica a muntar.",
      "Per depurar: sudo mount -v -t cifs //mycloud/Public /mnt/mycloud",
    ],
    verify: "Després de 'sudo mount -a', el muntatge ha d'aparèixer a 'df -h'",
  },
  {
    id: 5,
    title: "Copiar la música al projecte o enllaçar-la",
    description:
      "Un cop muntat, pots triar entre copiar la música (consumeix espai al disc del bernat-pc) o fer-la accessible via enllaç simbòlic (estalvia espai però cal que el MyCloud estigui sempre encès).",
    commands: [
      "### OPCIÓ A: Copiar la música (recomanada per rendiment) ###",
      "",
      "# Copiar tot el que tens a OneDrive des del MyCloud",
      "rsync -av --progress /mnt/mycloud/Musica/ ~/jazz-fusion-guitar/public/library/audio/",
      "",
      "# Copiar PDFs",
      "rsync -av --progress /mnt/mycloud/Documents/ ~/jazz-fusion-guitar/public/library/documents/",
      "",
      "### OPCIÓ B: Enllaç simbòlic (estalvia espai) ###",
      "",
      "# Esborrar la carpeta de l'app i fer un symlink",
      "rmdir ~/jazz-fusion-guitar/public/library/audio 2>/dev/null",
      "ln -s /mnt/mycloud/Musica ~/jazz-fusion-guitar/public/library/audio",
      "",
      "### Comprovar l'estructura ###",
      "ls -la ~/jazz-fusion-guitar/public/library/",
      "ls /mnt/mycloud | head -20",
    ],
    notes: [
      "Opció A: Més ràpid, però duplica dades. Recomanat si tens espai al disc.",
      "Opció B: Estalvia espai, però el bernat-pc necessita el MyCloud encès per servir fitxers.",
      "Pots fer una barreja: copiar Creative Intervallic (113 MB) i enllaçar la resta.",
    ],
    verify: "Els fitxers han de ser visibles a ~/jazz-fusion-guitar/public/library/",
  },
  {
    id: 6,
    title: "Crear les pàgines noves a l'app",
    description:
      "Un cop els fitxers són accessibles, podem crear pàgines dedicades per cada categoria (PDFs, tabs, àudio) amb visors i reproductors integrats.",
    commands: [
      "# Reiniciar l'aplicació per recarregar la nova estructura",
      "jfg restart",
      "",
      "# Verificar que tot funciona",
      "jfg test",
      "",
      "# Comprovar rutes específiques",
      "curl -I http://localhost:3000/biblioteca",
    ],
    notes: [
      "Quan tinguis els fitxers al lloc, avisa'm i creo les pàgines noves:",
      "  - /biblioteca/pdfs → visor PDF integrat amb cerca",
      "  - /biblioteca/blues-jazz → reproductor d'àudio per carpetes",
      "  - /biblioteca/tabs → índex de Guitar Pro Tabs (10k+) amb filtres",
      "  - /biblioteca/country → similar per a la secció country",
      "",
      "Si hi ha molts PDFs o tabs, podem afegir un sistema d'índex amb cerca ràpida.",
    ],
    verify: "Les pàgines han de carregar sense errors 404",
  },
];

export default function MyCloudSetupPage() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const toggleStep = (id: number) => {
    const next = new Set(completedSteps);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompletedSteps(next);
  };

  return (
    <>
      <section className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <Network size={32} color="var(--accent-amber)" />
          <h1 style={{ margin: 0 }}>Configurar My Cloud Home</h1>
        </div>
        <p>
          Guia pas a pas per connectar el <strong>WD My Cloud Home</strong> al bernat-pc i fer
          accessible tota la teva col·lecció de música des de l&apos;aplicació Jazz Fusion Guitar.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        {/* Introducció */}
        <div className="card" style={{ marginBottom: "1.5rem", background: "linear-gradient(135deg, var(--bg-card), var(--bg-tertiary))" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.125rem", marginBottom: "0.75rem" }}>
            <Info size={18} /> Què necessites
          </h2>
          <ul style={{ paddingLeft: "1.5rem", color: "var(--text-secondary)" }}>
            <li>El My Cloud Home connectat a la xarxa de l&apos;hort (amb cable Ethernet recomanat)</li>
            <li>El bernat-pc a la mateixa xarxa (o connectat via Tailscale)</li>
            <li>Credencials del compte WD del My Cloud</li>
            <li>~30 minuts per completar tots els passos</li>
          </ul>
        </div>

        {/* Advertencia de seguretat */}
        <div className="card" style={{ marginBottom: "1.5rem", borderColor: "var(--color-warning)", background: "rgba(232, 169, 58, 0.05)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <AlertCircle size={20} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.375rem", color: "var(--color-warning)" }}>
                ⚠️ Important: primer comprova la xarxa
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: 0 }}>
                Si el My Cloud Home està a una xarxa diferent (per exemple, a l&apos;hort amb IP
                192.168.1.x i el bernat-pc en una altra), caldrà fer un pont o utilitzar Tailscale.
                Comença sempre pel <strong>Pas 1</strong> per veure si es veuen.
              </p>
            </div>
          </div>
        </div>

        {/* Passos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {steps.map((step) => {
            const isCompleted = completedSteps.has(step.id);
            const isExpanded = expandedStep === step.id;
            return (
              <article
                key={step.id}
                className="card"
                style={{
                  background: isCompleted ? "rgba(95, 184, 120, 0.05)" : "var(--bg-card)",
                  border: isCompleted ? "1px solid var(--color-success)" : "1px solid var(--border-subtle)",
                }}
              >
                <div
                  onClick={() => {
                    setExpandedStep(isExpanded ? null : step.id);
                    toggleStep(step.id);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: isCompleted ? "var(--color-success)" : "var(--bg-elevated)",
                      color: isCompleted ? "white" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? <CheckCircle size={18} /> : step.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ color: "var(--accent-amber)", fontSize: "1.0625rem", margin: 0 }}>
                      {step.title}
                    </h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: "0.25rem 0 0 0" }}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="fade-in" style={{ marginTop: "1rem" }}>
                    <h3 style={{ fontSize: "0.875rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                      <Terminal size={14} style={{ marginRight: 4, verticalAlign: "middle" }} />
                      Comandes
                    </h3>
                    <pre
                      style={{
                        background: "#0a0c10",
                        color: "#a0e0a0",
                        padding: "1rem",
                        borderRadius: "var(--radius-md)",
                        overflow: "auto",
                        fontSize: "0.8125rem",
                        fontFamily: "var(--font-mono)",
                        margin: "0 0 1rem 0",
                        border: "1px solid var(--border-subtle)",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.commands.join("\n")}
                    </pre>

                    {step.notes && step.notes.length > 0 && (
                      <div style={{ marginBottom: "1rem" }}>
                        <h3 style={{ fontSize: "0.875rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                          ℹ️ Notes
                        </h3>
                        <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                          {step.notes.map((note, i) => (
                            <li key={i} style={{ marginBottom: "0.375rem" }}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.verify && (
                      <div
                        style={{
                          padding: "0.75rem 1rem",
                          background: "rgba(95, 184, 120, 0.1)",
                          border: "1px solid var(--color-success)",
                          borderRadius: "var(--radius-md)",
                          fontSize: "0.875rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <strong style={{ color: "var(--color-success)" }}>Comprovar:</strong> {step.verify}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Resum final */}
        <div className="card" style={{ marginTop: "2rem", background: "var(--bg-tertiary)" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.125rem", marginBottom: "0.75rem" }}>
            <FolderOpen size={18} /> Quan estigui tot muntat
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Un cop completis els 6 passos, avisa&apos;m amb:
          </p>
          <ol style={{ paddingLeft: "1.5rem", color: "var(--text-secondary)" }}>
            <li>Quin muntatge has triat (copiar o symlink)</li>
            <li>Quines carpetes tens al MyCloud (si canvien)</li>
            <li>Si tens algun problema amb algun pas</li>
          </ol>
          <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>
            I crearé les pàgines específiques: <strong>visor de PDFs amb cerca</strong>,{" "}
            <strong>reproductor d&apos;àudio per carpetes</strong>, <strong>índex de tabs</strong> amb
            filtres per artista i estil.
          </p>
        </div>

        {/* Tornar */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link
            href="/biblioteca"
            className="button button-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            ← Tornar a la biblioteca
          </Link>
        </div>
      </section>
    </>
  );
}
