import * as vscode from "vscode";
import * as winston from "winston";
import { Writable } from "stream";

export type LogLevel =
  | "error"
  | "warn"
  | "info"
  | "verbose"
  | "debug"
  | "silly";

export function isValidLogLevel(
  string: string | undefined
): string is LogLevel {
  switch (string) {
    case "error":
    case "warn":
    case "info":
    case "verbose":
    case "debug":
    case "silly":
      return true;
    default:
      return false;
  }
}

let channel: vscode.OutputChannel;
export let Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.cli(),
    winston.format.uncolorize()
  ),
  transports: [new winston.transports.Console()]
});

export function initLogger(level: LogLevel) {
  channel = channel || vscode.window.createOutputChannel("Tilas");
  const stream = new VscodeOutputChannelStream(channel);
  Logger.clear().add(new winston.transports.Stream({ stream }));
  Logger.level = level;
  Logger.log(level, `Initialised logger with level: ${level}`);
}

export class VscodeOutputChannelStream extends Writable {
  constructor(private channel: vscode.OutputChannel) {
    super({ objectMode: false });
  }

  _write(chunk: any, encoding: string, next: Function) {
    this.channel.append(chunk.toString());
    next();
  }
}
