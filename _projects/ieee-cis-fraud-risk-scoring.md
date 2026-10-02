---
layout: page
title: Real-Time Fraud Risk Scoring
description: Leakage-safe fraud modeling on 590K transactions, evaluated on a held-out future period.
img: assets/img/ieee-fraud-detection/model-comparison.png
importance: 1
category: work
featured: true
portfolio_ui: true
---

<div class="fraud-case">
  <p class="fraud-case__lede">
    A leakage-safe fraud-ranking pipeline designed and evaluated for
    <strong>future, unseen transactions.</strong>
  </p>

  <div class="fraud-case__kpis" aria-label="Project highlights">
    <div class="fraud-case__kpi">
      <span class="fraud-case__value">590K</span>
      <span class="fraud-case__label">transactions</span>
    </div>
    <div class="fraud-case__kpi">
      <span class="fraud-case__value">3.50%</span>
      <span class="fraud-case__label">fraud prevalence</span>
    </div>
    <div class="fraud-case__kpi">
      <span class="fraud-case__value">496</span>
      <span class="fraud-case__label">model features</span>
    </div>
    <div class="fraud-case__kpi fraud-case__kpi--accent">
      <span class="fraud-case__value">0.618</span>
      <span class="fraud-case__label">test PR-AUC</span>
    </div>
  </div>

  <h2 class="fraud-case__heading">Leakage-safe workflow</h2>

  <div class="fraud-case__flow" aria-label="Modeling workflow">
    <div class="fraud-case__step">
      <span class="fraud-case__step-number">01</span>
      <strong>Split by time</strong>
      <span>70% train · 15% validation · 15% test</span>
    </div>
    <div class="fraud-case__arrow" aria-hidden="true">→</div>
    <div class="fraud-case__step">
      <span class="fraud-case__step-number">02</span>
      <strong>Build strict-past features</strong>
      <span>Same-time and future events stay invisible</span>
    </div>
    <div class="fraud-case__arrow" aria-hidden="true">→</div>
    <div class="fraud-case__step">
      <span class="fraud-case__step-number">03</span>
      <strong>Freeze, then test once</strong>
      <span>Model decisions use validation only</span>
    </div>
  </div>

  <div class="fraud-case__visual">
    {% include figure.liquid loading="eager" path="assets/img/ieee-fraud-detection/temporal-split.png" title="Chronological train, validation, and test partitions" class="fraud-case__img" %}
    <p class="fraud-case__caption">182 relative days · every test transaction occurs after validation</p>
  </div>

  <h2 class="fraud-case__heading">Model selection</h2>

  <div class="fraud-case__visual">
    {% include figure.liquid loading="lazy" path="assets/img/ieee-fraud-detection/model-comparison.png" title="Validation PR-AUC across model candidates" class="fraud-case__img" %}
    <p class="fraud-case__caption">
      CatBoost baseline wins on validation PR-AUC: <strong>0.658</strong>
    </p>
  </div>

  <div class="fraud-case__mini-grid">
    <div class="fraud-case__visual">
      {% include figure.liquid loading="lazy" path="assets/img/ieee-fraud-detection/feature-ablation.png" title="LightGBM feature-group ablation" class="fraud-case__img" %}
      <p class="fraud-case__caption">Engineered current-transaction features deliver the clearest ablation gain</p>
    </div>
    <div class="fraud-case__result-card">
      <span class="fraud-case__eyebrow">Held-out future test</span>
      <div><strong>0.6179</strong><span>PR-AUC</span></div>
      <div><strong>0.9268</strong><span>ROC-AUC</span></div>
      <div><strong>0.8250</strong><span>precision @ 0.5</span></div>
      <div><strong>0.4466</strong><span>recall @ 0.5</span></div>
      <small>Threshold 0.5 is diagnostic, not a production policy.</small>
    </div>
  </div>

  <h2 class="fraud-case__heading">Final test behavior</h2>

  <div class="fraud-case__mini-grid fraud-case__mini-grid--balanced">
    <div class="fraud-case__visual">
      {% include figure.liquid loading="lazy" path="assets/img/ieee-fraud-detection/precision-recall-curve.png" title="Final precision-recall curve" class="fraud-case__img" %}
      <p class="fraud-case__caption">Precision–recall stays well above the 3.48% no-skill baseline</p>
    </div>
    <div class="fraud-case__visual">
      {% include figure.liquid loading="lazy" path="assets/img/ieee-fraud-detection/feature-importance.png" title="Top final-model features" class="fraud-case__img" %}
      <p class="fraud-case__caption">Card, count, email, amount, device, time, and history signals lead</p>
    </div>
  </div>

  <div class="fraud-case__guardrails" aria-label="Interpretation guardrails">
    <span>Pseudo-entity ≠ verified customer</span>
    <span><code>TransactionDT</code> = relative time</span>
    <span>Feature importance ≠ causality</span>
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
