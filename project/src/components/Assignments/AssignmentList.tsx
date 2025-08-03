import React, { useState } from 'react';
import { Plus, Search, Calendar, Clock, FileText, CheckCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

interface AssignmentListProps {
  onAssignmentSelect?: (assignmentId: string) => void;
  onCreateAssignment?: () => void;
}

export default function AssignmentList({ onAssignmentSelect, onCreateAssignment }: AssignmentListProps) {
  const { courses } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const allAssignments = courses.flatMap(course => 
    course.modules.flatMap(module => 
      module.assignments.map(assignment => ({
        ...assignment,
        courseName: course.title,
        courseColor: course.color,
        teacherId: course.teacherId,
      }))
    )
  ).filter(assignment => {
    if (user?.role === 'teacher') {
      return assignment.teacherId === user.id;
    }
    if (user?.role === 'student') {
      return courses.some(course => 
        course.enrolledStudents.includes(user.id) && 
        course.modules.some(module => 
          module.assignments.some(a => a.id === assignment.id)
        )
      );
    }
    return true; // Admin sees all
  });

  const filteredAssignments = allAssignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAssignmentStatus = (assignment: any) => {
    if (user?.role === 'student') {
      const hasSubmission = assignment.submissions.some((sub: any) => sub.studentId === user.id);
      const isOverdue = new Date(assignment.dueDate) < new Date();
      
      if (hasSubmission) return { status: 'submitted', color: 'green' };
      if (isOverdue) return { status: 'overdue', color: 'red' };
      return { status: 'pending', color: 'yellow' };
    }
    
    if (user?.role === 'teacher') {
      const totalSubmissions = assignment.submissions.length;
      const gradedSubmissions = assignment.submissions.filter((sub: any) => sub.grade !== undefined).length;
      
      if (totalSubmissions === 0) return { status: 'no submissions', color: 'gray' };
      if (gradedSubmissions === totalSubmissions) return { status: 'all graded', color: 'green' };
      return { status: `${gradedSubmissions}/${totalSubmissions} graded`, color: 'yellow' };
    }
    
    return { status: 'active', color: 'blue' };
  };

  const sortedAssignments = filteredAssignments.sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const handleAssignmentClick = (assignmentId: string) => {
    if (onAssignmentSelect) {
      onAssignmentSelect(assignmentId);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        {user?.role === 'teacher' && (
          <button 
            onClick={onCreateAssignment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Assignment</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {sortedAssignments.map((assignment) => {
          const status = getAssignmentStatus(assignment);
          const daysUntilDue = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <div 
              key={assignment.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleAssignmentClick(assignment.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: assignment.courseColor }}
                    ></div>
                    <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      status.color === 'green' ? 'bg-green-100 text-green-800' :
                      status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      status.color === 'red' ? 'bg-red-100 text-red-800' :
                      status.color === 'gray' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {status.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{assignment.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {daysUntilDue > 0 ? `${daysUntilDue} days left` : 
                         daysUntilDue === 0 ? 'Due today' : 
                         `${Math.abs(daysUntilDue)} days overdue`}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{assignment.courseName}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <span>Max Points: {assignment.maxPoints}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {user?.role === 'student' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      {assignment.submissions.some((sub: any) => sub.studentId === user.id) ? 'View Submission' : 'Submit'}
                    </button>
                  )}
                  
                  {user?.role === 'teacher' && (
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View Details
                      </button>
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                        Grade ({assignment.submissions.filter((s: any) => !s.grade).length})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sortedAssignments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'No assignments available yet'}
          </p>
        </div>
      )}
    </div>
  );
}