import {
  register as registerCreateTilSelection,
  Dependencies as CreateTilSelectionDeps
} from "./create-til-selection";
import { Disposable } from "vscode";

type Dependencies = CreateTilSelectionDeps;

export const register = (deps: Dependencies): Disposable[] => [
  registerCreateTilSelection(deps)
];
