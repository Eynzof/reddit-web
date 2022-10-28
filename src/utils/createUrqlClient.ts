import { cacheExchange, Resolver } from '@urql/exchange-graphcache';
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  gql,
  stringifyVariables,
} from 'urql';
import { pipe, tap } from 'wonka';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutationVariables,
} from '../gql/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';
import Router from 'next/router';

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('Not Authenticated')) {
        Router.replace('/login');
      }
    }),
  );
};

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    // console.log('allFields', allFields);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      'posts',
    );
    // if is not in the cache, then we have a partial returned
    info.partial = !isItInTheCache;

    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      // extract values from cache
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, 'posts') as string[];
      const _hasMore = cache.resolve(key, 'hasMore');
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: 'PaginatedPosts',
      hasMore,
      posts: results,
    };
  };
};
export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
      resolvers: {
        Query: {
          posts: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          vote: (_result, args, cache, _info) => {
            // args shape:
            // {value:-1, postId:419}
            // console.log('args', args);
            const { postId, value } = args as VoteMutationVariables;

            // console.log('value', value);
            // number
            // console.log('typeof value', typeof value);

            const data = cache.readFragment(
              gql`
                fragment _ on Post {
                  points
                  id
                }
              `,
              { id: postId },
            );

            // {points: '1', id: 427}
            // there is a string!!
            console.log('data:', data);
            if (data) {
              const newPoints = Number(data.points) + value;

              // typeof newpoints string
              // console.log('typeof newpoints', typeof newPoints);

              // new points 11
              // console.log('new points', newPoints);
              cache.writeFragment(
                gql`
                  fragment _ on Post {
                    points
                  }
                `,
                {
                  id: postId,
                  points: newPoints,
                },
              );

              data.points;
            }
          },
          createPost: (_result, _args, cache, _info) => {
            const allFields = cache.inspectFields('Query');
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === 'posts',
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate('Query', 'posts', fi.arguments || {});
            });
          },
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null }),
            );
          },
          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              },
            );
          },
          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              },
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
