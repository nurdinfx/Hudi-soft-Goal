import React, { useEffect, useMemo, useState } from 'react';
import { apiService } from '../services/api';
import { Printer, MapPin, Users, DollarSign, Loader, Phone, Search, Calendar, ChevronRight } from 'lucide-react';

const formatCurrency = (amount) => 'KSh ' + Number(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatDate = (d) => {
  if (!d) return 'N/A';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function CustomerDetails() {
  const [customers, setCustomers] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [custRes, zonesRes] = await Promise.all([
        apiService.getCustomers().catch(() => []),
        apiService.getZones().catch(() => [])
      ]);

      const custData = Array.isArray(custRes) ? custRes : (custRes?.data || []);
      const zoneData = Array.isArray(zonesRes) ? zonesRes : (zonesRes?.data || []);

      setCustomers(custData);
      setZones(zoneData);

      if (custData.length > 0 && !selectedCustomerId) {
        setSelectedCustomerId(custData[0]._id);
      }
    } catch (error) {
      console.error('Error loading customer details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phoneNumber?.includes(searchTerm) ||
        c.address?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const zoneIdStr = c.zoneId?._id || c.zoneId;
      const matchesZone = selectedZoneFilter === 'all' || zoneIdStr === selectedZoneFilter;
      return matchesSearch && matchesZone;
    });
  }, [customers, searchTerm, selectedZoneFilter]);

  // Selected customer detailed view
  const selectedCustomer = useMemo(() => {
    return customers.find(c => c._id === selectedCustomerId) || filteredCustomers[0] || null;
  }, [customers, selectedCustomerId, filteredCustomers]);

  // Calculate stats for chosen customer
  const customerStats = useMemo(() => {
    if (!selectedCustomer) return { totalPaid: 0, paymentCount: 0, history: [] };

    let history = [];
    if (Array.isArray(selectedCustomer.paymentHistory) && selectedCustomer.paymentHistory.length > 0) {
      history = selectedCustomer.paymentHistory;
    } else if (selectedCustomer.payments) {
      const pObj = selectedCustomer.payments instanceof Map 
        ? Object.fromEntries(selectedCustomer.payments) 
        : selectedCustomer.payments;
      
      history = Object.entries(pObj).map(([month, p]) => ({
        month,
        amount: p.totalDue || p.paid || 0,
        paid: p.paid || 0,
        paidDate: p.paidDate || p.date,
        method: 'cash'
      }));
    }

    const totalPaid = history.reduce((sum, item) => sum + (Number(item.paid) || 0), 0);
    return {
      totalPaid,
      paymentCount: history.filter(h => (h.paid || 0) > 0).length,
      history
    };
  }, [selectedCustomer]);

  // Overall system customer summary totals
  const totalSummary = useMemo(() => {
    const totalCust = customers.length;
    let grandRevenue = 0;
    customers.forEach(c => {
      if (Array.isArray(c.paymentHistory)) {
        grandRevenue += c.paymentHistory.reduce((sum, h) => sum + (Number(h.paid) || 0), 0);
      } else if (c.payments) {
        const pObj = c.payments instanceof Map ? Object.fromEntries(c.payments) : c.payments;
        Object.values(pObj).forEach(p => { grandRevenue += Number(p?.paid || 0); });
      }
    });
    return { totalCust, grandRevenue };
  }, [customers]);

  const handlePrint = () => {
    const w = window.open('', '_blank');
    const todayStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    w.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Customer Revenue & Details Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 24px; color: #1e293b; }
            .header { text-align: center; margin-bottom: 24px; border-bottom: 2px solid #2563eb; padding-bottom: 12px; }
            .title { font-size: 24px; font-weight: 700; color: #1e3a8a; }
            .subtitle { font-size: 14px; color: #64748b; margin-top: 4px; }
            .stats-grid { display: flex; justify-content: space-between; margin-bottom: 20px; background: #f8fafc; padding: 16px; border-radius: 8px; }
            .stat-box { font-size: 14px; }
            .stat-box strong { font-size: 18px; color: #2563eb; display: block; margin-top: 4px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th { background: #2563eb; color: #fff; padding: 10px 12px; text-align: left; font-size: 12px; text-transform: uppercase; }
            td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
            .right { text-align: right; }
            .total-row { background: #eff6ff; font-weight: 700; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Customer Revenue Details Report</div>
            <div class="subtitle">Generated on ${todayStr}</div>
          </div>

          <div class="stats-grid">
            <div class="stat-box">Total Customers: <strong>${totalSummary.totalCust}</strong></div>
            <div class="stat-box">Total Revenue Collected: <strong>${formatCurrency(totalSummary.grandRevenue)}</strong></div>
            <div class="stat-box">System Type: <strong>Water Cargo Cars System</strong></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th class="right">Total Revenue Paid</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCustomers.map(c => {
                let totalPaid = 0;
                if (Array.isArray(c.paymentHistory)) {
                  totalPaid = c.paymentHistory.reduce((s, h) => s + (Number(h.paid) || 0), 0);
                } else if (c.payments) {
                  const pObj = c.payments instanceof Map ? Object.fromEntries(c.payments) : c.payments;
                  Object.values(pObj).forEach(p => { totalPaid += Number(p?.paid || 0); });
                }
                return `
                  <tr>
                    <td><strong>${c.fullName || ''}</strong></td>
                    <td>${c.phoneNumber || ''}</td>
                    <td>${c.address || ''}</td>
                    <td class="right"><strong>${formatCurrency(totalPaid)}</strong></td>
                  </tr>
                `;
              }).join('')}
              <tr class="total-row">
                <td colspan="3"><strong>GRAND TOTAL</strong></td>
                <td class="right"><strong>${formatCurrency(totalSummary.grandRevenue)}</strong></td>
              </tr>
            </tbody>
          </table>

          <script>window.onload = function(){ window.print(); setTimeout(()=>window.close(), 800); }</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-blue-600 mr-2" />
        <span className="text-gray-600 font-medium">Loading Customer Details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Details</h1>
              <p className="text-gray-500 text-sm mt-0.5">Water Cargo Cars Customer Revenue & Address Directory</p>
            </div>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center shadow-sm transition-all"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Customer Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Customers</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalSummary.totalCust}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Customer Revenue</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(totalSummary.grandRevenue)}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Active Customer Locations</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{customers.filter(c => c.address).length}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Customer Selection & Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Customer Selector & List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Select Customer
          </h2>

          {/* Search & Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by name, phone, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {zones.length > 0 && (
              <select
                value={selectedZoneFilter}
                onChange={(e) => setSelectedZoneFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Zones</option>
                {zones.map(z => (
                  <option key={z._id} value={z._id}>{z.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* Customer List */}
          <div className="max-h-[460px] overflow-y-auto space-y-2 pr-1">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">No customers found</div>
            ) : (
              filteredCustomers.map(c => {
                const isSelected = selectedCustomer?._id === c._id;
                let cTotalPaid = 0;
                if (Array.isArray(c.paymentHistory)) {
                  cTotalPaid = c.paymentHistory.reduce((s, h) => s + (Number(h.paid) || 0), 0);
                } else if (c.payments) {
                  const pObj = c.payments instanceof Map ? Object.fromEntries(c.payments) : c.payments;
                  Object.values(pObj).forEach(p => { cTotalPaid += Number(p?.paid || 0); });
                }

                return (
                  <button
                    key={c._id}
                    onClick={() => setSelectedCustomerId(c._id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-sm' 
                        : 'border-transparent hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold text-sm truncate">{c.fullName}</p>
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        {c.address || 'No address'}
                      </p>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-1">
                      <div>
                        <p className="text-xs font-semibold text-emerald-600">{formatCurrency(cTotalPaid)}</p>
                        <p className="text-[10px] text-gray-400">{c.phoneNumber}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-300'}`} />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Customer Detailed Breakdown Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {selectedCustomer ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
              {/* Customer Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedCustomer.fullName}</h2>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-500" />
                      {selectedCustomer.phoneNumber || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      {selectedCustomer.address || 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-right">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">Total Customer Revenue</p>
                  <p className="text-xl font-extrabold">{formatCurrency(customerStats.totalPaid)}</p>
                </div>
              </div>

              {/* Payment History Breakdown */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Revenue Payment History ({customerStats.paymentCount} Payments)
                </h3>

                {customerStats.history.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm bg-gray-50 rounded-xl">
                    No payment records found for this customer.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-gray-100 rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          <th className="py-3 px-4">Month / Date</th>
                          <th className="py-3 px-4">Method</th>
                          <th className="py-3 px-4 text-right">Paid Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {customerStats.history.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">
                              {item.month ? `${item.month}` : formatDate(item.paidDate || item.date)}
                              {item.paidDate && (
                                <span className="block text-xs text-gray-400">{formatDate(item.paidDate)}</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-gray-500 capitalize">{item.method || 'cash'}</td>
                            <td className="py-3 px-4 text-right font-semibold text-emerald-600">
                              {formatCurrency(item.paid || 0)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
              Select a customer from the left list to view detailed revenue and address details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
