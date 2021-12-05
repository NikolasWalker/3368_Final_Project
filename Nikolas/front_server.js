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




// Home page 
app.get('/', function(req, res) {
    var tagline = "Created by Houston Consulting Solutions";

    res.render('pages/home', {
        tagline: tagline
    });
});



// adduser page
app.get('/adduser_form', function(req, res) {

    axios.get(`http://127.0.0.1:5000//user`)
    .then((response)=>{
    
    var firstname = req.body.firstname
    var lasttname = req.body.lasttname 
    var tagline = response.data
    axios.post(`http://127.0.0.1:5000//user` + firstname + lasttname)
    console.log(firstname, lasttname, tagline);
        // use res.render to load up an ejs view file
    res.render('pages/add_user.ejs', {
        firstname: firstname,
        lasttname: lasttname,
        tagline: tagline
    });
}); 
});


app.get('/useradded', function(req, res) {
    axios.get(`http://127.0.0.1:5000//user`)
    .then((response)=>{
    
        var firstname = response.data;
        var tagline = "Here is the data coming from my own API";
        console.log(firstname);
         // use res.render to load up an ejs view file
        res.render('pages/home.ejs', {
            firstname: firstname,
            tagline: tagline
    });
}); 
});



// edit user page
app.get('/edituser_form', function(req, res) {
    var userid = req.body.userid
    var firstname = req.body.firstname
    var lastname = req.body.lasttname
    console.log("Searching for: " + userid)
    axios.all([axios.get('http://127.0.0.1:5000/user'),
    axios.get('http://127.0.0.1:5000/user?user_ids=' + userid),
    axios.put('http://127.0.0.1:5000/user?user_ids=' + userid)]) 
    .then(axios.spread((firstResponse, secondResponse, thirdResponse) =>{
    
        var userid = secondResponse.data
        var firstname = firstResponse.data
        var lastname = thirdResponse.data
        
        // userid: userid,
        // firstname: firstname,
        // lastname: lasttname
        console.log("Search found: " + userid)
         // use res.render to load up an ejs view file
        res.render('pages/edit_user', {
            body: req.body,
            userid: userid,
            firstname: firstname,
            lastname: lastname
    }); 
}))
});

app.get('/viewuser_form', function(req, res) {
    axios.get('http://127.0.0.1:5000/user')
    .then((response)=>{
        var id = response.data;
        console.log(id);
        res.render('pages/viewusers.ejs',{
            id: id

        });
    });
});

app.get('/restaurant_form', function(req, res) {
    axios.get('http://127.0.0.1:5000/user')
    .then((response)=>{
        var id = response.data;
        console.log(id);
        res.render('pages/viewusers.ejs',{
            id: id

        });
    });
});

app.listen(8080);
console.log('8080 is the magic port');
