const express = require('express');
var app = express();
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ; ${req.method} ; ${req.url}`
    console.log(`${now} ; ${req.method} ; ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
        console.log('Unable to append to server.log.')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
    // res.send('Hello Express');
    // res.send({
    //     name: 'Upendra',
    //     likes:['biking','cycling'],
    //     friends: ['Raj', 'Janaki']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        someTexthere: 'Welcome to my website',
        // currentYear: new Date().getFullYear()
    })    

});

app.get('/about',(req, res)=>{
    // res.send('about page!');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        someTexthere: 'Some Text here',
        // currentYear: new Date().getFullYear()
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`listening at port ${port}`);
    // console.log('new changes made')

    
});