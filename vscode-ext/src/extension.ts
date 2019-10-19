// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { register } from "./commands";
import { State } from "./state";
import { Configuration } from "./configuration";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "tilas" is now active!');

  register().forEach(disposable => context.subscriptions.push(disposable));
  Configuration.all$.subscribe(val =>
    console.log(`Config: ${JSON.stringify(val)}`)
  );
  Configuration.secure$.subscribe(val =>
    console.log(`Secure: ${JSON.stringify(val)}`)
  );
  State.loggedInClient$.subscribe(val =>
    console.log(`LoggedInClient: ${JSON.stringify(val)}`)
  );
  State.isLoggedIn$.subscribe(val =>
    console.log(`IsLoggedIn: ${JSON.stringify(val)}`)
  );
}

export function deactivate() {}
