import express from 'express';
import Nasdaq from './controllers/nasdaq.mjs';
const nasdaq = new Nasdaq();
let jsonFile = await nasdaq.getNasdaq();
const app = express();
const port = 3000;
//static public 
app.use(express.static('public'));




//use incase there is nothing found
app.use((req, res)=>{
  res.status(404).send("NOT_FOUND")
});

//port to listen to, and a prompt for which port is listening to
app.listen(port, ()=>{
  console.log(`Web server listening to: ${port}`);
})