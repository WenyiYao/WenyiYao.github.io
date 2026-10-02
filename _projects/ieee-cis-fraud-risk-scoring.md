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
  <section class="fraud-case__hero-panel">
    <span class="fraud-case__eyebrow">IEEE-CIS · MACHINE LEARNING</span>
    <h2>Fraud ranking built for what happens next.</h2>
    <p>Leakage-safe feature engineering and model selection across 590K transactions.</p>

    <a class="fraud-case__dataset" href="https://www.kaggle.com/competitions/ieee-fraud-detection/data" target="_blank" rel="noopener noreferrer">
      <span>DATASET</span>
      <strong>IEEE-CIS Fraud Detection</strong>
      <small>Kaggle · 590,540 labeled transactions · transaction + identity tables</small>
      <b aria-hidden="true">↗</b>
    </a>

    <div class="fraud-case__kpis" aria-label="Project highlights">
      <div class="fraud-case__kpi fraud-case__kpi--blue">
        <span class="fraud-case__value">590K</span>
        <span class="fraud-case__label">transactions</span>
      </div>
      <div class="fraud-case__kpi fraud-case__kpi--violet">
        <span class="fraud-case__value">0.927</span>
        <span class="fraud-case__label">ROC-AUC</span>
      </div>
      <div class="fraud-case__kpi fraud-case__kpi--amber">
        <span class="fraud-case__value">82.5%</span>
        <span class="fraud-case__label">precision</span>
      </div>
      <div class="fraud-case__kpi fraud-case__kpi--pink">
        <span class="fraud-case__value">0.618</span>
        <span class="fraud-case__label">test PR-AUC</span>
      </div>
    </div>

  </section>

  <div class="fraud-case__section-head">
    <span>01</span>
    <h2>Validation design</h2>
    <div></div>
  </div>

  <div class="fraud-case__flow" aria-label="Leakage-safe modeling workflow">
    <div class="fraud-case__step">
      <span class="fraud-case__step-icon">01</span>
      <div>
        <strong>Chronological split</strong>
        <span>70% train · 15% validation · 15% test</span>
      </div>
    </div>
    <div class="fraud-case__step">
      <span class="fraud-case__step-icon">02</span>
      <div>
        <strong>Strict-past features</strong>
        <span>Same-time and future events stay invisible</span>
      </div>
    </div>
    <div class="fraud-case__step">
      <span class="fraud-case__step-icon">03</span>
      <div>
        <strong>Freeze → test once</strong>
        <span>Selection uses validation only</span>
      </div>
    </div>
  </div>

  <div class="fraud-case__section-head">
    <span>02</span>
    <h2>Model selection</h2>
    <div></div>
  </div>

  <div class="fraud-case__model-grid">
    <div class="fraud-case__chart-card">
      {% include figure.liquid loading="eager" path="assets/img/ieee-fraud-detection/model-selection.svg" title="Validation PR-AUC across model candidates" class="fraud-case__img" %}
    </div>

    <div class="fraud-case__selection-card">
      <span class="fraud-case__eyebrow">SELECTED MODEL</span>
      <strong>CatBoost</strong>
      <p>Best validation ranking without tuning.</p>
      <div>
        <span>Native categorical handling</span>
        <span>Refit on train + validation</span>
      </div>
    </div>

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
  </div>

  <div class="fraud-case__chart-card fraud-case__chart-card--spaced">
    {% include figure.liquid loading="lazy" path="assets/img/ieee-fraud-detection/feature-importance-redrawn.svg" title="Top final-model features" class="fraud-case__img" %}
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
