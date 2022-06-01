import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// Third party packages
import i18n from "./next-i18next.config.js";

const nextConfig = (phase) => {
  /* development only config options here */
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      i18n: i18n.i18n,
      reactStrictMode: true,
      env: {
        SITE_URL: "http://localhost:3000",
        BUYER_DASHBOARD_SITE_URL: "https://tradewinds-dev-public.s3.us-east-2.amazonaws.com",
        // API_BASE_URL: 'http://localhost:8070/api/v1'
        API_BASE_URL:
          'https://tradewinds-dev.eastus.cloudapp.azure.com'
      },
      images: {
        // domains: ["wmarketplacestgact.blob.core.windows.net"]
        domains: ["images.unsplash.com", "wmarketplacestgact.blob.core.windows.net", "m.media-amazon.com", "undefined"]
      }
    }
  }

  /* config options for all phases except development here */
  return {
    i18n: i18n.i18n,
    reactStrictMode: true,
    env: {
      SITE_URL: "https://tradewinds.vercel.app",
      // BUYER_DASHBOARD_SITE_URL: "https://tradewinds-dev-public.s3.us-east-2.amazonaws.com",
      BUYER_DASHBOARD_SITE_URL: "http://localhost:3000",
      API_BASE_URL:
        'https://tradewinds-dev.eastus.cloudapp.azure.com'
    },
    images: {
      // domains: ["wmarketplacestgact.blob.core.windows.net"]
      domains: ["images.unsplash.com", "wmarketplacestgact.blob.core.windows.net", "m.media-amazon.com"]
    }
  }

}// End of nextConfig function


export default nextConfig;
