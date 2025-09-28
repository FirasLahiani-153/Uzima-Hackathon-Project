import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  AlertTriangle,
  CheckCircle,
  Truck,
  Stethoscope
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactTypes = [
    { value: 'general', label: t('contact.contactTypes.general'), icon: <MessageCircle className="h-4 w-4" /> },
    { value: 'emergency', label: t('contact.contactTypes.emergency'), icon: <AlertTriangle className="h-4 w-4" /> },
    { value: 'van_booking', label: t('contact.contactTypes.van_booking'), icon: <Truck className="h-4 w-4" /> },
    { value: 'diagnosis', label: t('contact.contactTypes.diagnosis'), icon: <Stethoscope className="h-4 w-4" /> }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: 'general'
      });
    }, 2000);
  };

  const emergencyContacts = [
    {
      type: t('contact.emergencyTypes.hotline'),
      number: '+254 700 000 000',
      description: t('contact.emergencyDescriptions.hotline'),
      icon: <Phone className="h-6 w-6" />
    },
    {
      type: t('contact.emergencyTypes.vanDispatch'),
      number: '+254 700 000 001',
      description: t('contact.emergencyDescriptions.vanDispatch'),
      icon: <Truck className="h-6 w-6" />
    },
    {
      type: t('contact.emergencyTypes.deliverySupport'),
      number: '+254 700 000 002',
      description: t('contact.emergencyDescriptions.deliverySupport'),
    }
  ];

  const supportHours = [
    { day: t('contact.supportSchedule.weekdays'), hours: t('contact.supportTimes.weekdays') },
    { day: t('contact.supportSchedule.saturday'), hours: t('contact.supportTimes.saturday') },
    { day: t('contact.supportSchedule.sunday'), hours: t('contact.supportTimes.sunday') },
    { day: t('contact.supportSchedule.emergency'), hours: t('contact.supportTimes.emergency') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary-100 rounded-full">
              <MessageCircle className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('contact.sendMessage')}
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">{t('contact.messageSentSuccess')}</h3>
                    <p className="text-green-700 text-sm">{t('contact.messageSentDesc')}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.fullName')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="input-field"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.emailAddress')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="input-field"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="input-field"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.inquiryType')} *
                    </label>
                    <select
                      name="type"
                      required
                      className="input-field"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      {contactTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.subject')} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="input-field"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="input-field"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t('contact.sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{t('contact.sendMessage')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('contact.emergencyContacts')}
              </h3>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{contact.type}</h4>
                      <a 
                        href={`tel:${contact.number}`}
                        className="text-primary-600 font-medium hover:text-primary-700"
                      >
                        {contact.number}
                      </a>
                      <p className="text-gray-600 text-sm mt-1">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Contact Info */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('contact.generalInformation')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{t('contact.email')}</p>
                    <a href="mailto:info@uzima.health" className="text-primary-600 hover:text-primary-700">
                      info@uzima.health
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{t('contact.address')}</p>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{t('contact.businessHours')}</p>
                    <p className="text-gray-600">Mon-Fri: 8AM-6PM</p>
                    <p className="text-gray-600">Sat: 9AM-4PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('contact.supportHours')}
              </h3>
              <div className="space-y-3">
                {supportHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700">{schedule.day}</span>
                    <span className="font-medium text-gray-900">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('contact.quickActions')}
              </h3>
              <div className="space-y-3">
                <a href="/symptom-checker" className="block w-full btn-primary text-center">
                  {t('contact.getAIDiagnosis')}
                </a>
                <a href="/van-integration" className="block w-full btn-outline text-center">
                  {t('contact.bookVanVisit')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              {t('contact.faq')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faq1.question')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('contact.faq1.answer')}
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faq2.question')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('contact.faq2.answer')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faq3.question')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('contact.faq3.answer')}
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faq4.question')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('contact.faq4.answer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
