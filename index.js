/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // Create a new div element, which will become the game card
        let gameCard = document.createElement("div");
        
        // Add the class 'game-card' to the div
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display some info about each game
        // Assuming each game object has 'image', 'title', and 'description' properties
        gameCard.innerHTML = `
            <img src="${games[i].img}" class="game-img" alt="${games[i].name}">
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Pledged: $${games[i].pledged} / Goal: $${games[i].goal}</p>
            <p>Backers: ${games[i].backers}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
        // create a new div element, which will become the game card
                // Trigger the transition after the element is added to the DOM
                setTimeout(() => {
                    gameCard.style.opacity = 1;
                }, 0);

        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

document.addEventListener('DOMContentLoaded', (event) => {
    // Your other code that needs to run after DOM is loaded
    addGamesToPage(GAMES_JSON);
    // Challenge 4: Update statistics
    const contributionsCard = document.getElementById("num-contributions");
    const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
    contributionsCard.textContent = totalContributions.toLocaleString();

    const raisedCard = document.getElementById("total-raised");
    const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
    raisedCard.textContent = `$${totalRaised.toLocaleString()}`;

    const gamesCard = document.getElementById("num-games");
    const totalGames = GAMES_JSON.length;
    gamesCard.textContent = totalGames.toLocaleString();
});

// // grab the contributions card element
// const contributionsCard = document.getElementById("num-contributions");

// // use reduce() to count the number of total contributions by summing the backers


// // set the inner HTML using a template literal and toLocaleString to get a number with commas


// // grab the amount raised card, then use reduce() to find the total amount raised
// const raisedCard = document.getElementById("total-raised");

// // set inner HTML using template literal


// // grab number of games card and set its inner HTML
// const gamesCard = document.getElementById("num-games");


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);


}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);
// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const numOfUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// calculate the total amount raised for use in the string
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${numOfUnfundedGames} game${numOfUnfundedGames === 1 ? '' : 's'} remain${numOfUnfundedGames === 1 ? 's' : ''} unfunded. We need your help to fund these amazing games!`;

// create a new paragraph element containing the template string
const newParagraph = document.createElement('p');
newParagraph.textContent = displayStr;

// append the new paragraph element to the description container
descriptionContainer.appendChild(newParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */



// Assuming GAMES_JSON is already sorted in descending order of 'pledged'
// If it's not sorted, you would sort it as you have done below
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Use destructuring to grab the first and second games from the sorted list
const [firstGame, secondGame] = sortedGames;

// Extract the first word from the name of each game
const firstWordTopGame = firstGame.name.split(' ')[0];
const firstWordSecondGame = secondGame.name.split(' ')[0];

// Grab the containers for the top games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

document.addEventListener('DOMContentLoaded', (event) => {
    // Sort the games in descending order based on the amount pledged
    const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

    // Use destructuring to grab the first and second games from the sorted list
    const [firstGame, secondGame] = sortedGames;

    // Grab the containers for the top games
    const firstGameContainer = document.getElementById("first-game");
    const secondGameContainer = document.getElementById("second-game");

    // Create new elements to hold the names of the top-funded games
    // and append them to the respective containers
    const firstGameNameElement = document.createElement('div');
    firstGameNameElement.textContent = firstGame.name;
    firstGameContainer.appendChild(firstGameNameElement);

    const secondGameNameElement = document.createElement('div');
    secondGameNameElement.textContent = secondGame.name;
    secondGameContainer.appendChild(secondGameNameElement);

    // Add all games to the page
    addGamesToPage(GAMES_JSON);

    // Optional: Log the first words of the top two funded games for debugging
    console.log(`First word of the most funded game: ${firstGame.name.split(' ')[0]}`);
    console.log(`First word of the second most funded game: ${secondGame.name.split(' ')[0]}`);

    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchTerm));
        
        deleteChildElements(gamesContainer);
        
        if (filteredGames.length > 0) {
            addGamesToPage(filteredGames);
        } else {
            gamesContainer.innerText = 'No games found matching your search criteria.';
        }
    }

    searchBtn.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});