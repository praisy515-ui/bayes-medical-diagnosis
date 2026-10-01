# Application of Bayes’ Theorem in Medical Diagnosis Using Python and Pandas

> **Educational & Simulated Data Project**  
> An interactive, presentation-ready probability and medical data analytics web application demonstrating the mathematical mechanisms of Bayes' Theorem, conditional probability inversion, and the base-rate effect across a simulated cohort of 10,000 individuals.

---

## 🔬 Project Overview

- **Project Title:** *Application of Bayes’ Theorem in Medical Diagnosis Using Python and Pandas*
- **Purpose:** Academic demonstration of probability theory, conditional probability, the Law of Total Probability, and Bayes' Theorem.
- **Core Problem:** When a diagnostic test has **95% Sensitivity** and **95% Specificity**, why does a patient receiving a positive result in a low-prevalence population (1% base rate) only have a **16.10%** probability of actually having the disease?

---

## 🛠️ Technology Stack

- **Frontend Application:** React 19 + Vite 8
- **Styling:** Custom Vanilla CSS Design System (No Tailwind CSS)
  - Dark/Navy medical analytics theme (`#080c14`, `#111a2e`, soft teal `#14b8a6`, emerald green `#10b981`, purple accents `#8b5cf6`)
  - Glassmorphic panels, glowing accents, smooth micro-interactions, responsive grid
- **Charts & Visualizations:** Recharts (Line Charts, Radial Gauges, Donut & Bar distributions)
- **Iconography:** Lucide React
- **Data Science Modeling:** Python, Pandas, NumPy, Matplotlib, Google Colab

---

## 🧮 Mathematical Formulation & Default Baseline

For a population of $N = 10,000$:

| Parameter | Notation | Probability | Simulated Count |
| :--- | :--- | :--- | :--- |
| **Disease Prevalence (Prior)** | $P(\text{Disease})$ | **1.00%** | **100 people** |
| **Healthy Base Rate** | $P(\text{No Disease})$ | **99.00%** | **9,900 people** |
| **Sensitivity (Recall)** | $P(+ \mid \text{Disease})$ | **95.00%** | True Positives (TP) = **95** |
| **False Negative Rate** | $P(- \mid \text{Disease})$ | **5.00%** | False Negatives (FN) = **5** |
| **Specificity** | $P(- \mid \text{No Disease})$ | **95.00%** | True Negatives (TN) = **9,405** |
| **False Positive Rate** | $P(+ \mid \text{No Disease})$ | **5.00%** | False Positives (FP) = **495** |

### Law of Total Probability (Evidence $P(+$)):
$$P(+) = [P(+ \mid \text{Disease}) \times P(\text{Disease})] + [P(+ \mid \text{No Disease}) \times P(\text{No Disease})]$$
$$P(+) = [0.95 \times 0.01] + [0.05 \times 0.99] = 0.0095 + 0.0495 = 0.0590 \quad (5.90\% = 590 \text{ people})$$

### Bayes’ Theorem (Posterior $P(\text{Disease} \mid +)$):
$$P(\text{Disease} \mid +) = \frac{P(+ \mid \text{Disease}) \times P(\text{Disease})}{P(+)} = \frac{0.0095}{0.0590} \approx \mathbf{16.10\%}$$

---

## 📊 Application Structure & Pages

1. **Dashboard Home:** Hero section with visual flow (`Prior → Medical Test → Bayes' Theorem → Posterior`), 4 key metric cards (10,000 Total People, 100 Disease Cases, 590 Positive Tests, 16.10% P(D|+)), 10,000 cohort distribution donut chart, and positive test anatomy.
2. **Dataset (10,000 Observations):** Full 10,000 patient tabular view with columns: Patient ID, Disease Status, Test Result, Diagnostic Category (TP, FP, FN, TN), Age, Gender, and Symptom Indicator. Features instant search, status filters, pagination controls, CSV export, and Python generator code.
3. **Probability Analysis:** Marginal and conditional probabilities, $P(D)=1\%$, $P(\sim D)=99\%$, $P(+)=5.9\%$, $P(-)=94.1\%$, distribution charts, and the Law of Total Probability breakdown.
4. **Bayes Theorem:** Highlight view featuring the prominent mathematical formula, 4 component breakdown (Prior, Sensitivity, Evidence, Posterior), sequential flow diagram, large 16.10% result card, and step-by-step algebraic derivation stepper.
5. **Confusion Matrix (2×2):** Interactive contingency matrix ($TP=95, FN=5, FP=495, TN=9,405$) with row/column margins and distinct quadrant styling and explanations.
6. **Performance Metrics:** Accuracy (95%), Sensitivity (95%), Specificity (95%), PPV (16.10%), NPV (99.95%), and FPR (5.00%) with radial progress ring visualizations and educational disclaimers.
7. **Prevalence Analysis:** Dynamic interactive slider for Disease Prevalence (0.5% – 50%) recalculating $P(\text{Disease} \mid +)$ in real-time, benchmark matrix (1%, 5%, 10%, 20%, 30%, 50%), and Recharts trend curve.
8. **False Positive Analysis:** Dynamic interactive slider for False Positive Rate (0.5% – 15%), demonstrating the PPV collapse curve and comparing 3 clinical test scenarios.
9. **Insights & Findings:** Four primary analytical takeaways (Rare Disease Effect, Importance of Prior, False Positives Matter, Data-Driven Probability with Pandas) and an interactive "Test Your Intuition" audience quiz widget.
10. **About Project:** Project syllabus, technologies (Python, Pandas, NumPy, Matplotlib, Google Colab, React, Vite), and full copyable Python simulation script.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start the development server
npm run dev

# 3. Open browser at
http://localhost:5173/
```

To build for production:
```bash
npm run build
npm run preview
```
