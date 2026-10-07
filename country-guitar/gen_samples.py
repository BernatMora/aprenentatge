#!/usr/bin/env python3
"""Genera samples WAV realistes de bateria i baix per al backing track country.
Kick, snare, hi-hat, i un baix acústic. Guardats a public/samples/."""
import wave, math, struct, os, random

SR = 44100
OUT = "/home/bernat/country-guitar/public/samples"
os.makedirs(OUT, exist_ok=True)

def write_wav(name, samples):
    path = os.path.join(OUT, name)
    with wave.open(path, "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        # clip
        data = b"".join(struct.pack("<h", max(-32767, min(32767, int(s * 32767)))) for s in samples)
        w.writeframes(data)
    print(f"  {name}: {len(samples)/SR:.2f}s")

def env(n, a=0.001, d=0.1, curve=4.0):
    """ADSR simple: atac ràpid, decay exponencial."""
    out = []
    for i in range(n):
        t = i / SR
        if t < a:
            out.append(t / a)
        else:
            out.append(math.exp(-(t - a) / d))
    return out

# ── KICK: sine sweep 150→40Hz + click ──
def make_kick():
    dur = 0.25
    n = int(SR * dur)
    s = []
    for i in range(n):
        t = i / SR
        f = 150 * math.exp(-t / 0.03) + 40
        phase = 2 * math.pi * (150 * 0.03 * (1 - math.exp(-t / 0.03)) + 40 * t)
        s.append(math.sin(phase) * 0.9)
    # click inicial
    click_n = int(SR * 0.005)
    for i in range(click_n):
        s[i] += (random.random() * 2 - 1) * 0.3 * math.exp(-i / (click_n * 0.3))
    e = env(n, 0.001, 0.08)
    return [s[i] * e[i] for i in range(n)]

# ── SNARE: soroll + cos a 180Hz ──
def make_snare():
    dur = 0.2
    n = int(SR * dur)
    s = []
    for i in range(n):
        t = i / SR
        noise = (random.random() * 2 - 1) * 0.8
        body = math.sin(2 * math.pi * 180 * t) * 0.4
        s.append(noise + body)
    e = env(n, 0.001, 0.09)
    return [s[i] * e[i] for i in range(n)]

# ── HI-HAT: soroll filtrat (high-pass) ──
def make_hat():
    dur = 0.08
    n = int(SR * dur)
    s = []
    # filtre high-pass simple (diferència)
    prev = 0
    for i in range(n):
        t = i / SR
        noise = (random.random() * 2 - 1)
        # high-pass aproximat
        hp = noise - prev
        prev = noise
        s.append(hp * 0.6)
    e = env(n, 0.001, 0.03)
    return [s[i] * e[i] for i in range(n)]

# ── BAIX: nota de baix acústic (sine + harmònics, atac percussiu) ──
def make_bass(freq):
    dur = 0.5
    n = int(SR * dur)
    s = []
    for i in range(n):
        t = i / SR
        # fonamental + 2n + 3r harmònic
        v = (math.sin(2*math.pi*freq*t) * 0.7
             + math.sin(2*math.pi*freq*2*t) * 0.2
             + math.sin(2*math.pi*freq*3*t) * 0.1)
        # atac percussiu (pluck)
        pluck = math.exp(-t / 0.02)
        s.append(v * pluck)
    e = env(n, 0.005, 0.15)
    return [s[i] * e[i] for i in range(n)]

print("Generant samples...")
write_wav("kick.wav", make_kick())
write_wav("snare.wav", make_snare())
write_wav("hat.wav", make_hat())
# Baix en diverses notes (C2..B2) per al walking bass
bass_notes = {"C":36,"C#":37,"D":38,"D#":39,"E":40,"F":41,"F#":42,"G":43,"G#":44,"A":45,"A#":46,"B":47}
for name, midi in bass_notes.items():
    freq = 440 * 2 ** ((midi - 69) / 12)
    write_wav(f"bass_{name}.wav", make_bass(freq))
print("Fet.")
