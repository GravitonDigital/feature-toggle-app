import { run } from "/lib/xp/context";
import { initRepo } from "/lib/feature-toggles";

log.info("Initializing feature toggle repository...");

run(
  {
    user: {
      idProvider: "system",
      login: "su",
    },
  },
  initRepo,
);
