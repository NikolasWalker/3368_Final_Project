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
   // create a variable to hold the username parsed from the request body
   var username = req.body.username
   // create a variable to hold ....
   var password = req.body.password
 /*I think it is meant to be setup like this but I am not entirely sure if that macthes what we have 
 in dinenrparty so this will probably need to be changed to firstname and lastname I guess.
 
 I am thinking of making this the home page but I am keeping it as process_form so I can track how
 this is supposed to work at the moemnt with the HTML pages*/

   let check = 0;

   if (req.body.rememberme == 'on')
       check = 1;

   console.log("email is: " + username);
   console.log("password is: " + password);
   console.log("checkedbox checked: " + check); 

   res.render('pages/thanks.ejs', {body: req.body})

    console.log("Searching Bat-Computer files for: " + hero_name); //passes the entered name to the console
    axios.get('http://127.0.0.1:5000/user' + hero_name) //concatenate the desired hero name from the body to end of the api to get information about them
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
