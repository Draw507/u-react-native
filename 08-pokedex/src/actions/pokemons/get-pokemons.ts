import {pokeApi} from '../../config/api/pokeApi';
import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeapi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (page: number, limit: number = 20) => {
  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map(pokemon => {
      return pokeApi.get<PokeAPIPokemon>(pokemon.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemonsPromises = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    return await Promise.all(pokemonsPromises);
  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};
