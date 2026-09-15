// Development environment (used by `ng serve` and any non-production build).
//
// Safe to commit as-is: no real credentials belong here. `apiKey` blank keeps
// the Earnivo reward widget disabled, matching local dev where there is
// normally no live campaign to verify against. Point `apiBaseUrl` at a local
// Earnivo instance only if you're actively testing that integration.
export const environment = {
  production: false,
  earnivo: {
    apiBaseUrl: 'https://api.admobility.in/api',
    // apiBaseUrl: 'http://localhost:4227/api',
    apiKey: 'ak_9b504d51209aae38bc92fc7a1f1cda10bd9d9178c798ab93',
  },
} as const;
