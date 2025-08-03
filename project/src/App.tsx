import React, { useState } from 'react';
import {  Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LoginForm from './components/Auth/LoginForm';
import OtpVerify from './components/Auth/OtpVerify';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import CourseList from './components/Courses/CourseList';
import CourseDetail from './components/Courses/CourseDetail';
import AssignmentList from './components/Assignments/AssignmentList';
import AssignmentDetail from './components/Assignments/AssignmentDetail';
import CreateAssignmentModal from './components/Assignments/CreateAssignmentModal';
import MessageCenter from './components/Messages/MessageCenter';
import GradingCenter from './components/Grading/GradingCenter';
import Analytics from './components/Analytics/Analytics';
import UserManagement from './components/UserManagement/UserManagement';
import Settings from './components/Settings/Settings';
import GradeBook from './components/Grades/GradeBook';
import Schedule from './components/Schedule/Schedule';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedCourseId(null);
    setSelectedAssignmentId(null);
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('course-detail');
  };

  const handleAssignmentSelect = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setActiveTab('assignment-detail');
  };

  const handleBackToCourses = () => {
    setSelectedCourseId(null);
    setActiveTab('courses');
  };

  const handleBackToAssignments = () => {
    setSelectedAssignmentId(null);
    setActiveTab('assignments');
  };

  const renderContent = () => {
    if (selectedCourseId && activeTab === 'course-detail') {
      return <CourseDetail courseId={selectedCourseId} onBack={handleBackToCourses} />;
    }

    if (selectedAssignmentId && activeTab === 'assignment-detail') {
      return <AssignmentDetail assignmentId={selectedAssignmentId} onBack={handleBackToAssignments} />;
    }

    switch (activeTab) {
      case 'dashboard':
        if (user.role === 'student') return <StudentDashboard />;
        if (user.role === 'teacher') return <TeacherDashboard />;
        if (user.role === 'admin') return <AdminDashboard />;
        break;
      case 'courses':
        return <CourseList onCourseSelect={handleCourseSelect} />;
      case 'assignments':
        return (
          <>
            <AssignmentList 
              onAssignmentSelect={handleAssignmentSelect}
              onCreateAssignment={() => setShowCreateAssignment(true)}
            />
            {showCreateAssignment && (
              <CreateAssignmentModal
                isOpen={showCreateAssignment}
                onClose={() => setShowCreateAssignment(false)}
              />
            )}
          </>
        );
      case 'messages':
        return <MessageCenter />;
      case 'grading':
        return <GradingCenter />;
      case 'announcements':
        return <div className="p-6"><h1 className="text-2xl font-bold">Announcements</h1><p className="text-gray-600 mt-2">Create and manage course announcements.</p></div>;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      case 'grades':
        return <GradeBook />;
      case 'schedule':
        return <Schedule />;
      default:
        return <div className="p-6"><h1 className="text-2xl font-bold">Page Not Found</h1></div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/verify-otp" element={<OtpVerify />} />
           
            <Route path="*" element={<LoginForm />} />
          </Routes>
       
      </DataProvider>
    </AuthProvider>
  );
}

