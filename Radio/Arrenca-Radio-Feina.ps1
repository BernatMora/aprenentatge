param([switch]$Diagnosi, [switch]$SenseObrir)
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
Set-Location -LiteralPath $root
$log = Join-Path $root 'diagnostic-arrencada.txt'
function Report([string]$text) {
    Write-Host $text
    Add-Content -LiteralPath $log -Value $text -Encoding UTF8
}
function Read-Local([string]$path) {
    $request = [Net.HttpWebRequest]::Create('http://127.0.0.1:8765' + $path)
    $request.Proxy = $null
    $request.Timeout = 1000
    $request.ReadWriteTimeout = 1000
    $response = $request.GetResponse()
    try {
        $reader = New-Object IO.StreamReader($response.GetResponseStream())
        try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
    } finally { $response.Dispose() }
}
function Helper-Ready {
    try {
        $data = (Read-Local '/api/estat') | ConvertFrom-Json
        return ($data.ok -eq $true -and $data.app -eq 'Radio-Feina')
    } catch { return $false }
}
function Find-Python {
    foreach ($name in @('py.exe', 'python.exe', 'python3.exe')) {
        $command = Get-Command $name -ErrorAction SilentlyContinue
        if (-not $command) { continue }
        $proc = New-Object Diagnostics.Process
        $proc.StartInfo.FileName = $command.Source
        $prefix = if ($name -eq 'py.exe') { '-3 ' } else { '' }
        $proc.StartInfo.Arguments = $prefix + '-c "import sys,json; assert sys.version_info >= (3,8); print(json.dumps(sys.executable))"'
        $proc.StartInfo.UseShellExecute = $false
        $proc.StartInfo.CreateNoWindow = $true
        $proc.StartInfo.RedirectStandardOutput = $true
        $proc.StartInfo.RedirectStandardError = $true
        try {
            [void]$proc.Start()
            if (-not $proc.WaitForExit(8000)) {
                $proc.Kill()
                Report ($name + ': no respon en 8 segons.')
                continue
            }
            $output = $proc.StandardOutput.ReadToEnd().Trim()
            if ($proc.ExitCode -eq 0) {
                $exe = $output | ConvertFrom-Json
                if (Test-Path -LiteralPath $exe) { return $exe }
            }
            Report ($name + ': no es un Python 3.8 o posterior funcional.')
        } catch { Report ($name + ': ' + $_.Exception.Message) }
        finally { $proc.Dispose() }
    }
    return $null
}
try {
    Set-Content -LiteralPath $log -Value ('Radio-Feina - ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')) -Encoding UTF8
    Report ('Carpeta: ' + $root)
    if (-not (Test-Path -LiteralPath (Join-Path $root 'index.html'))) { throw 'Falta index.html. Descomprimeix tota la carpeta del ZIP.' }
    if (-not (Helper-Ready)) {
        # Recognise older helpers too: do not kill or replace an existing process.
        $old = $false
        try { $old = (Read-Local '/') -match 'const EMISSORES' } catch {}
        if ($old) {
            Report 'Ja hi ha un ajudant anterior funcionant. El fem servir.'
        } else {
            $server = Join-Path $root 'canco-server.py'
            if (-not (Test-Path -LiteralPath $server)) { throw 'Falta canco-server.py. Descomprimeix tota la carpeta del ZIP.' }
            $python = Find-Python
            if (-not $python) { throw 'No he trobat Python 3.8 o posterior funcional. Instal.la Python 3 i torna a executar Engega-Radio-Feina.cmd.' }
            Report ('Python: ' + $python)
            $stdout = Join-Path $root 'arrencada-sortida.log'
            $stderr = Join-Path $root 'arrencada-error.log'
            $child = Start-Process -FilePath $python -ArgumentList ('"' + $server + '"') -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput $stdout -RedirectStandardError $stderr -PassThru
            for ($i = 0; $i -lt 24; $i++) {
                if (Helper-Ready) { break }
                if ($child.HasExited) { break }
                Start-Sleep -Milliseconds 250
            }
            if (-not (Helper-Ready)) {
                if (Test-Path -LiteralPath $stderr) { Get-Content -LiteralPath $stderr -Tail 12 | ForEach-Object { Report $_ } }
                throw 'L ajudant no respon al port 8765. Consulta diagnostic-arrencada.txt i arrencada-error.log.'
            }
        }
    } else { Report 'L ajudant ja esta funcionant.' }
    Report 'CORRECTE: radio disponible a http://127.0.0.1:8765/'
    if (-not $SenseObrir) { Start-Process 'http://127.0.0.1:8765/' }
    if ($Diagnosi) { [void](Read-Host 'Prem Retorn per tancar') }
    exit 0
} catch {
    try { Report ('ERROR: ' + $_.Exception.Message) } catch { Write-Host $_ }
    if ($Diagnosi) { [void](Read-Host 'Prem Retorn per tancar') }
    exit 1
}
