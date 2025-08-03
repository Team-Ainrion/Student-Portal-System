import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { API } from '../config/api';
import {
  Course,
  Assignment,
  Message,
  Announcement,
  DashboardStats,
  Module,
  Submission,
} from '../types';

interface DataContextType {
  courses: Course[];
  assignments: Assignment[];
  messages: Message[];
  announcements: Announcement[];
  stats: DashboardStats | null;
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => Promise<void>;
  addModule: (courseId: string, module: Omit<Module, 'id' | 'order'>) => Promise<void>;
  addAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt' | 'submissions'>) => Promise<void>;
  addMessage: (message: Omit<Message, 'id' | 'sentAt' | 'read'>) => Promise<void>;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => Promise<void>;
  updateAssignmentGrade: (submissionId: string, grade: number, feedback: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Load initial data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, messagesRes, announcementsRes, statsRes] = await Promise.all([
          axios.get<Course[]>(API.COURSES),
          axios.get<Message[]>(API.MESSAGES),
          axios.get<Announcement[]>(API.ANNOUNCEMENTS),
          axios.get<DashboardStats>(API.STATS),
        ]);
        setCourses(coursesRes.data);
        setMessages(messagesRes.data);
        setAnnouncements(announcementsRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const addCourse = async (courseData: Omit<Course, 'id' | 'createdAt'>) => {
    try {
      const res = await axios.post<Course>(API.COURSES, courseData);
      setCourses(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add course:', err);
    }
  };

  const addModule = async (courseId: string, moduleData: Omit<Module, 'id' | 'order'>) => {
    try {
      const res = await axios.post<Module>(`${API.COURSES}/${courseId}/modules`, moduleData);
      setCourses(prev =>
        prev.map(course =>
          course.id === courseId
            ? { ...course, modules: [...course.modules, res.data] }
            : course
        )
      );
    } catch (err) {
      console.error('Failed to add module:', err);
    }
  };

  const addAssignment = async (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'submissions'>) => {
    try {
      const res = await axios.post<Assignment>(API.ASSIGNMENTS, assignmentData);
      setAssignments(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add assignment:', err);
    }
  };

  const addMessage = async (messageData: Omit<Message, 'id' | 'sentAt' | 'read'>) => {
    try {
      const res = await axios.post<Message>(API.MESSAGES, messageData);
      setMessages(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add message:', err);
    }
  };

  const addAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'createdAt'>) => {
    try {
      const res = await axios.post<Announcement>(API.ANNOUNCEMENTS, announcementData);
      setAnnouncements(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add announcement:', err);
    }
  };

  const updateAssignmentGrade = async (submissionId: string, grade: number, feedback: string) => {
    try {
      await axios.patch(`${API.GRADES}/${submissionId}`, { grade, feedback });
      // Optimistic UI update (optional)
      setCourses(prev =>
        prev.map(course => ({
          ...course,
          modules: course.modules.map(module => ({
            ...module,
            assignments: module.assignments.map(assignment => ({
              ...assignment,
              submissions: assignment.submissions.map(sub =>
                sub.id === submissionId ? { ...sub, grade, feedback } : sub
              ),
            })),
          })),
        }))
      );
    } catch (err) {
      console.error('Failed to update grade:', err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        courses,
        assignments,
        messages,
        announcements,
        stats,
        addCourse,
        addModule,
        addAssignment,
        addMessage,
        addAnnouncement,
        updateAssignmentGrade,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
