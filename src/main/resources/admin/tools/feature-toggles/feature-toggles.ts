import { render } from "/lib/tineikt/freemarker";
import {
  getSpaces,
  getFeature,
  getFeatures,
  update as updateFeature,
  publish as publishFeature,
  PRINCIPAL_KEY_ADMIN,
  type Feature,
} from "/lib/feature-toggles";
import { ZonedDateTime, LanguageRange } from "/lib/time";
import { getToolUrl } from "/lib/xp/admin";
import { hasRole } from "/lib/xp/auth";
import type { Request, Response } from "@enonic-types/core";
import type { FreemarkerParams } from "./feature-toggles.freemarker";

const LOCALE_DEFAULT = "en";
const view = resolve("feature-toggles.ftl");

type RequestParams = {
  params: {
    spaceKey?: string;
    formId?: string;
    id?: string;
    enabled?: "on";
  };
};

export function all(req: Request<RequestParams>): Response {
  const isAdmin = hasRole("system.admin") || hasRole(PRINCIPAL_KEY_ADMIN);
  const locale = getLocale(req);
  const spaceKey = req.params.spaceKey;
  const spaces = getSpaces();

  // Handle toggle form
  if (req.params.formId === "toggle" && req.params.id) {
    updateFeature({
      id: req.params.id,
      enabled: req.params.enabled === "on",
    });
  }
  // Handle publish form
  else if (req.params.formId === "publish" && req.params.id) {
    publishFeature(req.params.id);
  }

  // If no spaces or features, render error message
  if (spaces.length === 0) {
    return {
      body: render<FreemarkerParams>(view, {
        locale,
        userCanPublish: isAdmin,
        features: [],
        filters: [],
        spaceKey: "",
      }),
    };
  }
  // If no spaceKey provided, redirect to first space
  else if (!spaceKey) {
    return {
      redirect: getApplicationUrl({
        spaceKey: spaces[0]._name,
      }),
    };
  }

  const model: FreemarkerParams = {
    locale,
    userCanPublish: isAdmin,
    features: getFeatures(spaceKey).map((feature) => {
      return {
        ...feature,
        createdDate: ZonedDateTime.parse(feature.createdDate),
        isDraftAndMasterSame: isSameOnOtherBranch(feature),
      };
    }),
    spaceKey,
    filters: spaces.map((space) => ({
      text: space._name,
      url: getApplicationUrl({ spaceKey: space._name }),
    })),
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

function isSameOnOtherBranch(feature: Feature): boolean {
  return feature.enabled === getFeature(feature.id, "master")?.enabled;
}
