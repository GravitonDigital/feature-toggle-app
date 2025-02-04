import { render } from "/lib/tineikt/freemarker";
import { getSpaces } from "/lib/feature-toggles";
import { /*ZonedDateTime,*/ LanguageRange } from "/lib/time";
import { getToolUrl } from "/lib/xp/admin";
import type { Request, Response } from "@enonic-types/core";
import type { FreemarkerParams } from "./feature-toggles.freemarker";

const LOCALE_DEFAULT = "en";
const view = resolve("feature-toggles.ftl");

type RequestParams = {
  params: {
    spaceKey?: string;
  };
};

export function all(req: Request<RequestParams>): Response {
  const locale = getLocale(req);
  // Space Key
  const spaceKey = req.params.spaceKey;

  //log.info(JSON.stringify(req.params, null, 2));

  const spaces = getSpaces();

  if (spaces.length === 0) {
    return {
      body: render<FreemarkerParams>(view, {
        locale,
        features: [],
        filters: [],
        currentAppKey: "",
      }),
    };
  } else if (!spaceKey) {
    return {
      redirect: getApplicationUrl({
        spaceKey: spaces[0].key,
      }),
    };
  }

  const model: FreemarkerParams = {
    locale,
    features: [],

    /*getFeatures().map((feature) => {
      return {
        createdDate: ZonedDateTime.now(),
        ...feature,
      };
    })*/ currentAppKey: "test",
    filters: [
      {
        text: "Flupp",
        url: "#",
      },
      {
        text: "Snupp",
        url: "#",
      },
    ],
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

export function getApplicationUrl(params: Record<string, string>): string {
  const queryParams = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  return `${getToolUrl("no.item.featuretoggles", "feature-toggles")}?${queryParams}`;
}
