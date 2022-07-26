const express = require('express');
const app = express();
const mySql = require('mysql');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};
app.use(cors(corsOptions));
app.use(express.json());

const db = mySql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'Cuentarocko2',
  database: 'userWebsite',
});

app.post("/comment", (req, res) => {
  const userEmail = req.body.userEmail;
  const comment = req.body.comment;

  db.query(
    "INSERT INTO users (user_email, comment) VALUES (?,?)",
    [userEmail, comment],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inderted");
      }
    }
  );
});

app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if(err){
      console.log(err);
    } else{
      res.send(result);
    }
  })
})

app.listen(3001, () => {
  console.log("This is port 3001");
});
