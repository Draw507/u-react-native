import {SafeAreaView} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import {HelloWorldScreen} from './src/presentation/screens/HelloWorldScreen';
import {CounterScreen} from './src/presentation/screens/CounterScreen';

export const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        {/* <HelloWorldScreen name='David Robinson' /> */}
        <CounterScreen />
      </SafeAreaView>
    </PaperProvider>
  );
};
