import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../presentation/screens/home/HomeScreen';
import {PokemonScreen} from '../presentation/screens/pokemon/PokemonScreen';
import {SearchScreen} from '../presentation/screens/search/SearchScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {pokemonId: number};
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};
