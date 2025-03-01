import React, { useState } from 'react';
import { Search, Upload, Share2, Shield, Database, FileText, Clock, User, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

// Reusable Components
const Button = ({ children, variant = 'primary', icon, onClick }) => {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${variantClasses[variant]}`}
    >
      {icon}
      {children}
    </button>
  );
};

const Card = ({ title, children, className }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

const FileItem = ({ file, onShare }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'tampered': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 rounded-md p-3 mb-2 hover:bg-gray-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText size={20} className="text-gray-500" />
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">Case #{file.caseId} • {file.size} • {file.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
            {file.status}
          </span>
          <Button variant="secondary" icon={<Share2 size={16} />} onClick={() => onShare(file)}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Database size={20} /> },
    { id: 'evidence', label: 'Evidence Files', icon: <FileText size={20} /> },
    { id: 'upload', label: 'Upload New', icon: <Upload size={20} /> },
    { id: 'shared', label: 'Shared With Me', icon: <Share2 size={20} /> },
    { id: 'audit', label: 'Audit Trails', icon: <Clock size={20} /> },
    { id: 'users', label: 'User Access', icon: <User size={20} /> },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Shield size={24} className="text-blue-400" />
          <h1 className="text-xl font-bold">EvidenceChain</h1>
        </div>
        <p className="text-sm text-gray-400 mt-1">Blockchain Evidence System</p>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {menuItems.map(item => (
            <li key={item.id} className="mb-1">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="font-bold text-white">JD</span>
          </div>
          <div>
            <p className="font-medium">Det. John Doe</p>
            <p className="text-sm text-gray-400">Central Precinct</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Application Component
const EvidenceStorageSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadFiles, setUploadFiles] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Sample Evidence Files
  const [evidenceFiles, setEvidenceFiles] = useState([
    { id: 1, name: 'Crime_Scene_Photo_001.jpg', caseId: '2025-0142', size: '3.2 MB', date: '01/03/2025', status: 'verified', hash: '0x8f4e2c...b7a9' },
    { id: 2, name: 'Witness_Statement_Jones.pdf', caseId: '2025-0142', size: '1.8 MB', date: '28/02/2025', status: 'verified', hash: '0x7d3a1b...c5e2' },
    { id: 3, name: 'Forensic_Analysis_Report.pdf', caseId: '2025-0142', size: '4.5 MB', date: '25/02/2025', status: 'pending', hash: '0x2e9f8d...a4c3' },
    { id: 4, name: 'Surveillance_Footage_Main_St.mp4', caseId: '2025-0139', size: '256 MB', date: '22/02/2025', status: 'verified', hash: '0x1a7b9c...e8d2' },
    { id: 5, name: 'DNA_Test_Results.xlsx', caseId: '2025-0139', size: '1.2 MB', date: '20/02/2025', status: 'tampered', hash: '0x3c5d9e...f7b6' }
  ]);
  
  // Sample Users for Sharing
  const users = [
    { id: 1, name: 'Captain Sarah Johnson', department: 'Central Station', role: 'Captain' },
    { id: 2, name: 'DA Michael Robinson', department: 'District Attorney Office', role: 'Prosecutor' },
    { id: 3, name: 'Officer James Wilson', department: 'South Precinct', role: 'Officer' },
    { id: 4, name: 'Dr. Lisa Morgan', department: 'Forensics Lab', role: 'Forensic Scientist' }
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    setUploadFiles(files);
  };

  const handleShare = (file) => {
    setSelectedFile(file);
    setShowShareModal(true);
  };

  const handleUpload = () => {
    if (uploadFiles.length === 0) return;
    
    // Simulate blockchain upload and processing
    const newFiles = uploadFiles.map((file, index) => ({
      id: evidenceFiles.length + index + 1,
      name: file.name,
      caseId: document.getElementById('caseId').value || '2025-NEW',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toLocaleDateString('en-GB'),
      status: 'pending',
      hash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`
    }));
    
    setEvidenceFiles([...newFiles, ...evidenceFiles]);
    setUploadFiles([]);
    setActiveTab('evidence');
  };

  // Filter files based on search query
  const filteredFiles = evidenceFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.caseId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Content for each tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card title="Total Evidence Files" className="bg-blue-50">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">{evidenceFiles.length}</span>
                  <FileText size={32} className="text-blue-500" />
                </div>
              </Card>
              <Card title="Verified Evidence" className="bg-green-50">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">{evidenceFiles.filter(f => f.status === 'verified').length}</span>
                  <CheckCircle size={32} className="text-green-500" />
                </div>
              </Card>
              <Card title="Pending Verification" className="bg-yellow-50">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">{evidenceFiles.filter(f => f.status === 'pending').length}</span>
                  <Clock size={32} className="text-yellow-500" />
                </div>
              </Card>
            </div>
            
            <Card title="Recent Evidence Files">
              <div className="space-y-2">
                {evidenceFiles.slice(0, 3).map(file => (
                  <FileItem key={file.id} file={file} onShare={handleShare} />
                ))}
              </div>
              <button
                onClick={() => setActiveTab('evidence')}
                className="text-blue-600 font-medium text-sm mt-2 hover:underline"
              >
                View all files
              </button>
            </Card>
            
            <Card title="System Status">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Blockchain Network</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>File Storage System</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Verification Service</span>
                  </div>
                  <span className="text-sm text-yellow-600 font-medium">Slight Delay</span>
                </div>
              </div>
            </Card>
          </div>
        );
      case 'evidence':
        return (
          <Card title="Evidence Files">
            <div className="mb-4 flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search files by name or case number..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <Button 
                variant="primary" 
                icon={<Upload size={18} />}
                onClick={() => setActiveTab('upload')}
                className="ml-2"
              >
                Upload New
              </Button>
            </div>
            
            {filteredFiles.length > 0 ? (
              <div className="space-y-2">
                {filteredFiles.map(file => (
                  <FileItem key={file.id} file={file} onShare={handleShare} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText size={48} className="mx-auto mb-2 text-gray-400" />
                <p>No evidence files found matching your search.</p>
              </div>
            )}
          </Card>
        );
      case 'upload':
        return (
          <Card title="Upload Evidence Files">
            <div className="mb-4">
              <label htmlFor="caseId" className="block text-sm font-medium text-gray-700 mb-1">
                Case Number
              </label>
              <input
                type="text"
                id="caseId"
                placeholder="Enter case number (e.g., 2025-0142)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                className="hidden"
                onChange={handleFileInput}
              />
              <Upload size={36} className="mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600 mb-1">Drag and drop files here or click to browse</p>
              <p className="text-sm text-gray-500">Supported formats: JPG, PNG, PDF, MP4, MP3, XLSX, DOCX</p>
            </div>
            
            {uploadFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Files to Upload:</h4>
                <div className="space-y-2">
                  {uploadFiles.map((file, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-gray-500" />
                        <span>{file.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="success" 
                    icon={<Upload size={18} />}
                    onClick={handleUpload}
                  >
                    Upload to Blockchain
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => setUploadFiles([])}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>
        );
      case 'shared':
        return (
          <Card title="Evidence Shared With You">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search shared evidence..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="space-y-2">
              <FileItem 
                file={{
                  name: "Surveillance_Video_East_St.mp4",
                  caseId: "2025-0156",
                  size: "185 MB",
                  date: "28/02/2025",
                  status: "verified"
                }}
                onShare={handleShare}
              />
              <FileItem 
                file={{
                  name: "Fingerprint_Analysis.pdf",
                  caseId: "2025-0156",
                  size: "2.8 MB",
                  date: "27/02/2025",
                  status: "verified"
                }}
                onShare={handleShare}
              />
            </div>
          </Card>
        );
      case 'audit':
        return (
          <Card title="Audit Trails">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {new Date(2025, 2, 1 - i).toLocaleDateString('en-GB')} • {Math.floor(Math.random() * 12) + 10}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p className="font-medium">
                    {["File uploaded", "Evidence accessed", "Shared with DA Office", "Verification completed", "Metadata updated"][i-1]} - 
                    {" Crime_Scene_Photo_00" + i + ".jpg"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      Case #2025-01{Math.floor(Math.random() * 100)}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      By: {["Det. John Doe", "Officer Wilson", "Capt. Johnson", "System", "Forensic Lab"][i-1]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      default:
        return (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-yellow-600" />
              <p>This section is currently under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {(() => {
                switch(activeTab) {
                  case 'dashboard': return 'Dashboard';
                  case 'evidence': return 'Evidence Files';
                  case 'upload': return 'Upload New Evidence';
                  case 'shared': return 'Shared Evidence';
                  case 'audit': return 'Audit Trails';
                  case 'users': return 'User Access Management';
                  default: return 'Dashboard';
                }
              })()}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Lock size={16} className="text-green-600" />
                <span className="text-green-600 font-medium">Blockchain Secured</span>
              </div>
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderTabContent()}
        </main>
      </div>
      
      {/* Share Modal */}
      {showShareModal && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Share Evidence</h3>
              <p className="text-sm text-gray-500">
                {selectedFile.name} • Case #{selectedFile.caseId}
              </p>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Share with users or departments
                </label>
                <input
                  type="text"
                  placeholder="Search by name or department..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-700">Suggested Recipients:</p>
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.department} • {user.role}</p>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2 h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Level
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option>View Only</option>
                  <option>Download Allowed</option>
                  <option>Full Access</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Add a message to the recipients..."
                  rows="2"
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowShareModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" icon={<Share2 size={16} />}>
                Share Evidence
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceStorageSystem;