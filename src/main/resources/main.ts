import { run } from "/lib/xp/context";
import { initRepo } from "/lib/feature-toggles";

run(
  {
    user: {
      idProvider: "system",
      login: "su",
    },
  },
  initRepo,
);
