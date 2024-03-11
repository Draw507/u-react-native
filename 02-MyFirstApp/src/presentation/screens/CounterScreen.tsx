import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export const CounterScreen = () => {
  const [count, setCount] = useState(10);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{count}</Text>
      <Pressable onPress={() => setCount(count + 1)} onLongPress={() => setCount(0)}>
        <Text style={{color: 'blue'}}>+1</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 80,
    fontWeight: '300',
    textAlign: 'center',
    color: 'black',
  },
});
