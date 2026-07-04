import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

// The plugin automatically injects #tanstack-router-entry which re-exports getRouter from router.tsx
// createStartHandler uses that virtual module internally — no need to pass createRouter here
const handler = createStartHandler(defaultStreamHandler);

export default {
  fetch: handler,
};
