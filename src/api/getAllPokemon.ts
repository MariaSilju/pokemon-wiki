import type { PokemonListResponse } from '../types/pokemon'

async function getAllPokemon(): Promise<PokemonListResponse> {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    if (!response.ok) {
        throw new Error('Failed to fetch all Pokemon')
    }
    const data = await response.json()
    return data
}

export default getAllPokemon
