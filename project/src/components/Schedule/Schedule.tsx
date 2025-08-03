import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'class' | 'assignment' | 'exam' | 'meeting';
  startTime: Date;
  endTime: Date;
  location?: string;
  course?: string;
  courseColor?: string;
  description?: string;
}

export default function Schedule() {
  const { courses } = useData();
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  // Mock schedule events
  const events: ScheduleEvent[] = [
    {
      id: '1',
      title: 'Mathematics 101 - Algebra Fundamentals',
      type: 'class',
      startTime: new Date(2024, 11, 20, 9, 0),
      endTime: new Date(2024, 11, 20, 10, 30),
      location: 'Room 101',
      course: 'Mathematics 101',
      courseColor: '#3B82F6',
    },
    {
      id: '2',
      title: 'English Literature Discussion',
      type: 'class',
      startTime: new Date(2024, 11, 20, 11, 0),
      endTime: new Date(2024, 11, 20, 12, 30),
      location: 'Room 205',
      course: 'English Literature',
      courseColor: '#10B981',
    },
    {
      id: '3',
      title: 'Algebraic Equations Practice Due',
      type: 'assignment',
      startTime: new Date(2024, 11, 20, 23, 59),
      endTime: new Date(2024, 11, 20, 23, 59),
      course: 'Mathematics 101',
      courseColor: '#3B82F6',
    },
    {
      id: '4',
      title: 'Parent-Teacher Conference',
      type: 'meeting',
      startTime: new Date(2024, 11, 21, 14, 0),
      endTime: new Date(2024, 11, 21, 15, 0),
      location: 'Conference Room A',
    },
  ];

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentDate);
  const today = new Date();

  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return Users;
      case 'assignment': return Calendar;
      case 'exam': return Clock;
      case 'meeting': return MapPin;
      default: return Calendar;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'assignment': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'meeting': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'week' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'month' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Month
            </button>
          </div>
          
          {user?.role === 'teacher' && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <h2 className="text-lg font-semibold text-gray-900">
            {weekDays[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Week View */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className="p-4 text-center border-r border-gray-200 last:border-r-0">
              <div className="text-sm font-medium text-gray-500">{day}</div>
              <div className={`text-lg font-semibold mt-1 ${
                isToday(weekDays[index]) ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {weekDays[index].getDate()}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 min-h-[400px]">
          {weekDays.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div key={index} className="border-r border-gray-200 last:border-r-0 p-2">
                <div className="space-y-2">
                  {dayEvents.map((event) => {
                    const IconComponent = getEventTypeIcon(event.type);
                    return (
                      <div
                        key={event.id}
                        className={`p-2 rounded-lg border text-xs ${getEventTypeColor(event.type)}`}
                        style={event.courseColor ? { 
                          borderLeftColor: event.courseColor, 
                          borderLeftWidth: '3px' 
                        } : {}}
                      >
                        <div className="flex items-start space-x-1">
                          <IconComponent className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{event.title}</p>
                            <p className="text-xs opacity-75">
                              {event.startTime.toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit',
                                hour12: true 
                              })}
                              {event.type === 'class' && event.endTime && (
                                ` - ${event.endTime.toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit',
                                  hour12: true 
                                })}`
                              )}
                            </p>
                            {event.location && (
                              <p className="text-xs opacity-75">{event.location}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {events
            .filter(event => event.startTime > new Date())
            .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
            .slice(0, 5)
            .map((event) => {
              const IconComponent = getEventTypeIcon(event.type);
              return (
                <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{event.startTime.toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {event.startTime.toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </span>
                      </span>
                      {event.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  {event.courseColor && (
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: event.courseColor }}
                    ></div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}