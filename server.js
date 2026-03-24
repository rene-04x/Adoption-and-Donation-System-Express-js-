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


app.get('/donations', (req, res) => {
    res.sendFile(__dirname + '/public/user/donations.html');
});

// ROUTE FOR DASHBOARD
app.get('/dashboard', (req, res) => {
    const username = req.query.username || 'User';
    const filePath = path.join(__dirname, 'public/user/dashboard.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error loading Dashboard");
        const renderedHtml = data.replace(/{{username}}/g, username);
        res.send(renderedHtml);
    });
});

// ROUTE FOR PROFILE
app.get('/profile', (req, res) => {
    const username = req.query.username || 'User';
    const filePath = path.join(__dirname, 'public/user/profile.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error loading Profile");
        const renderedHtml = data.replace(/{{username}}/g, username);
        res.send(renderedHtml);
    });
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

app.get('/donate', (req, res) => {
    res.sendFile(__dirname + '/public/landing_page/donate.html');
});

// Optional: allow direct file access via /donate.html
app.get('/donate.html', (req, res) => {
    res.sendFile(__dirname + '/public/landing_page/donate.html');
});

app.get('/how', (req, res) => {
    res.sendFile(__dirname + '/public/landing_page/howItWorks.html');
});


app.get('/policy', (req, res) => {
    res.sendFile(__dirname + '/public/legal/policy.html');
});

app.get('/terms', (req, res) => {
    res.sendFile(__dirname + '/public/legal/terms.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/legal/contact.html');
});

app.get('/faqs', (req, res) => {
    res.sendFile(__dirname + '/public/legal/faqs.html');
});


// ADMIN SIDE ROUTES
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin/home.html');
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
       
      res.send(data.replace(/{{username}}/g, username));
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


app.get('/help-center', (req, res) => {
    res.sendFile(__dirname + '/public/support/help-center.html');
});

app.get('/feedback', (req, res) => {
    res.sendFile(__dirname + '/public/support/feedback.html');
});

app.get('/contact-support', (req, res) => {
    res.sendFile(__dirname + '/public/support/contact-support.html');
});
app.get('/kamustahan', (req, res) => {
    res.sendFile(__dirname + '/public/user/kamustahan.html');
});
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});


