import React, { useState } from 'react';
import { Target, ArrowRight, Brain, Book, Code, Sparkles } from 'lucide-react';

interface Assessment {
  strengths: string[];
  weaknesses: string[];
  learningStyle: string;
  goalArea: string;
}

const LearningPathsPage = () => {
  const [showAssessment, setShowAssessment] = useState(true);
  const [assessment, setAssessment] = useState<Assessment>({
    strengths: [],
    weaknesses: [],
    learningStyle: '',
    goalArea: ''
  });

  const skillAreas = [
    { id: 'problem-solving', label: 'Problem Solving', icon: Brain },
    { id: 'algorithms', label: 'Algorithms', icon: Code },
    { id: 'system-design', label: 'System Design', icon: Target },
    { id: 'databases', label: 'Databases', icon: Book },
    { id: 'frontend', label: 'Frontend Development', icon: Sparkles },
    { id: 'backend', label: 'Backend Development', icon: Code }
  ];

  const learningStyles = [
    { id: 'visual', label: 'Visual Learning', description: 'Learn through diagrams, charts, and visual aids' },
    { id: 'practical', label: 'Hands-on Learning', description: 'Learn by doing and practicing' },
    { id: 'conceptual', label: 'Conceptual Learning', description: 'Learn through understanding core concepts' }
  ];

  const handleSkillToggle = (skillId: string, type: 'strengths' | 'weaknesses') => {
    setAssessment(prev => ({
      ...prev,
      [type]: prev[type].includes(skillId)
        ? prev[type].filter(id => id !== skillId)
        : [...prev[type], skillId]
    }));
  };

  const getRecommendedPaths = () => {
    // Customize paths based on assessment
    return [
      {
        title: assessment.goalArea === 'frontend' ? 'Frontend Development Master Path' : 'Full-Stack Development Path',
        description: `Personalized path focusing on your ${assessment.weaknesses.join(', ')} with ${assessment.learningStyle} approach`,
        level: assessment.strengths.length > 3 ? 'Advanced' : 'Intermediate',
        duration: '4-6 months',
        style: assessment.learningStyle,
        modules: [
          'Core Fundamentals',
          ...assessment.weaknesses.map(w => `${w.charAt(0).toUpperCase() + w.slice(1)} Mastery`),
          'Advanced Projects'
        ]
      },
      {
        title: 'Specialized Technical Path',
        description: `Deep dive into ${assessment.strengths.join(', ')} with advanced concepts`,
        level: 'Advanced',
        duration: '3 months',
        style: assessment.learningStyle,
        modules: [
          'Advanced Concepts',
          'Real-world Projects',
          'Industry Best Practices'
        ]
      }
    ];
  };

  const AssessmentForm = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">What are your strengths?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skillAreas.map(skill => (
            <button
              key={skill.id}
              onClick={() => handleSkillToggle(skill.id, 'strengths')}
              className={`p-4 rounded-lg border ${
                assessment.strengths.includes(skill.id)
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              } transition-colors`}
            >
              <skill.icon className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">{skill.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Areas you want to improve?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skillAreas.map(skill => (
            <button
              key={skill.id}
              onClick={() => handleSkillToggle(skill.id, 'weaknesses')}
              className={`p-4 rounded-lg border ${
                assessment.weaknesses.includes(skill.id)
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              } transition-colors`}
            >
              <skill.icon className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">{skill.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">How do you learn best?</h3>
        <div className="space-y-4">
          {learningStyles.map(style => (
            <button
              key={style.id}
              onClick={() => setAssessment(prev => ({ ...prev, learningStyle: style.id }))}
              className={`w-full p-4 rounded-lg border ${
                assessment.learningStyle === style.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              } transition-colors text-left`}
            >
              <p className="font-medium">{style.label}</p>
              <p className="text-sm text-gray-600 mt-1">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">What's your primary goal?</h3>
        <select
          value={assessment.goalArea}
          onChange={(e) => setAssessment(prev => ({ ...prev, goalArea: e.target.value }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select your goal</option>
          <option value="frontend">Become a Frontend Developer</option>
          <option value="backend">Become a Backend Developer</option>
          <option value="fullstack">Become a Full-Stack Developer</option>
          <option value="specialist">Become a Technical Specialist</option>
        </select>
      </div>

      <button
        onClick={() => setShowAssessment(false)}
        disabled={!assessment.learningStyle || !assessment.goalArea || 
                 assessment.strengths.length === 0 || assessment.weaknesses.length === 0}
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 
                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Get Personalized Learning Path
      </button>
    </div>
  );

  const LearningPaths = () => {
    const recommendedPaths = getRecommendedPaths();

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recommended Learning Paths</h2>
          <button
            onClick={() => setShowAssessment(true)}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            Retake Assessment
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {recommendedPaths.map((path, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">{path.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{path.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-4">Level: {path.level}</span>
                <span>Duration: {path.duration}</span>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Key Modules:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  {path.modules.map((module, idx) => (
                    <li key={idx} className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-indigo-600" />
                      {module}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                Start Learning
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Custom Learning Paths</h1>
        <p className="text-gray-600">Let's create a learning path tailored to your needs.</p>
      </div>

      {showAssessment ? <AssessmentForm /> : <LearningPaths />}
    </div>
  );
};

export default LearningPathsPage;