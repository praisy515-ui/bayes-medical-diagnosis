import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  GitBranch,
  AlertTriangle,
  Database,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';

export default function InsightsView({ onNavigate }) {
  // Interactive audience intuition quiz
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const quizOptions = [
    { label: 'A) 95%', isCorrect: false, desc: 'Intuitive assumption (matching the test accuracy)' },
    { label: 'B) 50%', isCorrect: false, desc: 'Coin flip guess' },
    { label: 'C) ~16%', isCorrect: true, desc: 'The exact mathematically proven Bayes Theorem result!' },
    { label: 'D) 5%', isCorrect: false, desc: 'Matching the False Positive Rate' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
          Key Analytical Insights & Findings
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Core takeaways from synthesizing Bayes' Theorem, probability theory, and simulated Python/Pandas data analytics.
        </p>
      </div>

      {/* 11. FOUR REQUIRED INSIGHT CARDS */}
      <div className="grid-2col" style={{ marginBottom: '28px' }}>
        {/* Card 1: Rare Disease Effect */}
        <div className="insight-card" style={{ borderTop: '4px solid var(--purple-primary)' }}>
          <div className="insight-card-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--purple-light)' }}>
            <Sparkles size={22} />
          </div>
          <h3 className="insight-card-title">Rare Disease Effect</h3>
          <p className="insight-card-text">
            <strong>A low disease prevalence can make the probability of actually having the disease after a positive test much lower than expected.</strong>
            {" "}When prevalence is only 1%, the baseline odds are 99 to 1 against having the condition. Even a 95% sensitive test cannot overcome this overwhelming prior without producing substantial false alarms.
          </p>
        </div>

        {/* Card 2: Importance of Prior Probability */}
        <div className="insight-card" style={{ borderTop: '4px solid var(--teal-primary)' }}>
          <div className="insight-card-icon-wrap" style={{ background: 'rgba(20, 184, 166, 0.2)', color: 'var(--teal-light)' }}>
            <GitBranch size={22} />
          </div>
          <h3 className="insight-card-title">Importance of Prior Probability</h3>
          <p className="insight-card-text">
            <strong>Bayes’ Theorem combines prior probability with test evidence.</strong>
            {" "}Ignoring the prior probability leads to the classic <em>Base Rate Fallacy</em>. Test results never exist in a mathematical vacuum; they simply update pre-existing knowledge into an updated posterior belief.
          </p>
        </div>

        {/* Card 3: False Positives Matter */}
        <div className="insight-card" style={{ borderTop: '4px solid var(--amber-warning)' }}>
          <div className="insight-card-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--amber-light)' }}>
            <AlertTriangle size={22} />
          </div>
          <h3 className="insight-card-title">False Positives Matter</h3>
          <p className="insight-card-text">
            <strong>Even a reasonably accurate test can generate many false positives when the disease is rare.</strong>
            {" "}In our 10,000 cohort, the 5% error rate on 9,900 healthy people produced 495 false positives—over 5 times more than the 95 true cases! This is why confirmatory secondary tests are clinically required.
          </p>
        </div>

        {/* Card 4: Data-Driven Probability */}
        <div className="insight-card" style={{ borderTop: '4px solid var(--emerald-primary)' }}>
          <div className="insight-card-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--emerald-light)' }}>
            <Database size={22} />
          </div>
          <h3 className="insight-card-title">Data-Driven Probability</h3>
          <p className="insight-card-text">
            <strong>Pandas helps organize and analyze the simulated observations.</strong>
            {" "}Using <code style={{ color: 'var(--emerald-light)' }}>pd.crosstab()</code> and vectorized NumPy condition arrays transforms abstract formulas into concrete, auditable patient rows that verify theoretical mathematics empirically.
          </p>
        </div>
      </div>

      {/* Interactive Presentation Quiz / Audience Engagement Widget */}
      <div 
        className="section-card"
        style={{
          background: 'linear-gradient(135deg, rgba(17, 26, 46, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          padding: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(139, 92, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--purple-light)'
          }}>
            <HelpCircle size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>
              Presentation Demonstration: "Test Your Intuition"
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Use this interactive widget during your college presentation to engage your examiners and classmates!
            </p>
          </div>
        </div>

        <div style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '20px'
        }}>
          <p style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
            "A patient randomly selected from a population with 1% disease prevalence tests positive on a medical test with 95% sensitivity and 95% specificity. What is the probability that this person actually has the disease?"
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
          {quizOptions.map((opt, i) => {
            const isChosen = selectedGuess === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedGuess(i);
                  setShowAnswer(true);
                }}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: isChosen 
                    ? (opt.isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)')
                    : 'rgba(255,255,255,0.04)',
                  border: isChosen
                    ? (opt.isCorrect ? '2px solid var(--emerald-primary)' : '2px solid var(--rose-danger)')
                    : '1px solid var(--border-subtle)',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {opt.desc}
                </div>
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={24} style={{ color: 'var(--emerald-light)' }} />
              <div>
                <strong style={{ fontSize: '14.5px', color: '#6ee7b7' }}>Correct Answer: 16.10% (Option C)</strong>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  Over 80% of respondents instinctively choose 95% because human intuition suffers from base-rate neglect!
                </p>
              </div>
            </div>
            <button
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '13px' }}
              onClick={() => onNavigate('bayes')}
            >
              Review Bayes Formula
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
