import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Calendar,
  ArrowRight,
  Brain,
  Truck,
  Phone,
  User,
  List
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import symptomsData from '../data/symptoms.json';
import conditionsData from '../data/conditions.json';
import BodyMap from '../components/BodyMap';

const regionSymptoms = {
  head: ['headache', 'dizziness'],
  chest: ['chest_pain', 'shortness_breath', 'heart_palpitations'],
  abdomen: ['abdominal_pain', 'nausea', 'stomach_ache'],
  left_arm: ['arm_pain', 'joint_pain'],
  right_arm: ['arm_pain', 'joint_pain'],
  left_leg: ['leg_pain', 'joint_pain'],
  right_leg: ['leg_pain', 'joint_pain'],
};

const SymptomChecker = () => {
  const { t } = useTranslation();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [inputMethod, setInputMethod] = useState('body'); // 'body' or 'list'

  const symptoms = symptomsData.symptoms;
  const conditions = conditionsData.conditions;

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleBodyPartSelect = (region) => {
    setSelectedBodyParts(prev => {
      if (prev.some(part => part.id === region.id)) {
        // Remove
        return prev.filter(part => part.id !== region.id);
      } else {
        return [...prev, region];
      }
    });
    // Add related symptoms
    (regionSymptoms[region.id] || []).forEach(symptomId => {
      setSelectedSymptoms(prev => prev.includes(symptomId) ? prev : [...prev, symptomId]);
    });
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0 && selectedBodyParts.length === 0) return;
    setIsAnalyzing(true);
    setShowResults(false);
    setDiagnosis(null);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: selectedSymptoms })
      });
      const data = await response.json();
      setDiagnosis([{ name: data.disease, description: '', severity: 'mild', recommendation: '' }]);
    } catch (e) {
      setDiagnosis([]);
    }
    setShowResults(true);
    setIsAnalyzing(false);
  };

  const resetDiagnosis = () => {
    setSelectedSymptoms([]);
    setSelectedBodyParts([]);
    setDiagnosis(null);
    setShowResults(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'mild': return <CheckCircle className="h-4 w-4" />;
      case 'moderate': return <AlertTriangle className="h-4 w-4" />;
      case 'severe': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary-100 rounded-full">
              <Stethoscope className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('symptomChecker.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('symptomChecker.subtitle')}
          </p>
        </div>

        {!showResults ? (
          <div className="card">
            {/* Input Method Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('symptomChecker.howToDescribe')}
              </h2>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setInputMethod('body')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                    inputMethod === 'body'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>{t('symptomChecker.clickOnBodyParts')}</span>
                </button>
                <button
                  onClick={() => setInputMethod('list')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                    inputMethod === 'list'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                >
                  <List className="h-5 w-5" />
                  <span>{t('symptomChecker.selectFromList')}</span>
                </button>
              </div>
            </div>

            {/* Body Map or Symptom List */}
            {inputMethod === 'body' ? (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  {t('symptomChecker.clickOnBodyPartsDesc')}
                </h3>
                <BodyMap 
                  onBodyPartSelect={handleBodyPartSelect}
                  selectedParts={selectedBodyParts.map(p => p.id)}
                />
              </div>
            ) : (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('symptomChecker.selectYourSymptoms')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        selectedSymptoms.includes(symptom.id)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                      }`}
                    >
                      <div className="font-medium">{symptom.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{symptom.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Symptoms Summary */}
            {(selectedSymptoms.length > 0 || selectedBodyParts.length > 0) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('symptomChecker.selectedSymptoms')} ({selectedSymptoms.length})
                </h3>
                {selectedBodyParts.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">{t('symptomChecker.bodyParts')}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedBodyParts.map((bodyPart) => (
                        <span
                          key={bodyPart.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-800"
                        >
                          {bodyPart.label}
                          <button
                            onClick={() => handleBodyPartSelect(bodyPart)}
                            className="ml-2 text-secondary-600 hover:text-secondary-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptomId) => {
                    const symptom = symptoms.find(s => s.id === symptomId);
                    return (
                      <span
                        key={symptomId}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                      >
                        {symptom.name}
                        <button
                          onClick={() => toggleSymptom(symptomId)}
                          className="ml-2 text-primary-600 hover:text-primary-800"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <div className="text-center">
              <button
                onClick={analyzeSymptoms}
                disabled={(selectedSymptoms.length === 0 && selectedBodyParts.length === 0) || isAnalyzing}
                className={`btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto ${
                  (selectedSymptoms.length === 0 && selectedBodyParts.length === 0) || isAnalyzing
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="h-5 w-5 animate-pulse" />
                    <span>{t('symptomChecker.analyzingSymptoms')}</span>
                  </>
                ) : (
                  <>
                    <Stethoscope className="h-5 w-5" />
                    <span>{t('symptomChecker.analyzeSymptoms')}</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            {/* Analysis Results */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {t('symptomChecker.analysisResults')}
                </h2>
                <button
                  onClick={resetDiagnosis}
                  className="btn-outline"
                >
                  {t('symptomChecker.startNewAnalysis')}
                </button>
              </div>

              {diagnosis && diagnosis.length > 0 ? (
                <div className="space-y-6">
                  {diagnosis.map((condition, index) => (
                    <div key={condition.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {condition.name}
                          </h3>
                          <p className="text-gray-600 mb-4">{condition.description}</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(condition.severity)}`}>
                          {getSeverityIcon(condition.severity)}
                          <span className="ml-1 capitalize">{condition.severity}</span>
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">{t('symptomChecker.recommendation')}</h4>
                        <p className="text-gray-600">{condition.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('symptomChecker.noConditionsIdentified')}
                  </h3>
                  <p className="text-gray-600">
                    {t('symptomChecker.noConditionsDesc')}
                  </p>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {t('symptomChecker.recommendedNextSteps')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <Truck className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">{t('symptomChecker.scheduleVanVisit')}</h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    {t('symptomChecker.scheduleVanVisitDesc')}
                  </p>
                  <Link to="/van-integration" className="btn-primary w-full">
                    {t('symptomChecker.bookVanVisit')}
                  </Link>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <Phone className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">{t('symptomChecker.emergencySupport')}</h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    {t('symptomChecker.emergencySupportDesc')}
                  </p>
                  <a href="tel:+254700000000" className="btn-secondary w-full">
                    {t('symptomChecker.callEmergency')}
                  </a>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <Calendar className="h-12 w-12 text-accent-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">{t('symptomChecker.remoteConsultation')}</h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    {t('symptomChecker.remoteConsultationDesc')}
                  </p>
                  <Link to="/contact" className="btn-outline w-full">
                    {t('symptomChecker.scheduleConsultation')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">{t('symptomChecker.importantDisclaimer')}</h4>
                  <p className="text-yellow-700 text-sm">
                    {t('symptomChecker.disclaimerText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
