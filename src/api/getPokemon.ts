async function getPokemon(text: string) {           
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${text}`)
    const data = await response.json()
    console.log(data)
    return data
}

export default getPokemon