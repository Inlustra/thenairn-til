import * as vscode from "vscode";

let currentPanel: vscode.WebviewPanel | undefined = undefined;

export function showCreateTilFull() {
  console.warn("got here");
  if (currentPanel) {
    currentPanel.reveal(vscode.ViewColumn.One);
  } else {
    try{ 
      console.log(require('./*.html'))

    } catch(error) {
      console.error(error)
    }
    currentPanel = vscode.window.createWebviewPanel(
      "catCoding",
      "Cat Coding",
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );
    console.warn("got here3");
    console.log(currentPanel);
    // currentPanel.webview.html = htmlContent;
    currentPanel.onDidDispose(() => {
      currentPanel = undefined;
    }, undefined);
  }
}
