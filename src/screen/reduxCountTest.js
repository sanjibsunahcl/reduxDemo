import React from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';

class ConnectedCounter extends React.Component {
  increment = () => {
    this.props.dispatch({type: 'INCREMENT'});
  };

  decrement = () => {
    this.props.dispatch({type: 'DECREMENT'});
  };

  render() {
    return (
      <View>
        <Text>Counter</Text>
        <View>
          <Button onPress={this.decrement} title="-" />
          <Text testID="count-value">{this.props.count}</Text>
          <Button onPress={this.increment} title="+" />
        </View>
      </View>
    );
  }
}

export default connect(state => ({count: state.count}))(ConnectedCounter);
