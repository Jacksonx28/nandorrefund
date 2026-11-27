// NANDorRefund Jobs - wired to EscrowReferee on X Layer mainnet.
const ESCROW = "0xEca962Ae2Daa082B30cC2733e56899DDc4EB60d5";
const RPC = "https://rpc.xlayer.tech";
const ABI = [{"inputs": [{"internalType": "address", "name": "processor_", "type": "address"}, {"internalType": "uint256", "name": "refereeCircuitId_", "type": "uint256"}, {"internalType": "address", "name": "feeRecipient_", "type": "address"}], "stateMutability": "nonpayable", "type": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"}], "name": "Accepted", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"}, {"indexed": false, "internalType": "bool", "name": "ok", "type": "bool"}], "name": "ChecklistSet", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"}, {"indexed": false, "internalType": "bytes32", "name": "deliveryHash", "type": "bytes32"}, {"indexed": false, "internalType": "uint64", "name": "at", "type": "uint64"}], "name": "Delivered", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"}, {"indexed": true, "internalType": "address", "name": "client", "type": "address"}, {"indexed": true, "internalType": "address", "name": "freelancer", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, {"indexed": false, "internalType": "uint64", "name": "deliveryDeadline", "type": "uint64"}, {"indexed": false, "internalType": "uint64", "name": "acceptDeadline", "type": "uint64"}, {"indexed": false, "internalType": "bytes32", "name": "expectedHash", "type": "bytes32"}], "name": "JobCreated", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"}, {"indexed": false, "internalType": "enum EscrowReferee.Verdict", "name": "verdict", "type": "uint8"}, {"indexed": false, "internalType": "uint8", "name": "inputBits", "type": "uint8"}, {"indexed": false, "internalType": "uint256", "name": "toFreelancer", "type": "uint256"}, {"indexed": false, "internalType": "uint256", "name": "toClient", "type": "uint256"}, {"indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256"}], "name": "Settled", "type": "event"}, {"inputs": [], "name": "FEE_BPS", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}], "name": "accept", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "freelancer", "type": "address"}, {"internalType": "uint64", "name": "deliveryDeadline", "type": "uint64"}, {"internalType": "uint64", "name": "acceptDeadline", "type": "uint64"}, {"internalType": "bytes32", "name": "expectedHash", "type": "bytes32"}], "name": "createJob", "outputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}], "stateMutability": "payable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}, {"internalType": "bytes32", "name": "deliveryHash", "type": "bytes32"}], "name": "deliver", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "feeRecipient", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "jobCount", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "name": "jobs", "outputs": [{"internalType": "address", "name": "client", "type": "address"}, {"internalType": "address", "name": "freelancer", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}, {"internalType": "uint64", "name": "deliveryDeadline", "type": "uint64"}, {"internalType": "uint64", "name": "acceptDeadline", "type": "uint64"}, {"internalType": "bytes32", "name": "expectedHash", "type": "bytes32"}, {"internalType": "bytes32", "name": "deliveryHash", "type": "bytes32"}, {"internalType": "uint64", "name": "deliveredAt", "type": "uint64"}, {"internalType": "bool", "name": "checklistOk", "type": "bool"}, {"internalType": "bool", "name": "accepted", "type": "bool"}, {"internalType": "bool", "name": "feeFree", "type": "bool"}, {"internalType": "enum EscrowReferee.State", "name": "state", "type": "uint8"}, {"internalType": "enum EscrowReferee.Verdict", "name": "verdict", "type": "uint8"}, {"internalType": "uint8", "name": "inputBits", "type": "uint8"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "address", "name": "", "type": "address"}], "name": "jobsCreated", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "processor", "outputs": [{"internalType": "contract IProcessor", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "refereeCircuitId", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}], "name": "replayVerdict", "outputs": [{"internalType": "uint8", "name": "out", "type": "uint8"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}, {"internalType": "bool", "name": "ok", "type": "bool"}], "name": "setChecklist", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}], "name": "settle", "outputs": [], "stateMutability": "nonpayable", "type": "function"}];
const STATES = ["Open", "Delivered", "Settled"];
const VERDICTS = ["None", "Release", "Refund", "Split50"];
const PINS = { 1: "RELEASE", 2: "REFUND", 4: "SPLIT50" };

const readProvider = new ethers.JsonRpcProvider(RPC);
const reader = new ethers.Contract(ESCROW, ABI, readProvider);
let signer = null, writer = null, account = null;

