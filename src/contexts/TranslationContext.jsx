import { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to English
    return localStorage.getItem('uzima-language') || 'en';
  });

  const [translations, setTranslations] = useState({});

  // Load translations based on current language
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../data/translations/${language}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to English if translation fails
        if (language !== 'en') {
          const englishModule = await import(`../data/translations/en.json`);
          setTranslations(englishModule.default);
        }
      }
    };

    loadTranslations();
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('uzima-language', newLanguage);
  };

  const t = (key, fallback = '') => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return value || fallback || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

