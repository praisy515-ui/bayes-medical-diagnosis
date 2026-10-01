import React from 'react';
import { X, Award, HelpCircle, CheckCircle2, BookOpen, Lightbulb } from 'lucide-react';

export default function PresentationGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.82)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0f172a',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '30px',
          boxShadow: 'var(--shadow-lg), 0 0 40px rgba(45, 212, 191, 0.15)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: 'var(--radius-md)', 
              background: 'rgba(45, 212, 191, 0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--teal-light)'
            }}>
              <Award size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Student Presentation Walkthrough Guide</h2>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Quick talking points and flow for your project demonstration</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              background: 'rgba(255,255,255,0.05)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(20, 184, 166, 0.08)',
            border: '1px solid rgba(45, 212, 191, 0.25)'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--teal-light)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lightbulb size={16} /> The Core Counterintuitive Question
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              "If a medical test is <strong>95% sensitive</strong> and <strong>95% specific</strong>, and a patient tests positive, what is the chance they actually have the disease?"
              <br />
              Most people intuitively guess <strong>95%</strong>. Bayes' Theorem proves the real probability is only <strong>16.10%</strong>!
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>Recommended 4-Step Presentation Order</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'rgba(45,212,191,0.2)', color: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11.5px', fontWeight: 700 }}>1</span>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Dashboard & Visual Flow:</strong>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}> Introduce the 10,000 population cohort and the 4 metric cards (10,000 total, 100 diseased, 590 positive tests, 16.10% posterior).</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'rgba(45,212,191,0.2)', color: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11.5px', fontWeight: 700 }}>2</span>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Confusion Matrix:</strong>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}> Show where 590 positives come from: 95 True Positives vs 495 False Positives. That immediately explains why 95 / 590 = 16.10%.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'rgba(45,212,191,0.2)', color: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11.5px', fontWeight: 700 }}>3</span>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Bayes Theorem Formula:</strong>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}> Break down Prior (1%), Sensitivity (95%), Evidence (5.9%), and Posterior (16.10%).</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'rgba(45,212,191,0.2)', color: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11.5px', fontWeight: 700 }}>4</span>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Prevalence & False Positive Sliders:</strong>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}> Move the sliders in real time to show how posterior probability scales with prevalence and test accuracy!</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '12px', color: 'var(--purple-light)' }}>
              Built with Python & Pandas data analysis simulated logic.
            </span>
            <button 
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '6px 16px', fontSize: '13px' }}
            >
              Start Demonstration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