const $ = id => document.getElementById(id);
const short = a => a.slice(0, 6) + "\u2026" + a.slice(-4);
const fmtT = ts => new Date(Number(ts) * 1000).toLocaleString([], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

function setWalletUI() {
  $("wallet-state").textContent = account ? short(account) + " on X Layer" : "not connected";
  $("connect").textContent = account ? "Wallet connected" : "Connect wallet";
}

async function connect() {
  if (!window.ethereum) { $("create-status").textContent = "No wallet extension found in this browser. Open this page in the browser that has your wallet."; return null; }
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const net = await provider.getNetwork();
  if (net.chainId !== 196n) {
    try { await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xc4" }] }); }
    catch (e) { await window.ethereum.request({ method: "wallet_addEthereumChain", params: [{ chainId: "0xc4", chainName: "X Layer", rpcUrls: [RPC], nativeCurrency: { name: "OKB", symbol: "OKB", decimals: 18 }, blockExplorerUrls: ["https://www.oklink.com/xlayer"] }] }); }
  }
  signer = await provider.getSigner();
  account = await signer.getAddress();
  writer = new ethers.Contract(ESCROW, ABI, signer);
  setWalletUI();
  renderJobs();
  return account;
}

$("connect").onclick = async () => { try { await connect(); } catch (e) { $("create-status").textContent = "Connect failed: " + (e.shortMessage || e.message); } };

// Live deliverable hash preview on the create form.
$("c-deliverable").addEventListener("input", () => {
  const t = $("c-deliverable").value;
  $("c-hash").textContent = t ? ethers.keccak256(ethers.toUtf8Bytes(t)) : "hash appears as you type";
});

$("create-btn").onclick = async () => {
  const st = $("create-status");
  try {
    if (!account) await connect();
    const fr = $("c-freelancer").value.trim();
    const amt = $("c-amount").value.trim();
    const del = $("c-deliverable").value;
    const dh = parseFloat($("c-delivery-hours").value), ah = parseFloat($("c-accept-hours").value);
    if (!ethers.isAddress(fr)) { st.textContent = "That freelancer address does not look right."; return; }
    if (fr.toLowerCase() === account.toLowerCase()) { st.textContent = "Client and freelancer cannot be the same address. The contract refuses self-deals."; return; }
    if (!amt || !(parseFloat(amt) > 0)) { st.textContent = "Enter an amount in OKB."; return; }
    if (!del) { st.textContent = "Write the deliverable. Its hash is the commitment both sides settle against."; return; }
    if (!(dh > 0) || !(ah >= 0)) { st.textContent = "Check the deadlines."; return; }
    const now = Math.floor(Date.now() / 1000);
    const hash = ethers.keccak256(ethers.toUtf8Bytes(del));
    st.textContent = "Creating the job, confirm in your wallet.";
    const tx = await writer.createJob(fr, now + Math.round(dh * 3600), now + Math.round((dh + ah) * 3600), hash, { value: ethers.parseEther(amt) });
    await tx.wait();
    st.textContent = "Job created and funded. It is on the record below.";
    renderJobs();
  } catch (e) { st.textContent = "Create failed: " + (e.shortMessage || e.message); }
};

async function act(id, label, fn, statusEl) {
  const st = $(statusEl);
  try {
    if (!account) await connect();
    st.textContent = label + ", confirm in your wallet.";
    const tx = await fn(writer);
    await tx.wait();
    st.textContent = label + " done.";
    renderJobs();
  } catch (e) { st.textContent = label + " failed: " + (e.shortMessage || e.message); }
}

async function renderJobs() {
  const list = $("job-list");
  try {
    const count = Number(await reader.jobCount());
    $("job-count").textContent = count;
    if (count === 0) { list.innerHTML = "<p class=\"micro\">No jobs yet. The first one is free.</p>"; return; }
    const jobs = [];
    for (let id = count; id >= 1 && jobs.length < 25; id--) { jobs.push({ id, j: await reader.jobs(id) }); }
    list.innerHTML = jobs.map(({ id, j }) => jobCard(id, j)).join("");
    jobs.forEach(({ id, j }) => wireCard(id, j));
  } catch (e) { list.innerHTML = "<p class=\"micro\">Could not read the escrow just now. Refresh to try again.</p>"; }
}

function jobCard(id, j) {
  const state = STATES[Number(j.state)];
  const verdict = VERDICTS[Number(j.verdict)];
  const pillCls = state === "Settled" ? (verdict === "Release" ? "rel" : verdict === "Refund" ? "ref" : "split") : "";
  const pillTxt = state === "Settled" ? verdict.toUpperCase() : state.toUpperCase();
  const hashState = Number(j.deliveredAt) === 0 ? "not delivered yet" : (j.deliveryHash === j.expectedHash ? "delivered, hash matches the terms" : "delivered, hash does not match the terms");
  const bits = Number(j.inputBits).toString(2).padStart(5, "0");
  const mine = account && (account.toLowerCase() === j.client.toLowerCase() ? "you are the client" : account.toLowerCase() === j.freelancer.toLowerCase() ? "you are the freelancer" : "");
  let actions = "";
  if (state === "Open") actions = `<div class="job-act"><input id="d-text-${id}" placeholder="Deliverable text (its hash is what gets recorded)"><button class="btn sm" id="d-btn-${id}">Deliver</button></div>`;
  if (state === "Delivered") actions = `<div class="job-act"><button class="btn sm" id="c-btn-${id}">Checklist OK</button><button class="btn sm" id="a-btn-${id}">Accept work</button><button class="btn sm ghost" id="s-btn-${id}">Settle</button></div>`;
  if (state === "Settled") actions = `<div class="job-act"><button class="btn sm ghost" id="r-btn-${id}">Re-run the referee</button><span class="micro" id="r-out-${id}"></span></div>`;
  return `<article class="card job">
    <div class="console-top"><span>JOB ${id} · ESCROW 0xEca9\u202660d5</span><span class="pill ${pillCls}">${pillTxt}</span></div>
    <div class="job-rows">
      <div class="evidence-row"><span>Amount</span><strong>${ethers.formatEther(j.amount)} OKB</strong></div>
      <div class="evidence-row"><span>Client</span><strong class="mono">${short(j.client)}</strong></div>
      <div class="evidence-row"><span>Freelancer</span><strong class="mono">${short(j.freelancer)}</strong></div>
      <div class="evidence-row"><span>Delivery</span><strong>${hashState}</strong></div>
      <div class="evidence-row"><span>Checklist</span><strong>${j.checklistOk ? "OK, attested by client" : "not attested"}</strong></div>
      <div class="evidence-row"><span>Accepted</span><strong>${j.accepted ? "yes, signed by client" : "no"}</strong></div>
      <div class="evidence-row"><span>Deliver by</span><strong>${fmtT(j.deliveryDeadline)}</strong></div>
      <div class="evidence-row"><span>Settle opens after</span><strong>${fmtT(j.acceptDeadline)}</strong></div>
      ${state === "Settled" ? `<div class="evidence-row"><span>Circuit inputs</span><strong class="mono">${bits} (D H C T A)</strong></div>` : ""}
      ${mine ? `<div class="evidence-row"><span>Your role</span><strong>${mine}</strong></div>` : ""}
    </div>
    ${actions}
    <p class="micro" id="st-${id}"></p>
  </article>`;
}

function wireCard(id, j) {
  const st = "st-" + id;
  const on = (el, fn) => { const n = $(el); if (n) n.onclick = fn; };
  on("d-btn-" + id, () => act(id, "Delivering", w => {
    const t = $("d-text-" + id).value;
    if (!t) { $(st).textContent = "Type the deliverable text first. Its hash is what the contract checks."; return Promise.reject(new Error("empty deliverable")); }
    return w.deliver(id, ethers.keccak256(ethers.toUtf8Bytes(t)));
  }, st));
  on("c-btn-" + id, () => act(id, "Setting checklist", w => w.setChecklist(id, true), st));
  on("a-btn-" + id, () => act(id, "Accepting", w => w.accept(id), st));
  on("s-btn-" + id, () => act(id, "Settling", w => w.settle(id), st));
  on("r-btn-" + id, async () => {
    const out = $("r-out-" + id);
    out.textContent = "asking circuit #51\u2026";
    try { const pin = Number(await reader.replayVerdict(id)); out.textContent = "circuit answers pin " + pin + " = " + (PINS[pin] || "unknown") + ", same inputs, same verdict, forever."; }
    catch (e) { out.textContent = "replay failed: " + (e.shortMessage || e.message); }
  });
}

setWalletUI();
renderJobs();
