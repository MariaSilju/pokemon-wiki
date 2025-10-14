import getPokemon from './getPokemon'
import type { Pokemon } from '../types/pokemon'

export interface PokemonPage {
  pokemon: Pokemon[]
  hasMore: boolean
}

const PAGE_SIZE = 15

export async function getPokemonPage(allPokemonList: {name: string}[], pageParam: number): Promise<PokemonPage> {
  const start = pageParam * PAGE_SIZE
  const stop = start + PAGE_SIZE
  const slice = allPokemonList.slice(start, stop)
  
  const results = await Promise.allSettled(slice.map(p => getPokemon(p.name)))
  const pokemon = results.filter(r => r.status === 'fulfilled').map(r => (r as PromiseFulfilledResult<Pokemon>).value)
  
  return {
    pokemon,
    hasMore: start + PAGE_SIZE < allPokemonList.length
  }
}
