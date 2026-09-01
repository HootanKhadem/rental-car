import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// To enable MSW in development, import and start this worker in your client entry (e.g., in a top-level client component)
// Example:
// if (process.env.NODE_ENV === 'development') {
//   import('@/src/mocks/browser').then(({ worker }) => worker.start());
// }
