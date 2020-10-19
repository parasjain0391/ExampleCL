/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Tile } from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { NavigationParams } from 'react-navigation';

interface Props extends NavigationParams {
  navigation:any

}
interface States { }
export default class SingleLog extends React.Component<Props, States> {
    render() {
      const {call} = this.props.route.params;
      return (
        <View style={styles.body}>
          <Text style={styles.mainText}>{(call.name === null) ? 'NO NAME' : call.name}</Text>
          <Text>Phone Number: {call.phoneNumber}</Text>
          <Text>{call.type} CALL</Text>
          <Text>Duration: {call.duration} Sec</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  mainText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    justifyContent:'center',
  },
});
