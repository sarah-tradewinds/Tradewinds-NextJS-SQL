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
        SITE_URL: "https://tradewinds.vercel.app/",
        // API_BASE_URL: 'http://localhost:8070/api/v1'
        API_BASE_URL:
          'https://tradewinds-dev.eastus.cloudapp.azure.com/services/api/v1'
      }
    }
  }

  /* config options for all phases except development here */
  return {
    i18n: i18n.i18n,
    reactStrictMode: true, env: {
      SITE_URL: "https://tradewinds.vercel.app/",
      API_BASE_URL:
        'https://tradewinds-dev.eastus.cloudapp.azure.com/services/api/v1'
    }
  }

}// End of nextConfig function


export default nextConfig;
