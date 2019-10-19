import { window, commands } from "vscode";

function createTilSelection() {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }
  if (!editor.selection) {
    return;
  }
  console.log("pagidngsaongisn");
}

export const register = () =>
  commands.registerCommand("extension.createTilSelection", () =>
    createTilSelection()
  );
