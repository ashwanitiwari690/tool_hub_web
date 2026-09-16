// Development environment (used by `ng serve` and any non-production build).
//
// Earnivo configuration matching the known-working reference project.
// Keep the API key aligned with the Website Verification campaign used by this site.
export const environment = {
  production: false,
  earnivo: {
    apiBaseUrl: 'https://api.admobility.in/api',
    // apiBaseUrl: 'http://localhost:4227/api',
    apiKey: 'ak_9b504d51209aae38bc92fc7a1f1cda10bd9d9178c798ab93',
  },
} as const;
