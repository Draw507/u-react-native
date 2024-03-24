import {Text, View} from 'react-native';
import {useState} from 'react';
import {globalStyles} from '../theme/global.styles';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export const CounterM3Screen = () => {
  const [count, setCount] = useState(10);
  return (
    <View style={globalStyles.centerContainer}>
      <Text style={globalStyles.title}>{count}</Text>
      {/* <Icon name="accessibility-outline" size={25} /> */}
      <FAB
        style={globalStyles.fab}
        // label="+1"
        onLongPress={() => setCount(0)}
        onPress={() => setCount(count + 1)}
        // icon={() => <Icon name="accessibility-outline" size={25} />}
        icon="add"
      />
    </View>
  );
};
