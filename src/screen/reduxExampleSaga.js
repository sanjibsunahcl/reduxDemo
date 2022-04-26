import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
// import {ActionCreators} from '../../src/redux/actions';
import {ActionCreators} from '../../src/reduxSaga/actions';
import * as NavigationService from '../navigation/navigationService';
import {openDatabase} from 'react-native-sqlite-storage';
import InputTodo from './inputTodo';
import Login from './Login';
import store from '../testRedux/stores/store';
import CounterTest from './reduxTest/Counter';


class ReduxExampleSaga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.props.geApiDataAction();
    this.dataBaseOpen();
  }

  dataBaseOpen = async () => {
    console.log('Component did mount called');
    let db = await openDatabase({name: 'UserDatabase.db'});
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  };

  checkFirstTimeUsage = async database => {
    let firstTimeUsage = null;
    await database
      .transaction(tx => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user",
          null,
        ).then(([tx, results]) => {
          if (results.rows.length === 0) {
            firstTimeUsage = true;
          } else {
            console.log('rows length greater than 0');
            firstTimeUsage = false;
          }
        });
      })
      .catch(error => {
        console.log(error);
        firstTimeUsage = false;
      });
    return firstTimeUsage;
  };

  createTable = async database => {
    console.log('Creating table');
    database.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          // if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_user', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
            [],
          );
          // }
        },
      );
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.responseData !== this.props.responseData) {
      const {responseData} = this.props;
      this.setState({data: responseData.movies});
    }
  }

  renderMovieList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 10,
          borderColor: '#234',
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => NavigationService.navigateTo('Details', {data: item})}>
        <Text style={{fontSize: 20}}>
          {item.title}, {item.releaseYear}
        </Text>
      </TouchableOpacity>
    );
  };

  renderFooterItem = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => NavigationService.navigateTo('Details')}>
          <Text style={{color: 'white', fontSize: 18}}>GQL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => NavigationService.navigateTo('SQLite')}>
          <Text style={{color: 'white', fontSize: 18}}>SQLite</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {isLoading} = this.props;
    // console.log('isLoading app ' + isLoading);
    const {data} = this.state;
    // console.log('main data' + JSON.stringify(data));
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={'large'} style={{alignSelf: 'center'}} />
        ) : (
          <FlatList
            data={data}
            style={{height: 100}}
            keyExtractor={({id}, index) => id}
            renderItem={({item, index}) => this.renderMovieList(item, index)}
            ListFooterComponent={this.renderFooterItem()}
          />
        )}
        {/* <InputTodo/> */}
        {/* <Login></Login> */}
        {/* <Provider store={store}>
          <CounterTest></CounterTest>
        </Provider> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log('responseData nnn' + JSON.stringify(state));
  return {
    responseData: state.demo.responseData,
    isLoading: state.demo.isLoading,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxExampleSaga);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  btnStyle: {
    backgroundColor: 'black',
    width: 180,
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
});
