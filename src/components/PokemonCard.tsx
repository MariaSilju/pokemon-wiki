function PokemonCard({ pokemom } : {pokemom: any}) {
  return (
    <div>
      <h1>{pokemom.name}</h1>
      <img src={pokemom.sprites.front_default} alt={pokemom.name} />
    </div>
  )
}

export default PokemonCard