import { useState, useEffect } from 'react';
import { updateConsent, saveConsentToStorage, getConsentFromStorage } from '../utils/analytics';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = getConsentFromStorage();
    if (!consent) {
      setShowBanner(true);
    } else {
      setPreferences(consent);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allConsent);
    saveConsentToStorage(allConsent);
    updateConsent(allConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(minimalConsent);
    saveConsentToStorage(minimalConsent);
    updateConsent(minimalConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    saveConsentToStorage(preferences);
    updateConsent(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full pointer-events-auto border border-gray-200">
        {!showSettings ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3">Vi bruger cookies 🍪</h2>
            <p className="text-gray-700 mb-4">
              Vi bruger cookies og lignende teknologier til at forbedre din oplevelse, analysere trafik og personalisere
              indhold. Du kan vælge at acceptere alle cookies eller tilpasse dine præferencer.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="bg-[#17A34A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Acceptér alle
              </button>
              <button
                onClick={handleRejectAll}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Afvis alle
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition"
              >
                Indstillinger
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Cookie indstillinger</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Nødvendige cookies</h3>
                  <p className="text-sm text-gray-600">
                    Disse cookies er nødvendige for at hjemmesiden fungerer korrekt. De kan ikke deaktiveres.
                  </p>
                </div>
                <input type="checkbox" checked={true} disabled className="mt-1 h-5 w-5" />
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Funktionelle cookies</h3>
                  <p className="text-sm text-gray-600">
                    Disse cookies gør det muligt for hjemmesiden at huske dine valg og forbedre din oplevelse.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={() => togglePreference('functional')}
                  className="mt-1 h-5 w-5 cursor-pointer"
                />
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Analyse cookies</h3>
                  <p className="text-sm text-gray-600">
                    Disse cookies hjælper os med at forstå, hvordan besøgende interagerer med hjemmesiden (Google
                    Analytics).
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => togglePreference('analytics')}
                  className="mt-1 h-5 w-5 cursor-pointer"
                />
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Marketing cookies</h3>
                  <p className="text-sm text-gray-600">
                    Disse cookies bruges til at vise relevante annoncer og kampagner.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => togglePreference('marketing')}
                  className="mt-1 h-5 w-5 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSavePreferences}
                className="bg-[#17A34A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Gem præferencer
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Tilbage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
