import type { Feature } from "/lib/feature-toggles";
import type { Header } from "/admin/views/header/header.freemarker";

export type FreemarkerParams = Header & {
  locale: string;
  features: Feature[];
};
