import {SafeAreaView} from 'react-native';
import {PaperProvider} from 'react-native-paper';
// import {CounterM3Screen} from './src/presentation/screens/CounterM3Screen';

import IonIcon from 'react-native-vector-icons/Ionicons';
import { BoxObjectModelScreen, DimensionScreen } from './src/presentation/screens';

export const App = () => {
  return (
    <PaperProvider settings={{icon: props => <IonIcon {...props} />}}>
      <SafeAreaView style={{flex: 1}}>
        {/* <HelloWorldScreen name='David Robinson' /> */}
        {/* <CounterM3Screen /> */}
        {/* <BoxObjectModelScreen /> */}
        <DimensionScreen />
      </SafeAreaView>
    </PaperProvider>
  );
};
