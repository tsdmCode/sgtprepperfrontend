// Google Analytics 4 with Consent Mode v2
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID

// Initialize Google Consent Mode
export const initializeConsent = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  // Default consent state (denied until user accepts)
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted', // Usually granted by default
    wait_for_update: 500,
  });

  // Initialize gtag
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });
};

// Update consent based on user choice
export const updateConsent = (consentSettings) => {
  if (!window.gtag) return;

  window.gtag('consent', 'update', {
    ad_storage: consentSettings.marketing ? 'granted' : 'denied',
    ad_user_data: consentSettings.marketing ? 'granted' : 'denied',
    ad_personalization: consentSettings.marketing ? 'granted' : 'denied',
    analytics_storage: consentSettings.analytics ? 'granted' : 'denied',
    functionality_storage: consentSettings.functional ? 'granted' : 'denied',
    personalization_storage: consentSettings.functional ? 'granted' : 'denied',
  });
};

// Track page views
export const trackPageView = (path) => {
  if (!window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (!window.gtag) return;
  window.gtag('event', eventName, eventParams);
};

// Helper to check if consent is given
export const getConsentFromStorage = () => {
  try {
    const stored = localStorage.getItem('cookie_consent');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Helper to save consent
export const saveConsentToStorage = (consent) => {
  try {
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
  } catch (error) {
    console.error('Failed to save consent:', error);
  }
};
