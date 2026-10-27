/* Authored illustrations only. These are not evaluation items, real-user logs, or model outputs. */
'use strict';
const foodHistory = [
  { when:'MON · WEEK 1', who:'User choice', text:'A mild rice bowl for my solo lunch, please.', tag:'solo · weekday', type:'support' },
  { when:'THU · WEEK 1', who:'User choice', text:'Lunch for one again. I’ll take the non-spicy bowl.', tag:'solo · weekday', type:'support' },
  { when:'TUE · WEEK 2', who:'User choice', text:'Another lunch between meetings—keep it mild.', tag:'solo · weekday', type:'support' },
  { when:'FRI · WEEK 2', who:'Unrelated request', text:'Can you find a bakery for Sunday’s birthday cake?', tag:'different task', type:'irrelevant' }
];
window.HABIT_SCENARIOS = [
  {
    id:'apply', label:'Apply', descriptor:'Find the pattern', domain:'Food', context:'Matching context',
    title:'A few traces. A possible pattern.', history:foodHistory,
    request:'My usual lunch for one this Tuesday?', tags:['solo','weekday','no override'],
    choices:['Choose a mild lunch option.','Choose a spicy dish for variety.','Assume every future meal must be mild.','Ignore the repeated lunch choices.'], correct:0,
    decision:'APPLY THE HABIT', headline:'A supported default, in the right context.',
    explanation:'Repeated choices support a mild-food default for solo weekday lunches. The new request matches that scope. The bakery request adds no evidence about spice preference.',
    takeaway:'Mild food · solo weekday lunch', positive:'That fits the evidence.', negative:'This choice loses the pattern or extends it too far.',
    relevance:['Supports the repeated choice','Supports the same scope','Reinforces the default','Unrelated to this decision']
  },
  {
    id:'boundary', label:'Boundary', descriptor:'Change the setting', domain:'Food', context:'Outside the observed scope',
    title:'Same history. A different occasion.', history:foodHistory,
    request:'Plan a Saturday dinner for six friends.', tags:['group','weekend','new occasion'],
    choices:['Make every shared dish mild.','Ask the group about preferences for this dinner.','Choose spicy dishes for everyone.','Treat the solo lunch habit as permanently erased.'], correct:1,
    decision:'WITHHOLD THE ASSUMPTION', headline:'The pattern stays. Its scope does too.',
    explanation:'A solo weekday lunch pattern does not establish a group’s weekend dinner preferences. Ask what fits this occasion without deleting the supported lunch habit.',
    takeaway:'Keep the habit · do not extend its scope', positive:'You kept the boundary.', negative:'A repeated choice is not a rule for every setting.',
    relevance:['Evidence from a different scope','Evidence from a different scope','Evidence from a different scope','Not evidence for this group'],
    evidenceClass:'out-of-scope'
  },
  {
    id:'exception', label:'Exception', descriptor:'Honor the override', domain:'Food', context:'A local exception',
    title:'Same habit. A one-time override.', history:foodHistory,
    request:'Same solo lunch today, but make it spicy just this once.', tags:['solo','weekday','today only'],
    choices:['Keep it mild because the habit is strong.','Permanently replace the mild-food habit with spicy.','Order today’s lunch spicy; retain the usual default.','Discard the entire lunch history.'], correct:2,
    decision:'RESPECT THE EXCEPTION', headline:'Today’s choice is not tomorrow’s new rule.',
    explanation:'The current request explicitly overrides the usual default for this meal. Honor that local exception while retaining the supported mild-food habit for other matching occasions.',
    takeaway:'Spicy today · mild default remains', positive:'You separated an exception from a new habit.', negative:'The override is local, not a permanent change.',
    relevance:['Background default, locally overridden','Background default, locally overridden','Background default, locally overridden','Unrelated to this decision'],
    evidenceClass:'overridden'
  },
  {
    id:'drift', label:'Change', descriptor:'Follow the current state', domain:'Travel', context:'The habit has changed',
    title:'A strong past pattern can become stale.',
    history:[
      {when:'JAN · COMMUTE',who:'User choice',text:'Book the first train for my Monday office trip.',tag:'earliest departure',type:'stale'},
      {when:'FEB · COMMUTE',who:'User choice',text:'The early train again for Monday, thanks.',tag:'earliest departure',type:'stale'},
      {when:'APR · COMMUTE',who:'User choice',text:'Since my work hours changed, I’ve been taking the 10 a.m. train.',tag:'changed routine',type:'support'},
      {when:'MAY · COMMUTE',who:'User choice',text:'That 10 a.m. departure worked well. Let’s use it again.',tag:'new routine repeated',type:'support'}
    ],
    request:'Arrange my usual Monday train for next week.',tags:['same commute','current routine','later departure'],
    choices:['Average the two routines into an 8 a.m. train.','Use the earliest train because it appeared first.','Choose a departure without looking at the dates.','Use the supported newer 10 a.m. routine.'],correct:3,
    decision:'UPDATE THE HABIT STATE',headline:'Remember the change—not just the frequency.',
    explanation:'The later observations establish a changed routine for the same commute. The earlier first-train choices remain historical evidence, but no longer identify the current default.',
    takeaway:'Current state: 10 a.m. commute',positive:'You used the current routine.',negative:'Older evidence must be interpreted in time.',
    relevance:['Historical state, now superseded','Historical state, now superseded','Establishes the changed routine','Confirms the current state']
  },
  {
    id:'provenance', label:'Evidence', descriptor:'Check who endorsed it', domain:'Software', context:'Suggestion ≠ user preference',
    title:'A mention is not an endorsement.',
    history:[
      {when:'SESSION 01',who:'User choice',text:'Send me the weekly service summary by email.',tag:'endorsed action',type:'support'},
      {when:'SESSION 02',who:'User choice',text:'Email is fine for this week’s service report too.',tag:'endorsed action',type:'support'},
      {when:'SESSION 03',who:'Assistant suggestion',text:'You could switch future reports to SMS for quicker updates.',tag:'not accepted',type:'nonbinding'},
      {when:'SESSION 04',who:'User response',text:'Just send this week’s report the usual way.',tag:'no SMS endorsement',type:'support'}
    ],
    request:'Send my usual weekly service summary.',tags:['weekly summary','same task','no accepted switch'],
    choices:['Send it by email, following the endorsed pattern.','Switch to SMS because it was mentioned recently.','Send both email and SMS as a new permanent rule.','Treat the assistant’s suggestion as a user command.'],correct:0,
    decision:'REJECT NONBINDING EVIDENCE',headline:'The latest mention is not always the right memory.',
    explanation:'Email is supported by repeated user choices. SMS was only suggested by the assistant and never accepted. Recency cannot turn nonbinding evidence into a user habit.',
    takeaway:'Endorsed: email · suggested: SMS',positive:'You checked the source of the evidence.',negative:'Only the user-endorsed pattern supports this default.',
    relevance:['User-endorsed choice','Repeated user endorsement','Nonbinding assistant suggestion','Does not endorse a switch']
  }
];
