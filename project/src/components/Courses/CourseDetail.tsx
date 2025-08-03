import React, { useState } from 'react';
import { ArrowLeft, Plus, Users, Calendar, FileText, Video, Link, Download, Eye, Edit, Trash2, BookOpen } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Course, Module } from '../../types';
import CreateModuleModal from './CreateModuleModal';
import CreateAnnouncementModal from './CreateAnnouncementModal';

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
}

export default function CourseDetail({ courseId, onBack }: CourseDetailProps) {
  const { courses, addAnnouncement } = useData();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModule, setShowCreateModule] = useState(false);
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Course not found</h3>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to courses
          </button>
        </div>
      </div>
    );
  }

  const isTeacher = user?.role === 'teacher' && course.teacherId === user.id;
  const isAdmin = user?.role === 'admin';
  const canEdit = isTeacher || isAdmin;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'modules', label: 'Modules', icon: FileText },
    { id: 'announcements', label: 'Announcements', icon: Calendar },
    { id: 'students', label: 'Students', icon: Users },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'pdf': return FileText;
      case 'link': return Link;
      default: return FileText;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Description</h2>
        <p className="text-gray-700 leading-relaxed">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enrolled Students</p>
              <p className="text-2xl font-bold text-gray-900">{course.enrolledStudents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Modules</p>
              <p className="text-2xl font-bold text-gray-900">{course.modules.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Assignments</p>
              <p className="text-2xl font-bold text-gray-900">
                {course.modules.reduce((sum, module) => sum + module.assignments.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600">Instructor</p>
            <p className="text-gray-900">{course.teacherName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Created</p>
            <p className="text-gray-900">{course.createdAt.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModules = () => (
    <div className="space-y-6">
      {canEdit && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowCreateModule(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Module</span>
          </button>
        </div>
      )}

      {course.modules.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No modules yet</h3>
          <p className="text-gray-500">
            {canEdit ? 'Create your first module to get started' : 'Modules will appear here when available'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {course.modules.sort((a, b) => a.order - b.order).map((module) => (
            <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                  <p className="text-gray-600 mt-1">{module.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Available from: {module.releaseDate.toLocaleDateString()}
                  </p>
                </div>
                {canEdit && (
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Materials */}
              {module.materials.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Materials</h4>
                  <div className="space-y-2">
                    {module.materials.map((material) => {
                      const IconComponent = getFileIcon(material.type);
                      return (
                        <div key={material.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                          <IconComponent className="h-4 w-4 text-gray-500" />
                          <span className="flex-1 text-sm text-gray-900">{material.title}</span>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Assignments */}
              {module.assignments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Assignments</h4>
                  <div className="space-y-2">
                    {module.assignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
                          <p className="text-xs text-gray-600">Due: {assignment.dueDate.toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{assignment.maxPoints} pts</span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6">
      {canEdit && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowCreateAnnouncement(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Announcement</span>
          </button>
        </div>
      )}

      {course.announcements.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements yet</h3>
          <p className="text-gray-500">
            {canEdit ? 'Create your first announcement to keep students informed' : 'Announcements will appear here'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {course.announcements.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                      announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{announcement.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {announcement.authorName}</span>
                    <span>{announcement.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
                {canEdit && (
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Enrolled Students ({course.enrolledStudents.length})</h2>
          {canEdit && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Student</span>
            </button>
          )}
        </div>

        {course.enrolledStudents.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No students enrolled yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {course.enrolledStudents.map((studentId, index) => (
              <div key={studentId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {`Student ${index + 1}`.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Student {index + 1}</p>
                    <p className="text-sm text-gray-600">student{index + 1}@school.edu</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Enrolled</span>
                  {canEdit && (
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: course.color }}
            ></div>
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          </div>
          <p className="text-gray-600 mt-1">by {course.teacherName}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'modules' && renderModules()}
        {activeTab === 'announcements' && renderAnnouncements()}
        {activeTab === 'students' && renderStudents()}
      </div>

      {/* Modals */}
      {showCreateModule && (
        <CreateModuleModal
          isOpen={showCreateModule}
          onClose={() => setShowCreateModule(false)}
          courseId={courseId}
        />
      )}

      {showCreateAnnouncement && (
        <CreateAnnouncementModal
          isOpen={showCreateAnnouncement}
          onClose={() => setShowCreateAnnouncement(false)}
          courseId={courseId}
        />
      )}
    </div>
  );
}