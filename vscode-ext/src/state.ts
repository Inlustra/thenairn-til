import { Configuration } from "./configuration";
import {
  map,
  switchMap,
  distinctUntilChanged,
  withLatestFrom,
  shareReplay,
  first,
  tap
} from "rxjs/operators";
import ApolloClient from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { of, Observable, BehaviorSubject, from } from "rxjs";
import {
  LoginDocument,
  LoginQuery,
  LoginQueryVariables
} from "./generated/graphql";
import { RxjsLink } from 'apollo-link-rxjs';

export namespace State {

  
}
