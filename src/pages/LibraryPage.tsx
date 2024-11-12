import React from 'react';
import { BookOpen, Search, Filter } from 'lucide-react';

const resources = [
  {
    title: 'Introduction to Programming',
    type: 'Course',
    level: 'Beginner',
    duration: '2 hours'
  },
  {
    title: 'Advanced JavaScript Concepts',
    type: 'Tutorial',
    level: 'Advanced',
    duration: '1.5 hours'
  },
  {
    title: 'React Best Practices',
    type: 'Workshop',
    level: 'Intermediate',
    duration: '3 hours'
  }
];

const LibraryPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Library</h1>
        <p className="text-gray-600">Access our comprehensive collection of learning resources.</p>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">{resource.title}</h2>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">Type: {resource.type}</span>
                <span>Level: {resource.level}</span>
              </div>
              <div className="text-sm text-gray-500">
                Duration: {resource.duration}
              </div>
            </div>
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;