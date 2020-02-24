import darkIcons from "./assets/icons/dark/*.svg";
import lightIcons from "./assets/icons/light/*.svg";
import { Uri } from "vscode";
import path from "path";

export interface Icon {
  light: Uri;
  dark: Uri;
}

function icon(name: string): Icon {
  return {
    light: Uri.file(path.join(".", lightIcons[name])),
    dark: Uri.file(path.join(".", darkIcons[name]))
  };
}

export const addCircleIcon = icon("add_circle");
