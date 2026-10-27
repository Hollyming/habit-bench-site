'use strict';
const scenes = window.HABIT_SCENARIOS;
const params = new URLSearchParams(location.search);
const requestedScene = params.get('scene');
let current = /^[0-4]$/.test(requestedScene || '') ? Number(requestedScene) : Math.max(0, scenes.findIndex(scene => scene.id === requestedScene));
let selected = null;
let revealed = false;
let tourTimer;
let touring = false;
let tourPhase = 0;
const $ = selector => document.querySelector(selector);
const sceneButtons = $('#scene-buttons');
sceneButtons.innerHTML = scenes.map((scene,index) => `<button type="button" data-scene="${index}" aria-pressed="false"><span class="scene-number">0${index+1}</span><span>${scene.label}</span><small>${scene.descriptor}</small></button>`).join('');
function render() {
  const scene = scenes[current];
  document.body.dataset.scene = scene.id;
  document.body.classList.toggle('is-revealed',revealed);
  document.querySelectorAll('[data-scene]').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.scene)===current)));
  $('#scene-counter').textContent = `0${current+1} / 0${scenes.length}`;
  $('#history-title').textContent = scene.title;
  $('#domain-label').textContent = scene.domain;
  $('#context-badge').textContent = scene.context;
  $('#request-text').textContent = '“'+scene.request+'”';
  $('#request-tags').innerHTML = scene.tags.map(tag=>`<span>${tag}</span>`).join('');
  $('#timeline').innerHTML = scene.history.map((event,index)=>`<li class="evidence-row ${revealed ? (scene.evidenceClass || event.type) : ''}"><div class="timeline-dot" aria-hidden="true"></div><div class="evidence-meta"><span>${event.when}</span><span>${event.who}</span></div><p>“${event.text}”</p><div class="evidence-tag"><span>${revealed ? scene.relevance[index] : event.tag}</span>${revealed ? '<span class="evidence-mark" aria-hidden="true">'+((scene.evidenceClass || event.type)==='support' ? '↗' : '—')+'</span>' : ''}</div></li>`).join('');
  const legends = {apply:'Blue-green: support · gray: unrelated.',boundary:'Gold: evidence from another scope; it does not determine this meal.',exception:'Gold: the established default, locally overridden today.',drift:'Blue-green: current state · gray: earlier, superseded state.',provenance:'Blue-green: user endorsement · gray: an unaccepted suggestion.'};
  $('#legend-copy').textContent = revealed ? legends[scene.id] : 'Reveal the reasoning to trace the relevant evidence.';
  $('#choices').innerHTML = scene.choices.map((choice,index)=>`<button type="button" class="choice${revealed && index===scene.correct ? ' supported' : ''}${revealed && selected===index && index!==scene.correct ? ' reconsider' : ''}" data-choice="${index}" aria-pressed="${selected===index}"${revealed?' disabled':''}><span class="choice-letter">${'ABCD'[index]}</span><span>${choice}</span><span class="choice-mark" aria-hidden="true">${revealed && index===scene.correct?'✓':revealed && selected===index?'×':'↗'}</span></button>`).join('');
  $('#reveal-button').disabled = revealed;
  $('#reset-button').disabled = !revealed;
  $('#lens-kicker').textContent = revealed ? scene.decision : '03 / TRACE THE DECISION';
  $('#lens-title').textContent = revealed ? scene.headline : 'A useful memory keeps the conditions.';
  $('#lens-text').textContent = revealed ? scene.explanation : 'A repeated behavior is evidence for a scoped default. Context, exceptions, time, and endorsement determine the next action.';
  $('#decision-tag').textContent = revealed ? (selected===null ? scene.takeaway : selected===scene.correct ? scene.positive : scene.negative) : 'Your decision comes first';
  $('#lens-panel').classList.toggle('revealed',revealed);
  $('#lens-panel').classList.toggle('wrong-choice',revealed && selected!==null && selected!==scene.correct);
  $('#next-button').innerHTML = current===scenes.length-1 ? 'Start again <span aria-hidden="true">↺</span>' : 'Next case <span aria-hidden="true">→</span>';
  document.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>answer(Number(button.dataset.choice))));
}
function updateUrl() {
  const next = new URL(location.href);
  next.searchParams.set('scene',scenes[current].id);
  if(revealed) next.searchParams.set('reveal','1'); else next.searchParams.delete('reveal');
  try { history.replaceState(null,'',next); } catch (_) { /* file:// environments can restrict history updates. */ }
}
function stopTour() {
  clearTimeout(tourTimer);touring=false;
  $('#tour-button span').textContent='Play guided tour';
  $('#tour-button').setAttribute('aria-pressed','false');
  $('#tour-status').textContent='';
}
function chooseScene(index, manual=true) {
  if(manual) stopTour();
  current=index;selected=null;revealed=false;render();updateUrl();
}
function answer(index) {
  stopTour();selected=index;revealed=true;render();updateUrl();
}
function reveal(manual=true) {
  if(manual) stopTour();
  revealed=true;render();updateUrl();
}
function tourTick() {
  if(!touring) return;
  if(tourPhase===0) {
    $('#tour-status').textContent=`Guided tour · ${current+1} of ${scenes.length} · Read the history`;
    tourPhase=1;tourTimer=setTimeout(tourTick,4500);
  } else if(tourPhase===1) {
    reveal(false);
    $('#tour-status').textContent=`Guided tour · ${current+1} of ${scenes.length} · Trace the reasoning`;
    tourPhase=2;tourTimer=setTimeout(tourTick,6500);
  } else if(current<scenes.length-1) {
    chooseScene(current+1,false);tourPhase=0;tourTick();
  } else {
    stopTour();$('#tour-status').textContent='Tour complete · explore any case';
  }
}
sceneButtons.addEventListener('click',event=>{const button=event.target.closest('[data-scene]');if(button)chooseScene(Number(button.dataset.scene));});
$('#reveal-button').addEventListener('click',()=>reveal());
$('#reset-button').addEventListener('click',()=>chooseScene(current));
$('#next-button').addEventListener('click',()=>chooseScene((current+1)%scenes.length));
$('#tour-button').addEventListener('click',()=>{
  if(touring) {stopTour();return;}
  chooseScene(0,false);touring=true;tourPhase=0;
  $('#tour-button span').textContent='Pause tour';$('#tour-button').setAttribute('aria-pressed','true');tourTick();
});
document.addEventListener('keydown',event=>{
  if(event.ctrlKey||event.metaKey||event.altKey||['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName))return;
  if(/^[1-4]$/.test(event.key) && !revealed){event.preventDefault();answer(Number(event.key)-1);}
  if(event.key==='Escape' && touring)stopTour();
});
if(params.get('present')==='1')document.body.classList.add('presentation');
revealed=params.get('reveal')==='1';
render();
if(params.get('tour')==='1')$('#tour-button').click();
