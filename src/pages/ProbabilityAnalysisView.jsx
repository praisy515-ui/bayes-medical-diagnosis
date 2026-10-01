import React from 'react';
import {
  Calculator,
  Percent,
  Activity,
  Layers,
  HelpCircle,
  CheckCircle,
  PieChart as PieIcon,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { formatNum, formatPercent } from '../utils/probabilityEngine';

export default function ProbabilityAnalysisView({ bayesData }) {
  const { pDisease, pNoDisease, pPositive, pNegative, sensitivity, fpr, specificity } = bayesData;

  // Comparison distribution data
  const basicProbData = [
    { name: 'P(Disease)', percentage: pDisease * 100, count: 100, color: '#f43f5e' },
    { name: 'P(No Disease)', percentage: pNoDisease * 100, count: 9900, color: '#10b981' },
    { name: 'P(Positive Test)', percentage: pPositive * 100, count: 590, color: '#f59e0b' },
    { name: 'P(Negative Test)', percentage: pNegative * 100, count: 9410, color: '#2dd4bf' }
  ];

  // Joint probability composition for Law of Total Probability
  const lawOfTotalData = [
    {
      name: 'True Positives (Joint)',
      description: 'P(+ ∩ Disease) = P(+|D) × P(D) = 0.95 × 0.01',
      value: 0.95, // 0.95%
      count: 95,
      color: '#10b981'
    },
    {
      name: 'False Positives (Joint)',
      description: 'P(+ ∩ No Disease) = P(+|~D) × P(~D) = 0.05 × 0.99',
      value: 4.95, // 4.95%
      count: 495,
      color: '#f59e0b'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header Intro */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>
          Foundational Probability Concepts
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Understanding basic marginal, conditional, and joint probabilities before applying Bayes' Theorem.
        </p>
      </div>

      {/* 4 BASIC PROBABILITY CARDS REQUIRED:
          P(Disease), P(No Disease), P(Positive), P(Negative) */}
      <div className="metric-cards-grid" style={{ marginBottom: '28px' }}>
        {/* Card 1: P(Disease) */}
        <div className="metric-card accent-rose">
          <div className="metric-card-header">
            <span className="metric-card-label">P(Disease)</span>
            <div className="metric-card-icon-box icon-rose">
              <Activity size={20} />
            </div>
          </div>
          <div className="metric-card-value" style={{ color: '#fda4af' }}>
            {formatPercent(pDisease)}
          </div>
          <div className="metric-card-subtext">
            <span>Prior Disease Prevalence (100 / 10,000)</span>
          </div>
        </div>

        {/* Card 2: P(No Disease) */}
        <div className="metric-card accent-teal">
          <div className="metric-card-header">
            <span className="metric-card-label">P(No Disease)</span>
            <div className="metric-card-icon-box icon-teal">
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="metric-card-value" style={{ color: '#5eead4' }}>
            {formatPercent(pNoDisease)}
          </div>
          <div className="metric-card-subtext">
            <span>Complement: 1 - P(Disease) (9,900 / 10,000)</span>
          </div>
        </div>

        {/* Card 3: P(Positive) */}
        <div className="metric-card accent-amber">
          <div className="metric-card-header">
            <span className="metric-card-label">P(Positive)</span>
            <div className="metric-card-icon-box icon-amber">
              <Percent size={20} />
            </div>
          </div>
          <div className="metric-card-value" style={{ color: '#fde68a' }}>
            {formatPercent(pPositive)}
          </div>
          <div className="metric-card-subtext">
            <span>Evidence / Marginal Positives (590 / 10,000)</span>
          </div>
        </div>

        {/* Card 4: P(Negative) */}
        <div className="metric-card accent-purple">
          <div className="metric-card-header">
            <span className="metric-card-label">P(Negative)</span>
            <div className="metric-card-icon-box icon-purple">
              <Layers size={20} />
            </div>
          </div>
          <div className="metric-card-value" style={{ color: '#c7d2fe' }}>
            {formatPercent(pNegative)}
          </div>
          <div className="metric-card-subtext">
            <span>Complement: 1 - P(Positive) (9,410 / 10,000)</span>
          </div>
        </div>
      </div>

      {/* CORE PARAMETERS DISPLAY REQUIRED:
          Disease prevalence = 1%
          Sensitivity = 95%
          False Positive Rate = 5% */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '18px',
          marginBottom: '28px'
        }}
      >
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderTop: '3px solid var(--rose-danger)'
        }}>
          <span style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--rose-light)', fontWeight: 700 }}>
            Base Parameter
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-mono)', margin: '8px 0 4px', color: 'var(--text-primary)' }}>
            Disease prevalence = 1%
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            The baseline prior probability before administering any clinical tests.
          </p>
        </div>

        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderTop: '3px solid var(--teal-primary)'
        }}>
          <span style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--teal-light)', fontWeight: 700 }}>
            Test Performance
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-mono)', margin: '8px 0 4px', color: 'var(--text-primary)' }}>
            Sensitivity = 95%
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            True Positive Rate: P(Positive | Disease). The test detects 95 out of 100 sick patients.
          </p>
        </div>

        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderTop: '3px solid var(--amber-warning)'
        }}>
          <span style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--amber-light)', fontWeight: 700 }}>
            Error Parameter
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-mono)', margin: '8px 0 4px', color: 'var(--text-primary)' }}>
            False Positive Rate = 5%
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Type I Error: P(Positive | No Disease) = 1 - Specificity. 5% of healthy people test positive.
          </p>
        </div>
      </div>

      {/* PROBABILITY DISTRIBUTION CHART & LAW OF TOTAL PROBABILITY */}
      <div className="grid-2col">
        {/* Left Column: Bar Chart of Key Probabilities */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">
                <BarChart2 size={18} style={{ color: 'var(--teal-light)' }} />
                Probability Distribution Breakdown
              </h3>
              <p className="section-card-subtitle">Comparing prior vs evidence outcome probabilities</p>
            </div>
          </div>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={basicProbData}
                margin={{ top: 20, right: 20, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-muted)" 
                  fontSize={12}
                  interval={0}
                />
                <YAxis 
                  stroke="var(--text-muted)" 
                  fontSize={12} 
                  unit="%" 
                  domain={[0, 100]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="custom-chart-tooltip">
                          <div className="tooltip-title">{data.name}</div>
                          <div className="tooltip-item">
                            <span>Probability:</span>
                            <span className="tooltip-value">{data.percentage.toFixed(2)}%</span>
                          </div>
                          <div className="tooltip-item">
                            <span>Count (10k cohort):</span>
                            <span className="tooltip-value">{formatNum(data.count)} people</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                  {basicProbData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Law of Total Probability Derivation */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">
                <Layers size={18} style={{ color: 'var(--purple-light)' }} />
                Law of Total Probability in P(Positive)
              </h3>
              <p className="section-card-subtitle">How the denominator of Bayes' formula is constructed</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13.5px',
              lineHeight: 1.6
            }}>
              <div style={{ color: 'var(--teal-light)', marginBottom: '8px', fontWeight: 700 }}>
                P(Positive) = P(Pos ∩ Disease) + P(Pos ∩ No Disease)
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                = [P(Pos|Disease) × P(Disease)] + [P(Pos|No Disease) × P(No Disease)]
              </div>
              <div style={{ color: 'var(--text-primary)', marginTop: '8px' }}>
                = [0.95 × 0.01] + [0.05 × 0.99]
              </div>
              <div style={{ color: 'var(--purple-light)', marginTop: '4px', fontWeight: 700 }}>
                = 0.0095 + 0.0495 = 0.0590 (5.90%)
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {lawOfTotalData.map(item => (
                <div 
                  key={item.name}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: `4px solid ${item.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: item.color }}>
                      {item.value.toFixed(2)}% ({item.count} people)
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
