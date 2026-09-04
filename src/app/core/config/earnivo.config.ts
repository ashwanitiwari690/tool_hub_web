// Earnivo reward verification.
//
// Visitors sent here by an Earnivo "Website Promotion" campaign arrive with a
// one-time token in the URL (?ev_token=...). The reward widget pairs that
// token with the API key below to confirm the visit and credit the visitor's
// Earnivo wallet.
//
// `apiKey` comes from the Earnivo agent panel: open the campaign, then the
// "Website Verification" card. Leaving it blank disables the widget
// completely, so this file is safe to ship as-is on a deployment that isn't
// running an Earnivo campaign.
export const EARNIVO_CONFIG = {
  apiBaseUrl: 'http://localhost:4227/api',
  apiKey: 'ak_3a0a3776e9a92b4043278d6e7fffc530fc7553f6c9caf6d0',
} as const;
