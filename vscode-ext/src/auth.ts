import { BehaviorSubject } from "rxjs";
import { map, withLatestFrom, tap } from "rxjs/operators";
import { RxjsLink } from "./lib/rxjs-link";

const token$ = new BehaviorSubject<string | undefined>(undefined);

export const isLoggedIn$ = token$.pipe(map(client => !!client));

export const setHeadersLink = new RxjsLink({
  onOperation: operation =>
    operation.pipe(
      withLatestFrom(token$),
      map(([op, token]) => {
        op.setContext({
          headers: {
            authorization: token
          }
        });
        return op;
      })
    )
});

export const onLogin = new RxjsLink({
  onResult: result =>
    result.pipe(
      tap(result => {
        if (result.data && result.data.login) {
          token$.next(result.data.login);
        }
      })
    )
});
