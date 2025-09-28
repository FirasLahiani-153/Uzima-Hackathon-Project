import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Truck, 
  Heart, 
  Users, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const Home = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: t('home.features.aiDiagnostics.title'),
      description: t('home.features.aiDiagnostics.description')
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: t('home.features.mobileVans.title'),
      description: t('home.features.mobileVans.description')
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description')
    }
  ];

  const stats = [
    { number: "10,000+", label: t('home.patientsServed') },
    { number: "50+", label: t('home.ruralCommunities') },
    { number: "95%", label: t('home.diagnosticAccuracy') },
    { number: "24/7", label: t('home.emergencySupport') }
  ];

  const benefits = t('home.benefits', []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-primary-600">Uzima</span> {t('home.title').replace('Uzima ', '')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/symptom-checker" className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2">
                <Stethoscope className="h-5 w-5" />
                <span>{t('home.getDiagnosis')}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/van-integration" className="btn-outline text-lg px-8 py-4 flex items-center justify-center space-x-2">
                <Truck className="h-5 w-5" />
                <span>{t('home.learnAboutVan')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.ourInnovativeSolutions')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.solutionsSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-full text-primary-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('home.ourMission')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('home.missionText1')}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {t('home.missionText2')}
              </p>
              <Link to="/about" className="btn-primary text-lg px-6 py-3">
                {t('home.learnMoreAboutUs')}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center">
                <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('home.compassionateCare')}</h3>
                <p className="text-gray-600 text-sm">{t('home.compassionateCareDesc')}</p>
              </div>
              <div className="card text-center">
                <Zap className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('home.innovation')}</h3>
                <p className="text-gray-600 text-sm">{t('home.innovationDesc')}</p>
              </div>
              <div className="card text-center">
                <Globe className="h-12 w-12 text-accent-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('home.sustainability')}</h3>
                <p className="text-gray-600 text-sm">{t('home.sustainabilityDesc')}</p>
              </div>
              <div className="card text-center">
                <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('home.communityFocus')}</h3>
                <p className="text-gray-600 text-sm">{t('home.communityFocusDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.whyChooseUzima')}
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              {t('home.whyChooseSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4">
                <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('home.readyToExperience')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('home.readySubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/symptom-checker" className="btn-primary text-lg px-8 py-4">
              {t('home.startYourDiagnosis')}
            </Link>
            <Link to="/contact" className="btn-outline text-lg px-8 py-4">
              {t('home.contactUsToday')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
