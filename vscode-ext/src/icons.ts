import { ExtensionContext } from "vscode";

export interface Icon {
  light: string;
  dark: string;
}

export namespace Icons {
  let context: ExtensionContext;

  export function setContext(ctx: ExtensionContext) {
    context = ctx;
  }

  function getIcon(name: string) {
    return (): Icon => ({
      light: context.asAbsolutePath("assets/icons/light/" + name),
      dark: context.asAbsolutePath("assets/icons/dark/" + name)
    });
  }

  export let addCircle = getIcon("add_circle.svg");
}
