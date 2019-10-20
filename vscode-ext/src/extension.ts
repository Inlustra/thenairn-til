// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Configuration } from "./configuration";
import ApolloClient from "apollo-client";
import fetch from "cross-fetch";
import {
  withLatestFrom,
  map,
  first,
  tap,
  switchMap,
  mapTo
} from "rxjs/operators";
import { createHttpLink } from "apollo-link-http";

import { InMemoryCache } from "apollo-cache-inmemory";
import { setHeadersLink, onLogin } from "./auth";
import AuthService from "./services/auth";
import { registerLoginCommand } from "./commands/login";
import { of } from "rxjs";
import { Logger, initLogger } from "./logger";
import { RxjsLink } from "./lib/rxjs-link";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "tilas" is now active!');

  const apolloClient = initClient();
  const authSvc = new AuthService(apolloClient);

  Configuration.all$.subscribe(config => initLogger(config.logLevel || "info"));

  Configuration.secure$
    .pipe(
      first(),
      switchMap(({ email, password }) => {
        return email && password
          ? authSvc.login(email, password).pipe(mapTo(true))
          : of(false);
      })
    )
    .subscribe({
      next: success =>
        success
          ? Logger.info(`Initial login successful`)
          : Logger.info(`User has not logged in`),
      error: error => {
        vscode.window.showErrorMessage(error && error.message);
      },
      complete: () => Logger.info(`Completed initial login`)
    });
  registerLoginCommand(authSvc);
}

function initClient() {
  return new ApolloClient({
    link: new RxjsLink({
      onOperation: operation =>
        operation.pipe(
          withLatestFrom(Configuration.all$.pipe(map(config => config.url))),
          map(([op, url]) => {
            op.setContext({
              uri: url
            });
            return op;
          })
        )
    })
      .concat(setHeadersLink)
      .concat(onLogin)
      .concat(
        createHttpLink({
          fetch
        })
      ),

    cache: new InMemoryCache()
  });
}

export function deactivate() {}
