let pokemonRepository = (function () {
    let  pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            })
        }).catch(function (e) {
            console.error(e);
        })
    }

    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem,
        showDetails: showDetails,
        addListener: addListener,
        loadList: loadList,
    };
})();


pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});