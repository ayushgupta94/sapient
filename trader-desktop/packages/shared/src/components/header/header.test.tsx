import * as React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import TestRootStore from '../../stores/test-support/test-root.store';
import { getTestTheme } from '../test-support/get-test-theme';
import { Header } from './header';

// test('Header renders specified title', () => {
//     const wrapper = mount(
//         <MuiThemeProvider theme={getTestTheme()}>
//             <Header>React Template</Header>
//         </MuiThemeProvider>
//     );
//     expect(wrapper.find(Header).text()).toEqual('React Template');
// });

test('Header renders specified title', () => {
    const rootStore = new TestRootStore();
    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider rootStore={rootStore}>
                <Header>React Template</Header>
            </Provider>
        </MuiThemeProvider>
    );
    expect(wrapper.find('h1').text()).toEqual('React Template');
});
test('clears checked todos', () => {
    const rootStore = new TestRootStore();
    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider rootStore={rootStore}>
                <Header>React Template</Header>
            </Provider>
        </MuiThemeProvider>
    );
    rootStore.orderStore.numOrdersToCreate = 1;
});
