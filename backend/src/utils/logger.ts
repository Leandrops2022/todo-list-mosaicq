/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { Request } from 'express';

const logFilePath = path.join(process.cwd(), 'log.txt');

export const logErrorToFile = (err: any, req: Request) => {
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} - Error: ${
    err.message
  }\nStack: ${err.stack}\n\n`;

  fs.appendFile(logFilePath, logMessage, (fsErr) => {
    if (fsErr) {
      console.error('Failed to write error log:', fsErr);
    }
  });
};
