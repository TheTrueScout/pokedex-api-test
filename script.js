class Pokedex {
  constructor() {

    this.searchInput = document.querySelector('.search-input');
    this.searchButton = document.querySelector('.search-button');
    this.pokemonName = document.querySelector('.pokemon-name');
    this.PokeAbilities = document.querySelector('.pokemon-abilities');

    this.searchButton.addEventListener('click', () => {
      this.PokeAbilities.innerHTML = ''
      
      this.fetchPokedex()
      this.searchInput.innerHTML = ''
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.PokeAbilities.innerHTML = ''
        this.fetchPokedex()
        this.searchInput.innerHTML = ''
      }
    })
  }

  async fetchPokedex() {
    try {
        const pokemon = this.searchInput.value.toLowerCase()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

        if (!response.ok) {
            throw new Error('Pokemon not found')
        }

        const pokedexData = await response.json();
        console.log(pokedexData)

        this.displayPokeNameAndImage(pokedexData)

        this.displayPokeAbilities(pokedexData)
        
    }
    catch(error) {
        console.error('Pokemon not found:', error)
        this.pokemonName.innerHTML = 'Pokemon not found';
    }
  }

  displayPokeNameAndImage(pokedexData) {
    const pokemonImage = pokedexData.sprites.front_default
    const pokemonImg = document.querySelector('.pokemon-image');

    this.pokemonName.innerHTML = pokedexData.forms[0].name;
    pokemonImg.src = pokemonImage
  }

  displayPokeAbilities(pokedexData) {
    
    
    pokedexData.abilities.forEach(ability => {
      const abilityName = document.createElement('li');
      abilityName.textContent = ability.ability.name;

      this.PokeAbilities.appendChild(abilityName)
    })
    
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new Pokedex();
  });