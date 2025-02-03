import { render } from "/lib/tineikt/freemarker";
import { getFeatures } from "/lib/featureToggle";
import { ZonedDateTime } from "/lib/time";
import { LanguageRange } from "/lib/feature-toggle-app/locale-range";
import type { Request, Response } from "@enonic-types/core";
import type { FreemarkerParams } from "./feature-toggles.freemarker";

const LOCALE_DEFAULT = "en";
const view = resolve("feature-toggles.ftl");

export function get(req: Request): Response {
  const model: FreemarkerParams = {
    locale: getLocale(req),
    title: "Overskrift",
    features: getFeatures("tomtest", "draft").map((feature) => {
      return {
        createdDate: ZonedDateTime.now(),
        ...feature,
      };
    }),
    currentAppKey: "test",
    displayName: "Feature toggles",
    filters: [],
  };

  return {
    body: render<FreemarkerParams>(view, model),
  };
}

function getLocale(req: Request): string {
  const acceptLanguage = req.headers["Accept-Language"];
  if (acceptLanguage) {
    const firstLanguageRange = LanguageRange.parse(acceptLanguage)[0];
    return firstLanguageRange.getRange();
  }

  return LOCALE_DEFAULT;
}
