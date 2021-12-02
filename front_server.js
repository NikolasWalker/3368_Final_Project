// load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

var selectedID = "";
app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    var exampleVar = "Javascript";
    res.render("pages/account.ejs", {exampleVar: exampleVar});
});

app.get('/edit', function(req, res) {
    var exampleVar = "Javascript";
    
    // this will render our new example spage 
    res.render("pages/edit.ejs", {exampleVar: exampleVar});
});

app.post('/process_form', function(req, res){ //change this for the examples to reflect the hero name being passed into the api
    // create a variable to hold the hero name parsed from the request body
    var hero_name = req.body.hero_name /*checks for the variable in the body 
    kind of like how id was passed and checked for in the search bar for previous assigments but looks at the body*/

   
    console.log("Searching Bat-Computer files for: " + hero_name); //passes the entered name to the console
    axios.get('https://www.superheroapi.com/api.php/1975166625996438/search/' + hero_name) //concatenate the desired hero name from the body to end of the api to get information about them
    .then((response)=>{

        var hero_name = response.data; //saves the resposne to the variable
        var tagline = "Displaying known identies for selected superhero in Bat-Computer daatabase:";
        console.log(hero_name); //shows all the files related to the search term in the console
        res.render('pages/hero_info_retrieved.ejs', 
        {
            hero_name: hero_name, 
            tagline: tagline
        });
    });
})


app.get('/choose', function(req, res) {
    res.render('pages/choose');
});
app.listen(8080);
console.log('8080 is the magic port');
