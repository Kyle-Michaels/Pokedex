let pokemonRepository = (function () {
    let  pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

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
        console.log(searched[0].height + ' dm'),
        console.log(searched[0].type),
        alert('id: ' + searched[0].id + '\nname: ' + searched[0].name + '\nheight: ' + searched[0].height + '\ntype: ' + searched[0].type);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');          // Get .pokemon-list item from html
        let listItemPokemon = document.createElement('li');                 // create list item element
        listItemPokemon.classList.add('col-');
        listItemPokemon.classList.add('list-group-item');
        listItemPokemon.classList.add('list-group-item-action')
        listItemPokemon.setAttribute('id', pokemon.name);

        let  button = document.createElement('button');                     // create button element
        button.innerText = pokemon.name;                                    // text in button is pokemon name passend into function
        button.classList.add('btn');                                        // add styling to button
        button.classList.add('btn-block');
        button.classList.add('btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#' + pokemon.name);

        let thumbnail = document.createElement('img');
        loadDetails(pokemon).then((response) => thumbnail.src = pokemon.thumbnailUrl);
        thumbnail.classList.add('thumbnail');

        listItemPokemon.appendChild(button);                                // add button to newly created list item element
        listItemPokemon.appendChild(thumbnail);
        pokemonList.appendChild(listItemPokemon);                           // add list item with button to html
        addListener(button, pokemon);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
            console.log(pokemon);
            console.log(pokemon.types[0][1])
        });
    }

    function addListener(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    function loadList() {
        //showLoadingMessage();
        return fetch(apiUrl).then(function (response) {     // get json key from api
            return response.json();                         // turn key into object
        }).then(function (json) {                           // if successful plug object into following function
            //hideLoadingMessage();
            json.results.forEach(function (item) {          // for each item in object insert into pokemon object
                let pokemon = {
                    name: item.name.toUpperCase(),
                    detailsUrl: item.url
                };
                add(pokemon);                               // add to pokemon list
            });
        }).catch(function (e) {                             // if fails throw error
            //hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        //showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function  (response) {       // promise get url json key from loaded list
            return response.json();                         // return interpreted json key
        }).then(function (details) {                        // if successful plug in json object into following function
            //hideLoadingMessage();
            item.imageUrlFront = details.sprites.front_default;  // create variables for each key
            item.imageUrlBack = details.sprites.back_default;
            item.thumbnailUrl = details.sprites.other.home.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {                             // if fails throw error
            //hideLoadingMessage();
            console.error(e);
        });
    }

    // function showLoadingMessage() {
    //     console.log('Loading');
    // }

    // function hideLoadingMessage() {
    //     console.log('Loading complete')
    // }

    //let modalContainer = document.querySelector('#modal-container');        // get modal container div

    function showModal(pokemonDetails) {
        // modalContainer.innerHTML = '';                                      // clear all existing modal content

        // let closeButtonElement = document.createElement('button');          // create close button
        // closeButtonElement.classList.add('modal-close');
        // closeButtonElement.innerText = 'Close';
        // closeButtonElement.addEventListener('click', hideModal);            // call hide modal function

        // let modal = document.createElement('div');                          // create div for modal
        // modal.classList.add('modal');                                       // add modal class to created div

        // let pokemonName = document.createElement('h1');                     // titles modal with pokemon name
        // pokemonName.innerText = pokemonDetails.name;

        // let pokemonHeight = document.createElement('p');                    // create paragraph for pokemon height
        // pokemonHeight.innerText = 'Height: ' + pokemonDetails.height + 'dm';

        // let pokemonImg = document.createElement('img');                     // create image element for pokemon sprite
        // pokemonImg.src = pokemonDetails.imageUrl;

        // modal.appendChild(closeButtonElement);
        // modal.appendChild(pokemonName);
        // modal.appendChild(pokemonHeight);
        // modal.appendChild(pokemonImg);
        // modalContainer.appendChild(modal);

        // modalContainer.classList.add('is-visible');

        // let modalBody = $('.modal-body');
        // let modalTitle = $('.modal-title');

        // modalTitle.empty();
        // modalBody.empty();

        // let name = $('<h1>' + pokemonDetails.name + '</h1>');
        // let imageFront = $('<img class="modal-img" style="width: 50%">');
        // imageFront.attr("src", pokemonDetails.imageUrlFront);
        // let imageBack = $('<img class="modal-img" style="width: 50%">');
        // imageBack.attr("src", pokemonDetails.imageUrlBack);
        // let height = $('<p>' + 'Height: ' + pokemonDetails.height + '</p>');
        // let types = $('<p>' + 'Type: ' + pokemonDetails.types + '</p>');

        // modalTitle.append(name);
        // modalBody.append(imageFront);
        // modalBody.append(imageBack);
        // modalBody.append(height);
        // modalBody.append(types);
    }

    // function hideModal() {
    //     modalContainer.classList.remove('is-visible');
    // }

    // window.addEventListener('keydown', (e) => {                                             // event listener for esc button
    //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){         // checks if container has class is visible and the esc button is being pressed
    //         hideModal();                                                                    // closes modal
    //     }
    // });

    // modalContainer.addEventListener('click', (e) => {
    //     let target = e.target;
    //     if (target === modalContainer) {
    //         hideModal();
    //     }
    // });



    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem,
        showDetails: showDetails,
        addListener: addListener,
        loadList: loadList,
        loadDetails: loadDetails,
        //showLoadingMessage: showLoadingMessage,
        //hideLoadingMessage: hideLoadingMessage,
        showModal: showModal,
        //hideModal: hideModal,
    };
})();


pokemonRepository.loadList().then(function () {                         // loads list
    pokemonRepository.getAll().forEach(function (pokemon) {             // gets all objects one by one and calls add list item function
        pokemonRepository.addListItem(pokemon);
    });
});