import { Configuration } from "../../configuration";
import * as vscode from "vscode";
import { first, switchMap, switchMapTo, tap } from "rxjs/operators";
import { State } from "../../state";

async function login() {
  const { email: currentEmail } = await Configuration.all$
    .pipe(first())
    .toPromise();
  const email = await vscode.window.showInputBox({
    placeHolder: "Email",
    prompt: `Your Tilas email`,
    value: currentEmail,
    ignoreFocusOut: true,
    validateInput: email => (!email ? "Your email cannot be empty" : undefined)
  });
  const password = await vscode.window.showInputBox({
    password: true,
    placeHolder: "Password",
    prompt: `Your Tilas password`,
    ignoreFocusOut: true,
    validateInput: password =>
      !password ? "Your password cannot be empty" : undefined
  });
  if (password && email) {
    await Configuration.setAccount(email, password)
      .pipe(
        switchMapTo(State.isLoggedIn$),
        first(),
        tap(console.error)
      )
      .toPromise();
  }
}

export const register = () => {
  return vscode.commands.registerCommand("extension.tilasLogin", () => login());
};
