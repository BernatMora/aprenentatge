#!/usr/bin/env python3
"""Regenera els samples de baix amb un so que sostingui (pluck + sustain).
Els anteriors decaien massa ràpid i eren gairebé inaudibles."""
import wave, math, struct, os

SR = 44100
OUT = "/home/bernat/country-guitar/public/samples"
os.makedirs(OUT, exist_ok=True)

def write_wav(name, samples):
    path = os.path.join(OUT, name)
    with wave.open(path, "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        data = b"".join(struct.pack("<h", max(-32767, min(32767, int(s * 32767)))) for s in samples)
        w.writeframes(data)
    print(f"  {name}: {len(samples)/SR:.2f}s")

# BAIX: pluck amb sustain — atac ràpid, cos que sosté ~0.4s, decay suau
def make_bass(freq):
    dur = 0.6
    n = int(SR * dur)
    s = []
    for i in range(n):
        t = i / SR
        # fonamental + 2n + 3r harmònic
        v = (math.sin(2*math.pi*freq*t) * 0.6
             + math.sin(2*math.pi*freq*2*t) * 0.25
             + math.sin(2*math.pi*freq*3*t) * 0.12)
        # pluck: atac percussiu ràpid que es fon en un sustain
        pluck = math.exp(-t / 0.03)
        # sustain: decau lentament cap al final
        sustain = 1.0 - 0.6 * (t / dur)
        s.append(v * (0.3 + 0.7 * pluck) * sustain)
    # fade-out final per evitar click
    fade = int(SR * 0.02)
    for i in range(fade):
        s[n - fade + i] *= (1 - i / fade)
    return s

print("Regenerant baix...")
bass_notes = {"C":36,"C#":37,"D":38,"D#":39,"E":40,"F":41,"F#":42,"G":43,"G#":44,"A":45,"A#":46,"B":47}
for name, midi in bass_notes.items():
    freq = 440 * 2 ** ((midi - 69) / 12)
    write_wav(f"bass_{name}.wav", make_bass(freq))
print("Fet.")
