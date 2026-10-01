import React from 'react';
import {
  Users,
  AlertCircle,
  FlaskConical,
  GitBranch,
  ArrowRight,
  TrendingUp,
  Database,
  CheckCircle,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { formatNum, formatPercent } from '../utils/probabilityEngine';

export default function DashboardView({ onNavigate, bayesData }) {
  const { cohort, metrics } = bayesData;

  // Data for outcome distribution donut
  const testDistributionData = [
    { name: 'True Negative (Healthy, Test -)', value: cohort.trueNegatives, color: '#6366f1' },
    { name: 'False Positive (Healthy, Test +)', value: cohort.falsePositives, color: '#f59e0b' },
    { name: 'True Positive (Sick, Test +)', value: cohort.truePositives, color: '#10b981' },
    { name: 'False Negative (Sick, Test -)', value: cohort.falseNegatives, color: '#f43f5e' }
  ];

  // Data for positive test composition bar chart
  const positiveBreakdownData = [
    {
      name: 'Positive Tests (590)',
      'True Positives (Actually Sick)': cohort.truePositives,
      'False Positives (Actually Healthy)': cohort.falsePositives
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* 3. DASHBOARD HERO SECTION */}
      <section className="hero-card">
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="hero-academic-pill">
              <Sparkles size={13} />
              Probability & Data Science Lab
            </span>
            <span className="edu-badge">
              <span className="edu-badge-pulse" />
              Educational / Simulated Data
            </span>
          </div>

          <div>
            <h1 className="hero-title">
              Bayes Theorem Medical Diagnosis Analyzer
            </h1>
            <p className="hero-subtitle">
              Explore how probability changes when medical test evidence is introduced.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button 
              className="btn-primary"
              onClick={() => onNavigate('bayes')}
            >
              Explore Analysis
              <ArrowRight size={17} />
            </button>
            <button 
              className="btn-secondary"
              onClick={() => onNavigate('dataset')}
            >
              <Database size={17} />
              View Dataset (10,000)
            </button>
          </div>

          {/* Small Visual Flow:
              PRIOR PROBABILITY → MEDICAL TEST → BAYES’ THEOREM → POSTERIOR PROBABILITY */}
          <div className="visual-flow-card">
            <div className="flow-steps-grid">
              {/* Step 1 */}
              <div className="flow-step-item">
                <span className="flow-step-number">Step 01</span>
                <span className="flow-step-title">PRIOR PROBABILITY</span>
                <p className="flow-step-desc">
                  Baseline disease prevalence in population before testing: <strong>P(Disease) = 1.00%</strong>
                </p>
                <div className="flow-connector-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>

              {/* Step 2 */}
              <div className="flow-step-item">
                <span className="flow-step-number">Step 02</span>
                <span className="flow-step-title">MEDICAL TEST</span>
                <p className="flow-step-desc">
                  Laboratory test evidence: <strong>95% Sensitivity</strong> & <strong>95% Specificity</strong>
                </p>
                <div className="flow-connector-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>

              {/* Step 3 */}
              <div className="flow-step-item">
                <span className="flow-step-number">Step 03</span>
                <span className="flow-step-title">BAYES’ THEOREM</span>
                <p className="flow-step-desc">
                  Mathematically inverts conditional probabilities via the Law of Total Probability.
                </p>
                <div className="flow-connector-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>

              {/* Step 4 */}
              <div className="flow-step-item" style={{ borderLeft: '2px solid var(--teal-light)' }}>
                <span className="flow-step-number" style={{ color: 'var(--teal-light)' }}>Step 04</span>
                <span className="flow-step-title" style={{ color: '#5eead4' }}>POSTERIOR PROBABILITY</span>
                <p className="flow-step-desc">
                  Updated probability given positive result: <strong>P(Disease | Positive) = 16.10%</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC CARDS REQUIRED:
          Total People: 10,000
          Disease Cases: 100
          Positive Tests: 590
          P(Disease | Positive): 16.10% */}
      <section className="metric-cards-grid">
        {/* Card 1 */}
        <div className="metric-card accent-teal">
          <div className="metric-card-header">
            <span className="metric-card-label">Total People</span>
            <div className="metric-card-icon-box icon-teal">
              <Users size={20} />
            </div>
          </div>
          <div className="metric-card-value">{formatNum(bayesData.totalPopulation)}</div>
          <div className="metric-card-subtext">
            <span>Simulated population sample analyzed</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="metric-card accent-rose">
          <div className="metric-card-header">
            <span className="metric-card-label">Disease Cases</span>
            <div className="metric-card-icon-box icon-rose">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="metric-card-value">{formatNum(cohort.actualDisease)}</div>
          <div className="metric-card-subtext">
            <span>1.00% true prevalence in cohort</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="metric-card accent-amber">
          <div className="metric-card-header">
            <span className="metric-card-label">Positive Tests</span>
            <div className="metric-card-icon-box icon-amber">
              <FlaskConical size={20} />
            </div>
          </div>
          <div className="metric-card-value">{formatNum(cohort.positiveTests)}</div>
          <div className="metric-card-subtext">
            <span>95 True Positives + 495 False Positives</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="metric-card accent-purple">
          <div className="metric-card-header">
            <span className="metric-card-label">P(Disease | Positive)</span>
            <div className="metric-card-icon-box icon-purple">
              <GitBranch size={20} />
            </div>
          </div>
          <div className="metric-card-value" style={{ color: '#a78bfa' }}>
            {formatPercent(bayesData.posteriorPositive)}
          </div>
          <div className="metric-card-subtext">
            <span>Posterior Probability (PPV)</span>
          </div>
        </div>
      </section>

      {/* Visual Analytics Overview: 2 Columns */}
      <section className="grid-2col">
        {/* Left Column: Donut Chart Distribution */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">10,000 Cohort Classification</h3>
              <p className="section-card-subtitle">Distribution of all diagnostic test outcomes</p>
            </div>
            <span className="status-pill tp">95% Accuracy</span>
          </div>

          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={testDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {testDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="custom-chart-tooltip">
                          <div className="tooltip-title">{data.name}</div>
                          <div className="tooltip-item">
                            <span>Count:</span>
                            <span className="tooltip-value">{formatNum(data.value)} people</span>
                          </div>
                          <div className="tooltip-item">
                            <span>Share:</span>
                            <span className="tooltip-value">{(data.value / 100).toFixed(2)}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '12px' }}>
            {testDistributionData.map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color }} />
                <span style={{ color: 'var(--text-secondary)' }}>{item.name.split('(')[0]}:</span>
                <strong style={{ color: 'var(--text-primary)', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                  {formatNum(item.value)}
                </strong>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Positive Tests Anatomy (The Counterintuitive Surprise) */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">Anatomy of the 590 Positive Tests</h3>
              <p className="section-card-subtitle">Why a positive test result only gives 16.10% probability</p>
            </div>
            <button 
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => onNavigate('confusion')}
            >
              Matrix Details
            </button>
          </div>

          <div style={{ padding: '12px 0' }}>
            {/* Visual stacked percentage bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--emerald-light)', fontWeight: 600 }}>True Positives: 95 (16.10%)</span>
                <span style={{ color: 'var(--amber-light)', fontWeight: 600 }}>False Positives: 495 (83.90%)</span>
              </div>
              <div style={{ width: '100%', height: '24px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '16.10%', background: 'var(--emerald-primary)', height: '100%' }} title="95 True Positives" />
                <div style={{ width: '83.90%', background: 'var(--amber-warning)', height: '100%' }} title="495 False Positives" />
              </div>
            </div>

            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '16px'
            }}>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                <strong>The Core Intuition:</strong> Out of 10,000 individuals, only 100 have the disease. 
                Even though the test is 95% accurate, the 9,900 healthy people produce <strong>495 False Positives</strong> (5% of 9,900).
                <br /><br />
                Meanwhile, the 100 diseased people yield <strong>95 True Positives</strong> (95% of 100).
                Therefore, among all 590 people who test positive, only <strong>95 are truly sick</strong>:
                <br />
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal-light)', fontWeight: 700 }}>
                  95 / (95 + 495) = 95 / 590 = 16.10%
                </span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => onNavigate('bayes')}
              >
                Inspect Bayes' Formula
              </button>
              <button 
                className="btn-secondary" 
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => onNavigate('prevalence')}
              >
                Change Prevalence
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
