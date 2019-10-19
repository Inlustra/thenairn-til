import { Configuration } from "./configuration";
import {
  map,
  switchMap,
  startWith,
  pairwise,
  distinctUntilChanged,
  withLatestFrom,
  finalize,
  shareReplay
} from "rxjs/operators";
import ApolloClient, { PresetConfig } from "apollo-boost";
import fetch from "cross-fetch";
import { of, combineLatest } from "rxjs";
import {
  LoginDocument,
  LoginQuery,
  LoginQueryVariables
} from "./generated/graphql";
import distinctUntilKeysChanged from "./lib/operators/distinct-until-keys-changed";

function apolloClient(config: PresetConfig) {
  const client = new ApolloClient({
    ...config,
    fetch
  });
  return of(client).pipe(
    finalize(() => {
      client.stop();
    })
  );
}

export namespace State {
  const apolloClient$ = Configuration.all$.pipe(
    map(config => config.url),
    distinctUntilChanged(),
    switchMap(url => (!url ? of(undefined) : apolloClient({ uri: url }))),
    shareReplay()
  );

  const token$ = combineLatest(
    Configuration.secure$.pipe(distinctUntilKeysChanged("email", "password")),
    apolloClient$
  ).pipe(
    switchMap(async ([{ email, password }, client]) => {
      if (client && email && password) {
        const query = await client.query<LoginQuery, LoginQueryVariables>({
          query: LoginDocument,
          variables: {
            email: email,
            password
          }
        });
        return query.data.login;
      }
    }),
    shareReplay()
  );

  export const loggedInClient$ = token$.pipe(
    distinctUntilChanged(),
    withLatestFrom(Configuration.all$),
    switchMap(async ([token, { url }]) => {
      if (!token || !url) {
        return undefined;
      }
      return apolloClient({
        uri: url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }),
    shareReplay()
  );

  export const isLoggedIn$ = token$.pipe(map(client => !!client));
}
