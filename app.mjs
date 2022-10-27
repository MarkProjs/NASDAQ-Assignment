import express from 'express';
import Nasdaq from './controllers/nasdaq.mjs';
const nasdaq = new Nasdaq();
let jsonFile = await nasdaq.getNasdaq();
const app = express();
const port = 3000;