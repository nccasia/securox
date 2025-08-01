import "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js";

document.documentElement.classList.add("cc--darkmode");
CookieConsent.run({
   guiOptions: {
      consentModal: {
         layout: "box",
         position: "bottom left",
         equalWeightButtons: true,
         flipButtons: false,
      },
      preferencesModal: {
         layout: "box",
         position: "right",
         equalWeightButtons: false,
         flipButtons: true,
      },
   },
   categories: {
      necessary: {
         readOnly: true,
      },
      analytics: {},
      marketing: {},
   },
   onConsent: ({ cookie }) => {
      const consentState = {
         analytics_storage: "denied",
         ad_storage: "denied",
         ad_user_data: "denied",
         ad_personalization: "denied",
      };

      if (cookie.categories.includes("analytics")) {
         consentState.analytics_storage = "granted";
      }

      if (cookie.categories.includes("marketing")) {
         consentState.ad_storage = "granted";
         consentState.ad_user_data = "granted";
         consentState.ad_personalization = "granted";
      }
      gtag("consent", "update", consentState);
   },
   language: {
      default: "en",
      autoDetect: "browser",
      translations: {
         en: {
            consentModal: {
               title: "Hello traveller, it's cookie time!",
               description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
               acceptAllBtn: "Accept all",
               acceptNecessaryBtn: "Reject all",
               showPreferencesBtn: "Manage preferences",
               footer:
                  '<a href="#link">Privacy Policy</a>\n<a href="#link">Terms and conditions</a>',
            },
            preferencesModal: {
               title: "Consent Preferences Center",
               acceptAllBtn: "Accept all",
               acceptNecessaryBtn: "Reject all",
               savePreferencesBtn: "Save preferences",
               closeIconLabel: "Close modal",
               serviceCounterLabel: "Service|Services",
               sections: [
                  {
                     title: "Cookie Usage",
                     description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                  },
                  {
                     title: 'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
                     description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                     linkedCategory: "necessary",
                  },
                  {
                     title: "Analytics Cookies",
                     description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                     linkedCategory: "analytics",
                  },
                  {
                     title: "Advertisement Cookies",
                     description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                     linkedCategory: "marketing",
                  },
                  {
                     title: "More information",
                     description:
                        'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
                  },
               ],
            },
         },
      },
   },
});
