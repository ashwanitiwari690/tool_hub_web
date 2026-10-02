// Production environment — used by production builds.
// Earnivo configuration matches the known-working reference project.
export const environment = {
  production: true,
  earnivo: {
    apiBaseUrl: "https://api.admobility.in/api",
    apiKey: "ak_e7eafee07b7e7401fd17cbf74ace63403bdc6c084c0b0de4",
  },
} as const;
