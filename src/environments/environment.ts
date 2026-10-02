// Development environment (used by `ng serve` and any non-production build).
//
// Earnivo configuration matching the known-working reference project.
// Keep the API key aligned with the Website Verification campaign used by this site.
export const environment = {
  production: false,
  earnivo: {
    apiBaseUrl: 'https://api.admobility.in/api',
    // apiBaseUrl: 'http://localhost:4227/api',
    apiKey: 'ak_e7eafee07b7e7401fd17cbf74ace63403bdc6c084c0b0de4',
  },
} as const;
