const PROCESSOR = '0x4f3b708af365b8f339dd35a8985ffe06c2553400';
const ABI = ['function step(uint256 id, bytes state, bytes inputs) view returns (bytes, bytes)'];
let in0 = 0, in1 = 0, pending = false;
function clearResult() {
  const lamp = document.getElementById('lamp');
  lamp.textContent = '–';
  lamp.className = 'lamp';
  document.getElementById('recOut').textContent = 'null';
  document.getElementById('demoStatus').textContent = 'Inputs changed. Ask the circuit to read a new result from mainnet.';
}
function bindToggle(id, set) {
  const el = document.getElementById(id);
  const flip = () => {
    if (pending) return;
    const on = !el.classList.contains('on');
    el.classList.toggle('on', on);
    el.setAttribute('aria-checked', String(on));
    set(on ? 1 : 0);
    document.getElementById('recIn').textContent = in0 + ', ' + in1;
    clearResult();
  };
  el.addEventListener('click', flip);
  el.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
  });
}
bindToggle('t0', v => in0 = v);
bindToggle('t1', v => in1 = v);
document.getElementById('askBtn').onclick = async () => {
  if (pending) return;
  const button = document.getElementById('askBtn');
  const status = document.getElementById('demoStatus');
  const lamp = document.getElementById('lamp');
  const recOut = document.getElementById('recOut');
  const word = in0 | (in1 << 1);
  let provider, timer;
  pending = true;
  button.disabled = true;
  button.textContent = 'Reading circuit…';
  ['t0', 't1'].forEach(id => document.getElementById(id).setAttribute('aria-disabled', 'true'));
  status.textContent = 'Reading circuit #50 on X Layer mainnet…';
  recOut.textContent = '"pending"';
  lamp.textContent = '…';
  lamp.className = 'lamp';
  try {
    if (!window.ethers) throw new Error('The network library did not load. Check your connection and reload this page.');
    provider = new ethers.JsonRpcProvider('https://rpc.xlayer.tech', 196, { staticNetwork: true });
    const c = new ethers.Contract(PROCESSOR, ABI, provider);
    const [, outputs] = await Promise.race([
      c.step(50, '0x', ethers.hexlify(new Uint8Array([word]))),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('The RPC did not respond within 15 seconds. Please try again.')), 15000); })
    ]);
    if (!/^0x[0-9a-fA-F]{2,}$/.test(outputs)) throw new Error('The circuit returned an empty or invalid output.');
    const bit = parseInt(outputs.slice(2, 4), 16) & 1;
    lamp.textContent = String(bit);
    lamp.className = 'lamp ' + (bit ? 'on' : 'off');
    recOut.textContent = String(bit);
    recOut.className = bit ? 'g' : 'r';
    status.textContent = 'IN0=' + in0 + ', IN1=' + in1 + ' (packed byte ' + word + ') → OUT ' + bit + '. Read live from X Layer mainnet. NAND returns 0 only when both inputs are 1.';
  } catch (error) {
    lamp.textContent = '–';
    lamp.className = 'lamp';
    recOut.textContent = 'null';
    recOut.className = '';
    status.textContent = 'Live read unavailable. ' + (error.shortMessage || error.message) + ' Recorded transactions remain available on the Proof page.';
  } finally {
    clearTimeout(timer);
    provider?.destroy();
    pending = false;
    button.disabled = false;
    button.textContent = 'Ask circuit #50';
    ['t0', 't1'].forEach(id => document.getElementById(id).setAttribute('aria-disabled', 'false'));
  }
};
