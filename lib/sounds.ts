/**
 * 🔊 Sunete generate prin Web Audio API — fara fisiere externe
 * AudioContext pre-incalzit la primul interact al userului
 */

let ctx: AudioContext | null = null;

/** Apelat o singura data la primul click/scroll pentru a evita latenta */
export function warmUpAudio() {
  if (ctx) return;
  ctx = new AudioContext();
  // Redam un buffer gol ca sa deblocam AudioContext inainte de primul sunet real
  const buf = ctx.createBuffer(1, 1, 22050);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(ctx.destination);
  src.start(0);
}

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function playTone(
  frequency: number,
  duration: number,
  startTime: number,
  gainValue: number,
  type: OscillatorType,
) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ac.currentTime + startTime);
  gain.gain.setValueAtTime(gainValue, ac.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startTime + duration);

  osc.start(ac.currentTime + startTime);
  osc.stop(ac.currentTime + startTime + duration + 0.01);
}

/** Splash IN — doua note ascendente, calde */
export function playSplashIn() {
  try {
    const ac = getCtx();
    if (ac.state === 'suspended') ac.resume();
    playTone(659,  0.25, 0,    0.08, 'sine');
    playTone(1046, 0.4,  0.12, 0.06, 'sine');
    playTone(329,  0.5,  0,    0.03, 'triangle');
  } catch (_) {}
}

/** Splash OUT — note descendente, mai subtile */
export function playSplashOut() {
  try {
    const ac = getCtx();
    if (ac.state === 'suspended') ac.resume();
    playTone(784, 0.2,  0,    0.06, 'sine');
    playTone(587, 0.35, 0.10, 0.04, 'sine');
    playTone(293, 0.45, 0,    0.02, 'triangle');
  } catch (_) {}
}
