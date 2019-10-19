// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fetch from "cross-fetch";
import ApolloClient from "apollo-boost";
import { register } from "./commands";
const client = new ApolloClient({
  fetch
});

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "tilas" is now active!');

  register({}).forEach(disposable => context.subscriptions.push(disposable));
}

export function deactivate() {}
