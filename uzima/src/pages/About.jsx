import { 
  Heart, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  Globe,
  Brain,
  Truck,
  Sun,
  Satellite,
  CheckCircle
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const About = () => {
  const { t } = useTranslation();
  
  const team = [
    {
      name: "Dr. Sarah Mwangi",
      role: "Chief Medical Officer",
      specialization: "Family Medicine & Public Health",
      experience: "15+ years",
      image: "👩‍⚕️"
    },
    {
      name: "James Otieno",
      role: "Technology Director",
      specialization: "AI & Healthcare Technology",
      experience: "12+ years",
      image: "👨‍💻"
    },
    {
      name: "Mary Akinyi",
      role: "Operations Manager",
      specialization: "Rural Healthcare Delivery",
      experience: "10+ years",
      image: "👩‍💼"
    },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: t('about.values.compassionateCare.title'),
      description: t('about.values.compassionateCare.description')
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.description')
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('about.values.trustPrivacy.title'),
      description: t('about.values.trustPrivacy.description')
    }
  ];

  const technologies = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: t('about.technologies.aiDiagnostics.title'),
      description: t('about.technologies.aiDiagnostics.description'),
      features: t('about.technologies.aiDiagnostics.features', [])
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: t('about.technologies.mobileVans.title'),
      description: t('about.technologies.mobileVans.description'),
      features: t('about.technologies.mobileVans.features', [])
    },
    {
      icon: <Satellite className="h-8 w-8" />,
      title: t('about.technologies.satelliteConnectivity.title'),
      description: t('about.technologies.satelliteConnectivity.description'),
      features: t('about.technologies.satelliteConnectivity.features', [])
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: t('about.milestones.2020.title'),
      description: t('about.milestones.2020.description')
    },
    {
      year: "2021",
      title: t('about.milestones.2021.title'),
      description: t('about.milestones.2021.description')
    },
    {
      year: "2022",
      title: t('about.milestones.2022.title'),
      description: t('about.milestones.2022.description')
    },
    {
      year: "2023",
      title: t('about.milestones.2023.title'),
      description: t('about.milestones.2023.description')
    },
    {
      year: "2024",
      title: t('about.milestones.2024.title'),
      description: t('about.milestones.2024.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title').replace('Uzima', '')} <span className="text-primary-600">Uzima</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about.ourMission')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.missionText1')}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {t('about.missionText2')}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-primary-600" />
                  <span className="font-semibold text-gray-900">{t('about.communitiesServed')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-secondary-600" />
                  <span className="font-semibold text-gray-900">{t('about.patients')}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center">
                <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.patientCentered')}</h3>
                <p className="text-gray-600 text-sm">{t('about.patientCenteredDesc')}</p>
              </div>
              <div className="card text-center">
                <Zap className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.innovation')}</h3>
                <p className="text-gray-600 text-sm">{t('about.innovationDesc')}</p>
              </div>
              <div className="card text-center">
                <Globe className="h-12 w-12 text-accent-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.sustainability')}</h3>
                <p className="text-gray-600 text-sm">{t('about.sustainabilityDesc')}</p>
              </div>
              <div className="card text-center">
                <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.trust')}</h3>
                <p className="text-gray-600 text-sm">{t('about.trustDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.ourValues')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.valuesSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-full text-primary-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.ourTechnology')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.technologySubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {technologies.map((tech, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary-100 rounded-full text-primary-600 mr-4">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {tech.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  {tech.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {tech.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.ourTeam')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.teamSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {member.specialization}
                </p>
                <p className="text-gray-500 text-xs">
                  {member.experience} experience
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.ourJourney')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.journeySubtitle')}
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card">
                      <div className="text-primary-600 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-primary-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('about.joinUs')}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {t('about.joinUsSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
              {t('about.getInTouch')}
            </a>
            <a href="/symptom-checker" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
              {t('about.tryOurServices')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
