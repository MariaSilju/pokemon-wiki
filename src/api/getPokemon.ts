import type { Pokemon } from '../types/pokemon'

async function getPokemon(text: string): Promise<Pokemon> {           
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${text}`)
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon')
    }
    const data = await response.json()
    return data
}

export default getPokemon