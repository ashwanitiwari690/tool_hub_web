// Production environment — used by production builds.
// Earnivo configuration matches the known-working reference project.
export const environment = {
  production: true,
  earnivo: {
    apiBaseUrl: "https://api.admobility.in/api",
    apiKey: "ak_9b504d51209aae38bc92fc7a1f1cda10bd9d9178c798ab93",
  },
} as const;
