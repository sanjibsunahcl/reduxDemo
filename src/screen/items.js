import React, {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const Items = () => {
  const [status, setStatus] = useState('');
  const [timeoutStatus, settimeoutStatus] = useState('');
  const [count, setCount] = useState(4);
  const [data, setData] = useState('');

  useEffect(() => {
    setTimeout(() => {
      settimeoutStatus('timeout is called');
    }, 1000);
  }, []);

  useEffect(() => {
    setData(10 * 2);
  }, []);

  const btnClick = () => {
    setStatus('button pressed');
    console.log('btn Pressed');
  };

  const countPress = () => {
    setCount(count + 1);
  };

  return (
    <View style={styles.container}>
      <Text testID="dataId">{data}</Text>
      <Text style={styles.textStyle}>Items</Text>
      <Text testID="timeOutText">{timeoutStatus}</Text>
      <Text testID="myText">{status}</Text>
      <Button testID="myButton" onPress={btnClick} title="Click" />
      <Text testID="countText">{count}</Text>
      <Button testID="countButton" onPress={countPress} title="Press" />
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18, 
    color: 'black'
  }
});
