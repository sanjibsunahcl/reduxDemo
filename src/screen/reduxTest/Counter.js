import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  decrement as decrementAction,
  increment as incrementAction,
  updateIncrement as updateIncrementAction,
} from '../../testRedux/reducer/counterReducer';

const CounterTest = () => {
  const {count, increment} = useSelector(state => ({
    count: state.counter.value,
    increment: state.counter.increment,
  }));
  const dispatch = useDispatch();

  const handleIncrement = () => dispatch(incrementAction());
  const handleDecrement = () => dispatch(decrementAction());

  const handleUpdateIncrement = newIncrement =>
    dispatch(updateIncrementAction(Number(newIncrement)));

  return (
    <View style={styles.screenContainer}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 25,
          color: '#3D2C8D',
          fontWeight: 'bold',
          marginBottom: 20
        }}>
        Redux Test
      </Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={handleDecrement} style={styles.container}>
          <Text style={{color: 'white', fontSize: 28}}>{'-'}</Text>
        </TouchableOpacity>
        <Text style={styles.text} testID={'count-value'}>
          {count}
        </Text>
        <TouchableOpacity onPress={handleIncrement} style={styles.container}>
          <Text style={{color: 'white', fontSize: 28}}>{'+'}</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.incrementContainer}>
        <Text style={[styles.text, styles.incrementText]}>
          Current increment:{' '}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleUpdateIncrement}
          value={String(increment)}
          placeholder="increment"
          keyboardType="numeric"
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {flex: 1, justifyContent: 'center'},
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 130,
    // marginTop: 50,
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginHorizontal: 30,
  },
  incrementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#6272a4',
    textAlign: 'center',
    color: '#bd93f9',
    fontSize: 24,
    flex: 2,
    transform: [{translateX: -15}],
  },
  incrementText: {
    flex: 2,
  },
  container: {
    backgroundColor: '#3D2C8D',
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CounterTest;
