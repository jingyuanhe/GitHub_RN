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
import WebViewPage from '../pages/WebViewPage'
import AboutPage from '../pages/about/AboutPage'
import AboutMePage from '../pages/about/AboutMePage'
import CustomKeyPage from '../pages/CustomKeyPage'
import SortKeyPage from '../pages/SortKeyPage'
import SearchPage from '../pages/SearchPage'
import React from 'react';
export const rootCom = 'Init';//设置根路由
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
            header:null
        }
    },
    WebViewPage:{
        screen:WebViewPage,
        navigationOptions:{
            header:null
        }
    },
    AboutPage:{
        screen:AboutPage,
        navigationOptions:{
            header:null
        }
    },
    AboutMePage:{
        screen:AboutMePage,
        navigationOptions:{
            header:null
        }
    },
    CustomKeyPage:{
        screen:CustomKeyPage,
        navigationOptions:{
            header:null
        }
    },
    SortKeyPage:{
        screen:SortKeyPage,
        navigationOptions:{
            header:null
        }
    },
    SearchPage:{
        screen:SearchPage,
        navigationOptions:{
            header:null
        }
    }
})
export const RootNavigator=createSwitchNavigator({
    Init:InitNavigator,
    Main:MainNavigator
})
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);
const App = createReduxContainer(RootNavigator,'root');
const mapStateToProps = (state) => ({
  state: state.nav
  
});
export default connect(mapStateToProps)(App);

// const store = createStore(
//   appReducer,
//   applyMiddleware(middleware),
// );

// export default class Root extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <AppWithNavigationState />
//       </Provider>
//     );
//   }
// }