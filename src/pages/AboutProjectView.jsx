import React, { useState } from 'react';
import {
  Info,
  BookOpen,
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  GraduationCap,
  Copy,
  ExternalLink,
  Terminal,
  Sparkles
} from 'lucide-react';
import { PYTHON_PANDAS_CODE } from '../utils/probabilityEngine';

export default function AboutProjectView() {
  const [copied, setCopied] = useState(false);

  const technologies = [
    { name: 'Python', role: 'Simulation script & core numerical computation' },
    { name: 'Pandas', role: 'Data structures, DataFrame tabular indexing, crosstab calculations' },
    { name: 'NumPy', role: 'Vectorized Bernoulli random generation and matrix math' },
    { name: 'Matplotlib', role: 'Static charting, ROC curves & distribution plots' },
    { name: 'Google Colab', role: 'Interactive cloud Jupyter notebook environment' },
    { name: 'React + Vite', role: 'Modern, high-performance web dashboard application' }
  ];

  const concepts = [
    { name: 'Basic Probability', desc: 'Sample spaces, elementary events, and probability axioms.' },
    { name: 'Probability Rules', desc: 'Complement rule: P(~A) = 1 - P(A), and mutually exclusive unions.' },
    { name: 'Conditional Probability', desc: 'P(A|B) = P(A ∩ B) / P(B), describing knowledge updates given evidence.' },
    { name: 'Law of Total Probability', desc: 'Decomposing marginal events: P(B) = Σ P(B|Ai)P(Ai).' },
    { name: 'Bayes’ Theorem', desc: 'P(Ai|B) = [P(B|Ai)P(Ai)] / Σ P(B|Aj)P(Aj) for probability inversion.' },
    { name: 'Discrete Probability', desc: 'Binary outcomes, Bernouilli trials, and categorical contingency tables.' }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PYTHON_PANDAS_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="animate-fade-in">
      {/* 12. ABOUT PROJECT PAGE SPECIFICATION */}
      
      {/* Project Title Banner */}
      <div 
        className="section-card"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
          border: '1px solid rgba(45, 212, 191, 0.35)',
          padding: '32px',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="hero-academic-pill">
            <GraduationCap size={14} />
            Academic Capstone / Probability Project
          </span>
          <span className="edu-badge">
            Educational / Simulated Data
          </span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', lineHeight: 1.3 }}>
          Application of Bayes’ Theorem in Medical Diagnosis Using Python and Pandas
        </h1>

        <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '900px', margin: 0 }}>
          <strong>Purpose:</strong> Educational demonstration of Bayes’ Theorem and probability analysis. 
          The project demonstrates how Bayes’ Theorem can be used to analyze the probability that a person actually has a disease after receiving a positive medical test result, using a simulated dataset of 10,000 people and data analysis in Python and Pandas.
        </p>
      </div>

      {/* Grid: Technologies & Probability Concepts */}
      <div className="grid-2col" style={{ marginBottom: '28px' }}>
        {/* Technologies Card */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">
                <Cpu size={18} style={{ color: 'var(--teal-light)' }} />
                Technologies & Tools
              </h3>
              <p className="section-card-subtitle">Programming languages and analytical libraries</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {technologies.map(tech => (
              <div 
                key={tech.name}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--teal-light)' }} />
                  <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{tech.name}</strong>
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textAlign: 'right' }}>
                  {tech.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Probability Concepts Card */}
        <div className="section-card">
          <div className="section-card-header">
            <div>
              <h3 className="section-card-title">
                <BookOpen size={18} style={{ color: 'var(--purple-light)' }} />
                Probability Concepts Covered
              </h3>
              <p className="section-card-subtitle">Mathematical syllabus and theoretical foundation</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {concepts.map(c => (
              <div 
                key={c.name}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--purple-light)' }} />
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>{c.name}</strong>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', paddingLeft: '24px' }}>
                  {c.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dataset & Implementation Specifications */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '18px',
          marginBottom: '28px'
        }}
      >
        <div style={{ padding: '20px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--teal-light)', fontWeight: 700 }}>Dataset Size</span>
          <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-mono)', margin: '6px 0', color: 'var(--text-primary)' }}>
            10,000 Observations
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Simulated population cohort with randomized Bernoulli disease assignments and test classifications.
          </p>
        </div>

        <div style={{ padding: '20px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--purple-light)', fontWeight: 700 }}>Analysis Methodology</span>
          <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-mono)', margin: '6px 0', color: 'var(--text-primary)' }}>
            Empirical vs Theoretical
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Simulated contingency frequencies match analytical Bayesian probabilities to within statistical rounding error.
          </p>
        </div>

        <div style={{ padding: '20px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--emerald-light)', fontWeight: 700 }}>Academic Context</span>
          <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-mono)', margin: '6px 0', color: 'var(--text-primary)' }}>
            Classroom Presentation
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Designed to clearly explain conditional probability, the base-rate effect, and Pandas analytical workflows.
          </p>
        </div>
      </div>

      {/* Embedded Python & Pandas Code Snippet */}
      <div className="code-block-container" style={{ marginBottom: '28px' }}>
        <div className="code-block-header">
          <span className="code-block-title">
            <Terminal size={16} style={{ color: 'var(--teal-light)' }} />
            python_bayes_simulation.py (Exact Python & Pandas Source)
          </span>
          <button 
            className="code-copy-btn"
            onClick={handleCopyCode}
          >
            {copied ? (
              <>
                <CheckCircle2 size={14} style={{ color: 'var(--teal-light)' }} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy Python Code
              </>
            )}
          </button>
        </div>
        <pre className="code-content-pre">{PYTHON_PANDAS_CODE}</pre>
      </div>
    </div>
  );
}
