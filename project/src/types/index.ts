export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  enrolledStudents: string[];
  modules: Module[];
  announcements: Announcement[];
  createdAt: Date;
  color: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  materials: Material[];
  assignments: Assignment[];
  releaseDate: Date;
  order: number;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'document' | 'link';
  url: string;
  uploadedAt: Date;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  maxPoints: number;
  rubric?: string;
  submissions: Submission[];
  createdAt: Date;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  assignmentId: string;
  files: SubmissionFile[];
  submittedAt: Date;
  grade?: number;
  feedback?: string;
  version: number;
}

export interface SubmissionFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  courseId: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  subject: string;
  content: string;
  attachments?: MessageAttachment[];
  sentAt: Date;
  read: boolean;
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalAssignments: number;
  systemUptime: number;
  averageGrade: number;
  completionRate: number;
}