import React from 'react';
import { BookOpen, Users, AlignCenter as Assignment, Clock, BarChart3, FileText } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

export default function TeacherDashboard() {
  const { courses } = useData();
  const { user } = useAuth();

  const teacherCourses = courses.filter(course => course.teacherId === user?.id);
  
  const allAssignments = teacherCourses.flatMap(course => 
    course.modules.flatMap(module => 
      module.assignments.map(assignment => ({
        ...assignment,
        courseName: course.title,
        courseColor: course.color,
      }))
    )
  );

  const pendingGrading = allAssignments.filter(assignment =>
    assignment.submissions.some(submission => submission.grade === undefined)
  );

  const totalStudents = teacherCourses.reduce((sum, course) => 
    sum + course.enrolledStudents.length, 0
  );

  const recentActivity = [
    {
      type: 'submission',
      message: 'Emily Davis submitted Algebraic Equations Practice',
      time: '2 hours ago',
      course: 'Mathematics 101',
    },
    {
      type: 'enrollment',
      message: 'New student enrolled in English Literature',
      time: '1 day ago',
      course: 'English Literature',
    },
    {
      type: 'message',
      message: 'Question about homework from Alex Johnson',
      time: '3 hours ago',
      course: 'Mathematics 101',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">My Courses</p>
              <p className="text-2xl font-bold text-gray-900">{teacherCourses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Grading</p>
              <p className="text-2xl font-bold text-gray-900">{pendingGrading.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Assignment className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{allAssignments.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
            <BookOpen className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {teacherCourses.map((course) => (
              <div key={course.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: course.color }}
                ></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-600">{course.enrolledStudents.length} students</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {course.modules.length} modules
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-1 rounded-full ${
                  activity.type === 'submission' ? 'bg-blue-100' :
                  activity.type === 'enrollment' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {activity.type === 'submission' && <FileText className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'enrollment' && <Users className="h-4 w-4 text-green-600" />}
                  {activity.type === 'message' && <Clock className="h-4 w-4 text-yellow-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.course} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Grading */}
      {pendingGrading.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Assignments Requiring Grading</h2>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingGrading.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingGrading.slice(0, 5).map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-gray-900">{assignment.title}</p>
                  <p className="text-sm text-gray-600">{assignment.courseName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">
                    {assignment.submissions.filter(s => !s.grade).length} submissions
                  </p>
                  <button className="text-xs text-red-600 hover:text-red-800 font-medium">
                    Grade Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}