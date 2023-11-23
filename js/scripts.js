let pokemonRepository = (function () {
    let  pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {          //check if is object and contains name and url
            pokemonList.push(pokemon);                                                              // add to pokemon list
        }
        else {
            console.log('pokemon is not correct');
        }
    }

    function search(pokemon) {
        let searched = pokemonList.filter((mon) => mon.name.toLowerCase().includes(pokemon.toLowerCase()));
        return console.log(searched[0].name),
        console.log(searched[0].height + ' m'),
        console.log(searched[0].type),
        alert('id: ' + searched[0].id + '\nname: ' + searched[0].name + '\nheight: ' + searched[0].height + '\ntype: ' + searched[0].type);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');          // Get .pokemon-list item from html
        let listItemPokemon = document.createElement('li');                 // create list item element
        let  button = document.createElement('button');                     // create button element
        button.innerText = pokemon.name;                                    // text in button is pokemon name passend into function
        button.classList.add('button-class')                                // add styling to button
        listItemPokemon.appendChild(button);                                // add button to newly created list item element
        pokemonList.appendChild(listItemPokemon);                           // add list item with button to html
        addListener(button, pokemon);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function addListener(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {     // get json key from api
            return response.json();                         // turn key into object
        }).then(function (json) {                           // if successful plug object into following function
            hideLoadingMessage();
            json.results.forEach(function (item) {          // for each item in object insert into pokemon object
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);                               // add to pokemon list
            });
        }).catch(function (e) {                             // if fails throw error
            hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function  (response) {       // promise get url json key from loaded list
            return response.json();                         // return interpreted json key
        }).then(function (details) {                        // if successful plug in json object into following function
            hideLoadingMessage();
            item.imageUrl = details.sprites.front_default;  // create variables for each key
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {                             // if fails throw error
            hideLoadingMessage();
            console.error(e);
        });
    }

    function showLoadingMessage() {
        console.log('Loading');
    }

    function hideLoadingMessage() {
        console.log('Loading complete')
    }

    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem,
        showDetails: showDetails,
        addListener: addListener,
        loadList: loadList,
        loadDetails: loadDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage,
    };
})();


pokemonRepository.loadList().then(function () {                         // loads list
    pokemonRepository.getAll().forEach(function (pokemon) {             // gets all objects one by one and calls add list item function
        pokemonRepository.addListItem(pokemon);
    });
});