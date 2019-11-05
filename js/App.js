import React, {Component} from 'react';
import {Provider} from 'react-redux';
import DetailPage from './navigator/Appnavigator'
import store from './store'

type Props = {};
export default class App extends Component<Props> {
    render() {
        /**
         * 将store传递给App框架
         */
        return <Provider store={store}>
            <DetailPage/>
        </Provider>
    }
}