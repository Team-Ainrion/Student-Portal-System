import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, FileText, Upload, Download, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Assignment } from '../../types';

interface AssignmentDetailProps {
  assignmentId: string;
  onBack: () => void;
}

export default function AssignmentDetail({ assignmentId, onBack }: AssignmentDetailProps) {
  const { courses, updateAssignmentGrade } = useData();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [submissionFiles, setSubmissionFiles] = useState<File[]>([]);
  const [submissionText, setSubmissionText] = useState('');

  // Find assignment across all courses
  let assignment: Assignment | null = null;
  let courseName = '';
  let courseColor = '';

  for (const course of courses) {
    for (const module of course.modules) {
      const found = module.assignments.find(a => a.id === assignmentId);
      if (found) {
        assignment = found;
        courseName = course.title;
        courseColor = course.color;
        break;
      }
    }
    if (assignment) break;
  }

  if (!assignment) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Assignment not found</h3>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to assignments
          </button>
        </div>
      </div>
    );
  }

  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const userSubmission = assignment.submissions.find(s => s.studentId === user?.id);
  const daysUntilDue = Math.ceil((assignment.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntilDue < 0;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSubmissionFiles(Array.from(e.target.files));
    }
  };

  const handleSubmission = () => {
    // This would handle the actual submission
    console.log('Submitting assignment:', {
      assignmentId,
      files: submissionFiles,
      text: submissionText,
    });
  };

  const handleGradeSubmission = (submissionId: string, grade: number, feedback: string) => {
    updateAssignmentGrade(submissionId, grade, feedback);
  };

  const tabs = [
    { id: 'details', label: 'Assignment Details' },
    ...(isStudent ? [{ id: 'submit', label: 'Submit Work' }] : []),
    ...(isTeacher ? [{ id: 'submissions', label: `Submissions (${assignment.submissions.length})` }] : []),
  ];

  const renderDetails = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: courseColor }}
              ></div>
              <h2 className="text-2xl font-bold text-gray-900">{assignment.title}</h2>
            </div>
            <p className="text-gray-600">{courseName}</p>
          </div>
          
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isOverdue ? 'bg-red-100 text-red-800' :
              daysUntilDue <= 1 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {isOverdue ? (
                <>
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Overdue
                </>
              ) : daysUntilDue === 0 ? (
                <>
                  <Clock className="h-4 w-4 mr-1" />
                  Due Today
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-1" />
                  {daysUntilDue} days left
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Due Date</p>
              <p className="text-sm text-gray-600">{assignment.dueDate.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Max Points</p>
              <p className="text-sm text-gray-600">{assignment.maxPoints} points</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Status</p>
              <p className="text-sm text-gray-600">
                {userSubmission ? 
                  userSubmission.grade !== undefined ? 'Graded' : 'Submitted' : 
                  'Not Submitted'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{assignment.description}</p>
        </div>

        {assignment.rubric && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Grading Rubric</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{assignment.rubric}</p>
            </div>
          </div>
        )}
      </div>

      {/* Student's submission status */}
      {isStudent && userSubmission && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Submission</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Submitted</p>
                  <p className="text-sm text-green-700">
                    {userSubmission.submittedAt.toLocaleDateString()} at {userSubmission.submittedAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              {userSubmission.grade !== undefined && (
                <div className="text-right">
                  <p className="text-lg font-bold text-green-900">{userSubmission.grade}%</p>
                  <p className="text-sm text-green-700">Grade</p>
                </div>
              )}
            </div>

            {userSubmission.files.length > 0 && (
              <div>
                <p className="font-medium text-gray-900 mb-2">Submitted Files:</p>
                <div className="space-y-2">
                  {userSubmission.files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {userSubmission.feedback && (
              <div>
                <p className="font-medium text-gray-900 mb-2">Teacher Feedback:</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-900">{userSubmission.feedback}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderSubmit = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Assignment</h2>
        
        {userSubmission ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800">
                You have already submitted this assignment. You can resubmit to replace your previous submission.
              </p>
            </div>
          </div>
        ) : isOverdue ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-800">
                This assignment is overdue. Contact your teacher if you need an extension.
              </p>
            </div>
          </div>
        ) : null}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Files
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                Choose Files
              </label>
            </div>
            
            {submissionFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                {submissionFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">{file.name}</span>
                      <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      onClick={() => setSubmissionFiles(files => files.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="submission-text" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              id="submission-text"
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any comments or notes about your submission..."
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmission}
              disabled={submissionFiles.length === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {userSubmission ? 'Resubmit Assignment' : 'Submit Assignment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubmissions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Student Submissions</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{assignment.submissions.length} total submissions</span>
            <span>{assignment.submissions.filter(s => s.grade !== undefined).length} graded</span>
          </div>
        </div>

        {assignment.submissions.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No submissions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {assignment.submissions.map((submission) => (
              <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{submission.studentName}</h3>
                    <p className="text-sm text-gray-600">
                      Submitted: {submission.submittedAt.toLocaleDateString()} at {submission.submittedAt.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {submission.grade !== undefined ? (
                      <div>
                        <p className="text-lg font-bold text-green-600">{submission.grade}%</p>
                        <p className="text-sm text-gray-500">Graded</p>
                      </div>
                    ) : (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Needs Grading
                      </span>
                    )}
                  </div>
                </div>

                {submission.files.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Submitted Files:</p>
                    <div className="space-y-1">
                      {submission.files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-900">{file.name}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {submission.feedback && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Feedback:</p>
                    <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">{submission.feedback}</p>
                  </div>
                )}

                {submission.grade === undefined && (
                  <div className="flex space-x-3 pt-3 border-t border-gray-200">
                    <input
                      type="number"
                      min="0"
                      max={assignment.maxPoints}
                      placeholder="Grade"
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Feedback (optional)"
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <button
                      onClick={() => handleGradeSubmission(submission.id, 85, 'Good work!')}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Grade
                    </button>
                  </div>
                )}
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{assignment.title}</h1>
          <p className="text-gray-600">{courseName}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'details' && renderDetails()}
        {activeTab === 'submit' && renderSubmit()}
        {activeTab === 'submissions' && renderSubmissions()}
      </div>
    </div>
  );
}