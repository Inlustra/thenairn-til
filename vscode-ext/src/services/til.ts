import { Observable, from } from "rxjs";
import {
  LoginQuery,
  LoginQueryVariables,
  LoginDocument,
  TagSearchQuery,
  TagSearchQueryVariables,
  TagSearchDocument,
  Tag
} from "../generated/graphql";
import { map } from "rxjs/operators";
import ApolloClient from "apollo-client";

export default class TilService {
  constructor(private client: ApolloClient<any>) {}

  findTags(search: string): Observable<Tag[]> {
    return from(
      this.client.query<TagSearchQuery, TagSearchQueryVariables>({
        query: TagSearchDocument,
        variables: { search }
      })
    ).pipe(
      map(query => {
        console.log(JSON.stringify(query))
        if (query.errors) {
          throw new Error(
            query.errors.map(error => error.message).join(" and ")
          );
        }
        return query.data;
      }),
      map(data => data.tags)
    );
  }
}
