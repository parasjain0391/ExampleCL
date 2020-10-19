/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// @ts-ignore
import {NavigationContainer} from '@react-navigation/native';
//import {View} from 'react-native';
import CallLog from './Screens/CallLog';
import SingleLog from './Screens/SingleLog';

const Stack = createStackNavigator();
interface Props {}
interface States {}
export default class App extends React.Component<Props, States> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CallLog">
          <Stack.Screen
            name="CallLog"
            component={CallLog}
            options={{title: 'CallLog'}}
          />
          <Stack.Screen
            name="SingleLog"
            component={SingleLog}
            options={{title: 'SingleLog'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
