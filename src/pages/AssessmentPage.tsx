import React, { useState } from 'react';
import { Brain, BookOpen, Target, Award, Clock } from 'lucide-react';
import AssessmentModal from '../components/assessment/AssessmentModal';

const AssessmentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const assessmentTypes = [
    {
      icon: Brain,
      title: 'Knowledge Assessment',
      description: 'Evaluate your current understanding and knowledge level',
      duration: '20-30 minutes'
    },
    {
      icon: Target,
      title: 'Skills Assessment',
      description: 'Test your practical skills and problem-solving abilities',
      duration: '30-45 minutes'
    },
    {
      icon: BookOpen,
      title: 'Learning Style Assessment',
      description: 'Discover your optimal learning approach',
      duration: '15-20 minutes'
    }
  ];

  const recentResults = [
    {
      date: '2024-03-15',
      type: 'Knowledge Assessment',
      score: 85,
      improvement: '+12%'
    },
    {
      date: '2024-03-10',
      type: 'Skills Assessment',
      score: 78,
      improvement: '+8%'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Smart Assessment</h1>
        <p className="text-gray-600">Take our adaptive assessment to personalize your learning journey.</p>
      </div>

      {/* Assessment Types */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {assessmentTypes.map((type, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-500 transition-colors">
            <div className="flex items-center mb-4">
              <type.icon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">{type.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{type.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{type.duration}</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        ))}
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Results</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentResults.map((result, index) => (
            <div key={index} className="p-6 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{result.type}</p>
                <p className="text-sm text-gray-500">{new Date(result.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{result.score}%</p>
                  <p className="text-sm text-green-600">{result.improvement}</p>
                </div>
                <Award className={`h-6 w-6 ${
                  result.score >= 80 ? 'text-yellow-400' : 'text-gray-400'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-indigo-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Assessment Tips</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2 mt-0.5">1</span>
            <span>Find a quiet space where you can focus without interruptions</span>
          </li>
          <li className="flex items-start">
            <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2 mt-0.5">2</span>
            <span>Read each question carefully before answering</span>
          </li>
          <li className="flex items-start">
            <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2 mt-0.5">3</span>
            <span>Don't rush - take your time to demonstrate your best understanding</span>
          </li>
        </ul>
      </div>

      <AssessmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AssessmentPage;