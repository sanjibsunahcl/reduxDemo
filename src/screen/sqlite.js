import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
import Mytextinput from './MyTextinput';

export default SQLiteScreen = props => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  const [flatListData, setFlatListData] = useState('');

  useEffect(() => {
    var db = openDatabase({name: 'UserDatabase.db'});
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        // setFlatListItems(temp);
        setFlatListData(temp);
        console.log('sqlIte data ' + JSON.stringify(temp));
      });
    });
  }, []);

  const registerUser = () => {
    var db = openDatabase({name: 'UserDatabase.db'});

    console.log(userName, userContact, userAddress);
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Inrernal Data ' + JSON.stringify(results));
            Alert.alert(
              'Success',
              // 'You are Registered Successfully',
              `You are Registered Successfully ${JSON.stringify(flatListData)}`,
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.goBack(),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Registration Failed');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            alignSelf: 'center',
            margin: 20,
          }}>
          SQLite Entry
        </Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={userName => setUserName(userName)}
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={userContact => setUserContact(userContact)}
              maxLength={10}
              keyboardType="numeric"
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Address"
              onChangeText={userAddress => setUserAddress(userAddress)}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <TouchableOpacity style={styles.button} onPress={registerUser}>
              <Text style={styles.text}>{'Submit'}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    marginStart: 10,
    marginEnd: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  removeBtn: {
    position: 'absolute',
    right: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 15,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
  },
});
