import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV !== "production";
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

function format(message: string, context?: Record<string, unknown>): string {
  return context && Object.keys(context).length > 0
    ? `${message} ${JSON.stringify(context)}`
    : message;
}

export const logger = {
  debug(message: string, context?: Record<string, unknown>): void {
    if (isDev) console.debug(format(message, context));
  },
  info(message: string, context?: Record<string, unknown>): void {
    if (isDev) console.info(format(message, context));
  },
  warn(message: string, context?: Record<string, unknown>): void {
    if (isDev) console.warn(format(message, context));
    if (dsn)
      Sentry.captureMessage(message, { level: "warning", ...(context ? { extra: context } : {}) });
  },
  error(message: string, context?: Record<string, unknown>): void {
    if (isDev) console.error(format(message, context));
    if (dsn) {
      const err = context?.error instanceof Error ? (context.error as Error) : new Error(message);
      Sentry.captureException(err, context ? { extra: context } : undefined);
    }
  },
};

export default logger;
