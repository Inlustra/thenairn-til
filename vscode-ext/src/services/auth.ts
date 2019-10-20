import { Observable, from } from "rxjs";
import {
  LoginQuery,
  LoginQueryVariables,
  LoginDocument
} from "../generated/graphql";
import { map } from "rxjs/operators";
import ApolloClient from "apollo-client";

export default class AuthService {
  constructor(private client: ApolloClient<any>) {}

  login(email: string, password: string): Observable<void> {
    return from(
      this.client.query<LoginQuery, LoginQueryVariables>({
        query: LoginDocument,
        variables: {
          email: email,
          password
        }
      })
    ).pipe(
      map(query => {
        if (query.errors) {
          throw new Error(
            query.errors.map(error => error.message).join(" and ")
          );
        }
      })
    );
  }
}
