import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Sliders,
  TrendingDown,
  Info,
  ShieldAlert,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';
import { calculateBayes, formatPercent, formatNum } from '../utils/probabilityEngine';

export default function FalsePositiveAnalysisView({ prevalence = 0.01, sensitivity = 0.95 }) {
  // Interactive Slider for False Positive Rate: Default 5.0%
  const [sliderFPR, setSliderFPR] = useState(5.0); // in percent, e.g. 5.0%

  // Dynamically calculate Bayes result for current FPR
  const currentResult = useMemo(() => {
    const fprFraction = sliderFPR / 100;
    const specificity = 1 - fprFraction;
    return calculateBayes(prevalence, sensitivity, specificity, 10000);
  }, [sliderFPR, prevalence, sensitivity]);

  // Curve data for PPV vs FPR
  const fprCurveData = useMemo(() => {
    const points = [];
    for (let f = 0.5; f <= 15; f += 0.5) {
      const specificity = 1 - (f / 100);
      const res = calculateBayes(prevalence, sensitivity, specificity, 10000);
      points.push({
        fpr: f,
        ppv: Number((res.posteriorPositive * 100).toFixed(2)),
        fpCount: res.cohort.falsePositives,
        totalPositives: res.cohort.positiveTests
      });
    }
    return points;
  }, [prevalence, sensitivity]);

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
          False Positive Rate (Type I Error) Sensitivity Analysis
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Investigate how even minor increments in the False Positive Rate drastically erode the Positive Predictive Value in low-prevalence screening.
        </p>
      </div>

      {/* 10. INTERACTIVE SLIDER FOR FALSE POSITIVE RATE */}
      <div className="interactive-slider-box">
        <div className="slider-header">
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--amber-light)', fontWeight: 700 }}>
              Adjustable Test Error Parameter
            </span>
            <div className="slider-label" style={{ fontSize: '18px', marginTop: '2px' }}>
              False Positive Rate: <span style={{ color: 'var(--amber-light)' }}>{sliderFPR.toFixed(1)}%</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '10px' }}>
                (Specificity: {(100 - sliderFPR).toFixed(1)}%)
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Resulting Positive Predictive Value (PPV):</span>
            <div className="slider-value-pill" style={{ color: 'var(--amber-light)', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
              {formatPercent(currentResult.posteriorPositive)}
            </div>
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min="0.5"
          max="15"
          step="0.5"
          value={sliderFPR}
          onChange={(e) => setSliderFPR(parseFloat(e.target.value))}
          className="custom-range-slider"
          aria-label="Adjust False Positive Rate"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-muted)' }}>
          <span>0.5% (Extremely Specific: 99.5%)</span>
          <span>5.0% (Project Baseline: 95.0%)</span>
          <span>10.0% (90.0% Specificity)</span>
          <span>15.0% (85.0% Specificity)</span>
        </div>

        <div style={{
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            False Positives Generated: <strong style={{ color: 'var(--amber-light)' }}>{currentResult.cohort.falsePositives} healthy people</strong> falsely flagged
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            True Positives Detected: <strong style={{ color: 'var(--emerald-light)' }}>{currentResult.cohort.truePositives} sick people</strong>
          </div>
        </div>
      </div>

      {/* WHY FALSE POSITIVES MATTER EXPLANATION CARD */}
      <div 
        style={{
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '28px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start'
        }}
      >
        <ShieldAlert size={26} style={{ color: 'var(--amber-light)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Why False Positives Dominate Rare Disease Screening
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Because the non-diseased population (99% = 9,900 people) is orders of magnitude larger than the diseased group (1% = 100 people), 
            even a tiny error rate generates a flood of false alarms. At a 5% FPR, the 9,900 healthy people produce <strong>495 false positives</strong>, 
            which easily dwarfs the <strong>95 true positives</strong> produced by the entire diseased cohort!
          </p>
        </div>
      </div>

      {/* CHARTS & COMPARISONS */}
      <div className="grid-2col">
        {/* Left Column: Recharts Line Chart */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">
                <TrendingDown size={18} style={{ color: 'var(--amber-light)' }} />
                PPV Decay vs False Positive Rate
              </h3>
              <p className="section-card-subtitle">As FPR increases from 0.5% to 15%, predictive power collapses</p>
            </div>
          </div>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={fprCurveData}
                margin={{ top: 15, right: 25, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis 
                  dataKey="fpr" 
                  stroke="var(--text-muted)" 
                  fontSize={12}
                  unit="%"
                  label={{ value: 'False Positive Rate (%)', position: 'insideBottom', offset: -10, fill: 'var(--text-muted)', fontSize: 11 }}
                />
                <YAxis 
                  stroke="var(--text-muted)" 
                  fontSize={12} 
                  unit="%" 
                  domain={[0, 80]}
                  label={{ value: 'PPV (%)', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="custom-chart-tooltip">
                          <div className="tooltip-title">FPR: {data.fpr}%</div>
                          <div className="tooltip-item">
                            <span>Positive Predictive Value:</span>
                            <span className="tooltip-value" style={{ color: 'var(--amber-light)' }}>{data.ppv}%</span>
                          </div>
                          <div className="tooltip-item">
                            <span>False Positives (10k cohort):</span>
                            <span className="tooltip-value">{data.fpCount} people</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ppv"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: '#f59e0b', stroke: '#080c14', strokeWidth: 2 }}
                />
                <ReferenceDot
                  x={sliderFPR}
                  y={Number((currentResult.posteriorPositive * 100).toFixed(2))}
                  r={7}
                  fill="#2dd4bf"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Current slider: <strong>FPR = {sliderFPR.toFixed(1)}% → PPV = {formatPercent(currentResult.posteriorPositive)}</strong>
          </div>
        </div>

        {/* Right Column: Key Takeaway Scenarios */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">Three Clinical Test Scenarios</h3>
              <p className="section-card-subtitle">Comparing the dramatic impact of test specificity</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Scenario 1: Near Perfect Test */}
            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--teal-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '13.5px', color: 'var(--teal-light)' }}>1. High Specificity (FPR = 1.0%)</strong>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--teal-light)' }}>PPV = 49.0%</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                95 True Positives vs 99 False Positives. Roughly half of all positive test results are genuine disease cases.
              </p>
            </div>

            {/* Scenario 2: Baseline (Project Default) */}
            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--amber-warning)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '13.5px', color: 'var(--amber-light)' }}>2. Standard Test (FPR = 5.0% - Project)</strong>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--amber-light)' }}>PPV = 16.10%</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                95 True Positives vs 495 False Positives. False positives outnumber true sick cases by over 5 to 1.
              </p>
            </div>

            {/* Scenario 3: Poor Specificity */}
            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--rose-danger)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '13.5px', color: 'var(--rose-light)' }}>3. Low Specificity (FPR = 10.0%)</strong>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--rose-light)' }}>PPV = 8.76%</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                95 True Positives vs 990 False Positives. Over 91% of all positive tests are false alarms!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
