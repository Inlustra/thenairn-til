import { register as registerCreateTilSelection } from "./create-til-selection";
import { register as registerLogin } from "./login";
import { Disposable } from "vscode";

export const register = (): Disposable[] => [
  registerCreateTilSelection(),
  registerLogin()
];
