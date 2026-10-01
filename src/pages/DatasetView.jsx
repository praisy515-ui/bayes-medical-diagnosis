import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  Filter,
  Download,
  Code,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { formatNum, PYTHON_PANDAS_CODE } from '../utils/probabilityEngine';

export default function DatasetView({ dataset }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterDisease, setFilterDisease] = useState('ALL');
  const [filterResult, setFilterResult] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [showCodeModal, setShowCodeModal] = useState(false);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return dataset.filter(item => {
      // Search term matching ID, disease, result, or category
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesDisease = item.diseaseStatus.toLowerCase().includes(query);
        const matchesResult = item.testResult.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesId && !matchesDisease && !matchesResult && !matchesCategory) {
          return false;
        }
      }

      // Filter by classification category (TP, FP, FN, TN)
      if (filterCategory !== 'ALL' && item.categoryShort !== filterCategory) {
        return false;
      }

      // Filter by Disease status
      if (filterDisease !== 'ALL' && item.diseaseStatus !== filterDisease) {
        return false;
      }

      // Filter by Test Result
      if (filterResult !== 'ALL' && item.testResult !== filterResult) {
        return false;
      }

      return true;
    });
  }, [dataset, searchTerm, filterCategory, filterDisease, filterResult]);

  // Pagination slice
  const totalRecords = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const currentSafePage = Math.min(currentPage, totalPages);
  const startIndex = (currentSafePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);
  const currentSlice = filteredData.slice(startIndex, endIndex);

  // Handle Export to CSV
  const handleExportCSV = () => {
    const headers = 'ID,Disease_Status,Test_Result,Category,Age,Gender,Symptom_Score\n';
    const rows = filteredData.slice(0, 1000).map(r => 
      `${r.id},${r.diseaseStatus},${r.testResult},${r.category},${r.age},${r.gender},${r.symptomScore}`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `simulated_bayes_dataset_sample.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in">
      {/* Top Banner Notice */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 22px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(90deg, rgba(20, 184, 166, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
          border: '1px solid rgba(45, 212, 191, 0.3)',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(20, 184, 166, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--teal-light)'
          }}>
            <Database size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Dataset contains 10,000 simulated observations.
            </h2>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>
              Synthetically modeled using Python (NumPy & Pandas) with 1% prevalence, 95% sensitivity, and 95% specificity.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-secondary" 
            style={{ padding: '8px 14px', fontSize: '13px' }}
            onClick={() => setShowCodeModal(!showCodeModal)}
          >
            <Code size={15} />
            Python/Pandas Code
          </button>
          <button 
            className="btn-primary" 
            style={{ padding: '8px 14px', fontSize: '13px' }}
            onClick={handleExportCSV}
            title="Download CSV export of current filter (first 1,000 records)"
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Information Card Explaining Simulation */}
      <div 
        style={{
          display: 'flex',
          gap: '14px',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '24px'
        }}
      >
        <Info size={20} style={{ color: 'var(--purple-light)', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>The dataset is created for educational probability analysis.</strong>
          {" "}In real-world epidemiological studies, screening large asymptomatic populations encounters the exact base-rate distribution modeled here:
          95 individuals with disease correctly tested positive (<span style={{ color: 'var(--emerald-light)' }}>TP</span>), 
          495 healthy individuals falsely tested positive (<span style={{ color: 'var(--amber-light)' }}>FP</span>), 
          5 diseased individuals missed (<span style={{ color: 'var(--rose-light)' }}>FN</span>), and 
          9,405 healthy individuals verified negative (<span style={{ color: '#818cf8' }}>TN</span>).
        </div>
      </div>

      {/* Python & Pandas Code Modal / Drawer */}
      {showCodeModal && (
        <div className="code-block-container" style={{ marginBottom: '24px' }}>
          <div className="code-block-header">
            <span className="code-block-title">
              <Code size={16} style={{ color: 'var(--teal-light)' }} />
              Python & Pandas Simulation Generator Script (Google Colab Ready)
            </span>
            <button 
              className="code-copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(PYTHON_PANDAS_CODE);
                alert('Python script copied to clipboard!');
              }}
            >
              Copy Script
            </button>
          </div>
          <pre className="code-content-pre">{PYTHON_PANDAS_CODE}</pre>
        </div>
      )}

      {/* Filter and Search Bar Controls */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
          {/* Search Input */}
          <div className="search-input-wrapper" style={{ minWidth: '220px' }}>
            <Search size={15} className="search-icon-inside" />
            <input
              type="text"
              className="navbar-search-input"
              style={{ width: '100%' }}
              placeholder="Search by ID or Category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Classification Quadrant Filter */}
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
            style={{ fontSize: '13px' }}
          >
            <option value="ALL">All Outcomes (10,000)</option>
            <option value="TP">True Positives (95)</option>
            <option value="FP">False Positives (495)</option>
            <option value="FN">False Negatives (5)</option>
            <option value="TN">True Negatives (9,405)</option>
          </select>

          {/* Disease Status Filter */}
          <select
            value={filterDisease}
            onChange={(e) => {
              setFilterDisease(e.target.value);
              setCurrentPage(1);
            }}
            style={{ fontSize: '13px' }}
          >
            <option value="ALL">All Disease Status</option>
            <option value="Disease">Disease (100)</option>
            <option value="No Disease">No Disease (9,900)</option>
          </select>

          {/* Test Result Filter */}
          <select
            value={filterResult}
            onChange={(e) => {
              setFilterResult(e.target.value);
              setCurrentPage(1);
            }}
            style={{ fontSize: '13px' }}
          >
            <option value="ALL">All Test Results</option>
            <option value="Positive">Positive Tests (590)</option>
            <option value="Negative">Negative Tests (9,410)</option>
          </select>
        </div>

        {/* Total Records Indicator */}
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Showing <strong>{startIndex + 1}</strong> – <strong>{endIndex}</strong> of <strong>{formatNum(totalRecords)}</strong> records</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{ padding: '4px 8px', fontSize: '12px' }}
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </div>
      </div>

      {/* Dataset Table */}
      <div className="dataset-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Patient ID</th>
              <th>Disease Status</th>
              <th>Test Result</th>
              <th>Diagnostic Category</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Symptom Indicator</th>
            </tr>
          </thead>
          <tbody>
            {currentSlice.length > 0 ? (
              currentSlice.map((record) => (
                <tr key={record.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--teal-light)' }}>
                    {record.id}
                  </td>
                  <td>
                    <span className={`status-pill ${record.diseaseStatus === 'Disease' ? 'disease' : 'no-disease'}`}>
                      {record.diseaseStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${record.testResult === 'Positive' ? 'positive' : 'negative'}`}>
                      {record.testResult}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${record.categoryShort.toLowerCase()}`}>
                      {record.category} ({record.categoryShort})
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{record.age} yrs</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{record.gender}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '50px',
                        height: '6px',
                        borderRadius: '3px',
                        background: 'rgba(255,255,255,0.08)',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${Number(record.symptomScore) * 10}%`,
                          height: '100%',
                          background: record.diseaseStatus === 'Disease' ? 'var(--rose-danger)' : 'var(--teal-light)'
                        }} />
                      </div>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {record.symptomScore}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No matching records found for the current search and filter settings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
          Page {currentSafePage} of {totalPages}
        </span>

        <div className="pagination-pages">
          <button
            className="page-num-btn"
            disabled={currentSafePage <= 1}
            onClick={() => setCurrentPage(1)}
            title="First Page"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            className="page-num-btn"
            disabled={currentSafePage <= 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Quick jump page numbers */}
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentSafePage <= 3) {
              pageNum = i + 1;
            } else if (currentSafePage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentSafePage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                className={`page-num-btn ${currentSafePage === pageNum ? 'active' : ''}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            className="page-num-btn"
            disabled={currentSafePage >= totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>
          <button
            className="page-num-btn"
            disabled={currentSafePage >= totalPages}
            onClick={() => setCurrentPage(totalPages)}
            title="Last Page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
