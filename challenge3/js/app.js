/*
app.js - application script for the movies challenge
add your code to this file
*/

// I copied some table skeleton code from https://github.com/info343e-au16/in-class/blob/master/10-20/script.js


// Create variable for important  elements
var dropdown = document.querySelector("#dropdown");
var table = document.querySelector(".table");
var header = document.querySelector("#header");

// Filter through the data for movies that include star wars in the name
var starWars = MOVIES.filter(function (item) {
    return item.title.toLowerCase().includes("star wars");
});

//Sort the star wars title alphabetically 
starWars.sort(function (movie1, movie2){
    return movie1.title.localeCompare(movie2.title);
});

// //Setting up new array with movie data
// var topTicketsSold = new Object();

// topTicketsSold.push({
//     title:MOVIES[0].title, 
//     date:MOVIES[0].released,
//     total:MOVIES[0].tickets
// });

// //Add the tickets for the movies that have multiple release years, and also just the no repeat movies
// for(var movieIndex = 1; movieIndex < MOVIES.topTicketsSold.length; movieIndex++) {
//     var alreadyExists = false;
//     for(var i = 0; i < topTicketsSold.length; i++) {
//         console.log('hello');
//         if(topTicketsSold[i].title === MOVIES[movieIndex].title &&
//         topTicketsSold[i].date === MOVIES[movieIndex].released) {
//             topTicketsSold[i].total += MOVIES[movieIndex].tickets;
//             console.log('hi');
//             alreadyExists = true;
//         }
//     }
//     if(!alreadyExists) {
//         topTicketsSold.push({
//             title:MOVIES[movieIndex].title,
//             dates:MOVIES[movieIndex].released,
//             total:MOVIES[movieIndex].tickets
//         });
//     }
// }

// Adds the tickets for the movies that have multiple release years
//fuck everything here// topTicketsSold.forEach(function (totalTickets, item) {
//     var currentMovie = item.title + item.released;
//     if (totalTickets.hasOwnProperty(currentMovie)) {
//         totalTickets[currentMovie].tickets += item.tickets
//     } else {
//         totalTickets[currentMovie] = {
//             "movie": item.title, "tickets": item.tickets
//         }
//     }
// var topTicketsSold2 = [];
//     for(currentMovie )
    
// });
// topTicketsSold = totalTickets;

//So that it only does the two data sets we need 
var top100Movies = MOVIES.map(function (movies){
    var movie = { title: movies.title + " (" + movies.year + ")", tickets: movies.tickets}
    return movie;
});

var topTicketsSoldSorted = top100Movies.sort(function (movie1, movie2) {
    return movie2.tickets - movie1.tickets;
});

//Splits the top tickets sold to be in an array of only 100
var topTicketsSold100 = topTicketsSoldSorted.slice(0, 100);


var genre = MOVIES.map(function (movie) {
    var avgGenre = {
        genre: movie.genre,  
        sales: movie.sales};
    return avgGenre;
});

var genreDictionary = {};

for (var i = 0; i < genre.length; i++) {
    var currentGenre = genre[i].genre;
    if (!(currentGenre in genreDictionary)) {
        genreDictionary[currentGenre] = [0,0]; // First value = total movie count, second value = total movie sales
    } 
    var movieData = genreDictionary[currentGenre];
    movieData[0]++;
    movieData[1] += genre[i].sales;
    genreDictionary[currentGenre] = movieData;
}

for (var genre in genreDictionary) {
    genreDictionary[genre] = genreDictionary[genre][1] / genreDictionary[genre][0];
}

//changing the dictionary keys into an array, mapping them to new variables
var averageSalesGenre = Object.keys(genreDictionary).map(function (genre) {
    var newGenre = {genre: genre, sales: genreDictionary[genre]}
    return newGenre;
});

// Filter through the data for movies that were released pre-2000 
var releasedPre2000 = MOVIES.filter(function (item) {
    var releaseDate = moment(item.released);
    return (releaseDate.year() < 2000);

});

var releasedPre2000Sorted = releasedPre2000.sort(function (a, b){
    var momentA = moment(a.released);
    var momentB = moment(b.released);
    return momentA.diff(momentB);
});


