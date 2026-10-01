// probabilityEngine.js
// Core mathematical engine for Bayes' Theorem & Medical Diagnosis Simulation

/**
 * Calculates Bayes' Theorem and full diagnostic metrics
 * @param {number} prevalence - P(Disease), e.g. 0.01 (1%)
 * @param {number} sensitivity - P(Positive | Disease), e.g. 0.95 (95%)
 * @param {number} specificity - P(Negative | No Disease), e.g. 0.95 (95%)
 * @param {number} totalPopulation - Cohort size, default 10,000
 */
export function calculateBayes(prevalence = 0.01, sensitivity = 0.95, specificity = 0.95, totalPopulation = 10000) {
  const pDisease = Math.max(0.0001, Math.min(0.9999, prevalence));
  const pNoDisease = 1 - pDisease;

  const pPosGivenDisease = Math.max(0.0001, Math.min(1, sensitivity)); // Sensitivity / Recall
  const pNegGivenDisease = 1 - pPosGivenDisease; // False Negative Rate (FNR)

  const pNegGivenNoDisease = Math.max(0.0001, Math.min(1, specificity)); // Specificity
  const pPosGivenNoDisease = 1 - pNegGivenNoDisease; // False Positive Rate (FPR)

  // Law of Total Probability: P(Positive) = P(+|D)*P(D) + P(+|~D)*P(~D)
  const pTruePosJoint = pPosGivenDisease * pDisease;
  const pFalsePosJoint = pPosGivenNoDisease * pNoDisease;
  const pPositive = pTruePosJoint + pFalsePosJoint;

  // Law of Total Probability: P(Negative) = P(-|D)*P(D) + P(-|~D)*P(~D)
  const pFalseNegJoint = pNegGivenDisease * pDisease;
  const pTrueNegJoint = pNegGivenNoDisease * pNoDisease;
  const pNegative = pFalseNegJoint + pTrueNegJoint;

  // Bayes' Theorem: P(Disease | Positive) = [P(+|D) * P(D)] / P(+)
  const posteriorPositive = pPositive > 0 ? pTruePosJoint / pPositive : 0;

  // Bayes' Theorem for negative result: P(No Disease | Negative) = [P(-|~D) * P(~D)] / P(-)
  const posteriorNegative = pNegative > 0 ? pTrueNegJoint / pNegative : 0;

  // Cohort breakdown for the population (e.g. 10,000)
  const actualDisease = Math.round(totalPopulation * pDisease);
  const actualNoDisease = totalPopulation - actualDisease;

  const truePositives = Math.round(actualDisease * pPosGivenDisease);
  const falseNegatives = actualDisease - truePositives;

  const falsePositives = Math.round(actualNoDisease * pPosGivenNoDisease);
  const trueNegatives = actualNoDisease - falsePositives;

  const positiveTests = truePositives + falsePositives;
  const negativeTests = falseNegatives + trueNegatives;

  const accuracy = (truePositives + trueNegatives) / totalPopulation;
  const ppv = positiveTests > 0 ? truePositives / positiveTests : 0;
  const npv = negativeTests > 0 ? trueNegatives / negativeTests : 0;

  return {
    totalPopulation,
    pDisease,
    pNoDisease,
    sensitivity: pPosGivenDisease,
    fnr: pNegGivenDisease,
    specificity: pNegGivenNoDisease,
    fpr: pPosGivenNoDisease,
    pPositive,
    pNegative,
    pTruePosJoint,
    pFalsePosJoint,
    posteriorPositive, // P(Disease | Positive)
    posteriorNegative, // P(No Disease | Negative)
    cohort: {
      actualDisease,
      actualNoDisease,
      truePositives,
      falseNegatives,
      falsePositives,
      trueNegatives,
      positiveTests,
      negativeTests
    },
    metrics: {
      accuracy,
      sensitivity: pPosGivenDisease,
      specificity: pNegGivenNoDisease,
      ppv,
      npv,
      fpr: pPosGivenNoDisease
    }
  };
}

