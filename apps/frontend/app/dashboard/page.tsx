"use client"
import React, { useState, useMemo } from 'react';
import { Search, Globe, CheckCircle, XCircle, Clock, RefreshCw, Plus, X } from 'lucide-react';

interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down';
  responseTime: number;
  uptime: number;
  lastChecked: Date;
}

interface AddWebsiteForm {
  name: string;
  url: string;
}

const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'Main Website',
    url: 'https://example.com',
    status: 'down',
    responseTime: 245,
    uptime: 80,
    lastChecked: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: '2',
    name: 'API Server',
    url: 'https://api.example.com',
    status: 'up',
    responseTime: 156,
    uptime: 99.7,
    lastChecked: new Date(Date.now() - 3 * 60 * 1000)
  },

];


function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function StatusBadge({ status }: { status: 'up' | 'down' }) {
  const isUp = status === 'up';
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
      isUp 
        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
        : 'bg-red-100 text-red-800 hover:bg-red-200'
    }`}>
      {isUp ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {isUp ? 'Up' : 'Down'}
    </div>
  );
}

function UptimeBar({ percentage }: { percentage: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${
            percentage >= 99 ? 'bg-emerald-500' : 
            percentage >= 95 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">{percentage}%</span>
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'up' | 'down'>('all');
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<AddWebsiteForm>({ name: '', url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredWebsites = useMemo(() => {
    return websites.filter(website => {
      const matchesSearch = website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          website.url.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || website.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, websites]);

  const stats = useMemo(() => {
    const total = websites.length;
    const up = websites.filter(w => w.status === 'up').length;
    const down = total - up;
    const avgUptime = total > 0 ? websites.reduce((sum, w) => sum + w.uptime, 0) / total : 0;
    
    return { total, up, down, avgUptime };
  }, [websites]);

  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!addForm.name.trim() || !addForm.url.trim()) {
      setIsSubmitting(false);
      return;
    }

    // Ensure URL has protocol
    let formattedUrl = addForm.url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    // Create new website entry
    const newWebsite: Website = {
      id: Date.now().toString(),
      name: addForm.name.trim(),
      url: formattedUrl,
      status: 'up', // Default to up, in real app this would be checked
      responseTime: Math.floor(Math.random() * 400) + 100, // Random for demo
      uptime: 100, // Start with 100% uptime
      lastChecked: new Date()
    };

    // Add to websites list
    setWebsites(prev => [...prev, newWebsite]);

    // Reset form and close modal
    setAddForm({ name: '', url: '' });
    setShowAddModal(false);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setAddForm({ name: '', url: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Website Monitor</h1>
                <p className="text-sm text-gray-600">Track the status of all your websites</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Website
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <RefreshCw className="w-4 h-4" />
                Refresh All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search websites..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('up')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'up'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Up
              </button>
              <button
                onClick={() => setStatusFilter('down')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'down'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Down
              </button>
            </div>
          </div>
        </div>

        {/* Website Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uptime
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Checked
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWebsites.map((website, index) => (
                  <tr 
                    key={website.id}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{website.name}</div>
                        <div className="text-sm text-gray-500">{website.url}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm font-medium ${
                          website.status === 'up' 
                            ? website.responseTime < 200 
                              ? 'text-emerald-600' 
                              : website.responseTime < 500 
                                ? 'text-yellow-600' 
                                : 'text-orange-600'
                            : 'text-gray-400'
                        }`}>
                          {website.status === 'up' ? `${website.responseTime}ms` : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <UptimeBar percentage={website.uptime} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimeAgo(website.lastChecked)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredWebsites.length === 0 && (
            <div className="text-center py-12">
              <Globe className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No websites found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first website to monitor.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Website Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Website</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleAddWebsite} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="website-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Website Name
                  </label>
                  <input
                    id="website-name"
                    type="text"
                    required
                    placeholder="e.g., My Blog, Company Website"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    value={addForm.name}
                    onChange={(e) => setAddForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    id="website-url"
                    type="url"
                    required
                    placeholder="e.g., example.com or https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    value={addForm.url}
                    onChange={(e) => setAddForm(prev => ({ ...prev, url: e.target.value }))}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    You can enter with or without https://
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !addForm.name.trim() || !addForm.url.trim()}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Website
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;