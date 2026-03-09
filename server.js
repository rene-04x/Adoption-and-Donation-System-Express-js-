const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/landing page/index.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login/user-login.html');
});
app.get('/user-signup', (req, res) => {
    res.sendFile(__dirname + '/public/login/user-signup.html');
});
app.get('/org-register', (req, res) => {
    res.sendFile(__dirname + '/public/login/org-register.html');
});
app.get('/form2', (req, res) => {
    res.sendFile(__dirname + '/public/login/form2.html');
});
app.get('/form3', (req, res) => {
    res.sendFile(__dirname + '/public/login/form3.html');
});


app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});