import "./feature-toggles.css";
import "../../views/toggle/toggle.css";
import id from "./feature-toggles.ftl";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";
import type { FreemarkerParams } from "./feature-toggles.freemarker";

export default {
  title: "Admin tools/Feature Toggles",
  parameters: {
    layout: "fullscreen",
    server: {
      id,
    },
  },
} satisfies Meta<FreemarkerParams>;

export const featureToggles: StoryObj<FreemarkerParams> = {
  args: {
    locale: "no",
    displayName: "Feature toggles",
    currentAppKey: "tomtest",
    filters: [
      {
        text: "first",
        url: "/",
      },
      {
        text: "second",
        url: "/",
      },
    ],
    title: "My feature toggles",
    features: [
      {
        id: "123e4567-e89b-12d3-a456-426655440000",
        name: "feature-a",
        createdDate: "2025-01-28T12:02:00.000Z",
        enabled: true,
      },
      {
        id: "123e4567-e89b-12d3-a456-426655440001",
        name: "feature-b",
        createdDate: "2025-01-12T08:53:00.000Z",
        enabled: true,
      },
      {
        id: "123e4567-e89b-12d3-a456-426655440002",
        name: "feature-c",
        createdDate: "2025-02-02T11:44:20.000Z",
        enabled: false,
      },
    ],
  },
};
