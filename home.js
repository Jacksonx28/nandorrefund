(() => {
  const outcomes = {
    release: { title: 'Work accepted.', status: 'RELEASE', style: 'rel', description: 'Delivery recorded, hash verified, checklist complete, and client acceptance signed.', freelancer: 100 },
    split: { title: 'A shared outcome.', status: 'SPLIT 50/50', style: 'split', description: 'The work arrived on time, its hash matches, and the checklist is complete — but client acceptance never came.', freelancer: 50 },
    refund: { title: 'Funds returned.', status: 'REFUND', style: 'ref', description: 'Nothing was delivered by the deadline. Under the planned rules, the escrow returns the funds to the client.', freelancer: 0 }
  };
  document.querySelectorAll('[data-outcome]').forEach(button => {
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-pressed') === 'true') return;
      const item = outcomes[button.dataset.outcome];
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const receipt = document.querySelector('.settlement');
      receipt.getAnimations().forEach(animation => animation.cancel());
      if (!reduced) receipt.animate([
        { opacity: .25, transform: 'translateY(10px)', filter: 'blur(3px)' },
        { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }
      ], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
      document.querySelectorAll('[data-outcome]').forEach(option => {
        const active = option === button;
        option.classList.toggle('active', active);
        option.setAttribute('aria-pressed', String(active));
      });
      document.getElementById('outcome-label').textContent = item.title;
      const status = document.getElementById('outcome-status');
      status.textContent = item.status;
      status.className = 'pill ' + item.style;
      document.getElementById('outcome-description').textContent = item.description;
      document.getElementById('freelancer-share').replaceChildren(String(item.freelancer), Object.assign(document.createElement('span'), {textContent: '%'}));
      document.getElementById('client-share').replaceChildren(String(100 - item.freelancer), Object.assign(document.createElement('span'), {textContent: '%'}));
      document.getElementById('allocation-fill').style.width = item.freelancer + '%';
    });
  });
})();
