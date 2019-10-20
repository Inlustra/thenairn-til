import { Configuration } from "../../configuration";
import * as vscode from "vscode";
import { first, switchMap, switchMapTo, tap } from "rxjs/operators";
import { Observable } from "rxjs";

interface AuthService {
  login: (email: string, password: string) => Observable<void>;
}

async function login(authSvc: AuthService) {
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
  if (!password || !email) {
    return;
  }
  try {
    authSvc
      .login(email, password)
      .pipe(switchMap(() => Configuration.setAccount(email, password)))
      .toPromise();
  } catch (error) {
    vscode.window.showErrorMessage(error);
  }
}

export const registerLoginCommand = (authSvc: AuthService) => {
  return vscode.commands.registerCommand("extension.tilasLogin", () =>
    login(authSvc)
  );
};
