import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Calendar, Download, Filter } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Analytics() {
  const { courses, stats } = useData();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  
  const teacherCourses = isTeacher ? courses.filter(c => c.teacherId === user.id) : courses;
  const filteredCourses = selectedCourse === 'all' ? teacherCourses : teacherCourses.filter(c => c.id === selectedCourse);

  // Mock analytics data
  const performanceData = [
    { name: 'Week 1', submissions: 45, grades: 42, avgGrade: 87 },
    { name: 'Week 2', submissions: 52, grades: 48, avgGrade: 89 },
    { name: 'Week 3', submissions: 38, grades: 35, avgGrade: 85 },
    { name: 'Week 4', submissions: 61, grades: 58, avgGrade: 91 },
  ];

  const coursePerformance = filteredCourses.map(course => ({
    name: course.title,
    students: course.enrolledStudents.length,
    assignments: course.modules.reduce((sum, m) => sum + m.assignments.length, 0),
    avgGrade: 85 + Math.random() * 10,
    completionRate: 80 + Math.random() * 15,
  }));

  const exportData = () => {
    console.log('Exporting analytics data...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Platform Analytics' : 'Class Analytics'}
        </h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          {isTeacher && (
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Courses</option>
              {teacherCourses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          )}
          
          <button
            onClick={exportData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {isAdmin ? 'Total Users' : 'Total Students'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {isAdmin ? stats.totalUsers : filteredCourses.reduce((sum, c) => sum + c.enrolledStudents.length, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{filteredCourses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageGrade.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completionRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Performance Trends</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {performanceData.map((week, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{week.name}</p>
                  <p className="text-sm text-gray-600">{week.submissions} submissions</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{week.avgGrade}%</p>
                  <p className="text-sm text-gray-500">avg grade</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Course Performance</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {coursePerformance.map((course, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{course.name}</h3>
                  <span className="text-sm text-gray-500">{course.students} students</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Avg Grade</p>
                    <p className="font-semibold text-green-600">{course.avgGrade.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Completion</p>
                    <p className="font-semibold text-blue-600">{course.completionRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {filteredCourses.reduce((sum, c) => sum + c.modules.reduce((s, m) => s + m.assignments.length, 0), 0)}
            </p>
            <p className="text-sm text-blue-800">Total Assignments</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {filteredCourses.reduce((sum, c) => sum + c.modules.length, 0)}
            </p>
            <p className="text-sm text-green-800">Total Modules</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {filteredCourses.reduce((sum, c) => 
                sum + c.modules.reduce((s, m) => 
                  s + m.assignments.reduce((as, a) => as + a.submissions.length, 0), 0), 0)}
            </p>
            <p className="text-sm text-purple-800">Total Submissions</p>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {[
            { action: 'Assignment submitted', student: 'Emily Davis', course: 'Mathematics 101', time: '2 hours ago' },
            { action: 'New course created', teacher: 'Sarah Johnson', course: 'Physics 201', time: '1 day ago' },
            { action: 'Grade posted', student: 'Alex Johnson', course: 'English Literature', time: '2 days ago' },
            { action: 'Announcement posted', teacher: 'Sarah Johnson', course: 'Mathematics 101', time: '3 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">
                  {activity.student && `Student: ${activity.student}`}
                  {activity.teacher && `Teacher: ${activity.teacher}`}
                  {' • '}{activity.course}
                </p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}