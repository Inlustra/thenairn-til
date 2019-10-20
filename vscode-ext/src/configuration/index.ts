import * as vscode from "vscode";
import { Observable, Subject, BehaviorSubject, from, of } from "rxjs";
import {
  distinctUntilChanged,
  skipWhile,
  switchMap,
  map,
  catchError,
  mapTo,
  switchMapTo,
  shareReplay,
  tap,
  first
} from "rxjs/operators";
import { Logger, LogLevel } from "../logger";
import { setPassword, getPassword, deletePassword } from "keytar";

const SECTION = "tilas";

export enum ConfigurationKeys {
  URL = "url",
  LOG_LEVEL = "logLevel",
  EMAIL = "email"
}

interface TilasConfig {
  url: string;
  token?: string;
  logLevel?: LogLevel;
  email?: string;
}

interface SecureTilasConfig {
  password: string | null;
}

export namespace Configuration {
  const KEYTAR_SERVICE = "Tilas";
  const { URL, LOG_LEVEL, EMAIL } = ConfigurationKeys;

  const config$: Subject<TilasConfig> = new BehaviorSubject<TilasConfig>(
    getVSCodeConfig()
  );

  export const all$: Observable<TilasConfig> = config$.pipe(
    distinctUntilChanged(),
    shareReplay(1),
    tap(console.error)
  );

  export const secure$: Observable<
    SecureTilasConfig & TilasConfig
  > = config$.pipe(
    switchMap(config =>
      from(getPassword(KEYTAR_SERVICE, config.email as string)).pipe(
        catchError(() => of(null)),
        map(password => ({
          ...config,
          password
        }))
      )
    ),
  );

  function getVSCodeConfig() {
    const vscodeConfig = vscode.workspace.getConfiguration(SECTION);
    const url = vscodeConfig.get<string>(URL);
    const logLevel = vscodeConfig.get<LogLevel>(LOG_LEVEL);
    const email = vscodeConfig.get<string>(EMAIL);
    return {
      url: url || "https://thenairn.com/api/graphql",
      logLevel,
      email
    };
  }

  vscode.workspace.onDidChangeConfiguration(config => {
    if (
      config.affectsConfiguration(SECTION + "." + URL) ||
      config.affectsConfiguration(SECTION + "." + EMAIL) ||
      config.affectsConfiguration(SECTION + "." + LOG_LEVEL)
    ) {
      config$.next(getVSCodeConfig());
    }
  });

  export function setUrl(url: string, global: boolean = true) {
    vscode.workspace
      .getConfiguration(SECTION)
      .update(ConfigurationKeys.URL, url.replace(/\/$/, ""), global);
    Logger.info(`[Configuration] Set url to: ${url}`);
  }

  export function clearAccount(email: string) {
    deletePassword(KEYTAR_SERVICE, email);
  }

  export function setAccount(
    email: string,
    password: string,
    global: boolean = true
  ) {
    return from(setPassword(KEYTAR_SERVICE, email, password)).pipe(
      switchMap(
        async () =>
          await vscode.workspace
            .getConfiguration(SECTION)
            .update(ConfigurationKeys.EMAIL, email, global)
      )
    );
  }

  export function setLogLevel(logLevel: LogLevel, global: boolean = true) {
    vscode.workspace
      .getConfiguration(SECTION)
      .update(ConfigurationKeys.LOG_LEVEL, logLevel, global);
    Logger.info(`[Configuration] Set logLevel to: ${logLevel}`);
  }
}
