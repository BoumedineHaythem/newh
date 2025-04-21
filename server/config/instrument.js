import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://f3eaf8d76ac7aea9712ffb1829e97983@o4509118261100544.ingest.de.sentry.io/4509118263984208",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
});