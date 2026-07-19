'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiClient } from '@/services/api';

interface DocumentUploadProps {
  onboardingId: number | null;
  documentType: string;
  label: string;
  required?: boolean;
  allowedTypes?: string[];
  maxFileSize?: number; // in bytes
  onUpload?: (documentId: string) => void;
  existingDocumentId?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onboardingId,
  documentType,
  label,
  required = false,
  allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'],
  maxFileSize = 10485760, // 10MB
  onUpload,
  existingDocumentId,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedDocumentId, setUploadedDocumentId] = useState<string | null>(existingDocumentId || null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError('');

    // Validate file type
    if (!allowedTypes.includes(selectedFile.type)) {
      setError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (selectedFile.size > maxFileSize) {
      setError(`File too large. Maximum size: ${(maxFileSize / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    setFile(selectedFile);

    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !onboardingId) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      const response = await apiClient.post(
        `/vendor-onboarding/${onboardingId}/upload-document`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUploadedDocumentId(response.data.documentId);
      setSuccess('Document uploaded successfully');
      setFile(null);
      setPreview(null);
      
      if (onUpload) {
        onUpload(response.data.documentId);
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!uploadedDocumentId || !onboardingId) return;

    try {
      await apiClient.delete(
        `/vendor-onboarding/${onboardingId}/document/${uploadedDocumentId}`
      );
      setUploadedDocumentId(null);
      setSuccess('Document deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete document');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-900">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      </div>

      {uploadedDocumentId ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-900">Document uploaded</p>
              <p className="text-xs text-green-700">ID: {uploadedDocumentId}</p>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="text-green-600 hover:text-green-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      ) : (
        <>
          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept={allowedTypes.join(',')}
              className="hidden"
            />

            {preview ? (
              <div className="flex flex-col items-center">
                <img src={preview} alt="Preview" className="max-h-32 max-w-32 mb-4 rounded" />
                <p className="text-sm font-semibold text-gray-900">{file?.name}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm font-semibold text-gray-900">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">
                  Max size: {(maxFileSize / 1024 / 1024).toFixed(2)}MB
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {file && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
          )}
        </>
      )}

      {/* Error/Success Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
        >
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
        >
          <CheckCircle className="w-5 h-5" />
          <p className="text-sm">{success}</p>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentUpload;
