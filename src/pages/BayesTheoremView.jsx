import React, { useState } from 'react';
import {
  GitBranch,
  ArrowDown,
  ArrowRight,
  Sparkles,
  Calculator,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCode
} from 'lucide-react';
import { formatPercent } from '../utils/probabilityEngine';

export default function BayesTheoremView({ bayesData, onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);

  const derivationSteps = [
    {
      title: 'Step 1: Identify Prior Probability & Sensitivity',
      math: 'P(Disease) = 0.01  |  P(Positive | Disease) = 0.95',
      explanation: 'Before doing the medical test, a randomly chosen person has only a 1% chance of having the rare illness.'
    },
    {
      title: 'Step 2: Calculate the Joint Probability (Numerator)',
      math: 'P(Positive ∩ Disease) = 0.95 × 0.01 = 0.0095 (0.95%)',
      explanation: 'This represents the proportion of people who both have the disease AND test positive (True Positives).'
    },
    {
      title: 'Step 3: Calculate Total Evidence P(Positive) (Denominator)',
      math: 'P(Pos) = (0.95 × 0.01) + (0.05 × 0.99) = 0.0095 + 0.0495 = 0.0590 (5.90%)',
      explanation: 'Using the Law of Total Probability: positive tests come from sick people (0.95%) plus healthy false alarms (4.95%).'
    },
    {
      title: 'Step 4: Compute Posterior Probability via Bayes Theorem',
      math: 'P(Disease | Positive) = 0.0095 / 0.0590 = 0.161017... ≈ 16.10%',
      explanation: 'Dividing True Positives (95) by Total Positive Tests (590) gives 16.10%. That is our final posterior probability!'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="hero-academic-pill" style={{ marginBottom: '6px' }}>
            <Sparkles size={13} />
            Core Mathematical Theorem
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>
            Bayes' Theorem in Diagnostic Medicine
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            The formal mathematical method to invert conditional probabilities: transforming P(Test | Disease) into P(Disease | Test).
          </p>
        </div>

        <button 
          className="btn-secondary"
          onClick={() => onNavigate('prevalence')}
        >
          Try Prevalence Slider
          <ArrowRight size={16} />
        </button>
      </div>

      {/* 6. PROMINENT FORMULA DISPLAY REQUIRED:
          P(Disease | Positive) = [P(Positive | Disease) × P(Disease)] / P(Positive) */}
      <div className="bayes-formula-display">
        <span style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--purple-light)', fontWeight: 700, display: 'block', marginBottom: '14px' }}>
          Standard Bayesian Formulation
        </span>

        <div className="formula-main-equation">
          <span className="formula-result-pill">P(Disease | Positive)</span>
          <span style={{ color: 'var(--text-muted)' }}>=</span>
          <div className="formula-fraction">
            <span className="formula-numerator">
              P(Positive | Disease) × P(Disease)
            </span>
            <span className="formula-denominator">
              P(Positive)
            </span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>=</span>
          <span style={{ color: 'var(--teal-light)', fontWeight: 800 }}>16.10%</span>
        </div>

        <div style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          Denominator expansion: <span style={{ color: 'var(--purple-light)' }}>P(Positive) = [P(Pos|Disease) × P(Disease)] + [P(Pos|No Disease) × P(No Disease)]</span>
        </div>
      </div>

      {/* 4 VISUAL COMPONENTS BREAKDOWN REQUIRED:
          1. Prior Probability: P(Disease) = 1%
          2. Sensitivity: P(Positive | Disease) = 95%
          3. Evidence: P(Positive) = 5.90%
          4. Posterior Probability: P(Disease | Positive) = 16.10% */}
      <div className="bayes-four-components-grid">
        {/* Component 1: Prior */}
        <div className="bayes-component-card" style={{ borderTop: '3px solid var(--rose-danger)' }}>
          <span className="bayes-component-tag" style={{ background: 'rgba(244, 63, 94, 0.15)', color: 'var(--rose-light)' }}>
            Component 1
          </span>
          <div className="bayes-component-symbol">Prior Probability</div>
          <div className="bayes-component-value" style={{ color: '#fda4af' }}>
            P(Disease) = 1%
          </div>
          <p className="bayes-component-desc">
            Base prevalence rate in the population before test evidence is observed (100 in 10,000).
          </p>
        </div>

        {/* Component 2: Sensitivity */}
        <div className="bayes-component-card" style={{ borderTop: '3px solid var(--teal-primary)' }}>
          <span className="bayes-component-tag" style={{ background: 'rgba(20, 184, 166, 0.15)', color: 'var(--teal-light)' }}>
            Component 2
          </span>
          <div className="bayes-component-symbol">Sensitivity (Likelihood)</div>
          <div className="bayes-component-value" style={{ color: '#5eead4' }}>
            P(Pos | Disease) = 95%
          </div>
          <p className="bayes-component-desc">
            True positive rate: The conditional probability that a diseased individual tests positive.
          </p>
        </div>

        {/* Component 3: Evidence */}
        <div className="bayes-component-card" style={{ borderTop: '3px solid var(--amber-warning)' }}>
          <span className="bayes-component-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--amber-light)' }}>
            Component 3
          </span>
          <div className="bayes-component-symbol">Evidence (Marginal)</div>
          <div className="bayes-component-value" style={{ color: '#fde68a' }}>
            P(Positive) = 5.90%
          </div>
          <p className="bayes-component-desc">
            Total probability of observing a positive test across the entire population (590 in 10,000).
          </p>
        </div>

        {/* Component 4: Posterior */}
        <div className="bayes-component-card" style={{ borderTop: '3px solid var(--purple-primary)' }}>
          <span className="bayes-component-tag" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--purple-light)' }}>
            Component 4
          </span>
          <div className="bayes-component-symbol">Posterior Probability</div>
          <div className="bayes-component-value" style={{ color: '#c7d2fe' }}>
            P(Disease | Pos) = 16.10%
          </div>
          <p className="bayes-component-desc">
            The updated probability of actually having the disease after receiving a positive test result!
          </p>
        </div>
      </div>

      {/* ANIMATED VISUAL FLOW REQUIRED:
          Prior ↓ Evidence ↓ Bayes Theorem ↓ Posterior */}
      <div className="section-card" style={{ marginBottom: '28px' }}>
        <div className="section-card-header">
          <div>
            <h3 className="section-card-title">
              <GitBranch size={18} style={{ color: 'var(--teal-light)' }} />
              Sequential Probability Flow Diagram
            </h3>
            <p className="section-card-subtitle">
              Prior ↓ Evidence ↓ Bayes Theorem ↓ Posterior
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', padding: '16px 0' }}>
          {/* Node 1: Prior */}
          <div style={{
            width: '100%',
            maxWidth: '520px',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--rose-light)', fontWeight: 700 }}>Prior State</span>
              <h4 style={{ fontSize: '15px', color: 'var(--text-primary)' }}>P(Disease) = 1.00%</h4>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Initial belief (Prevalence)</span>
          </div>

          {/* Arrow */}
          <div style={{ color: 'var(--teal-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowDown size={22} />
          </div>

          {/* Node 2: Evidence */}
          <div style={{
            width: '100%',
            maxWidth: '520px',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--amber-light)', fontWeight: 700 }}>Test Evidence</span>
              <h4 style={{ fontSize: '15px', color: 'var(--text-primary)' }}>P(Positive) = 5.90% Evidence Observed</h4>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sensitivity 95%, Specificity 95%</span>
          </div>

          {/* Arrow */}
          <div style={{ color: 'var(--teal-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowDown size={22} />
          </div>

          {/* Node 3: Bayes Theorem */}
          <div style={{
            width: '100%',
            maxWidth: '520px',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(20, 184, 166, 0.15)',
            border: '1px solid rgba(45, 212, 191, 0.4)',
            boxShadow: '0 0 20px rgba(45, 212, 191, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--teal-light)', fontWeight: 700 }}>Inversion Engine</span>
              <h4 style={{ fontSize: '15px', color: '#5eead4' }}>Bayes' Theorem Inversion: 0.0095 ÷ 0.0590</h4>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--teal-light)', fontWeight: 600 }}>Calculates PPV</span>
          </div>

          {/* Arrow */}
          <div style={{ color: 'var(--purple-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowDown size={22} />
          </div>

          {/* Node 4: Posterior */}
          <div style={{
            width: '100%',
            maxWidth: '520px',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(139, 92, 246, 0.18)',
            border: '1px solid rgba(139, 92, 246, 0.45)',
            boxShadow: '0 0 25px rgba(139, 92, 246, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--purple-light)', fontWeight: 700 }}>Posterior Probability</span>
              <h4 style={{ fontSize: '16px', color: '#f8fafc', fontWeight: 800 }}>P(Disease | Positive) = 16.10%</h4>
            </div>
            <span className="status-pill" style={{ background: 'rgba(139, 92, 246, 0.3)', color: '#e0e7ff' }}>Updated Belief</span>
          </div>
        </div>
      </div>

      {/* LARGE HIGHLIGHT RESULT CARD REQUIRED:
          “Probability of Disease After a Positive Test”
          16.10%
          “Based on the simulated dataset and selected probability assumptions.” */}
      <div className="bayes-highlight-result-card">
        <span className="edu-badge" style={{ marginBottom: '4px' }}>
          Primary Project Finding
        </span>
        <h3 className="bayes-highlight-title">
          Probability of Disease After a Positive Test
        </h3>
        <div className="bayes-highlight-big-number">
          16.10%
        </div>
        <p className="bayes-highlight-subtext">
          Based on the simulated dataset and selected probability assumptions.
          Even with a 95% accurate test, an individual receiving a positive result has approximately a 1-in-6 chance of actually having the rare disease.
        </p>
      </div>

      {/* Step-by-Step Mathematical Derivation Stepper */}
      <div className="section-card">
        <div className="section-card-header">
          <div>
            <h3 className="section-card-title">
              <Calculator size={18} style={{ color: 'var(--teal-light)' }} />
              Step-by-Step Derivation Walkthrough
            </h3>
            <p className="section-card-subtitle">Click each step to follow the rigorous algebraic derivation</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {derivationSteps.map((step, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                background: activeStep === idx ? 'rgba(20, 184, 166, 0.12)' : 'rgba(255,255,255,0.02)',
                border: activeStep === idx ? '1px solid rgba(45, 212, 191, 0.4)' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: activeStep === idx ? 'var(--teal-light)' : 'var(--text-primary)' }}>
                  {step.title}
                </span>
                <span style={{ 
                  fontSize: '11px', 
                  fontFamily: 'var(--font-mono)', 
                  padding: '2px 8px', 
                  borderRadius: 'var(--radius-sm)',
                  background: activeStep === idx ? 'var(--teal-primary)' : 'rgba(255,255,255,0.06)',
                  color: activeStep === idx ? '#080c14' : 'var(--text-muted)',
                  fontWeight: 700
                }}>
                  Step 0{idx + 1}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#38bdf8', marginBottom: '6px' }}>
                {step.math}
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>
                {step.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
