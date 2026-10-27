HABIT OR HUNCH? — HABIT-Bench interactive field guide

Open index.html in a modern browser. No installation, API key, model, server, or internet connection is required for the demo. The Paper / Code / Dataset links open external pages only when clicked.

WHAT IS INCLUDED
Five decisions across three authored synthetic mini-lifelines:
  apply       Infer and apply a supported food habit.
  boundary    Keep the same habit within its context.
  exception   Honor a one-time override without rewriting the default.
  drift       Resolve the current travel habit after a temporal change.
  provenance  Reject an unaccepted assistant suggestion in software support.

HOW TO USE
1. Read the chronological evidence on the left.
2. Click one of four actions, or press 1–4.
3. Inspect the highlighted evidence and explanation.
4. Switch case, use Next case, or Try again.
5. Play guided tour automatically advances through all five cases. Each case shows the prompt for 4.5 seconds and the explanation for 6.5 seconds (55 seconds total). Pause tour or Escape stops it.

CAPTURE / PRESENTATION
A compact layout is available with ?present=1.
Scene links can be opened directly (names or indexes 0–4), e.g.:
  index.html?scene=boundary&reveal=1&present=1
  index.html?scene=drift&reveal=1&present=1
  index.html?scene=provenance&reveal=1&present=1
  index.html?tour=1&present=1
Recommended recording viewport: 1280 × 800 (compact) or 1440 × 900.
For screenshots, set scene plus reveal=1. For audience participation, omit reveal.
The presentation mode keeps the illustrative disclosure visible on desktop; mobile places it in the footer.

SCIENTIFIC STATUS
Every dialogue and action in this demo was authored for illustration. These are not benchmark evaluation items, real-user records, model outputs, or measured model results. Correct actions encode the illustrative scenario logic, not model inference. No accuracy, confidence, or benchmark performance is fabricated. The paper and released benchmark should be cited for empirical claims.

All interactive text and scenario logic are editable in scenarios.js. Layout is in styles.css, interaction is in app.js. The original supplied LUMIA logo is copied without edits.

LINKS
Paper: https://arxiv.org/pdf/2610.24520
Code: https://github.com/LUMIA-Group/habit-bench
Dataset: https://huggingface.co/datasets/hollyming/HABIT-Bench
Website: https://hollyming.github.io/habit-bench-site/
