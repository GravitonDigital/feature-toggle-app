import type { Header } from "/admin/views/header/header.freemarker";
import type { ZonedDateTime } from "/lib/time";

export type FreemarkerParams = Header & {
  locale: string;
  zoneId: string;
  spaceKey: string;
  userCanPublish: boolean;
  features: {
    id: string;
    name: string;
    enabled: boolean;
    createdDate: ZonedDateTime;
    isDraftAndMasterSame: boolean;
  }[];
};
