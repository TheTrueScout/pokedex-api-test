class Pokedex {
  constructor() {

    this.searchInput = document.querySelector('.search-input');
    this.searchButton = document.querySelector('.search-button');
    this.pokemonName = document.querySelector('.pokemon-name');
    this.PokeAbilities = document.querySelector('.pokemon-abilities');

    this.hpBaseStat = document.querySelector('.hp-base-stat');
    this.attackBaseStat = document.querySelector('.attack-base-stat');
    this.defenseBaseStat = document.querySelector('.defense-base-stat');
    this.spAttackBaseStat = document.querySelector('.sp-attack-base-stat');
    this.spDefenseBaseStat = document.querySelector('.sp-defense-base-stat');
    this.speedBaseStat = document.querySelector('.speed-base-stat');

    this.baseStat = document.querySelectorAll('.base-stat');

    this.suggestionDisplay = document.querySelector('.suggestions');
    this.pokemons = [];

    this.fetchAllPokemonNames()

    this.searchButton.addEventListener('click', () => {
      this.PokeAbilities.innerHTML = ''
      
      this.fetchPokedex()
      this.searchInput.innerHTML = '';
      this.baseStat.innerHTML = '';
      this.suggestionDisplay.innerHTML = '';
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.PokeAbilities.innerHTML = '';
        this.fetchPokedex();
        this.searchInput.innerHTML = '';
        this.baseStat.innerHTML = '';
        this.suggestionDisplay.innerHTML = '';
      }
    })

    this.searchInput.addEventListener('input', () => {
      this.handlePokemonNames()
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

        this.displayPokeStats(pokedexData)
        
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

  displayPokeStats(pokedexData) {

    this.hpBaseStat.textContent = pokedexData.stats[0].base_stat;
    this.attackBaseStat.textContent = pokedexData.stats[1].base_stat;
    this.defenseBaseStat.textContent = pokedexData.stats[2].base_stat;
    this.spAttackBaseStat.textContent = pokedexData.stats[3].base_stat;
    this.spDefenseBaseStat.textContent = pokedexData.stats[4].base_stat;
    this.speedBaseStat.textContent = pokedexData.stats[5].base_stat;

  }

  async fetchAllPokemonNames() {

    try {
      const nameResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')

      if (!nameResponse.ok) {
        throw new Error('Unable to fetch Pokemon names')
      }

      const nameData = await nameResponse.json();

      this.pokemons = nameData.results;

      this.handlePokemonNames(this.pokemons)

    }
    catch(error) {
      console.log('Unable to get pokemon names:', error)
    }
  }

  handlePokemonNames() {

    this.searchInput.addEventListener('keyup', () => {
      let filteredPokemons = '';
      let name = this.searchInput.value;

      if (!name) {
        this.suggestionDisplay.innerHTML = ''; 
        return;
      }

      if (name.length) {
        filteredPokemons = this.pokemons.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(name.toLowerCase())
        });
        console.log(filteredPokemons)
      }
      this.displaySuggestions(filteredPokemons)

      if (!filteredPokemons.length) {
        this.suggestionDisplay.innerHTML = ''; 
      }

    })

    }

  displaySuggestions(filteredPokemons) {

    const body = filteredPokemons.map((list) => {
      return '<li onclick="selectInput(this)">' + list.name + '</li>'
    });

    this.suggestionDisplay.innerHTML = '<ul>' + body.join('') + '</ul>'

    const suggestionItems = document.querySelectorAll('li');
    suggestionItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.selectInput(item.textContent);
      })
    })
  }

  selectInput(name) {
    this.searchInput.value = name; 
    this.suggestionDisplay.innerHTML = ''; 
  }
  }

document.addEventListener('DOMContentLoaded', () => {
    const app = new Pokedex();
  });