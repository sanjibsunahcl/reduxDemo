import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';

export const dataChange = x => x * 10;

const ItemsEnzyme = ({onCountChange = () => {}}) => {
  const [status, setStatus] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    onCountChange(count);
  }, []);

  return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      testID="todo-item">
      <Text>Sanjib</Text>
      <Text testID="countText">Count : {count}</Text>
      <Text style={{fontSize: 18, color: 'black'}}>Items</Text>
      <Button
        testID="myButton"
        title="Click"
        onPress={() => {
          setCount(count + 3);
        }}></Button>
    </View>
  );
};

export default ItemsEnzyme;
