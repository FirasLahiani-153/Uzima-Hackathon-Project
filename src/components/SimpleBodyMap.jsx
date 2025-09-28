import { useState } from 'react';

const SimpleBodyMap = ({ onBodyPartSelect, selectedParts = [] }) => {
  const [hoveredPart, setHoveredPart] = useState(null);

  const bodyParts = [
    {
      id: 'head',
      name: 'Head',
      position: { top: '5%', left: '50%', transform: 'translateX(-50%)' },
      symptoms: ['headache', 'dizziness'],
      color: 'bg-red-500'
    },
    {
      id: 'eyes',
      name: 'Eyes',
      position: { top: '12%', left: '45%' },
      symptoms: ['vision_problems', 'eye_pain'],
      color: 'bg-orange-500'
    },
    {
      id: 'ears',
      name: 'Ears',
      position: { top: '15%', left: '35%' },
      symptoms: ['hearing_problems', 'ear_pain'],
      color: 'bg-yellow-500'
    },
    {
      id: 'nose',
      name: 'Nose',
      position: { top: '18%', left: '50%', transform: 'translateX(-50%)' },
      symptoms: ['nasal_congestion', 'nose_bleed'],
      color: 'bg-green-500'
    },
    {
      id: 'mouth',
      name: 'Mouth/Throat',
      position: { top: '22%', left: '50%', transform: 'translateX(-50%)' },
      symptoms: ['sore_throat', 'mouth_pain', 'cough'],
      color: 'bg-green-600'
    },
    {
      id: 'chest',
      name: 'Chest',
      position: { top: '30%', left: '50%', transform: 'translateX(-50%)' },
      symptoms: ['chest_pain', 'shortness_breath', 'heart_palpitations'],
      color: 'bg-purple-500'
    },
    {
      id: 'lungs',
      name: 'Lungs',
      position: { top: '35%', left: '50%', transform: 'translateX(-50%)' },
      symptoms: ['cough', 'shortness_breath', 'chest_pain'],
      color: 'bg-pink-500'
    },
    {
      id: 'stomach',
      name: 'Stomach/Abdomen',
      position: { top: '50%', left: '50%', transform: 'translateX(-50%)' },
      symptoms: ['abdominal_pain', 'nausea', 'stomach_ache'],
      color: 'bg-indigo-500'
    },
    {
      id: 'left_arm',
      name: 'Left Arm',
      position: { top: '35%', left: '20%' },
      symptoms: ['arm_pain', 'joint_pain'],
      color: 'bg-green-400'
    },
    {
      id: 'right_arm',
      name: 'Right Arm',
      position: { top: '35%', left: '80%' },
      symptoms: ['arm_pain', 'joint_pain'],
      color: 'bg-green-400'
    },
    {
      id: 'left_hand',
      name: 'Left Hand',
      position: { top: '45%', left: '15%' },
      symptoms: ['hand_pain', 'joint_pain'],
      color: 'bg-green-400'
    },
    {
      id: 'right_hand',
      name: 'Right Hand',
      position: { top: '45%', left: '85%' },
      symptoms: ['hand_pain', 'joint_pain'],
      color: 'bg-green-400'
    },
    {
      id: 'back',
      name: 'Back',
      position: { top: '30%', left: '50%', transform: 'translateX(-50%)' },
      symptoms: ['back_pain', 'spine_pain'],
      color: 'bg-gray-500'
    },
    {
      id: 'left_leg',
      name: 'Left Leg',
      position: { top: '65%', left: '35%' },
      symptoms: ['leg_pain', 'joint_pain'],
      color: 'bg-emerald-500'
    },
    {
      id: 'right_leg',
      name: 'Right Leg',
      position: { top: '65%', left: '65%' },
      symptoms: ['leg_pain', 'joint_pain'],
      color: 'bg-emerald-500'
    },
    {
      id: 'left_foot',
      name: 'Left Foot',
      position: { top: '80%', left: '35%' },
      symptoms: ['foot_pain', 'ankle_pain'],
      color: 'bg-lime-500'
    },
    {
      id: 'right_foot',
      name: 'Right Foot',
      position: { top: '80%', left: '65%' },
      symptoms: ['foot_pain', 'ankle_pain'],
      color: 'bg-lime-500'
    }
  ];

  const handleBodyPartClick = (bodyPart) => {
    onBodyPartSelect(bodyPart);
  };

  const isSelected = (partId) => selectedParts.some(part => part.id === partId);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Body Outline */}
      <div className="relative w-64 h-96 mx-auto bg-gray-100 rounded-full border-4 border-gray-300">
        {/* Body Parts */}
        {bodyParts.map((part) => (
          <button
            key={part.id}
            onClick={() => handleBodyPartClick(part)}
            onMouseEnter={() => setHoveredPart(part.id)}
            onMouseLeave={() => setHoveredPart(null)}
            className={`absolute transform transition-all duration-200 ${
              isSelected(part.id) 
                ? 'scale-110 shadow-lg' 
                : 'hover:scale-105 hover:shadow-md'
            }`}
            style={part.position}
            title={part.name}
          >
            <div className={`p-2 rounded-full text-white font-bold text-sm ${
              isSelected(part.id) 
                ? `${part.color} shadow-lg` 
                : hoveredPart === part.id 
                  ? 'bg-gray-200 text-gray-700' 
                  : 'bg-white text-gray-600 border-2 border-gray-300'
            } transition-all duration-200`}>
              {part.name.charAt(0).toUpperCase()}
            </div>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
        {bodyParts.slice(0, 8).map((part) => (
          <div key={part.id} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${part.color}`}></div>
            <span className="text-gray-600">{part.name}</span>
          </div>
        ))}
      </div>

      {/* Selected Parts Summary */}
      {selectedParts.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Selected Body Parts:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedParts.map((part) => (
              <span
                key={part.id}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {part.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleBodyMap;
