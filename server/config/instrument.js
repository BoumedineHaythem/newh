import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://3f9f27ab27509939fbe63026fe5dcae2@o4508939250761728.ingest.de.sentry.io/4508939260002384",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
});