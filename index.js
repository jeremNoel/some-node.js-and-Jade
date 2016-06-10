console.log("coucou");

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false }));

    app.use(express.static(path.join(__dirname, 'public')));

    app.set('views',path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

app.get('/', function(req, res) { 
    res.render('index', {title: 'Welcome to your basic Express tutorial!'});
});

app.get('/about', function(req, res) { 
    res.render('about');
});

app.get('/contact', function(req, res) { 
    res.render('contact');
});


app.post('/contact/send', function(req, res){
  var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'A REMPLIR',
      pass: 'A REMPLIR'
    }
  });
  var mailsOptions = {
    from: 'Tony Tiratay <A REMPLIR>',
    to: 'A REMPLIR',
    subject: 'Test Basic Express',
    text: 'Nouveau message de: nom: '+ req.body.name + ', email: ' + req.body.email + ', message: ' + req.body.message,
    html: '<p>Nouveau message: </p><ul><li>Nom: '+ req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
  };
  transporter.sendMail(mailsOptions, function(err, info){
    if(err){
      console.log(err);
      res.redirect('/');
    } else {
      console.log('message envoyé '+ info.response);
      res.redirect('/');
    }
  });
});



app.listen('3000');

console.log('Server Running');
