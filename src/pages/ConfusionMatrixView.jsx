import React from 'react';
import {
  Grid,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Info,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { formatNum } from '../utils/probabilityEngine';

export default function ConfusionMatrixView({ bayesData, onNavigate }) {
  const { cohort } = bayesData;

  const comparisonData = [
    { name: 'True Positives (TP)', value: cohort.truePositives, color: '#10b981' },
    { name: 'False Positives (FP)', value: cohort.falsePositives, color: '#f59e0b' },
    { name: 'False Negatives (FN)', value: cohort.falseNegatives, color: '#f43f5e' },
    { name: 'True Negatives (TN)', value: cohort.trueNegatives, color: '#6366f1' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
          Diagnostic Confusion Matrix (2 × 2)
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Crosstabulation of ground-truth disease states against medical test predictions across 10,000 simulated observations.
        </p>
      </div>

      {/* 7. LARGE 2x2 CONFUSION MATRIX GRID REQUIRED */}
      <div className="section-card" style={{ marginBottom: '28px' }}>
        <div className="section-card-header">
          <div>
            <h3 className="section-card-title">
              <Grid size={18} style={{ color: 'var(--teal-light)' }} />
              Simulated Diagnostic Crosstabulation
            </h3>
            <p className="section-card-subtitle">Actual Disease State vs Clinical Prediction</p>
          </div>
          <span className="edu-badge">N = 10,000 Cohort</span>
        </div>

        {/* Matrix Layout */}
        <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%', padding: '10px 0' }}>
          {/* Top Column Labels */}
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 120px', gap: '12px', marginBottom: '8px' }}>
            <div />
            <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px', color: 'var(--amber-light)', padding: '8px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-sm)' }}>
              Predicted POSITIVE
            </div>
            <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px', color: 'var(--teal-light)', padding: '8px', background: 'rgba(45, 212, 191, 0.08)', borderRadius: 'var(--radius-sm)' }}>
              Predicted NEGATIVE
            </div>
            <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '13px', color: 'var(--text-muted)', padding: '8px' }}>
              Row Total
            </div>
          </div>

          {/* Row 1: Actual Disease */}
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 120px', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)'
            }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--rose-light)' }}>Actual DISEASE</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Condition Present</span>
            </div>

            {/* True Positive Cell */}
            <div className="matrix-cell tp-cell">
              <span className="matrix-cell-abbr" style={{ color: 'var(--emerald-light)' }}>True Positive (TP)</span>
              <div className="matrix-cell-count" style={{ color: '#6ee7b7' }}>
                {cohort.truePositives}
              </div>
              <span className="matrix-cell-sub">Sick patients correctly detected</span>
            </div>

            {/* False Negative Cell */}
            <div className="matrix-cell fn-cell">
              <span className="matrix-cell-abbr" style={{ color: 'var(--rose-light)' }}>False Negative (FN)</span>
              <div className="matrix-cell-count" style={{ color: '#fda4af' }}>
                {cohort.falseNegatives}
              </div>
              <span className="matrix-cell-sub">Sick patients missed (Type II Error)</span>
            </div>

            {/* Row Total 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Diseased</span>
              <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{cohort.actualDisease}</span>
              <span style={{ fontSize: '10.5px', color: 'var(--rose-light)' }}>1.00%</span>
            </div>
          </div>

          {/* Row 2: Actual No Disease */}
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 120px', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)'
            }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--emerald-light)' }}>Actual NO DISEASE</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Condition Absent</span>
            </div>

            {/* False Positive Cell */}
            <div className="matrix-cell fp-cell">
              <span className="matrix-cell-abbr" style={{ color: 'var(--amber-light)' }}>False Positive (FP)</span>
              <div className="matrix-cell-count" style={{ color: '#fde68a' }}>
                {cohort.falsePositives}
              </div>
              <span className="matrix-cell-sub">Healthy false alarms (Type I Error)</span>
            </div>

            {/* True Negative Cell */}
            <div className="matrix-cell tn-cell">
              <span className="matrix-cell-abbr" style={{ color: '#a5b4fc' }}>True Negative (TN)</span>
              <div className="matrix-cell-count" style={{ color: '#c7d2fe' }}>
                {formatNum(cohort.trueNegatives)}
              </div>
              <span className="matrix-cell-sub">Healthy correctly ruled out</span>
            </div>

            {/* Row Total 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Healthy</span>
              <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{formatNum(cohort.actualNoDisease)}</span>
              <span style={{ fontSize: '10.5px', color: 'var(--emerald-light)' }}>99.00%</span>
            </div>
          </div>

          {/* Bottom Column Totals */}
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 120px', gap: '12px' }}>
            <div style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontSize: '13px', color: 'var(--text-muted)' }}>
              Column Total:
            </div>
            <div style={{ padding: '12px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '11px', color: 'var(--amber-light)' }}>Total Positive Tests</span>
              <div style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{cohort.positiveTests}</div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>5.90%</span>
            </div>
            <div style={{ padding: '12px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '11px', color: 'var(--teal-light)' }}>Total Negative Tests</span>
              <div style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{formatNum(cohort.negativeTests)}</div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>94.10%</span>
            </div>
            <div style={{ padding: '12px', textAlign: 'center', background: 'rgba(139, 92, 246, 0.15)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <span style={{ fontSize: '11px', color: 'var(--purple-light)' }}>Grand Total</span>
              <div style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'white' }}>10,000</div>
              <span style={{ fontSize: '11px', color: 'var(--purple-light)' }}>100.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 QUADRANT EXPLANATIONS REQUIRED:
          - True Positive: Disease correctly identified
          - False Positive: Positive test without disease
          - False Negative: Disease not detected
          - True Negative: No disease correctly identified */}
      <div className="grid-2col" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* TP */}
          <div style={{
            padding: '18px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            borderLeft: '4px solid var(--emerald-primary)',
            borderTop: '1px solid var(--border-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '14px'
          }}>
            <CheckCircle size={22} style={{ color: 'var(--emerald-light)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <strong style={{ fontSize: '14.5px', color: 'var(--text-primary)' }}>True Positive (TP = 95)</strong>
                <span className="status-pill tp">Sensitivity</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                <strong>Disease correctly identified:</strong> The test accurately confirms the presence of the disease in sick patients (95 out of 100 diseased individuals).
              </p>
            </div>
          </div>

          {/* FP */}
          <div style={{
            padding: '18px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            borderLeft: '4px solid var(--amber-warning)',
            borderTop: '1px solid var(--border-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '14px'
          }}>
            <AlertTriangle size={22} style={{ color: 'var(--amber-light)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <strong style={{ fontSize: '14.5px', color: 'var(--text-primary)' }}>False Positive (FP = 495)</strong>
                <span className="status-pill fp">Type I Error</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                <strong>Positive test without disease:</strong> Healthy individuals who incorrectly receive a positive result (5% of 9,900 healthy people = 495 people).
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* FN */}
          <div style={{
            padding: '18px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            borderLeft: '4px solid var(--rose-danger)',
            borderTop: '1px solid var(--border-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '14px'
          }}>
            <XCircle size={22} style={{ color: 'var(--rose-light)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <strong style={{ fontSize: '14.5px', color: 'var(--text-primary)' }}>False Negative (FN = 5)</strong>
                <span className="status-pill fn">Type II Error</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                <strong>Disease not detected:</strong> Sick individuals whose infection was missed by the test (5% of 100 diseased people = 5 people).
              </p>
            </div>
          </div>

          {/* TN */}
          <div style={{
            padding: '18px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            borderLeft: '4px solid #6366f1',
            borderTop: '1px solid var(--border-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '14px'
          }}>
            <ShieldCheck size={22} style={{ color: '#a5b4fc', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <strong style={{ fontSize: '14.5px', color: 'var(--text-primary)' }}>True Negative (TN = 9,405)</strong>
                <span className="status-pill tn">Specificity</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                <strong>No disease correctly identified:</strong> Healthy individuals whose negative health status is correctly verified (95% of 9,900 = 9,405 people).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
