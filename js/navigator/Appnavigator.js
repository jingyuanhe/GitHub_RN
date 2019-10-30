import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import {
    createStore,
    applyMiddleware,
    combineReducers,
  } from 'redux';
  import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
  } from 'react-navigation-redux-helpers';
  import { Provider, connect } from 'react-redux';
import WelcomePage from "../pages/WelcomePage";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import React from 'react';
const InitNavigator=createStackNavigator({
    WelcomePage:{
        screen:WelcomePage,
        navigationOptions:{
            header:null
        }
    }
})
const MainNavigator=createStackNavigator({
    HomePage:{
        screen:HomePage,
        navigationOptions:{
            header:null
        }
    },
    DetailPage:{
        screen:DetailPage,
        navigationOptions:{
            // header:null
        }
    }

})
const appNavigator=createSwitchNavigator({
    Init:InitNavigator,
    Main:MainNavigator
})
const navReducer=createNavigationReducer(appNavigator);
const appReducer = combineReducers({
    nav: navReducer
  });
const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
);
const App = createReduxContainer(appNavigator);
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
  appReducer,
  applyMiddleware(middleware),
);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}