import {
  ApolloClient, HttpLink, InMemoryCache, split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// API endpoints consumed by the application
export const API_END_POINTS = {
  API: 'https://react.eogresources.com/graphql',
  GRAPHQL: 'wss://react.eogresources.com/graphql',
};

const httpLink = new HttpLink({
  uri: API_END_POINTS.API,
});

// Using this so Apollo can switch between HTTP and GRAPHQL endpoints
// Reference: Apollo documentation
const wsLink = new WebSocketLink({
  uri: API_END_POINTS.GRAPHQL,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
