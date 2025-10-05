import { env } from "next-runtime-env";

const config = {
  apiHost: env("NEXT_PUBLIC_API_URL") ?? "https://dhub.yaludev.com",
  enableGlobalAuth: env("NEXT_PUBLIC_GLOBAL_AUTH") ?? false,
  company: {
    name: env("NEXT_PUBLIC_COMPANY_NAME") ?? "DRIVER HUB (Pvt) Ltd",
    logo:
      env("NEXT_PUBLIC_COMPANY_LOGO") ??
      "https://dhub-api.yaludev.com/uploads/company/2021-09-28T14:17:18.000Z-dhub.png",
  },
};

export default config;
