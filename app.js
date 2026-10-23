/* Static, client-side illustrations only. No user data is collected. */
'use strict';
const scenarios = {
  apply: { request: '“My usual solo lunch this Tuesday?”', title: 'Apply the habit', explanation: 'Choose a mild option. The current request matches the pattern’s scope.' },
  boundary: { request: '“Plan a Saturday dinner for six friends.”', title: 'Withhold the assumption', explanation: 'A solo weekday pattern does not establish a group’s weekend preferences. Ask what fits this occasion.' },
  exception: { request: '“Same solo lunch today, but make it spicy.”', title: 'Respect the local exception', explanation: 'Follow today’s explicit request. Keep the usual mild-food habit scoped to other matching occasions.' }
};
document.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => {
  const scenario = scenarios[button.dataset.scenario];
  document.querySelectorAll('[data-scenario]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('.current-request').textContent = scenario.request;
  document.querySelector('.decision-title strong').textContent = scenario.title;
  document.querySelector('.decision-explanation').textContent = scenario.explanation;
}));
const formatNumber = number => number.toLocaleString('en-US');
document.querySelector('#domain-grid').innerHTML = window.HABIT_DATA.domains.map((domain, index) => `<article class="domain"><div class="domain-top"><h3>${domain.name}</h3><span class="domain-number">0${index + 1}</span></div><p>${domain.description}</p><div class="domain-counts"><div><strong>${domain.users}</strong><span>users</span></div><div><strong>${formatNumber(domain.sessions)}</strong><span>sessions</span></div><div><strong>${formatNumber(domain.probes)}</strong><span>probes</span></div></div><div class="domain-source">${domain.source} seeds · ${domain.version}</div></article>`).join('');
const data = window.HABIT_DATA;
document.querySelector('.stats').innerHTML = ['users','sessions','probes'].map((key,index) => `<div><strong>${formatNumber(data.domains.reduce((sum, domain) => sum + domain[key], 0))}</strong><span>${['Synthetic users','Chronological sessions','Four-choice probes'][index]}</span></div>`).join('') + `<div><strong>${data.domains.length}</strong><span>Everyday domains</span></div>`;
let activeDomain = 'Overall';
let activeGroup = 'memory';
const panel = document.querySelector('#results-panel');
panel.innerHTML = `<div class="results-toolbar"><div><p class="chart-eyebrow">SHARED ANSWERER</p><h3>${data.answerer}</h3></div><div class="domain-select" role="group" aria-label="Result domain"><button type="button" data-domain="Overall" aria-pressed="true">Overall</button>${data.domains.map(domain => `<button type="button" data-domain="${domain.name}" aria-pressed="false">${domain.name}</button>`).join('')}</div></div><div class="chart-layout"><div class="chart-main"><div class="group-select" role="group" aria-label="Method category"><button type="button" data-group="memory" aria-pressed="true">Memory methods</button><button type="button" data-group="retrieval" aria-pressed="false">Session retrieval</button></div><div id="chart-data" aria-live="polite"></div></div><aside class="chart-aside"><p class="chart-eyebrow">EVALUATOR CONTROLS</p><div id="control-data" aria-live="polite"></div><div class="reference-note"><span class="dashed-key" aria-hidden="true"></span><strong>25% uniform choice</strong><p>A theoretical reference for four choices, not a significance threshold.</p></div><p class="adaptation-note">SeCom is an official-source adaptation. The other seven memory methods use official-code adapters via MedMemoryBench. Session retrieval uses HABIT-native baselines.</p></aside></div><div class="chart-footer"><span id="chart-sample"></span><span>Accuracy (%) · document-reported</span></div>`;
function renderResults() {
  const rows = data.results.filter(row => row.group === activeGroup);
  const domain = data.domains.find(item => item.name === activeDomain);
  const score = row => activeDomain === 'Overall' ? row.four_domain_mean : row.accuracy[activeDomain];
  const metric = activeDomain === 'Overall' ? 'four-domain macro accuracy' : `accuracy on ${activeDomain}`;
  document.querySelector('#chart-data').innerHTML = `<div class="chart-axis" aria-hidden="true"><span>0</span><span>25</span><span>50%</span></div><div class="chart-rows">${rows.map(row => `<div class="chart-row"><span class="method-label">${row.name}</span><div class="bar-track" aria-hidden="true"><span class="chart-bar" style="width:${score(row) * 2}%"></span></div><strong class="score">${score(row).toFixed(2)}<span class="sr-only"> percent ${metric}</span></strong></div>`).join('')}</div>`;
  document.querySelector('#control-data').innerHTML = data.results.filter(row => row.group === 'control').map(row => `<div class="control-result"><span>${row.name === 'No-Memory' ? 'No Memory' : 'Full Memory'}</span><strong>${score(row).toFixed(2)}<small>%</small></strong></div>`).join('');
  document.querySelector('#chart-sample').textContent = activeDomain === 'Overall' ? 'Four-domain macro average · 3,328 probes' : `${activeDomain} ${domain.version} · ${formatNumber(domain.probes)} probes`;
}
panel.querySelectorAll('[data-domain]').forEach(button => button.addEventListener('click', () => {
  activeDomain = button.dataset.domain;
  panel.querySelectorAll('[data-domain]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  renderResults();
}));
panel.querySelectorAll('[data-group]').forEach(button => button.addEventListener('click', () => {
  activeGroup = button.dataset.group;
  panel.querySelectorAll('[data-group]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  renderResults();
}));
renderResults();

const figures = {
  framework: { title: 'Figure 1 · The HABIT-Bench framework', image: 'framework.png', original: 'framework.png' },
  scaling: { title: 'Figure 2 · Qwen model-size comparison', image: 'model-scaling.png', original: 'model-scaling.png' },
  sensitivity: { title: 'Figure 3a · Retrieval & ingestion sensitivity', image: 'retrieval-sensitivity.png', original: 'retrieval-sensitivity.pdf' },
  efficiency: { title: 'Figure 3b · Memory costs', image: 'efficiency.png', original: 'efficiency.pdf' }
};
const dialog = document.querySelector('#figure-dialog');
document.querySelectorAll('[data-figure]').forEach(button => button.addEventListener('click', () => {
  const figure = figures[button.dataset.figure];
  const container = button.closest('figure');
  document.querySelector('#dialog-title').textContent = figure.title;
  const image = document.querySelector('#dialog-image');
  image.src = `./assets/figures/${figure.image}`;
  image.alt = container.querySelector('img').alt;
  document.querySelector('#figure-original').href = `./assets/figures/${figure.original}`;
  document.querySelector('#dialog-caption').textContent = container.querySelector('figcaption').textContent.replace('View in paper ↗', '').trim();
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
