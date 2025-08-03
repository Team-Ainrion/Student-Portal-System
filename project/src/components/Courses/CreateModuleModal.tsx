import React, { useState } from 'react';
import { X, Plus, Upload, Link, FileText, Video } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

interface CreateModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

export default function CreateModuleModal({ isOpen, onClose, courseId }: CreateModuleModalProps) {
  const { addModule } = useData();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: new Date().toISOString().split('T')[0],
  });
  const [materials, setMaterials] = useState<Array<{
    title: string;
    type: 'pdf' | 'video' | 'document' | 'link';
    url: string;
  }>>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would integrate with the course update functionality
    console.log('Creating module:', {
      ...formData,
      materials,
      courseId,
    });
    
    onClose();
    setFormData({ title: '', description: '', releaseDate: new Date().toISOString().split('T')[0] });
    setMaterials([]);
  };

  const addMaterial = () => {
    setMaterials([...materials, { title: '', type: 'pdf', url: '' }]);
  };

  const updateMaterial = (index: number, field: string, value: string) => {
    const updated = materials.map((material, i) => 
      i === index ? { ...material, [field]: value } : material
    );
    setMaterials(updated);
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'link': return Link;
      default: return FileText;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Create New Module</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Module Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter module title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe what students will learn in this module"
              required
            />
          </div>

          <div>
            <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-2">
              Release Date
            </label>
            <input
              id="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Learning Materials
              </label>
              <button
                type="button"
                onClick={addMaterial}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add Material</span>
              </button>
            </div>

            <div className="space-y-3">
              {materials.map((material, index) => {
                const IconComponent = getTypeIcon(material.type);
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <IconComponent className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={material.title}
                        onChange={(e) => updateMaterial(index, 'title', e.target.value)}
                        placeholder="Material title"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={material.type}
                        onChange={(e) => updateMaterial(index, 'type', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pdf">PDF</option>
                        <option value="video">Video</option>
                        <option value="document">Document</option>
                        <option value="link">Link</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeMaterial(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex space-x-3">
                      <input
                        type="url"
                        value={material.url}
                        onChange={(e) => updateMaterial(index, 'url', e.target.value)}
                        placeholder={material.type === 'link' ? 'https://...' : 'File URL or upload'}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}