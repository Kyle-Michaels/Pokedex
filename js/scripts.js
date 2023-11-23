let pokemonRepository = (function () {
    let  pokemonList = [
        {
            id: 1,
            name: 'Bulbasaur',
            height: 0.7,
            type: ['grass', 'poison'],
        },
        {
            id: 2,
            name: 'Ivysaur',
            height: 1,
            type: ['grass', 'poison'],
        },
        {
            id: 3,
            name: 'Venusaur',
            height: 2,
            type: ['grass', 'poison'],
        },
        {
            id: 4,
            name: 'Charmander',
            height: 0.6,
            type: ['fire'],
        },
        {
            id: 5,
            name: 'Charmeleon',
            height: 1.1,
            type: ['fire'],
        },
        {
            id: 6,
            name: 'Charizard',
            height: 1.7,
            type: ['fire', 'flying'],
        },
        {
            id: 7,
            name: 'Squirtle',
            height: 0.5,
            type: ['water'],
        },
        {
            id: 8,
            name: 'Wartortle',
            height: 1,
            type: ['water'],
        },
        {
            id: 9,
            name: 'Blastoise',
            height: 1.6,
            type: ['water'],
        },
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof(pokemon) !== 'object') {
            return console.log('Incorrect data type.');
        }
        else if (Object.keys(pokemon).toString() !== Object.keys(pokemonList[0]).toString()) {
            return console.log('Keys do not match');
        }
        else {
            pokemonList.push(pokemon);
        }
    }

    function search(pokemon) {
        let searched = pokemonList.filter((mon) => mon.name.toLowerCase().includes(pokemon.toLowerCase()));
        return console.log(searched[0].id),
        console.log(searched[0].name),
        console.log(searched[0].height + ' m'),
        console.log(searched[0].type),
        alert('id: ' + searched[0].id + '\nname: ' + searched[0].name + '\nheight: ' + searched[0].height + '\ntype: ' + searched[0].type);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list'); // Get .pokemon-list item from html
        let listItemPokemon = document.createElement('li'); // create list item element
        let  button = document.createElement('button'); // create button element
        button.innerText = pokemon.name; // text in button is pokemon name passend into function
        button.classList.add('button-class') // add styling to button
        listItemPokemon.appendChild(button); // add button to newly created list item element
        pokemonList.appendChild(listPokemon); // add list item with button to html
        addListener(button, pokemon);
    }

    function showDetails(pokemon) {
        return console.log('Id: ' + pokemon.id + '\nName: ' + pokemon.name + '\nHeight: ' + pokemon.height + '\nType: ' + pokemon.type)
    }

    function addListener(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem,
        showDetails: showDetails,
        addListener: addListener,
    };
})();


pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});