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
            return  console.log('Incorrect data type.')
        }
        else {
            pokemonList.push(pokemon);
        }
    }

    return {
        getAll: getAll,
        add: add
    };
})();

document.write('<div>');
let pokemonList = pokemonRepository.getAll();
// Write every pokemon to DOM from array with height listed.
pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name, ' (height: ' + pokemon.height + ' m)');
    if (pokemon.height > 1.8) {
        document.write(' -Wow that\'s a big guy!');
    }
    document.write('<br>');
});
document.write('</div>');