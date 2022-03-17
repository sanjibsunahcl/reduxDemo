import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';

export default function QuestionsBoard({questions, onSubmit}) {
  const [data, setData] = React.useState({});
  return (
    <ScrollView>
      {questions.map((q, index) => {
        return (
          <View key={q}>
            <Text>{q}</Text>
            <TextInput
              accessibilityLabel="answer input"
              accessibilityHint="input"
              onChangeText={text => {
                setData(state => ({
                  ...state,
                  [index + 1]: {q, a: text},
                }));
              }}
            />
          </View>
        );
      })}
      <TouchableOpacity onPress={() => onSubmit(data)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
