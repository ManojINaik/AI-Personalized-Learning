import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, AlertCircle, BookOpen, Code, Calculator } from 'lucide-react';

interface ProfileData {
  age: string;
  grade: string;
  interests: string[];
  strengths: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | '';
}

const ProfileSetup = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    age: '',
    grade: '',
    interests: [],
    strengths: [],
    learningStyle: ''
  });

  const subjects = [
    { id: 'math', label: 'Mathematics', icon: Calculator },
    { id: 'programming', label: 'Programming', icon: Code },
    { id: 'science', label: 'Science', icon: BookOpen }
  ];

  const learningStyles = [
    { id: 'visual', label: 'Visual Learning', description: 'Learn best through images and diagrams' },
    { id: 'auditory', label: 'Auditory Learning', description: 'Learn best through listening and discussion' },
    { id: 'kinesthetic', label: 'Hands-on Learning', description: 'Learn best through practical activities' }
  ];

  const handleInterestToggle = (subject: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(subject)
        ? prev.interests.filter(i => i !== subject)
        : [...prev.interests, subject]
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await updateUser({
        profile: {
          ...profileData,
          setupCompleted: true
        }
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={profileData.age}
                  onChange={(e) => setProfileData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  min="5"
                  max="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Level
                </label>
                <select
                  value={profileData.grade}
                  onChange={(e) => setProfileData(prev => ({ ...prev, grade: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Grade</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Grade {i + 1}
                    </option>
                  ))}
                  <option value="college">College</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Areas of Interest</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => handleInterestToggle(subject.id)}
                  className={`p-4 rounded-lg border ${
                    profileData.interests.includes(subject.id)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-500'
                  } transition-colors`}
                >
                  <subject.icon className="h-6 w-6 text-indigo-600 mb-2" />
                  <p className="font-medium">{subject.label}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Learning Style</h2>
            <div className="space-y-4">
              {learningStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => setProfileData(prev => ({ ...prev, learningStyle: style.id as any }))}
                  className={`w-full p-4 rounded-lg border ${
                    profileData.learningStyle === style.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-500'
                  } transition-colors text-left`}
                >
                  <p className="font-medium">{style.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Step {step} of 3</p>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-700"
            >
              Back
            </button>
          )}
          <button
            onClick={() => {
              if (step < 3) {
                setStep(prev => prev + 1);
              } else {
                handleSubmit();
              }
            }}
            disabled={isLoading}
            className="ml-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : step === 3 ? (
              'Complete Setup'
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;