// load the things we need
var express = require('express');
var app = express();

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
    res.render('pages/add_user');
});


app.get('/useradded', function(req, res) {
    axios.get(`http://127.0.0.1:5000//user`)
    .then((response)=>{
    
        var firstname = response.data;
        var tagline = "Here is the data coming from my own API";
        console.log(cars);
         // use res.render to load up an ejs view file
        res.render('pages/output', {
            firstname: firstname,
            tagline: tagline
    });
}); 



// edit user page
app.get('/edituser_form', function(req, res) {
    res.render('pages/edit_user');
});



app.get('/delete_customers', function(req, res) {
    res.render('pages/delete_customers');
});

app.get('/update_customers', function(req, res) {
    res.render('pages/update_customers');
});

app.get('/all_customers', function(req, res) {
    res.render('pages/all_customers');
});



//employees
app.get('/employees', function(req, res) {
    res.render('pages/employees');
});

app.get('/add_employees', function(req, res) {
    res.render('pages/add_employees');
});

app.get('/lookup_employees', function(req, res) {
    res.render('pages/lookup_employees');
});

app.get('/delete_employees', function(req, res) {
    res.render('pages/delete_employees');
});

app.get('/update_employees', function(req, res) {
    res.render('pages/update_employees');
});

app.get('/all_employees', function(req, res) {
    res.render('pages/all_employees');
});


//service request
app.get('/service_request', function(req, res) {
    res.render('pages/service_request');
});

app.get('/add_service_request', function(req, res) {
    res.render('pages/add_service_request');
});

app.get('/lookup_service_request', function(req, res) {
    res.render('pages/lookup_service_request');
});

app.get('/delete_service_request', function(req, res) {
    res.render('pages/delete_service_request');
});

app.get('/update_service_request', function(req, res) {
    res.render('pages/update_service_request');
});

app.get('/all_service_request', function(req, res) {
    res.render('pages/all_service_request');
});








app.listen(8080);
console.log('8080 is the magic port');
