import { commands } from "vscode";

export interface Dependencies {}

function createTilSelection(deps: Dependencies) {
  return () => {
    console.log('pagidngsaongisn')
  };
}

export const register = (deps: Dependencies) =>
  commands.registerCommand(
    "extension.createTilSelection",
    createTilSelection(deps)
  );
