import { routing } from "./routing";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({
    requestLocale
}) => {
    let locale = await requestLocale;
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale: locale,
        messages: (await import(`../public/locales/${locale}/common.json`)).default
    };
});