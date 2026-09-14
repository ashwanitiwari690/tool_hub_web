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
    apiKey: 'ak_395d53191c736c07418ff373491b93675e525823f87d2c08',
  },
} as const;
