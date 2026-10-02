#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const outputDir = path.resolve("assets/img/ieee-fraud-detection");
fs.mkdirSync(outputDir, { recursive: true });

const colors = {
  bg: "#15151b",
  panel: "#1d1d26",
  track: "#2a2a36",
  grid: "#363644",
  text: "#f5f5f7",
  muted: "#a3a3b0",
  blue: "#6cb7ff",
  violet: "#9b8cff",
  pink: "#ff6bcb",
  amber: "#ffb85c",
  green: "#6fe3b1",
};

const header = (width, height, titleId, descId) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${titleId} ${descId}">
  <style>
    text { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .title { fill: ${colors.text}; font-size: 25px; font-weight: 700; }
    .subtitle { fill: ${colors.muted}; font-size: 14px; }
    .label { fill: ${colors.text}; font-size: 15px; font-weight: 600; }
    .muted { fill: ${colors.muted}; font-size: 13px; }
    .value { fill: ${colors.text}; font-size: 16px; font-weight: 700; }
  </style>
  <rect width="${width}" height="${height}" rx="28" fill="${colors.bg}"/>
`;

function write(name, content) {
  fs.writeFileSync(path.join(outputDir, name), `${content.trim()}\n`);
}

function modelSelectionChart() {
  const width = 960;
  const height = 520;
  const left = 270;
  const right = 890;
  const plotWidth = right - left;
  const max = 0.7;
  const rows = [
    ["Logistic Regression", 0.39163, colors.violet],
    ["LightGBM baseline", 0.62978, colors.blue],
    ["LightGBM tuned", 0.6301, colors.blue],
    ["CatBoost tuned", 0.65626, colors.amber],
    ["CatBoost baseline", 0.65842, colors.pink],
  ];

  const ticks = [0, 0.2, 0.4, 0.6, 0.7]
    .map((tick) => {
      const x = left + (tick / max) * plotWidth;
      return `<line x1="${x}" y1="122" x2="${x}" y2="446" stroke="${colors.grid}" stroke-width="1"/>
      <text x="${x}" y="470" class="muted" text-anchor="middle">${tick.toFixed(1)}</text>`;
    })
    .join("\n");

  const bars = rows
    .map(([label, value, color], index) => {
      const y = 145 + index * 62;
      const barWidth = (value / max) * plotWidth;
      const winner = label === "CatBoost baseline";
      return `
      <text x="44" y="${y + 18}" class="label">${label}</text>
      <rect x="${left}" y="${y}" width="${plotWidth}" height="26" rx="13" fill="${colors.track}"/>
      <rect x="${left}" y="${y}" width="${barWidth.toFixed(1)}" height="26" rx="13" fill="${color}"${winner ? "" : ' opacity="0.82"'}/>
      <text x="910" y="${y + 19}" class="value" text-anchor="end">${value.toFixed(3)}</text>
      ${winner ? `<rect x="706" y="${y - 28}" width="113" height="22" rx="11" fill="${colors.pink}" opacity="0.18"/><text x="762" y="${y - 13}" fill="${colors.pink}" font-size="11" font-weight="700" text-anchor="middle">SELECTED</text>` : ""}`;
    })
    .join("\n");

  const noSkillX = left + (0.03434 / max) * plotWidth;

  return `${header(width, height, "model-title", "model-desc")}
  <title id="model-title">Validation PR-AUC by model candidate</title>
  <desc id="model-desc">CatBoost baseline has the highest validation PR-AUC at 0.658.</desc>
  <text x="44" y="52" class="title">Model selection</text>
  <text x="44" y="80" class="subtitle">Validation PR-AUC · higher is better</text>
  ${ticks}
  <line x1="${noSkillX.toFixed(1)}" y1="122" x2="${noSkillX.toFixed(1)}" y2="446" stroke="${colors.green}" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="${(noSkillX + 8).toFixed(1)}" y="116" fill="${colors.green}" font-size="12">no-skill 0.034</text>
  ${bars}
</svg>`;
}

function ablationChart() {
  const width = 960;
  const height = 500;
  const left = 95;
  const top = 125;
  const plotWidth = 790;
  const plotHeight = 265;
  const min = 0.61;
  const max = 0.633;
  const points = [
    ["Raw", 390, 0.61387],
    ["+ Identity", 430, 0.6147],
    ["+ Current", 475, 0.63068],
    ["+ History", 484, 0.62655],
    ["+ Velocity", 496, 0.62978],
  ];
  const x = (index) => left + (index / (points.length - 1)) * plotWidth;
  const y = (value) => top + plotHeight - ((value - min) / (max - min)) * plotHeight;

  const grid = [0.61, 0.615, 0.62, 0.625, 0.63]
    .map((tick) => {
      const yy = y(tick);
      return `<line x1="${left}" y1="${yy}" x2="${left + plotWidth}" y2="${yy}" stroke="${colors.grid}"/>
      <text x="${left - 14}" y="${yy + 5}" class="muted" text-anchor="end">${tick.toFixed(3)}</text>`;
    })
    .join("\n");

  const polyline = points.map(([, , value], index) => `${x(index)},${y(value)}`).join(" ");
  const marks = points
    .map(([label, count, value], index) => {
      const xx = x(index);
      const yy = y(value);
      const best = label === "+ Current";
      return `
      ${best ? `<circle cx="${xx}" cy="${yy}" r="19" fill="${colors.pink}" opacity="0.16"/>` : ""}
      <circle cx="${xx}" cy="${yy}" r="8" fill="${best ? colors.pink : colors.blue}" stroke="${colors.bg}" stroke-width="4"/>
      <text x="${xx}" y="${yy - 18}" fill="${best ? colors.pink : colors.text}" font-size="14" font-weight="700" text-anchor="middle">${value.toFixed(4)}</text>
      <text x="${xx}" y="425" class="label" text-anchor="middle">${label}</text>
      <text x="${xx}" y="448" class="muted" text-anchor="middle">${count} features</text>`;
    })
    .join("\n");

  return `${header(width, height, "ablation-title", "ablation-desc")}
  <title id="ablation-title">LightGBM feature ablation</title>
  <desc id="ablation-desc">Current engineered features produce the highest validation PR-AUC in the ablation study.</desc>
  <text x="44" y="52" class="title">Feature ablation</text>
  <text x="44" y="80" class="subtitle">Fixed LightGBM configuration · validation PR-AUC</text>
  ${grid}
  <polyline points="${polyline}" fill="none" stroke="${colors.blue}" stroke-width="4" stroke-linejoin="round"/>
  ${marks}
  <rect x="668" y="42" width="245" height="42" rx="21" fill="${colors.pink}" opacity="0.14"/>
  <text x="790" y="68" fill="${colors.pink}" font-size="14" font-weight="700" text-anchor="middle">RAW → CURRENT  +0.0168</text>
</svg>`;
}

function mainMetricsChart() {
  const width = 960;
  const height = 430;
  const metrics = [
    ["PR-AUC", 0.61786, colors.pink],
    ["Precision @ 0.5", 0.82504, colors.violet],
    ["Recall @ 0.5", 0.44664, colors.amber],
    ["F1 @ 0.5", 0.57955, colors.green],
  ];

  const rows = metrics
    .map(([label, value, color], index) => {
      const y = 130 + index * 63;
      return `
      <text x="420" y="${y + 17}" class="label">${label}</text>
      <rect x="570" y="${y}" width="285" height="22" rx="11" fill="${colors.track}"/>
      <rect x="570" y="${y}" width="${(value * 285).toFixed(1)}" height="22" rx="11" fill="${color}" opacity="0.88"/>
      <text x="900" y="${y + 17}" class="value" text-anchor="end">${value.toFixed(4)}</text>`;
    })
    .join("\n");

  return `${header(width, height, "metrics-title", "metrics-desc")}
  <title id="metrics-title">Model performance metrics</title>
  <desc id="metrics-desc">The final CatBoost model achieves 0.6179 PR-AUC, 0.9268 ROC-AUC, 82.50 percent precision, 44.66 percent recall, and 0.5796 F1 at threshold 0.5.</desc>
  <text x="44" y="52" class="title">Model performance</text>
  <text x="44" y="80" class="subtitle">CatBoost · final evaluation</text>

  <text x="70" y="145" fill="${colors.blue}" font-size="13" font-weight="700" letter-spacing="1.5">MODEL SCORE</text>
  <text x="70" y="236" fill="${colors.text}" font-size="76" font-weight="750">0.9268</text>
  <text x="70" y="273" class="label">ROC-AUC</text>
  <rect x="70" y="296" width="260" height="8" rx="4" fill="${colors.track}"/>
  <rect x="70" y="296" width="241" height="8" rx="4" fill="${colors.blue}"/>
  <text x="70" y="340" fill="${colors.muted}" font-size="13">PR-AUC 0.6179 · fraud rate 3.48%</text>

  ${rows}
  <text x="900" y="395" fill="${colors.amber}" font-size="12" font-weight="700" text-anchor="end">0.5 THRESHOLD IS DIAGNOSTIC</text>
</svg>`;
}

function confusionMatrixChart() {
  const width = 960;
  const height = 520;

  return `${header(width, height, "matrix-title", "matrix-desc")}
  <title id="matrix-title">Confusion matrix at threshold 0.5</title>
  <desc id="matrix-desc">At threshold 0.5 the model produces 85,206 true negatives, 292 false positives, 1,706 false negatives, and 1,377 true positives.</desc>
  <text x="44" y="52" class="title">Confusion matrix</text>
  <text x="44" y="80" class="subtitle">Threshold 0.5</text>

  <text x="401" y="126" class="muted" text-anchor="middle">PREDICTED LEGITIMATE</text>
  <text x="651" y="126" class="muted" text-anchor="middle">PREDICTED FRAUD</text>
  <text x="250" y="223" class="muted" text-anchor="end">ACTUAL LEGITIMATE</text>
  <text x="250" y="373" class="muted" text-anchor="end">ACTUAL FRAUD</text>

  <rect x="282" y="150" width="238" height="138" rx="20" fill="${colors.blue}" opacity="0.78"/>
  <text x="401" y="220" fill="${colors.text}" font-size="35" font-weight="750" text-anchor="middle">85,206</text>
  <text x="401" y="250" fill="${colors.text}" font-size="12" opacity="0.78" text-anchor="middle">TRUE NEGATIVE</text>

  <rect x="532" y="150" width="238" height="138" rx="20" fill="${colors.amber}" opacity="0.42"/>
  <text x="651" y="220" fill="${colors.text}" font-size="35" font-weight="750" text-anchor="middle">292</text>
  <text x="651" y="250" fill="${colors.text}" font-size="12" opacity="0.78" text-anchor="middle">FALSE POSITIVE</text>

  <rect x="282" y="300" width="238" height="138" rx="20" fill="${colors.violet}" opacity="0.48"/>
  <text x="401" y="370" fill="${colors.text}" font-size="35" font-weight="750" text-anchor="middle">1,706</text>
  <text x="401" y="400" fill="${colors.text}" font-size="12" opacity="0.78" text-anchor="middle">FALSE NEGATIVE</text>

  <rect x="532" y="300" width="238" height="138" rx="20" fill="${colors.pink}" opacity="0.78"/>
  <text x="651" y="370" fill="${colors.text}" font-size="35" font-weight="750" text-anchor="middle">1,377</text>
  <text x="651" y="400" fill="${colors.text}" font-size="12" opacity="0.78" text-anchor="middle">TRUE POSITIVE</text>

</svg>`;
}

function featureImportanceChart() {
  const width = 960;
  const height = 680;
  const left = 265;
  const maxWidth = 620;
  const rows = [
    ["card1", 5.55902],
    ["C13", 4.72252],
    ["C14", 2.65858],
    ["C1", 2.4951],
    ["M5", 2.39346],
    ["P_emaildomain", 2.24977],
    ["relative_day", 2.14283],
    ["V308", 2.04933],
    ["V307", 1.95739],
    ["M6", 1.88984],
    ["addr1", 1.81589],
    ["M4", 1.70566],
  ];
  const max = rows[0][1];

  const bars = rows
    .map(([label, value], index) => {
      const y = 126 + index * 43;
      const barWidth = (value / max) * maxWidth;
      const fill = index < 2 ? colors.pink : index < 6 ? colors.violet : colors.blue;
      return `
      <text x="235" y="${y + 18}" class="label" text-anchor="end">${label}</text>
      <rect x="${left}" y="${y}" width="${maxWidth}" height="24" rx="12" fill="${colors.track}"/>
      <rect x="${left}" y="${y}" width="${barWidth.toFixed(1)}" height="24" rx="12" fill="${fill}" opacity="${Math.max(0.64, 0.96 - index * 0.025).toFixed(2)}"/>
      <text x="910" y="${y + 18}" class="value" text-anchor="end">${value.toFixed(2)}</text>`;
    })
    .join("\n");

  return `${header(width, height, "importance-title", "importance-desc")}
  <title id="importance-title">Top CatBoost feature importances</title>
  <desc id="importance-desc">Card1 and C13 are the two highest-ranked model features.</desc>
  <text x="44" y="52" class="title">What the model uses</text>
  <text x="44" y="80" class="subtitle">Top 12 CatBoost feature importances · predictive, not causal</text>
  ${bars}
</svg>`;
}

write("model-selection.svg", modelSelectionChart());
write("feature-ablation-redrawn.svg", ablationChart());
write("main-metrics.svg", mainMetricsChart());
write("confusion-matrix.svg", confusionMatrixChart());
write("feature-importance-redrawn.svg", featureImportanceChart());

console.log(`Generated five SVG charts in ${outputDir}`);
