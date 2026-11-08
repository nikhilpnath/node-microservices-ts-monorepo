import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    bindings: ({ pid, hostname }) => {
      return {
        pid,
        hostname,
        environment: process.env.NODE_ENV || "development", //custom added
      };
    },
  },
});
