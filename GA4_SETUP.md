# Google Analytics 4 Implementation with Consent Mode

## Setup Instructions

### 1. Get your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (if you haven't already)
3. Get your Measurement ID (format: G-XXXXXXXXXX)

### 2. Update Configuration

Replace `G-XXXXXXXXXX` with your actual Measurement ID in these files:

#### `index.html` (line 33)

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

#### `src/utils/analytics.js` (line 2)

```javascript
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
```

### 3. How It Works

#### Consent Mode v2

- All tracking is **denied by default** until user gives consent
- Complies with GDPR, CCPA, and other privacy regulations
- Uses Google's Consent Mode v2 with these categories:
  - `ad_storage` - Marketing/advertising cookies
  - `ad_user_data` - User data for ads
  - `ad_personalization` - Personalized ads
  - `analytics_storage` - Analytics cookies (GA4)
  - `functionality_storage` - Functional preferences
  - `personalization_storage` - User personalization
  - `security_storage` - Always granted (necessary for security)

#### Cookie Banner

- Shows on first visit
- User can:
  - Accept all cookies
  - Reject all (only necessary)
  - Customize preferences
- Preferences saved in localStorage
- Banner won't show again after user makes a choice

### 4. Available Functions

#### Track Page Views

```javascript
import { trackPageView } from './utils/analytics';

trackPageView('/products');
```

#### Track Custom Events

```javascript
import { trackEvent } from './utils/analytics';

// Add to cart
trackEvent('add_to_cart', {
  item_id: 'SKU_123',
  item_name: 'Product Name',
  price: 99.99,
  quantity: 1
});

// Purchase
trackEvent('purchase', {
  transaction_id: 'T_12345',
  value: 299.99,
  currency: 'DKK',
  items: [...]
});

// Login
trackEvent('login', {
  method: 'username'
});
```

### 5. Recommended Events to Track

Add these to your components:

#### ProductDetails.jsx - Add to Cart

```javascript
import { trackEvent } from '../utils/analytics';

const handleClick = () => {
  if (!isAuthed) {
    alert('Du skal logge ind for at tilføje varer til kurven');
    return;
  }

  // ... existing cart logic ...

  // Track event
  trackEvent('add_to_cart', {
    item_id: slug,
    item_name: name,
    price: Number(price),
    quantity: Number(value),
    currency: 'DKK',
  });
};
```

#### LoginBar.jsx - Login Success

```javascript
import { trackEvent } from '../utils/analytics';

const handleClick = async () => {
  if (isAuthed) {
    logout();
    trackEvent('logout');
    return;
  }

  const result = await login(form.username, form.password);
  if (result.success) {
    trackEvent('login', { method: 'username' });
    setForm((p) => ({ ...p, password: '' }));
  }
};
```

#### ProductCard.jsx - View Item

```javascript
import { trackEvent } from '../utils/analytics';

const handleClick = () => {
  trackEvent('view_item', {
    item_id: props.slug,
    item_name: name,
    price: Number(price),
    currency: 'DKK',
  });
  onClick?.();
};
```

### 6. Testing

1. Open your site in Chrome
2. Open DevTools → Console
3. Type: `dataLayer` and press Enter
4. You should see consent events and page views
5. Accept cookies and verify analytics_storage is granted

### 7. Verify in GA4

1. Go to Google Analytics
2. Click "Configure" → "DebugView"
3. Open your site and perform actions
4. Events should appear in real-time in DebugView

### 8. Privacy Policy

Make sure to update your privacy policy to mention:

- Google Analytics usage
- Cookie types and purposes
- User's right to opt-out
- Data retention period

## Files Created/Modified

- ✅ `src/utils/analytics.js` - GA4 integration and consent management
- ✅ `src/components/CookieConsent.jsx` - Cookie consent banner
- ✅ `index.html` - GA4 script tags with consent mode
- ✅ `src/main.jsx` - Initialize consent on app start
- ✅ `src/App.jsx` - Added CookieConsent component

## Compliance

This implementation:

- ✅ GDPR compliant (EU)
- ✅ CCPA compliant (California)
- ✅ Cookie consent required before tracking
- ✅ User can withdraw consent anytime
- ✅ Consent stored locally
- ✅ IP anonymization enabled

## Notes

- Consent is stored in `localStorage` as `cookie_consent`
- Consent persists across sessions
- To reset: Clear browser localStorage or cookies
- Security cookies are always granted (required for functionality)
