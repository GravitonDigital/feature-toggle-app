import type { Feature } from "/lib/featureToggle";
import type { Header } from "/admin/views/header/header.freemarker";

export type FreemarkerParams = Header & {
  locale: string;
  title: string;
  features: Feature[];
};
