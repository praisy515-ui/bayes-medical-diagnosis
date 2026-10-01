import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Target,
  Sparkles,
  AlertTriangle,
  Info,
  Scale
} from 'lucide-react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer
} from 'recharts';
import { formatPercent } from '../utils/probabilityEngine';

export default function PerformanceMetricsView({ bayesData }) {
  const { metrics, cohort } = bayesData;

  const metricCards = [
    {
      id: 'accuracy',
      name: 'Accuracy',
      value: 0.95,
      percentStr: '95.00%',
      formula: '(TP + TN) / Total',
      calcStr: `(${cohort.truePositives} + ${cohort.trueNegatives}) / 10,000 = 9,500 / 10,000`,
      color: '#10b981',
      description: 'Overall proportion of correct classifications (both sick and healthy) across the entire simulated population.'
    },
    {
      id: 'sensitivity',
      name: 'Sensitivity (Recall)',
      value: 0.95,
      percentStr: '95.00%',
      formula: 'TP / (TP + FN)',
      calcStr: `${cohort.truePositives} / (${cohort.truePositives} + ${cohort.falseNegatives}) = 95 / 100`,
      color: '#2dd4bf',
      description: 'The probability that a sick individual receives a positive test result. High sensitivity minimizes missed cases.'
    },
    {
      id: 'specificity',
      name: 'Specificity',
      value: 0.95,
      percentStr: '95.00%',
      formula: 'TN / (TN + FP)',
      calcStr: `${cohort.trueNegatives} / (${cohort.trueNegatives} + ${cohort.falsePositives}) = 9,405 / 9,900`,
      color: '#6366f1',
      description: 'The probability that a healthy individual receives a negative test result. High specificity minimizes false alarms.'
    },
    {
      id: 'ppv',
      name: 'Positive Predictive Value (PPV)',
      value: 0.1610,
      percentStr: '16.10%',
      formula: 'TP / (TP + FP) [Bayes Posterior]',
      calcStr: `${cohort.truePositives} / (${cohort.truePositives} + ${cohort.falsePositives}) = 95 / 590`,
      color: '#f59e0b',
      isHighlight: true,
      description: 'The actual probability that an individual with a positive test result truly has the disease. Strongly suppressed by low prevalence!'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
          Diagnostic Performance Metrics
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Comprehensive statistical evaluation comparing intrinsic test metrics (Sensitivity, Specificity) against clinical predictive value (PPV).
        </p>
      </div>

      {/* CRITICAL EDUCATIONAL DISCLAIMER REQUIRED:
          "Important: Do not imply that these values represent the performance of a real medical test." */}
      <div 
        style={{
          display: 'flex',
          gap: '14px',
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          marginBottom: '28px'
        }}
      >
        <AlertTriangle size={22} style={{ color: 'var(--amber-light)', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '13px', color: '#fef08a', lineHeight: 1.5 }}>
          <strong>Educational Probability Notice:</strong> The performance metrics displayed below are computed strictly from synthetic probability models and simulated Python/Pandas datasets for classroom demonstration. 
          <strong> Do not imply or assume that these values represent the performance of any real-world medical diagnostic test or clinical diagnostic protocol.</strong>
        </div>
      </div>

      {/* 8. FOUR MAIN METRIC CARDS REQUIRED:
          Accuracy = 95%
          Sensitivity = 95%
          Specificity = 95%
          Positive Predictive Value = 16.10% */}
      <div className="grid-2col" style={{ marginBottom: '28px' }}>
        {metricCards.map((m) => (
          <div 
            key={m.id}
            className="section-card"
            style={{
              borderTop: `4px solid ${m.color}`,
              background: m.isHighlight ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, var(--bg-card) 70%)' : 'var(--bg-card)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: m.color, letterSpacing: '0.5px' }}>
                  {m.isHighlight ? 'Bayesian Posterior' : 'Diagnostic Metric'}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>
                  {m.name}
                </h3>
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: 900,
                fontFamily: 'var(--font-mono)',
                color: m.color
              }}>
                {m.percentStr}
              </div>
            </div>

            {/* Visual Ring / Gauge & Formula */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px 0' }}>
              {/* Radial gauge */}
              <div style={{ width: '85px', height: '85px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="75%"
                    outerRadius="100%"
                    data={[{ value: m.value * 100 }]}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                      background={{ fill: 'rgba(255,255,255,0.06)' }}
                      dataKey="value"
                      cornerRadius={6}
                      fill={m.color}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)'
                }}>
                  {Math.round(m.value * 100)}%
                </div>
              </div>

              {/* Formula & Computation */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Formula
                </div>
                <div style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.03)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-primary)'
                }}>
                  {m.formula}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {m.calcStr}
                </div>
              </div>
            </div>

            {/* Short Explanation */}
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
              {m.description}
            </p>
          </div>
        ))}
      </div>

      {/* Auxiliary Metrics: NPV & FPR */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '18px'
        }}
      >
        <div style={{ padding: '18px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>Negative Predictive Value (NPV)</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--teal-light)', fontSize: '16px' }}>
              99.95%
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Probability that a patient with a negative test truly does not have the disease (TN / (TN + FN) = 9,405 / 9,410).
          </p>
        </div>

        <div style={{ padding: '18px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>False Positive Rate (FPR / Type I Error)</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--amber-light)', fontSize: '16px' }}>
              5.00%
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Probability that a healthy person tests positive (1 - Specificity = 495 / 9,900 = 5.00%).
          </p>
        </div>
      </div>
    </div>
  );
}
