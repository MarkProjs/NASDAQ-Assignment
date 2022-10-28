import express from 'express';
import Nasdaq from './controllers/nasdaq.mjs';
import {fetchAPI} from './controllers/fetchAPI.mjs'; 
const nasdaq = new Nasdaq();
let jsonFile = await nasdaq.getNasdaq();
const app = express();
const port = 3000;
//static public that the web server will use
app.use(express.static('public'));

app.get('/api', (req, res)=>{
  res.json(jsonFile);
});

//route to fetch an api for a specific symbol
app.get('/api/nasdaq/:symbol', async (req, res)=>{
  let result = await fetchAPI(req.params.symbol)
  console.log(result)
  res.json(result)
});


//use incase there is nothing found
app.use((req, res)=>{
  res.status(404).send("NOT_FOUND")
});

//port to listen to, and a prompt for which port is listening to
app.listen(port, ()=>{
  console.log(`Web server listening to: ${port}`);
});