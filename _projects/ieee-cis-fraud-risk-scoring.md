---
layout: page
title: Real-Time Fraud Risk Scoring
description: Leakage-safe fraud modeling across 590K transactions.
img: assets/img/ieee-fraud-detection/model-selection.svg
importance: 1
category: work
featured: true
portfolio_ui: true
---

<div class="fraud-case">
  <a class="fraud-case__dataset" href="https://www.kaggle.com/competitions/ieee-fraud-detection/data" target="_blank" rel="noopener noreferrer">
    <span>DATASET</span>
    <strong>IEEE-CIS Fraud Detection</strong>
    <small>Kaggle · 590,540 labeled transactions · transaction + identity tables</small>
    <b aria-hidden="true">↗</b>
  </a>

  <div class="fraud-case__section-head">
    <span>01</span>
    <h2>Validation design</h2>
    <div></div>
  </div>

  <div class="fraud-case__timeline" role="img" aria-label="70 percent train, 15 percent validation, 15 percent test chronological split">
    <div class="fraud-case__timeline-segment fraud-case__timeline-segment--train">
      <strong>TRAIN</strong>
      <span>413,378 · 70%</span>
    </div>
    <div class="fraud-case__timeline-segment fraud-case__timeline-segment--validation">
      <strong>VALIDATE</strong>
      <span>88,581 · 15%</span>
    </div>
    <div class="fraud-case__timeline-segment fraud-case__timeline-segment--test">
      <strong>TEST</strong>
      <span>88,581 · 15%</span>
    </div>
  </div>
  <p class="fraud-case__timeline-note"><span>PAST</span><span>182 relative days → FUTURE</span></p>

  <div class="fraud-case__section-head">
    <span>02</span>
    <h2>Model selection</h2>
    <div></div>
  </div>

  <div class="fraud-case__chart-card">
    {% include figure.liquid loading="eager" path="assets/img/ieee-fraud-detection/model-selection.svg" title="Validation PR-AUC across model candidates" class="fraud-case__img" %}
  </div>

  <div class="fraud-case__chart-card fraud-case__chart-card--spaced">
    {% include figure.liquid loading="lazy" path="assets/img/ieee-fraud-detection/feature-ablation-redrawn.svg" title="LightGBM feature-group ablation" class="fraud-case__img" %}
  </div>

  <div class="fraud-case__section-head">
    <span>03</span>
    <h2>Model performance</h2>
    <div></div>
  </div>

  <div class="fraud-case__result-grid">
    <div class="fraud-case__chart-card">
      {% include figure.liquid loading="lazy" path="assets/img/ieee-fraud-detection/main-metrics.svg" title="Model performance metrics" class="fraud-case__img" %}
    </div>
    <div class="fraud-case__chart-card">
      {% include figure.liquid loading="lazy" path="assets/img/ieee-fraud-detection/confusion-matrix.svg" title="Final test confusion matrix" class="fraud-case__img" %}
    </div>
    <div class="fraud-case__chart-card">
      {% include figure.liquid loading="lazy" path="assets/img/ieee-fraud-detection/feature-importance-redrawn.svg" title="Top final-model features" class="fraud-case__img" %}
    </div>
  </div>

  <p class="fraud-case__threshold-note">Precision and confusion matrix use threshold 0.5.</p>

  <div class="fraud-case__guardrails" aria-label="Interpretation guardrails">
    <span>Pseudo-entity ≠ verified customer</span>
    <span><code>TransactionDT</code> = relative time</span>
    <span>Importance ≠ causality</span>
    <span>Batch latency ≠ API latency</span>
  </div>

  <ul class="fraud-case__tags" aria-label="Technology stack">
    <li>Python</li>
    <li>pandas</li>
    <li>scikit-learn</li>
    <li>LightGBM</li>
    <li>CatBoost</li>
    <li>PyArrow</li>
  </ul>
</div>
