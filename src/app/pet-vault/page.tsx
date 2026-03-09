'use client';

import { useState } from 'react';
import { ShieldCheck, Upload, FileText, Calendar, AlertTriangle, Check, Sparkles, Bell, Plus, Eye, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  type: 'vaccination' | 'bbmp';
  fileName: string;
  uploadDate: string;
  status: 'verified' | 'processing' | 'pending';
  extractedData?: {
    vaccineDate?: string;
    expiryDate?: string;
    registrationNumber?: string;
    petName?: string;
  };
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    type: 'vaccination',
    fileName: 'rabies_certificate_bruno.pdf',
    uploadDate: '2026-08-20',
    status: 'verified',
    extractedData: {
      vaccineDate: '2026-08-15',
      expiryDate: '2026-08-15',
      petName: 'Bruno',
    },
  },
  {
    id: '2',
    type: 'bbmp',
    fileName: 'bbmp_registration_bruno.pdf',
    uploadDate: '2026-06-10',
    status: 'verified',
    extractedData: {
      registrationNumber: 'BBMP/PET/2026/BLR/04521',
      expiryDate: '2026-05-31',
      petName: 'Bruno',
    },
  },
];

export default function PetVaultPage() {
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadType, setUploadType] = useState<'vaccination' | 'bbmp'>('vaccination');
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = () => {
    // Simulate upload + AI extraction
    const newDoc: Document = {
      id: Date.now().toString(),
      type: uploadType,
      fileName: uploadType === 'vaccination' ? 'rabies_cert_new.pdf' : 'bbmp_reg_new.pdf',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'processing',
    };
    setDocuments([...documents, newDoc]);
    setShowUpload(false);

    // Simulate processing
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === newDoc.id
            ? {
                ...d,
                status: 'verified' as const,
                extractedData: uploadType === 'vaccination'
                  ? { vaccineDate: '2026-11-01', expiryDate: '2027-11-01', petName: 'Luna' }
                  : { registrationNumber: 'BBMP/PET/2026/BLR/09932', expiryDate: '2027-10-31', petName: 'Luna' },
              }
            : d
        )
      );
    }, 3000);
  };

  const getDaysUntilExpiry = (expiryDate: string): number => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    return Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getExpiryColor = (days: number) => {
    if (days <= 30) return 'text-accent-coral';
    if (days <= 90) return 'text-accent-amber';
    return 'text-accent-emerald';
  };

  const getExpiryBarWidth = (days: number): string => {
    const maxDays = 365;
    const pct = Math.max(0, Math.min(100, (days / maxDays) * 100));
    return `${pct}%`;
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-violet/10 px-4 py-2 border border-accent-violet/20">
            <Sparkles size={16} className="text-accent-violet" />
            <span className="text-sm font-medium text-accent-violet">AI-Powered</span>
          </div>
          <h1 className="text-3xl font-bold md:text-5xl mb-3">
            BBMP <span className="gradient-text">Pet Vault</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Upload vaccination certificates and BBMP registration documents.
            Our AI extracts key dates and sends WhatsApp reminders before they expire.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-accent-emerald">{documents.filter(d => d.status === 'verified').length}</div>
            <div className="text-xs text-text-muted mt-1">Verified</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-accent-amber">{documents.filter(d => d.status === 'processing').length}</div>
            <div className="text-xs text-text-muted mt-1">Processing</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-accent-coral">
              {documents.filter(d => d.extractedData?.expiryDate && getDaysUntilExpiry(d.extractedData.expiryDate) <= 30).length}
            </div>
            <div className="text-xs text-text-muted mt-1">Expiring Soon</div>
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setShowUpload(true)}
          className="gradient-btn w-full mb-8"
          id="upload-document-btn"
        >
          <span className="flex items-center justify-center gap-2">
            <Plus size={18} />
            Upload Document
          </span>
        </button>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" id="upload-modal">
            <div className="glass-card w-full max-w-md p-6 animate-fade-up">
              <h3 className="text-lg font-bold mb-4">Upload Document</h3>

              {/* Type selector */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Document Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUploadType('vaccination')}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      uploadType === 'vaccination'
                        ? 'bg-accent-amber/15 border-2 border-accent-amber/50 text-accent-amber'
                        : 'glass-card'
                    }`}
                  >
                    💉 Vaccination
                  </button>
                  <button
                    onClick={() => setUploadType('bbmp')}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      uploadType === 'bbmp'
                        ? 'bg-accent-violet/15 border-2 border-accent-violet/50 text-accent-violet'
                        : 'glass-card'
                    }`}
                  >
                    🏛️ BBMP Registration
                  </button>
                </div>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(); }}
                className={`mb-4 rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                  dragOver
                    ? 'border-accent-amber bg-accent-amber/5'
                    : 'border-glass-border hover:border-accent-amber/30'
                }`}
              >
                <Upload size={32} className="mx-auto mb-3 text-text-muted" />
                <p className="text-sm text-text-secondary mb-1">
                  Drag & drop your document here
                </p>
                <p className="text-xs text-text-muted">PDF, JPG, PNG (Max 10MB)</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpload(false)}
                  className="flex-1 rounded-xl border border-glass-border px-4 py-3 text-sm font-medium text-text-secondary hover:bg-bg-tertiary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 gradient-btn"
                  id="confirm-upload-btn"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Upload size={14} />
                    Upload & Extract
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Documents List */}
        <div className="space-y-4" id="documents-list">
          {documents.map((doc) => {
            const daysLeft = doc.extractedData?.expiryDate
              ? getDaysUntilExpiry(doc.extractedData.expiryDate)
              : null;

            return (
              <div key={doc.id} className="glass-card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      doc.type === 'vaccination' ? 'bg-accent-amber/10' : 'bg-accent-violet/10'
                    }`}>
                      {doc.type === 'vaccination' ? (
                        <FileText size={20} className="text-accent-amber" />
                      ) : (
                        <ShieldCheck size={20} className="text-accent-violet" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">
                        {doc.type === 'vaccination' ? 'Vaccination Certificate' : 'BBMP Registration'}
                      </h4>
                      <p className="text-xs text-text-muted">{doc.fileName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.status === 'verified' && (
                      <span className="flex items-center gap-1 rounded-full bg-accent-emerald/10 px-3 py-1 text-xs font-semibold text-accent-emerald">
                        <Check size={12} /> Verified
                      </span>
                    )}
                    {doc.status === 'processing' && (
                      <span className="flex items-center gap-1 rounded-full bg-accent-amber/10 px-3 py-1 text-xs font-semibold text-accent-amber">
                        <Sparkles size={12} className="animate-spin" /> Processing
                      </span>
                    )}
                  </div>
                </div>

                {doc.extractedData && (
                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    {doc.extractedData.vaccineDate && (
                      <div className="rounded-xl bg-bg-tertiary p-3">
                        <span className="text-text-muted">Vaccinated</span>
                        <div className="font-semibold mt-1">{doc.extractedData.vaccineDate}</div>
                      </div>
                    )}
                    {doc.extractedData.registrationNumber && (
                      <div className="rounded-xl bg-bg-tertiary p-3">
                        <span className="text-text-muted">Reg. Number</span>
                        <div className="font-semibold mt-1 text-[11px]">{doc.extractedData.registrationNumber}</div>
                      </div>
                    )}
                    {doc.extractedData.expiryDate && (
                      <div className="rounded-xl bg-bg-tertiary p-3">
                        <span className="text-text-muted">Expires</span>
                        <div className={`font-semibold mt-1 ${daysLeft ? getExpiryColor(daysLeft) : ''}`}>
                          {doc.extractedData.expiryDate}
                        </div>
                      </div>
                    )}
                    {doc.extractedData.petName && (
                      <div className="rounded-xl bg-bg-tertiary p-3">
                        <span className="text-text-muted">Pet</span>
                        <div className="font-semibold mt-1">{doc.extractedData.petName}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Expiry bar */}
                {daysLeft !== null && (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-text-muted flex items-center gap-1">
                        <Calendar size={10} /> Days until renewal
                      </span>
                      <span className={`font-bold ${getExpiryColor(daysLeft)}`}>
                        {daysLeft > 0 ? `${daysLeft} days` : 'Expired!'}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-bg-tertiary">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          daysLeft <= 30 ? 'bg-accent-coral' :
                          daysLeft <= 90 ? 'bg-accent-amber' :
                          'bg-accent-emerald'
                        }`}
                        style={{ width: getExpiryBarWidth(daysLeft) }}
                      />
                    </div>
                    {daysLeft <= 30 && daysLeft > 0 && (
                      <div className="mt-2 flex items-center gap-2 rounded-xl bg-accent-coral/10 px-3 py-2 text-xs text-accent-coral">
                        <AlertTriangle size={12} />
                        <span>Renewal alert will be sent via WhatsApp 30 days before expiry</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <div className="mt-12 glass-card p-8">
          <h3 className="text-lg font-bold mb-6 text-center">How the Pet Vault Works</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Upload, title: 'Upload', desc: 'Upload your pet\'s vaccination certificate or BBMP registration document' },
              { icon: Sparkles, title: 'AI Extracts', desc: 'AWS Textract reads key dates — vaccination date, expiry, registration number' },
              { icon: Bell, title: 'Stay Reminded', desc: 'Get WhatsApp alerts 30 days before any document expires' },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-amber/10">
                    <Icon size={22} className="text-accent-amber" />
                  </div>
                  <h4 className="font-bold mb-1">{s.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
