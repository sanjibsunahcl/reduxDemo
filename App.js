import React, {useEffect} from 'react';
import ReduxExample from './src/screen/reduxExample';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Linking, Platform} from 'react-native';

// import {store} from './src/redux/stores/stores';
import {store, persistor} from './src/reduxSaga/stores/stores';
import ReduxExampleSaga from './src/screen/reduxExampleSaga';
import RootNavigator from './src/navigation/rootNavigator';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import Home from './src/screen/home';
import {getMainDefinition} from '@apollo/client/utilities';
import * as NavigationService from './src/navigation/navigationService';
// import {WebSocketLink} from '@apollo/client/link/ws';

const cache = new InMemoryCache();
// const client = new ApolloClient({
//   uri: 'https://api.graphql.guide/graphql',
//   cache,
//   defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
// });

//hasura graphql

// forsubscription set up

const bearerToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYW1AbWFpbGluYXRvci5jb20iLCJuYW1lIjoic2FtIiwiaWF0IjoxNjQ2Mzg3NDI4LjU2MywiaXNzIjoiaHR0cHM6Ly9oYXN1cmEuaW8vbGVhcm4vIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6InNhbUBtYWlsaW5hdG9yLmNvbSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciJ9LCJleHAiOjE2NDY0NzM4Mjh9.Y3trhL6AJ6EnvZbh_g43Pej_n35OnnNNy69hvpTMzDw';

const httpLink = new HttpLink({
  uri: 'https://hasura.io/learn/graphql',
  headers: {
    Authorization: bearerToken,
  },
});

//   createClient({
//     url: 'ws://hasura.io/learn/graphql',
//   }),
// );

// const wsLink = new WebSocketLink({
//   uri: 'ws://hasura.io/learn/graphql',
//   options: {
//     reconnect: true,
//     connectionParams: {
//       headers: {
//         Authorization: bearerToken,
//       },
//     },
//   },
// });

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
// const splitLink = split(
//   ({query}) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

const client = new ApolloClient({
  uri: 'https://hasura.io/learn/graphql',
  // link: splitLink,
  // headers: {
  //   Authorization:
  //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYW1AbWFpbGluYXRvci5jb20iLCJuYW1lIjoic2FtIiwiaWF0IjoxNjQ2MTk3NDE4LjczNiwiaXNzIjoiaHR0cHM6Ly9oYXN1cmEuaW8vbGVhcm4vIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6InNhbUBtYWlsaW5hdG9yLmNvbSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciJ9LCJleHAiOjE2NDYyODM4MTh9.WOOkXF0MaNRkD5zeUUA46283FBtOetpjEV69RvIxOSA',
  // },
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
});

const App = () => {
  
  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        console.log('deeplink url ' + url);
      });
    } else {
      Linking.addEventListener('url', handleOpenURL);
    }
    Linking.addEventListener('url', handleOpenURL);
  });

  const handleOpenURL = event => {
    NavigationService.navigateTo('SQLite')
    console.log(event.url);
  };

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {/* <ReduxExampleSaga></ReduxExampleSaga> */}
        {/* <ReduxExample></ReduxExample> */}
        <RootNavigator></RootNavigator>
      </Provider>
      {/* <Home></Home> */}
    </ApolloProvider>
  );
};

export default App;