//Build table
function buildTable(option) {
    // Table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    // Row for the header
    var threadRow = document.createElement("tr");

    // Columns for the header
    var titleTh = document.createElement("th");
    titleTh.textContent = "Title";

    var releaseTh = document.createElement("th");
    releaseTh.textContent = "Release Year"; 

    var distributorTh = document.createElement("th");
    distributorTh.textContent = "Distributor";

    var genreTh = document.createElement("th");
    genreTh.textContent = "Genre";

    var ratingTh = document.createElement("th");
    ratingTh.textContent = "Rating";

    var yearTh = document.createElement("th");
    yearTh.textContent = "Year";

    var salesTh = document.createElement("th");
    salesTh.textContent = "Sales";
      
    var ticketsTh = document.createElement("th");
    ticketsTh.textContent = "Tickets Sold";

    var averageSalesTh = document.createElement("th");
    averageSalesTh.textContent = "Average Sales";

    if (option == 1) {
        // Append these elements to the table
        threadRow.appendChild(titleTh);
        threadRow.appendChild(releaseTh);
        threadRow.appendChild(distributorTh);
        threadRow.appendChild(genreTh);
        threadRow.appendChild(ratingTh);
        threadRow.appendChild(yearTh);
        threadRow.appendChild(salesTh);
        threadRow.appendChild(ticketsTh);

    } else if (option == 2) {
        
        threadRow.appendChild(titleTh);
        
        threadRow.appendChild(ticketsTh);
    } else if (option == 3) {
        
        threadRow.appendChild(genreTh);
        
        threadRow.appendChild(averageSalesTh);
    }

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);
};


// Function to create the table elements for an array of movies.
function buildRows(rows, option) {
    // First, build the table structure.
    buildTable(option);

    // Find the table body, where the rows will be rendered.
    var tbody = document.querySelector("tbody");

    // // Iterate over each movie title,
    // // create the tr (row element) and td elements (column elements)
    // // and append to the table body.
    // for (var genre in rows) {
    //     var averageSales = rows[genre];
    //     var titleTr = document.createElement("tr");
    //     var tdTitle = document.createElement("td");
    //     var tdSales = document.createElement("td");
    //     tdTitle.textContent = genre;
    //     tdSales.textContent = averageSales;
    //     titleTr.appendChild(tdTitle);
    //     titleTr.appendChild(tdSales);
    //     tbody.appendChild(titleTr);
    // }


    rows.forEach(function (title) {
        var titleTr = document.createElement("tr");

        // Object.keys returns an array of the keys object
        var titleKeys = Object.keys(title);

        // This makes it easy to iterate over the values
        // in the object by using bracket notation
        // to access each property in the object.
        titleKeys.forEach(function (key) {
            var value = title[key];

            var td = document.createElement("td");
            td.textContent = value;

            titleTr.appendChild(td);
        });

        tbody.appendChild(titleTr);
    });
};

//Event listener for when user changes option on dropdown 
dropdown.addEventListener("change", function (e) {
    console.log(table);

    //Removes all the elements in the table
    table.innerHTML = "";

    //Get current value for dropdown, build table with data from that value
    var value = e.target.value;
    
    if (value === 'star-wars') {
        header.textContent="Just Star Wars";
        buildRows(starWars, 1);
    } else if (value === '20th') {
        header.textContent="20th-Century Movies";
        buildRows(releasedPre2000Sorted, 1);
    } else if (value === 'top-by-tickets') {
        header.textContent="Top 100 Movies by Tickets Sold";
        buildRows(top100Movies, 2);
    } else if (value === 'avg-by-genre') {
        header.textContent="Average Sales by Genre";
        buildRows(averageSalesGenre, 3)
    }
});

// //Function which formats the date, ticket sales, and revenue
// function format(createObject, copyObject) {
//   //loop through the competed array
//   copyObject.forEach(function(indexName) {
//     //for every index, pass its values to our current array and format the data
//     createObject.push({
//       title: indexName.title,
//       released: moment(indexName.released).format('M/D/YYYY'),
//       distributor: indexName.distributor,
//       genre: indexName.genre,
//       rating: indexName.rating,
//       year:indexName.year,
//       sales: numeral(indexName.sales).format('$0,0'),
//       tickets: numeral(indexName.tickets).format('0,0'),
//     });
//   });
//   //return the completed array
//   return createObject;
// }

