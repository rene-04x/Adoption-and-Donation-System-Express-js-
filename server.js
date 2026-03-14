const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/landing_page/index.html');
});
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/user/home.html');
});
app.get('/profile', (req, res) => {
    // Ensure the file is actually at public/user/profile.html
    res.sendFile(path.join(__dirname, 'public', 'user', 'profile.html'));
});

app.get('/donations', (req, res) => {
    res.sendFile(__dirname + '/public/user/donations.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/user/dashboard.html');
});
app.get('/adoption_hub', (req, res) => {
    res.sendFile(__dirname + '/public/user/adoption_hub.html');
});
app.get('/sidebar', (req, res) => {
    res.sendFile(__dirname + '/public/user/sidebar.html');
});
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/landing_page/about.html');
});

app.get('/how', (req, res) => {
    res.sendFile(__dirname + '/public/landing_page/howItWorks.html');
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