import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Sliders,
  Sparkles,
  Info,
  GitBranch,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine
} from 'recharts';
import { calculateBayes, formatPercent, formatNum } from '../utils/probabilityEngine';

export default function PrevalenceAnalysisView({ sensitivity = 0.95, specificity = 0.95 }) {
  // Interactive Slider State: Default 1% (0.01)
  const [sliderPrevalence, setSliderPrevalence] = useState(1.0); // stored in percentage (e.g. 1.0 = 1%)

  // Dynamically calculate Bayes result for current slider value!
  const currentResult = useMemo(() => {
    const prevFraction = sliderPrevalence / 100;
    return calculateBayes(prevFraction, sensitivity, specificity, 10000);
  }, [sliderPrevalence, sensitivity, specificity]);

  // Discrete benchmark points required by project: 1%, 5%, 10%, 20%, 30%, 50%
  const benchmarkValues = [1, 5, 10, 20, 30, 50];
  const benchmarkTableData = useMemo(() => {
    return benchmarkValues.map(p => {
      const res = calculateBayes(p / 100, sensitivity, specificity, 10000);
      return {
        prevalence: p,
        prevStr: `${p}%`,
        posterior: res.posteriorPositive * 100,
        posteriorStr: formatPercent(res.posteriorPositive),
        pPositiveStr: formatPercent(res.pPositive),
        tp: res.cohort.truePositives,
        fp: res.cohort.falsePositives
      };
    });
  }, [sensitivity, specificity]);

  // Continuous curve for the interactive Recharts line chart
  const lineChartData = useMemo(() => {
    const points = [];
    for (let p = 0.5; p <= 50; p += 1.5) {
      const res = calculateBayes(p / 100, sensitivity, specificity, 10000);
      points.push({
        prevalence: p,
        posterior: Number((res.posteriorPositive * 100).toFixed(2)),
        pPositive: Number((res.pPositive * 100).toFixed(2))
      });
    }
    return points;
  }, [sensitivity, specificity]);

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
          Prevalence Analysis & Posterior Probability Dynamics
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Observe how the posterior probability P(Disease | Positive) scales as the underlying disease prevalence varies from rare to common.
        </p>
      </div>

      {/* 9. INTERACTIVE SLIDER & DYNAMIC BAYES CALCULATION */}
      <div className="interactive-slider-box">
        <div className="slider-header">
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--teal-light)', fontWeight: 700 }}>
              Live Dynamic Parameter
            </span>
            <div className="slider-label" style={{ fontSize: '18px', marginTop: '2px' }}>
              Disease Prevalence: <span style={{ color: 'var(--teal-light)' }}>{sliderPrevalence.toFixed(1)}%</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Dynamically Calculated P(Disease | +):</span>
              <div className="slider-value-pill">
                {formatPercent(currentResult.posteriorPositive)}
              </div>
            </div>
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min="0.5"
          max="50"
          step="0.5"
          value={sliderPrevalence}
          onChange={(e) => setSliderPrevalence(parseFloat(e.target.value))}
          className="custom-range-slider"
          aria-label="Adjust Disease Prevalence"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-muted)' }}>
          <span>0.5% (Very Rare)</span>
          <span>10% (Moderate)</span>
          <span>25% (Common)</span>
          <span>50% (High Endemic)</span>
        </div>

        {/* Live dynamic formula breakdown */}
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
            Dynamic Bayes Calculation: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              ({sensitivity} × {(sliderPrevalence/100).toFixed(4)}) ÷ {currentResult.pPositive.toFixed(4)}
            </span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Cohort Positives: <strong style={{ color: 'var(--emerald-light)' }}>{currentResult.cohort.truePositives} TP</strong> vs <strong style={{ color: 'var(--amber-light)' }}>{currentResult.cohort.falsePositives} FP</strong>
          </div>
        </div>
      </div>

      {/* REQUIRED INSIGHT CARD:
          “As disease prevalence changes, the probability that a positive result represents a true disease case also changes.” */}
      <div 
        style={{
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.14) 0%, rgba(139, 92, 246, 0.14) 100%)',
          border: '1px solid rgba(45, 212, 191, 0.35)',
          marginBottom: '28px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}
      >
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(20, 184, 166, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--teal-light)',
          flexShrink: 0
        }}>
          <Lightbulb size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            Core Bayesian Principle
          </h3>
          <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
            “As disease prevalence changes, the probability that a positive result represents a true disease case also changes.”
            {" "}At 1% prevalence, PPV is only 16.10%. But if prevalence rises to 50%, the exact same test delivers a 95.00% PPV!
          </p>
        </div>
      </div>

      {/* LINE CHART & BENCHMARK TABLE GRID */}
      <div className="grid-2col">
        {/* Left Column: Interactive Recharts Line Chart */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">
                <TrendingUp size={18} style={{ color: 'var(--teal-light)' }} />
                Posterior Probability vs Disease Prevalence
              </h3>
              <p className="section-card-subtitle">Non-linear relationship curve (Sensitivity=95%, Specificity=95%)</p>
            </div>
          </div>

          <div style={{ height: '320px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineChartData}
                margin={{ top: 15, right: 25, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis 
                  dataKey="prevalence" 
                  stroke="var(--text-muted)" 
                  fontSize={12}
                  unit="%"
                  label={{ value: 'Prevalence (%)', position: 'insideBottom', offset: -10, fill: 'var(--text-muted)', fontSize: 11 }}
                />
                <YAxis 
                  stroke="var(--text-muted)" 
                  fontSize={12} 
                  unit="%" 
                  domain={[0, 100]}
                  label={{ value: 'Posterior P(D|+)', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="custom-chart-tooltip">
                          <div className="tooltip-title">Prevalence: {data.prevalence}%</div>
                          <div className="tooltip-item">
                            <span>Posterior P(Disease|+):</span>
                            <span className="tooltip-value" style={{ color: 'var(--teal-light)' }}>{data.posterior}%</span>
                          </div>
                          <div className="tooltip-item">
                            <span>P(Positive Test):</span>
                            <span className="tooltip-value">{data.pPositive}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="posterior"
                  stroke="#2dd4bf"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: '#2dd4bf', stroke: '#080c14', strokeWidth: 2 }}
                />
                {/* Active slider position reference */}
                <ReferenceDot
                  x={sliderPrevalence}
                  y={Number((currentResult.posteriorPositive * 100).toFixed(2))}
                  r={7}
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Orange marker indicates current slider position: <strong>{sliderPrevalence.toFixed(1)}% prevalence → {formatPercent(currentResult.posteriorPositive)}</strong>
          </div>
        </div>

        {/* Right Column: Required Benchmark Table (1%, 5%, 10%, 20%, 30%, 50%) */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">Prevalence Benchmark Matrix</h3>
              <p className="section-card-subtitle">Required study points: 1%, 5%, 10%, 20%, 30%, 50%</p>
            </div>
            <span className="status-pill tp">Comparative</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Prevalence</th>
                  <th>Posterior P(D|+)</th>
                  <th>P(Positive)</th>
                  <th>TP / FP Ratio</th>
                  <th>Quick Set</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkTableData.map(row => {
                  const isCurrent = Math.abs(sliderPrevalence - row.prevalence) < 0.3;
                  return (
                    <tr 
                      key={row.prevalence}
                      style={{ background: isCurrent ? 'rgba(20, 184, 166, 0.1)' : 'transparent' }}
                    >
                      <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {row.prevStr}
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--teal-light)' }}>
                        {row.posteriorStr}
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                        {row.pPositiveStr}
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {row.tp} TP : {row.fp} FP
                      </td>
                      <td>
                        <button
                          onClick={() => setSliderPrevalence(row.prevalence)}
                          style={{
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            background: isCurrent ? 'var(--teal-primary)' : 'rgba(255,255,255,0.06)',
                            color: isCurrent ? '#080c14' : 'var(--text-primary)',
                            fontWeight: 600
                          }}
                        >
                          {isCurrent ? 'Active' : 'Apply'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
