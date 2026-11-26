const PROCESSOR = "0x4f3b708af365b8f339dd35a8985ffe06c2553400";
const ABI = ["function step(uint256 id, bytes state, bytes inputs) view returns (bytes, bytes)"];
let in0 = 0, in1 = 0;
function bindToggle(id, set) {
  const el = document.getElementById(id);
  const flip = () => {
    const on = !el.classList.contains('on');
    el.classList.toggle('on', on);
    el.setAttribute('aria-checked', on);
    set(on ? 1 : 0);
    document.getElementById('recIn').textContent = in0 + ', ' + in1;
  };
  el.addEventListener('click', flip);
  el.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
}
bindToggle('t0', v => in0 = v);
bindToggle('t1', v => in1 = v);
document.getElementById('askBtn').onclick = async () => {
  const status = document.getElementById('demoStatus'), lamp = document.getElementById('lamp'), recOut = document.getElementById('recOut');
  const word = in0 | (in1 << 1);
  status.textContent = 'Asking circuit #50 on X Layer…';
  recOut.textContent = '"…"';
  try {
    const provider = new ethers.JsonRpcProvider('https://rpc.xlayer.tech');
    const c = new ethers.Contract(PROCESSOR, ABI, provider);
    const [, outputs] = await c.step(50, '0x', ethers.hexlify(new Uint8Array([word])));
    const bit = parseInt(outputs.slice(2, 4), 16) & 1;
    lamp.textContent = bit;
    lamp.className = 'lamp ' + (bit ? 'on' : 'off');
    recOut.textContent = bit;
    recOut.className = bit ? 'g' : 'r';
    status.textContent = 'Inputs IN0=' + in0 + ', IN1=' + in1 + ' (packed byte ' + word + ') → OUT ' + bit + '. Read live from X Layer mainnet just now. NAND: 0 only when both inputs are 1.';
  } catch (e) {
    lamp.textContent = '–'; lamp.className = 'lamp'; recOut.textContent = 'null';
    status.textContent = 'The live read failed (' + (e.shortMessage || e.message) + '). The on-chain verdict transactions on the proof page are the permanent record.';
  }
};
