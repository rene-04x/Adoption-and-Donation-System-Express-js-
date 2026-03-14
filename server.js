const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/user', express.static(path.join(__dirname, 'public/user')));

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

app.post('/login', (req, res) => {
    const username = req.body.username || 'User';
    res.redirect('/home?username=' + encodeURIComponent(username));
});

app.get('/home', (req, res) => {
    const username = req.query.username || 'User';
    const filePath = path.join(__dirname, 'public/user/home.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Could not load home.html");
        const htmlWithUsername = data.replace('{{username}}', username);
        res.send(htmlWithUsername);
    });
});
app.get('/application', (req, res) => {
    const username = req.query.username || 'User'; 
    const filePath = path.join(__dirname, 'public/user/application.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send("File not found");
        const renderedHtml = data.replace('{{username}}', username);
        res.send(renderedHtml);
    });
});

app.get('/user-signup', (req, res) => {
    res.sendFile(__dirname + '/public/login/user-signup.html');
});
app.post('/register', (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    const filePath = path.join(__dirname, 'public', 'login', 'user-signup.html');

    if (password !== confirm_password) {
       
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return res.status(500).send("Error loading signup page");

            const htmlWithError = data.replace('{{errorMessage}}', 'Password and Confirm Password do not match!');
            res.send(htmlWithError);
        });
    } else {
     
        res.redirect('/login');
    }
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