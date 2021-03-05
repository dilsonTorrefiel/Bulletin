const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view-engine', 'ejs');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    dateCreated: String
});
const Article = new mongoose.model('Article', articleSchema);

// create sample article
// const newArticle = new Article({
//     title: "Dev fest 2021",
//     content: "Open for all levels of developers.",
//     dateCreated: "03/05/2021"
// });
// newArticle.save();

const dbUrl = "mongodb://localhost:27017/articleDB";
mongoose.connect(dbUrl).then(() => console.log("Successfully connected to Article Database."))

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

app.get('/', function (req, res) {
    // res.render('home.ejs');
    Article.find({}, function (err, found) {
        if (err) {
            console.log(err);
        } else {
            if (found) {
                res.render('articles.ejs', { Article: found });
            }
        }
    });
});

app.get('/create', function (req, res) {
    res.render('create.ejs');
});

app.post('/createArticle', function (req, res) {
    res.redirect('/create');
});

app.post('/addNewArticle', function (req, res) {
    const createNewArticle = new Article({
        title: req.body.title,
        content: req.body.content,
        dateCreated: req.body.dateCreated
    });
    createNewArticle.save();
    res.redirect('/');
});

app.post('/delete', function (req, res) {
    const getID = req.body.deleteId;
    // Article.findByIdAndDelete({_id: getID}, function)
});

app.listen(3000, function (req, res) {
    console.log('Server is running on port 3000.');
});