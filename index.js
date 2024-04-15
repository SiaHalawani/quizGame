
const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require("ejs");
const port = process.env.PORT || 3001;
const app = express();

const users = require('./routes/users.routes');
const players = require('./routes/players.routes');
const answers = require('./routes/answers.routes');
const questions = require('./routes/questions.routes');
const quizzes = require('./routes/quizzes.routes');
const results = require('./routes/results.routes');
const playersResults = require('./routes/playersResults.routes');

app.get("/quizgame", (req, res) => {
    res.status(200).json({ message: "this is the index page" });
  });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));


app.use("/api/users", users);
app.use("/api/players", players);
app.use("/api/answers", answers);
app.use("/api/questions", questions);
app.use("/api/quizzes", quizzes);
app.use("/api/results", results); 
app.use('/quizsystem/players-results', playersResults);


app.listen(port, ()=>{
    console.log(`my app is listening xp ${port}`);

});