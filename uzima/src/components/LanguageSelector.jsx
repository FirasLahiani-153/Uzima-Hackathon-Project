import { useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector = () => {
  const { language, changeLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', shortcut: 'EN' },
    { code: 'ar', name: 'العربية', flag: '🇹🇳', shortcut: 'AR' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', shortcut: 'FR' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-xs font-bold">{currentLanguage.shortcut}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-2 hover:bg-gray-50 transition-colors duration-200 ${
                  language === lang.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                }`}
              >
                <span className="text-sm">{lang.flag}</span>
                <span className="text-xs font-bold">{lang.shortcut}</span>
                {language === lang.code && (
                  <span className="ml-auto text-primary-600 text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;

