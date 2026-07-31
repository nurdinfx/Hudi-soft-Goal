import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp, Car, DollarSign, Plus, Edit2, Trash2, Search,
  Calendar, ChevronDown, ChevronUp, X, CheckCircle, AlertCircle,
  BarChart2, ArrowUpRight, ArrowDownRight, FileText, Filter, Printer
} from 'lucide-react';
import config from '../config/env';

const API_BASE_URL = config.apiBaseUrl;

const TRIP_TYPES = [
  { value: 'collection', label: 'Water Cargo Delivery', color: '#10b981', bg: '#d1fae5' },
  { value: 'transport', label: 'Transport', color: '#3b82f6', bg: '#dbeafe' },
  { value: 'rental', label: 'Rental', color: '#8b5cf6', bg: '#ede9fe' },
  { value: 'other', label: 'Other', color: '#f59e0b', bg: '#fef3c7' },
];

const getTripType = (val) => TRIP_TYPES.find(t => t.value === val) || TRIP_TYPES[3];

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val || 0);

const formatDate = (val) => {
  if (!val) return 'N/A';
  return new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getToken = () => localStorage.getItem('token') || '';

const apiRequest = async (url, options = {}) => {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
};

// ── Toast ──────────────────────────────────────────────────────────────────
const Toast = ({ msg, type, onClose }) => (
  <div
    className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white text-sm font-medium transition-all`}
    style={{ background: type === 'success' ? '#10b981' : '#ef4444', minWidth: 260 }}
  >
    {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
    <span>{msg}</span>
    <button onClick={onClose} className="ml-auto opacity-70 hover:opacity-100"><X size={16} /></button>
  </div>
);

// ── Modal ──────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
      <div className="flex items-center justify-between px-7 py-5 border-b" style={{ background: 'linear-gradient(135deg,#1e3a5f,#2563eb)' }}>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X size={20} /></button>
      </div>
      <div className="p-7">{children}</div>
    </div>
  </div>
);

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, gradient, iconBg }) => (
  <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{ background: gradient }}>
    <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 bg-white" />
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-sm font-medium opacity-75 mb-1">{label}</p>
        <p className="text-3xl font-extrabold tracking-tight">{value}</p>
        {sub && <p className="text-xs mt-1 opacity-60">{sub}</p>}
      </div>
      <div className="p-3 rounded-2xl" style={{ background: iconBg }}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────
const CarRevenue = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterMonth, setFilterMonth] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [expandedCar, setExpandedCar] = useState(null);
  const [form, setForm] = useState({ amount: '', date: '', source: '', description: '', tripType: 'collection' });
  const [formErrors, setFormErrors] = useState({});

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadCars = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/cars');
      setCars(Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      showToast('Failed to load cars: ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCars(); }, []);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const globalStats = useMemo(() => {
    let totalRevenue = 0, totalExpenses = 0, totalEntries = 0;
    cars.forEach(car => {
      (car.revenueEntries || []).forEach(e => { totalRevenue += e.amount || 0; totalEntries++; });
      (car.expenses || []).forEach(e => { totalExpenses += e.amount || 0; });
    });
    return { totalRevenue, totalExpenses, netProfit: totalRevenue - totalExpenses, totalEntries };
  }, [cars]);

  const carStats = useMemo(() =>
    cars.map(car => {
      const rev = (car.revenueEntries || []).reduce((s, e) => s + (e.amount || 0), 0);
      const exp = (car.expenses || []).reduce((s, e) => s + (e.amount || 0), 0);
      return { ...car, totalRevenue: rev, totalExpenses: exp, netProfit: rev - exp, entryCount: (car.revenueEntries || []).length };
    }).sort((a, b) => b.totalRevenue - a.totalRevenue)
  , [cars]);

  const filteredCars = useMemo(() =>
    carStats.filter(c =>
      (c.plateNumber?.toLowerCase().includes(search.toLowerCase()) || c.carType?.toLowerCase().includes(search.toLowerCase()))
    )
  , [carStats, search]);

  // ── Selected car entries ──────────────────────────────────────────────────
  const selectedCarData = useMemo(() => {
    if (!selectedCar) return null;
    return carStats.find(c => c._id === selectedCar._id) || null;
  }, [carStats, selectedCar]);

  const filteredEntries = useMemo(() => {
    if (!selectedCarData) return [];
    let entries = [...(selectedCarData.revenueEntries || [])];
    if (filterType !== 'all') entries = entries.filter(e => e.tripType === filterType);
    if (filterMonth) entries = entries.filter(e => {
      const d = new Date(e.date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === filterMonth;
    });
    return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedCarData, filterType, filterMonth]);

  // ── Form handlers ─────────────────────────────────────────────────────────
  const openAdd = () => {
    setForm({ amount: '', date: new Date().toISOString().split('T')[0], source: '', description: '', tripType: 'collection' });
    setEditEntry(null);
    setFormErrors({});
    setShowModal(true);
  };

  const openEdit = (entry) => {
    setForm({
      amount: entry.amount,
      date: entry.date ? new Date(entry.date).toISOString().split('T')[0] : '',
      source: entry.source || '',
      description: entry.description || '',
      tripType: entry.tripType || 'collection',
    });
    setEditEntry(entry);
    setFormErrors({});
    setShowModal(true);
  };

  const validate = () => {
    const errs = {};
    if (!form.amount || isNaN(+form.amount) || +form.amount <= 0) errs.amount = 'Enter a valid amount';
    if (!form.date) errs.date = 'Date is required';
    if (!form.source.trim()) errs.source = 'Source is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    if (!selectedCar) return;

    setSubmitting(true);
    try {
      let updatedCar;
      if (editEntry) {
        updatedCar = await apiRequest(`/cars/${selectedCar._id}/revenue/${editEntry._id}`, {
          method: 'PUT', body: JSON.stringify({ ...form, amount: +form.amount }),
        });
      } else {
        updatedCar = await apiRequest(`/cars/${selectedCar._id}/revenue`, {
          method: 'POST', body: JSON.stringify({ ...form, amount: +form.amount }),
        });
      }
      setCars(prev => prev.map(c => c._id === selectedCar._id ? updatedCar.data : c));
      setSelectedCar(updatedCar.data);
      setShowModal(false);
      showToast(editEntry ? 'Revenue entry updated!' : 'Revenue entry added!');
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (entry) => {
    if (!window.confirm(`Delete this revenue entry of ${formatCurrency(entry.amount)}?`)) return;
    try {
      const updatedCar = await apiRequest(`/cars/${selectedCar._id}/revenue/${entry._id}`, { method: 'DELETE' });
      setCars(prev => prev.map(c => c._id === selectedCar._id ? updatedCar.data : c));
      setSelectedCar(updatedCar.data);
      showToast('Revenue entry deleted');
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  const handlePrint = () => {
    if (!selectedCarData) return;
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>Car Revenue Report - ${selectedCarData.plateNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; color: #1a1a2e; }
        h1 { color: #1e3a5f; } table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background: #1e3a5f; color: white; padding: 10px; text-align: left; }
        td { padding: 8px 10px; border-bottom: 1px solid #e5e7eb; }
        tr:nth-child(even) { background: #f9fafb; }
        .total { font-weight: bold; margin-top: 20px; font-size: 16px; }
        .badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; }
      </style></head>
      <body>
        <h1>Car Revenue Report</h1>
        <p><strong>Plate:</strong> ${selectedCarData.plateNumber} &nbsp; <strong>Type:</strong> ${selectedCarData.carType}</p>
        <p><strong>Total Revenue:</strong> ${formatCurrency(selectedCarData.totalRevenue)} &nbsp; <strong>Total Expenses:</strong> ${formatCurrency(selectedCarData.totalExpenses)} &nbsp; <strong>Net Profit:</strong> ${formatCurrency(selectedCarData.netProfit)}</p>
        <table>
          <thead><tr><th>Date</th><th>Source</th><th>Trip Type</th><th>Description</th><th>Amount</th></tr></thead>
          <tbody>
            ${filteredEntries.map(e => `<tr>
              <td>${formatDate(e.date)}</td>
              <td>${e.source}</td>
              <td>${getTripType(e.tripType).label}</td>
              <td>${e.description || '-'}</td>
              <td>${formatCurrency(e.amount)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
        <p class="total">Total shown: ${formatCurrency(filteredEntries.reduce((s, e) => s + e.amount, 0))}</p>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#f0f4ff', fontFamily: "'Segoe UI', sans-serif" }}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-2xl" style={{ background: 'linear-gradient(135deg,#1e3a5f,#2563eb)' }}>
            <TrendingUp size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold" style={{ color: '#1e3a5f' }}>Car Revenue</h1>
            <p className="text-sm text-gray-500">Track and manage revenue for every vehicle in your fleet</p>
          </div>
        </div>
      </div>

      {/* Global Stats */}
      <div className="px-6 pb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Revenue" value={formatCurrency(globalStats.totalRevenue)} sub="All cars combined" gradient="linear-gradient(135deg,#059669,#10b981)" iconBg="rgba(255,255,255,0.2)" />
        <StatCard icon={ArrowDownRight} label="Total Expenses" value={formatCurrency(globalStats.totalExpenses)} sub="All car expenses" gradient="linear-gradient(135deg,#dc2626,#ef4444)" iconBg="rgba(255,255,255,0.2)" />
        <StatCard icon={ArrowUpRight} label="Net Profit" value={formatCurrency(globalStats.netProfit)} sub="Revenue minus expenses" gradient={globalStats.netProfit >= 0 ? "linear-gradient(135deg,#1d4ed8,#2563eb)" : "linear-gradient(135deg,#b45309,#f59e0b)"} iconBg="rgba(255,255,255,0.2)" />
        <StatCard icon={BarChart2} label="Revenue Entries" value={globalStats.totalEntries} sub={`Across ${cars.length} cars`} gradient="linear-gradient(135deg,#6d28d9,#8b5cf6)" iconBg="rgba(255,255,255,0.2)" />
      </div>

      <div className="px-6 flex gap-6 flex-col lg:flex-row">
        {/* Left: Car List */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center gap-2" style={{ background: 'linear-gradient(135deg,#1e3a5f,#2563eb)' }}>
              <Car size={18} className="text-white" />
              <h2 className="font-bold text-white">Fleet</h2>
              <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{cars.length}</span>
            </div>
            {/* Search */}
            <div className="px-4 py-3 border-b">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                <Search size={16} className="text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cars..." className="bg-transparent text-sm outline-none flex-1 text-gray-700" />
              </div>
            </div>
            {/* Car Items */}
            <div className="overflow-y-auto" style={{ maxHeight: 480 }}>
              {loading ? (
                <div className="py-12 text-center text-gray-400 text-sm">Loading cars…</div>
              ) : filteredCars.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-sm">No cars found</div>
              ) : filteredCars.map(car => {
                const isSelected = selectedCar?._id === car._id;
                return (
                  <div
                    key={car._id}
                    onClick={() => { setSelectedCar(car); setFilterType('all'); setFilterMonth(''); }}
                    className="px-4 py-3 cursor-pointer border-b transition-all"
                    style={{ background: isSelected ? '#eff6ff' : 'white', borderLeft: isSelected ? '4px solid #2563eb' : '4px solid transparent' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm" style={{ color: '#1e3a5f' }}>{car.plateNumber}</p>
                        <p className="text-xs text-gray-500">{car.carType}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold" style={{ color: car.netProfit >= 0 ? '#059669' : '#dc2626' }}>{formatCurrency(car.totalRevenue)}</p>
                        <p className="text-xs text-gray-400">{car.entryCount} entries</p>
                      </div>
                    </div>
                    {/* Mini bar */}
                    {car.totalRevenue > 0 && (
                      <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (car.totalRevenue / Math.max(...filteredCars.map(c => c.totalRevenue), 1)) * 100)}%`, background: 'linear-gradient(90deg,#2563eb,#10b981)' }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Revenue Detail */}
        <div className="flex-1">
          {!selectedCar ? (
            <div className="bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center py-24 text-center">
              <div className="p-5 rounded-3xl mb-4" style={{ background: '#eff6ff' }}>
                <TrendingUp size={40} style={{ color: '#2563eb' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1e3a5f' }}>Select a Car</h3>
              <p className="text-gray-400 text-sm">Choose a car from the list to view and manage its revenue entries</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              {/* Car Header */}
              <div className="px-7 py-5 flex items-center gap-4 flex-wrap" style={{ background: 'linear-gradient(135deg,#1e3a5f,#2563eb)' }}>
                <div className="p-3 bg-white/20 rounded-2xl"><Car size={24} className="text-white" /></div>
                <div className="flex-1">
                  <h2 className="text-xl font-extrabold text-white">{selectedCarData?.plateNumber}</h2>
                  <p className="text-sm text-white/70">{selectedCarData?.carType}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-white/20 hover:bg-white/30 transition-all">
                    <Printer size={16} /> Print
                  </button>
                  <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-white/20 hover:bg-white/30 transition-all">
                    <Plus size={16} /> Add Revenue
                  </button>
                </div>
              </div>

              {/* Car Stats */}
              <div className="grid grid-cols-3 divide-x border-b">
                {[
                  { label: 'Total Revenue', value: formatCurrency(selectedCarData?.totalRevenue), color: '#059669' },
                  { label: 'Total Expenses', value: formatCurrency(selectedCarData?.totalExpenses), color: '#dc2626' },
                  { label: 'Net Profit', value: formatCurrency(selectedCarData?.netProfit), color: selectedCarData?.netProfit >= 0 ? '#059669' : '#dc2626' },
                ].map(s => (
                  <div key={s.label} className="px-6 py-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                    <p className="text-xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Trip Type Breakdown */}
              <div className="px-6 py-4 border-b bg-gray-50">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Revenue by Trip Type</p>
                <div className="flex flex-wrap gap-3">
                  {TRIP_TYPES.map(t => {
                    const total = (selectedCarData?.revenueEntries || []).filter(e => e.tripType === t.value).reduce((s, e) => s + e.amount, 0);
                    return (
                      <div key={t.value} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium" style={{ background: t.bg, color: t.color }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                        {t.label}: <strong>{formatCurrency(total)}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Filters */}
              <div className="px-6 py-4 border-b flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 min-w-0">
                  <Filter size={15} className="text-gray-400" />
                  <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-transparent text-sm outline-none text-gray-700 w-full">
                    <option value="all">All Trip Types</option>
                    {TRIP_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                  <Calendar size={15} className="text-gray-400" />
                  <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} className="bg-transparent text-sm outline-none text-gray-700" />
                </div>
                {(filterType !== 'all' || filterMonth) && (
                  <button onClick={() => { setFilterType('all'); setFilterMonth(''); }} className="text-xs text-red-500 hover:text-red-700 font-medium">Clear</button>
                )}
                <span className="ml-auto text-xs text-gray-400">{filteredEntries.length} entries • {formatCurrency(filteredEntries.reduce((s, e) => s + e.amount, 0))}</span>
              </div>

              {/* Entries Table */}
              <div className="overflow-x-auto">
                {filteredEntries.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="p-4 rounded-2xl inline-block mb-3" style={{ background: '#eff6ff' }}>
                      <FileText size={32} style={{ color: '#2563eb' }} />
                    </div>
                    <p className="font-semibold text-gray-600">No revenue entries found</p>
                    <p className="text-sm text-gray-400 mt-1">Add the first revenue entry for this car</p>
                    <button onClick={openAdd} className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#1e3a5f,#2563eb)' }}>
                      <Plus size={14} className="inline mr-1" /> Add Revenue Entry
                    </button>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: '#f8faff' }}>
                        {['Date', 'Source', 'Trip Type', 'Description', 'Amount', 'Actions'].map(h => (
                          <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEntries.map((entry, i) => {
                        const tt = getTripType(entry.tripType);
                        return (
                          <tr key={entry._id} className="border-t hover:bg-blue-50/40 transition-colors">
                            <td className="px-5 py-3.5">
                              <span className="flex items-center gap-1.5 text-gray-700 font-medium">
                                <Calendar size={14} className="text-gray-400" /> {formatDate(entry.date)}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 font-semibold text-gray-800">{entry.source}</td>
                            <td className="px-5 py-3.5">
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: tt.bg, color: tt.color }}>{tt.label}</span>
                            </td>
                            <td className="px-5 py-3.5 text-gray-500 max-w-xs truncate">{entry.description || <span className="italic text-gray-300">—</span>}</td>
                            <td className="px-5 py-3.5 font-extrabold text-emerald-600 text-base">{formatCurrency(entry.amount)}</td>
                            <td className="px-5 py-3.5">
                              <div className="flex gap-1">
                                <button onClick={() => openEdit(entry)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors" title="Edit"><Edit2 size={15} /></button>
                                <button onClick={() => handleDelete(entry)} className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors" title="Delete"><Trash2 size={15} /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal title={editEntry ? 'Edit Revenue Entry' : 'Add Revenue Entry'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Amount ($) *</label>
                <input type="number" step="0.01" min="0.01" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2" style={{ borderColor: formErrors.amount ? '#ef4444' : '#e5e7eb', focusBorderColor: '#2563eb' }} placeholder="0.00" />
                {formErrors.amount && <p className="text-xs text-red-500 mt-1">{formErrors.amount}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2" style={{ borderColor: formErrors.date ? '#ef4444' : '#e5e7eb' }} />
                {formErrors.date && <p className="text-xs text-red-500 mt-1">{formErrors.date}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Source / Village *</label>
              <input type="text" value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2" style={{ borderColor: formErrors.source ? '#ef4444' : '#e5e7eb' }} placeholder="e.g. Village A, Customer B" />
              {formErrors.source && <p className="text-xs text-red-500 mt-1">{formErrors.source}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Trip Type</label>
              <div className="grid grid-cols-2 gap-2">
                {TRIP_TYPES.map(t => (
                  <label key={t.value} className="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer border transition-all" style={{ background: form.tripType === t.value ? t.bg : 'white', borderColor: form.tripType === t.value ? t.color : '#e5e7eb', color: form.tripType === t.value ? t.color : '#6b7280' }}>
                    <input type="radio" name="tripType" value={t.value} checked={form.tripType === t.value} onChange={e => setForm(f => ({ ...f, tripType: e.target.value }))} className="accent-blue-600" />
                    <span className="text-sm font-medium">{t.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description (optional)</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 resize-none" style={{ borderColor: '#e5e7eb' }} placeholder="Any notes about this revenue..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
              <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all" style={{ background: 'linear-gradient(135deg,#1e3a5f,#2563eb)', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Saving…' : editEntry ? 'Save Changes' : 'Add Entry'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      <div className="h-10" />
    </div>
  );
};

export default CarRevenue;