// Generate the canonical baseline dataset: 10,000 observations matching project specifications
// TP = 95, FN = 5, FP = 495, TN = 9405
export function generateSimulatedDataset() {
  const records = [];
  let idCounter = 1;

  const genders = ['Male', 'Female'];
  const ageDist = () => Math.floor(20 + Math.random() * 55);

  // 1. True Positives (95)
  for (let i = 0; i < 95; i++) {
    records.push({
      id: `PAT-${String(idCounter++).padStart(5, '0')}`,
      diseaseStatus: 'Disease',
      testResult: 'Positive',
      category: 'True Positive',
      categoryShort: 'TP',
      age: ageDist(),
      gender: genders[i % 2],
      symptomScore: (6.5 + Math.random() * 3.5).toFixed(1)
    });
  }

  // 2. False Negatives (5)
  for (let i = 0; i < 5; i++) {
    records.push({
      id: `PAT-${String(idCounter++).padStart(5, '0')}`,
      diseaseStatus: 'Disease',
      testResult: 'Negative',
      category: 'False Negative',
      categoryShort: 'FN',
      age: ageDist(),
      gender: genders[i % 2],
      symptomScore: (5.0 + Math.random() * 3.0).toFixed(1)
    });
  }

  // 3. False Positives (495)
  for (let i = 0; i < 495; i++) {
    records.push({
      id: `PAT-${String(idCounter++).padStart(5, '0')}`,
      diseaseStatus: 'No Disease',
      testResult: 'Positive',
      category: 'False Positive',
      categoryShort: 'FP',
      age: ageDist(),
      gender: genders[i % 2],
      symptomScore: (2.0 + Math.random() * 4.0).toFixed(1)
    });
  }

  // 4. True Negatives (9405)
  for (let i = 0; i < 9405; i++) {
    records.push({
      id: `PAT-${String(idCounter++).padStart(5, '0')}`,
      diseaseStatus: 'No Disease',
      testResult: 'Negative',
      category: 'True Negative',
      categoryShort: 'TN',
      age: ageDist(),
      gender: genders[i % 2],
      symptomScore: (1.0 + Math.random() * 3.0).toFixed(1)
    });
  }

  return records;
}

// Generate prevalence progression curve data for the line chart
export function generatePrevalenceCurve(sensitivity = 0.95, specificity = 0.95) {
  const points = [0.005, 0.01, 0.02, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50];
  return points.map(prev => {
    const res = calculateBayes(prev, sensitivity, specificity);
    return {
      prevalence: prev * 100, // percentage e.g. 1%, 5%, 10%
      prevalenceLabel: `${(prev * 100).toFixed(1)}%`,
      posterior: Number((res.posteriorPositive * 100).toFixed(2)),
      pPositive: Number((res.pPositive * 100).toFixed(2))
    };
  });
}

// Generate False Positive Rate progression curve
export function generateFPRCurve(prevalence = 0.01, sensitivity = 0.95) {
  const fprs = [0.01, 0.02, 0.03, 0.05, 0.07, 0.10, 0.12, 0.15, 0.20];
  return fprs.map(fpr => {
    const specificity = 1 - fpr;
    const res = calculateBayes(prevalence, sensitivity, specificity);
    return {
      fpr: fpr * 100,
      fprLabel: `${(fpr * 100).toFixed(1)}%`,
      ppv: Number((res.posteriorPositive * 100).toFixed(2)),
      fpCount: res.cohort.falsePositives,
      totalPositives: res.cohort.positiveTests
    };
  });
}

// Format number with commas
export function formatNum(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

// Format percentage with 2 decimals
export function formatPercent(val, decimals = 2) {
  return `${(val * 100).toFixed(decimals)}%`;
}

// Python & Pandas code snippet that generates and calculates this exact problem
export const PYTHON_PANDAS_CODE = `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# ---------------------------------------------------------
# Application of Bayes' Theorem in Medical Diagnosis
# Simulated Population of 10,000 individuals
# ---------------------------------------------------------

# Parameters
POPULATION = 10000
PREVALENCE = 0.01      # P(Disease) = 1%
SENSITIVITY = 0.95     # P(Positive | Disease) = 95%
SPECIFICITY = 0.95     # P(Negative | No Disease) = 95%
FPR = 1 - SPECIFICITY  # P(Positive | No Disease) = 5%

# 1. Simulate Disease Distribution
np.random.seed(42)
has_disease = np.random.binomial(1, PREVALENCE, POPULATION)

# 2. Simulate Medical Test Results
test_results = np.zeros(POPULATION, dtype=int)
for i in range(POPULATION):
    if has_disease[i] == 1:
        # If diseased, test is positive with probability = Sensitivity
        test_results[i] = np.random.binomial(1, SENSITIVITY)
    else:
        # If healthy, test is positive with probability = FPR
        test_results[i] = np.random.binomial(1, FPR)

# 3. Create Pandas DataFrame
df = pd.DataFrame({
    'Patient_ID': [f'PAT-{i+1:05d}' for i in range(POPULATION)],
    'Disease_Status': np.where(has_disease == 1, 'Disease', 'No Disease'),
    'Test_Result': np.where(test_results == 1, 'Positive', 'Negative')
})

# 4. Compute Confusion Matrix via Pandas Crosstab
confusion_matrix = pd.crosstab(
    df['Disease_Status'], 
    df['Test_Result'], 
    margins=True, 
    margins_name='Total'
)
print("=== Confusion Matrix (Simulated 10,000) ===")
print(confusion_matrix)

# 5. Apply Bayes' Theorem Analytically
# P(Disease | Positive) = [P(Pos|Disease) * P(Disease)] / P(Pos)
p_pos = (SENSITIVITY * PREVALENCE) + (FPR * (1 - PREVALENCE))
posterior_bayes = (SENSITIVITY * PREVALENCE) / p_pos

print(f"\\nP(Positive Test) Evidence: {p_pos * 100:.2f}%")
print(f"P(Disease | Positive) Posterior: {posterior_bayes * 100:.2f}%")
`;
