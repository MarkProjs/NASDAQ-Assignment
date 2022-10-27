import express from 'express';
import Nasdaq from './controllers/nasdaq.mjs';
import {fetchAPI} from './controllers/fetchAPI.mjs'; 
const nasdaq = new Nasdaq();
let jsonFile = await nasdaq.getNasdaq();
const app = express();
const port = 3000;
//static public 
app.use(express.static('public'));

app.get('/api', (req, res)=>{
  res.json(jsonFile);
});

//middleware to put the  route parameter to be uppercase
app.param('symbol', (req, res, next, symbol)=>{
const modified = symbol.toUpperCase();
req.symbol = modified;
next();
})

app.get('/api/nasdaq/:symbol', (req, res)=>{
  let fetchApi = fetchAPI(req.symbol);
  res.json(fetchApi);
});


//use incase there is nothing found
app.use((req, res)=>{
  res.status(404).send("NOT_FOUND")
});

//port to listen to, and a prompt for which port is listening to
app.listen(port, ()=>{
  console.log(`Web server listening to: ${port}`);
});