import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Chip, Text} from 'react-native-paper';
import {RootStackParams} from '../../../navigator/StackNavigator';
import {useQuery} from '@tanstack/react-query';
import {getPokemonById} from '../../../actions';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {StackScreenProps} from '@react-navigation/stack';
import {Formatter} from '../../../config/helpers/formatter';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import axios from 'axios';
import {blobStorageApi} from '../../../config/api/blobStorage';
import * as RNFS from '@dr.pogodin/react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob';

// /customers/00000003119029/Health/Policies/5376153/Reimbursements/0138f9f5-2137-43b4-ada3-35df155ba08b/demo.jpg?sv=2023-01-03&st=2024-03-31T01%3A16%3A26Z&se=2025-01-01T01%3A16%3A00Z&sr=b&sp=rcw&sig=o9CTtmMZ5DL%2FmQ4Q8uvplGujrDVSa445pEjI5lWJXdw%3D
class CameraAdapter {
  static async takePicture() {
    const response = await launchCamera({
      mediaType: 'photo',
      quality: 0.7,
      cameraType: 'back',
    });

    if (response.assets && response.assets[0].uri) {
      return [response.assets[0].uri];
    }
  }

  static async getPicturesFromLibrary() {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 10,
    });
    if (response.assets && response.assets.length > 0) {
      return response.assets.filter(asset => asset.uri).map(asset => asset.uri);
    }
  }

  static async uploadImage(image: string) {
    console.log('🚀 ~ CameraAdapter ~ uploadImage ~ image:', image);
    const formData = new FormData();
    // formData.append('image', {
    //   name: 'demo.jpg',
    //   type: 'image/jpeg',
    //   uri: image,
    // });
    formData.append('file', {
      name: 'demo.jpg',
      type: 'image/jpeg',
      uri: image,
    });

    try {
      const route = RNFS.DocumentDirectoryPath;
      console.log('🚀 ~ CameraAdapter ~ uploadImage ~ route:', route);
      var files = [
        {
          name: 'demo',
          filename: 'demo.jpg',
          filepath: image.replace('file://', ''), //DocumentDirectoryPath + '/file.jpg',
          filetype: 'image/jpeg',
        },
      ];
      RNFS.uploadFiles({
        binaryStreamOnly: true,
        toUrl:
          'https://nassadigitalfilesdev2.blob.core.windows.net/customers/00000003119029/Health/Policies/5376153/Reimbursements/0138f9f5-2137-43b4-ada3-35df155ba08b/demo.jpg?sv=2019-07-07&st=2024-04-30T22%3A01%3A36Z&se=2024-05-01T22%3A16%3A36Z&sr=b&sp=rwd&sig=Xq2IE%2Ffa1ufY3Q6T%2FdtZVpqBzb7HoE27m30DqzSFqtA%3D',
        files: files,
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'x-ms-blob-type': 'BlockBlob',
          'x-ms-blob-content-type': 'image/jpeg',
        },
      })
        .promise.then(response => {
          console.log(
            '🚀 ~ CameraAdapter ~ uploadImage ~ response.statusCode:',
            response.statusCode,
          );
          if (response.statusCode == 200) {
            console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
          } else {
            console.log('SERVER ERROR');
          }
        })
        .catch(err => {
          if (err.description === 'cancelled') {
            // cancelled by user
          }
          console.log(err);
        });

      // const response = await fetch(
      //   'https://nassadigitalfilesdev2.blob.core.windows.net/customers/00000003119029/Health/Policies/5376153/Reimbursements/0138f9f5-2137-43b4-ada3-35df155ba08b/demo.jpg?sv=2019-07-07&st=2024-04-30T20%3A45%3A11Z&se=2024-05-01T21%3A00%3A11Z&sr=b&sp=rwd&sig=WWa8L%2BdRCzlAj0eq82AHJvNGFBRKgrcg6T6aMsCVw60%3D',
      //   {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //       'x-ms-blob-type': 'BlockBlob',
      //       'x-ms-blob-content-type': 'image/jpeg',
      //     },
      //     body: formData,
      //   },
      // );
      // const {data} = await blobStorageApi.put(
      //   `/customers/00000003119029/Health/Policies/5376153/Reimbursements/0138f9f5-2137-43b4-ada3-35df155ba08b/demo.jpg?sv=2019-07-07&st=2024-04-30T20%3A45%3A11Z&se=2024-05-01T21%3A00%3A11Z&sr=b&sp=rwd&sig=WWa8L%2BdRCzlAj0eq82AHJvNGFBRKgrcg6T6aMsCVw60%3D`,
      //   formData,
      //   {
      //     headers: {
      //       // 'content-type': 'application/octet-stream',
      //       'content-type': 'multipart/form-data',
      //       'x-ms-blob-type': 'BlockBlob',
      //       'x-ms-blob-content-type': 'image/jpeg',
      //     },
      //   },
      // );
      // console.log(data);

      // const localUri =
      //   Platform.OS === 'ios' ? image.replace('file://', '/') : image;
      // await RNFetchBlob.fetch(
      //   'PUT',
      //   `https://nassadigitalfilesdev2.blob.core.windows.net/customers/00000003119029/Health/Policies/5709573/Reimbursements/637d8606-ccf7-422d-8c6c-edb19701d774/recipes_2.jpg?sv=2019-07-07&st=2024-04-18T00%3A01%3A57Z&se=2024-04-19T00%3A16%3A57Z&sr=b&sp=rwd&sig=ZhxKsPCN98yVTe6yxPc3dWQ0lE6lc4qVRAF1po%2BOQXg%3D`,
      //   {
      //     'x-ms-blob-type': 'BlockBlob',
      //     'content-type': 'application/octet-stream',
      //     'x-ms-blob-content-type': 'image/jpeg',
      //   },
      //   RNFetchBlob.wrap(localUri),
      // );
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    console.log(
      '🚀 ~ CameraAdapter ~ uploadImage ~ RNFS.DocumentDirectoryPath:',
      RNFS.DocumentDirectoryPath,
    );
  }
}

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {isDark} = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  const {pokemonId} = route.params;
  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 5,
  });

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  if (!pokemon) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: pokemon.color}}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 5,
          }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>

        {/* Pokeball */}
        <Image source={pokeballImg} style={styles.pokeball} />

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>

      {/* Types */}
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={{marginLeft: 10}}>
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites */}
      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={{
          marginTop: 20,
          height: 100,
        }}
        renderItem={({item}) => (
          <FadeInImage
            uri={item}
            style={{width: 100, height: 100, marginHorizontal: 5}}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={async () => {
          const photos = await CameraAdapter.takePicture();
          console.log(photos);
          await CameraAdapter.uploadImage(photos![0]!);
        }}>
        Image
      </Button>

      <View style={{height: 100}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
