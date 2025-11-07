import { useState } from 'react';

export function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const termsContent = `
HANDELSBETINGELSER

1. Generelle bestemmelser
Disse handelsbetingelser gælder for alle køb foretaget hos Sgt. Prepper's Water and Pepper.

2. Priser
Alle priser er angivet i DKK og inkluderer moms.

3. Betaling
Vi accepterer betalinger via [betalingsmetoder].

4. Levering
Vi leverer til hele Danmark. Leveringstid er 3-5 hverdage.

5. Fortrydelsesret
Du har 14 dages fortrydelsesret fra modtagelse af varen.

6. Reklamationsret
Du har 24 måneders reklamationsret efter købeloven.
  `.trim();

  const privacyContent = `
PERSONDATAPOLITIK

1. Dataansvarlig
Bazaar Nord Emv, CVR-NR: 44215799

2. Formål med behandling
Vi behandler dine personoplysninger til at:
- Gennemføre dit køb
- Levere varer til dig
- Forbedre vores tjenester

3. Kategorier af personoplysninger
Vi behandler følgende oplysninger:
- Navn
- Adresse
- E-mail
- Telefonnummer

4. Modtagere af oplysninger
Dine oplysninger deles kun med vores leverandører og betalingsformidlere.

5. Opbevaring
Vi opbevarer dine oplysninger i 5 år efter dit sidste køb.

6. Dine rettigheder
Du har ret til at:
- Få indsigt i dine data
- Få rettet eller slettet dine data
- Trække samtykke tilbage
  `.trim();

  return (
    <div>
      <img className="w-full" src="src/assets/Footer.png" alt="" />
      <footer className="bg-[#334156] text-white text-left flex justify-center gap-5 py-5">
        <ul>
          <h3>Company</h3>
          <p>Bazaar Nord Emv</p>
          <p>CVR-NB-44215799</p>
        </ul>
        <ul>
          <h3>Address</h3>
          <p>Bakkegårdsvej 28 C,2</p>
          <p>9000 Aalborg</p>
        </ul>
        <ul>
          <h3>Policy</h3>
          <li>
            <button onClick={() => setShowTerms(true)} className="text-white hover:underline cursor-pointer">
              Handelsbetingelser
            </button>
          </li>
          <li>
            <button onClick={() => setShowPrivacy(true)} className="text-white hover:underline cursor-pointer">
              Personsdatapolitik
            </button>
          </li>
        </ul>
        <ul>
          <h3>Contact Info</h3>
          <p>Phone: +45 42506072</p>
          <p>E-mail: sgtprepper@nord.dk</p>
        </ul>
      </footer>

      {/* Terms Dialog */}
      {showTerms && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTerms(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Handelsbetingelser</h2>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="text-gray-700 whitespace-pre-wrap">{termsContent}</div>
            <button
              onClick={() => setShowTerms(false)}
              className="mt-6 bg-[#334156] text-white px-6 py-2 rounded-lg hover:bg-[#4a5a70] transition"
            >
              Luk
            </button>
          </div>
        </div>
      )}

      {/* Privacy Dialog */}
      {showPrivacy && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPrivacy(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Personsdatapolitik</h2>
              <button
                onClick={() => setShowPrivacy(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="text-gray-700 whitespace-pre-wrap">{privacyContent}</div>
            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-6 bg-[#334156] text-white px-6 py-2 rounded-lg hover:bg-[#4a5a70] transition"
            >
              Luk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
