/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// import all the components we are going to use
import {Platform, StyleSheet, PermissionsAndroid, Alert, ScrollView, View} from 'react-native';
// import CallLogs API
// @ts-ignore
import CallLogs from 'react-native-call-log';
import { ListItem} from 'react-native-elements';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 16,
    marginVertical: 10,
    color: '#33ff49',
  },
});

interface Props {
  navigation: any;
}
interface State {
  calls: {
    dateTime: string;
    duration: number;
    name: string;
    phoneNumber: number;
    rawType: number;
    timestamp: string;
    type: string;
  }[];
}
export default class CallLog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      calls: [],
    };
  }
  async componentDidMount() {
    if (Platform.OS !== 'ios') {
      try {
        //Ask for runtime permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message: 'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          CallLogs.loadAll().then((calls: any) => this.setState({calls}));
          CallLogs.load(5).then((c: any) => console.log(c));
        } else {
          Alert.alert('Call Log permission denied');
        }
      } catch (e) {
        Alert.alert(e);
      }
    } else {
      Alert.alert(
        'Sorry! You can’t get call logs in iOS devices because of the security concern',
      );
    }
  }
  renderCalls() {
    return this.state.calls.map(call => {
      return <ListItem key={call.timestamp}
          onPress={()=> this.props.navigation.navigate('SingleLog',{call:call})}
          bottomDivider>
          <ListItem.Content>
          <ListItem.Title>{(call.name === null) ? 'NO NAME' : call.name}</ListItem.Title>
          <ListItem.Subtitle>{call.phoneNumber}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>;
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{flex:1, backgroundColor:'white'}}>{this.renderCalls()}</View>
        </ScrollView>
      </View>
    );
  }
}

// useEffect() {
//   async function fetchData() {
//     if (Platform.OS !== 'ios') {
//       try {
//         //Ask for runtime permission
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
//           {
//             title: 'Call Log Example',
//             message: 'Access your call logs',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           CallLogs.loadAll().then((c: any) => setListDate(c));
//           CallLogs.load(5).then((c: any) => console.log(c));
//         } else {
//           Alert.alert('Call Log permission denied');
//         }
//       } catch (e) {
//         Alert.alert(e);
//       }
//     } else {
//       Alert.alert(
//         'Sorry! You can’t get call logs in iOS devices because of the security concern',
//       );
//     }
//   }
//   fetchData();
// }, []);

// render() {
//     return (
//         <SafeAreaView style={styles.container}>
//           <View>
//             <Text style={styles.titleText}>
//               How to Access Call Logs of Android Devices from React Native App
//             </Text>
//             <FlatList
//               data={this.listData}
//               //data defined in constructor
//               ItemSeparatorComponent={this.ItemSeparatorView}
//               //Item Separator View
//               renderItem={this.ItemView}
//               keyExtractor={(item, index) => index.toString()}
//             />
//           </View>
//         </SafeAreaView>
//     );
// }
