import React, { useState } from 'react';
import { Download, Filter, TrendingUp, Award, Calendar } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

export default function GradeBook() {
  const { courses } = useData();
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('all');

  const enrolledCourses = courses.filter(course => 
    course.enrolledStudents.includes(user?.id || '')
  );

  const allGrades = enrolledCourses.flatMap(course =>
    course.modules.flatMap(module =>
      module.assignments.map(assignment => {
        const submission = assignment.submissions.find(s => s.studentId === user?.id);
        return {
          courseTitle: course.title,
          courseColor: course.color,
          assignmentTitle: assignment.title,
          maxPoints: assignment.maxPoints,
          dueDate: assignment.dueDate,
          grade: submission?.grade,
          feedback: submission?.feedback,
          submittedAt: submission?.submittedAt,
        };
      })
    )
  );

  const filteredGrades = selectedCourse === 'all' 
    ? allGrades 
    : allGrades.filter(grade => {
        const course = enrolledCourses.find(c => c.title === grade.courseTitle);
        return course?.id === selectedCourse;
      });

  const gradedAssignments = filteredGrades.filter(g => g.grade !== undefined);
  const averageGrade = gradedAssignments.length > 0
    ? gradedAssignments.reduce((sum, g) => sum + (g.grade || 0), 0) / gradedAssignments.length
    : 0;

  const courseAverages = enrolledCourses.map(course => {
    const courseGrades = allGrades.filter(g => g.courseTitle === course.title && g.grade !== undefined);
    const average = courseGrades.length > 0
      ? courseGrades.reduce((sum, g) => sum + (g.grade || 0), 0) / courseGrades.length
      : 0;
    
    return {
      title: course.title,
      color: course.color,
      average,
      totalAssignments: allGrades.filter(g => g.courseTitle === course.title).length,
      gradedAssignments: courseGrades.length,
    };
  });

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Grades</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Grades</span>
        </button>
      </div>

      {/* Grade Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overall Average</p>
              <p className={`text-2xl font-bold ${getGradeColor(averageGrade)}`}>
                {averageGrade.toFixed(1)}% ({getGradeLetter(averageGrade)})
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Graded Assignments</p>
              <p className="text-2xl font-bold text-gray-900">
                {gradedAssignments.length}/{allGrades.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Averages */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Averages</h2>
        <div className="space-y-4">
          {courseAverages.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: course.color }}
                ></div>
                <div>
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600">
                    {course.gradedAssignments}/{course.totalAssignments} assignments graded
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${getGradeColor(course.average)}`}>
                  {course.average > 0 ? `${course.average.toFixed(1)}%` : 'N/A'}
                </p>
                <p className="text-sm text-gray-500">
                  {course.average > 0 ? getGradeLetter(course.average) : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Courses</option>
            {enrolledCourses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGrades.map((grade, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{grade.assignmentTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: grade.courseColor }}
                      ></div>
                      <span className="text-sm text-gray-900">{grade.courseTitle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {grade.dueDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {grade.maxPoints} pts
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.grade !== undefined ? (
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${getGradeColor(grade.grade)}`}>
                          {grade.grade}%
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          grade.grade >= 90 ? 'bg-green-100 text-green-800' :
                          grade.grade >= 80 ? 'bg-blue-100 text-blue-800' :
                          grade.grade >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {getGradeLetter(grade.grade)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Not graded</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {grade.feedback ? (
                      <div className="text-sm text-gray-600 max-w-xs truncate" title={grade.feedback}>
                        {grade.feedback}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No feedback</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGrades.length === 0 && (
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No grades available</h3>
            <p className="text-gray-500">Grades will appear here once assignments are graded</p>
          </div>
        )}
      </div>
    </div>
  );
}