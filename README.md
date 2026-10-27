# HABIT-Bench

Public project website for **HABIT-Bench: Evaluating Habit Induction from Longitudinal Weak Evidence in Agent Memory**.

[Website](https://hollyming.github.io/habit-bench-site/) · [Interactive demo](https://hollyming.github.io/habit-bench-site/demo/) · [Paper](https://arxiv.org/pdf/2610.24520) · [Code & evaluation](https://github.com/LUMIA-Group/habit-bench) · [Dataset](https://huggingface.co/datasets/hollyming/HABIT-Bench)

## Local preview

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. This is a buildless HTML/CSS/JavaScript site. No package installation or database is needed. Google Fonts is optional, with system-font fallbacks. No analytics are installed.

## Content and evidence

The page introduces the benchmark, illustrates selective habit application, and displays all fifteen non-oracle rows from the Qwen3-235B-A22B comparison: eight memory methods, five retrieval baselines, and two evaluator controls. Overall means the unweighted four-domain macro average. The paper also reports GLM-5.3-Flash results. The context-switching example is an illustration, not an evaluation item.

Results remain **document-reported**, cross-checked against arXiv v2, not independently recomputed from raw predictions for this site. `evidence.json` records source commits, hashes, dataset identities, and interpretation limits. Numerical content originates from `scripts/generate_website_data.py` in the separate writing repository.

The original paper figures (framework, Qwen model-size comparison, retrieval sensitivity, and memory costs) are displayed with an accessible enlargement dialog. `figure-provenance.json` records source versions, hashes, and rendering commands. The reproducible import script is `scripts/import_website_figures.py` in the writing repository. The LUMIA logo is the exact user-provided image. Scientific figure content has not been altered.

## Deployment

GitHub Actions publishes `main` at https://hollyming.github.io/habit-bench-site/. Settings → Pages → Source is **GitHub Actions**. The workflow stages the static HTML/CSS/JavaScript files, evidence manifests, `.nojekyll`, `assets/`, and `demo/`.

## Files

- `index.html`: public page structure, paper, code, and dataset links.
- `styles.css`: responsive visual design.
- `app.js`: scenario controls, result filters, and accessible figure dialogs.
- `data.js`: generated dataset statistics and experiment values.
- `evidence.json`: numerical provenance and claim boundaries.
- `figure-provenance.json`: paper figure and logo source records.
- `assets/`: logo, paper figures, and original vector PDFs where available.
- `demo/`: the standalone Habit or Hunch? interactive illustration (authored scenarios, not model evaluation results).
- `.github/workflows/pages.yml`: automatic GitHub Pages deployment.
