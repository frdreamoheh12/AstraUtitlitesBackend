import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import api from './routes/api.js';
import { errorHandler } from './middleware/errors.js';
const app=express();app.disable('x-powered-by');app.use(cors({origin:process.env.FRONTEND_ORIGIN?process.env.FRONTEND_ORIGIN.split(','):true}));app.use(express.json({limit:'1mb'}));app.use('/api',rateLimit({windowMs:60_000,limit:60,standardHeaders:'draft-7',legacyHeaders:false}),api);app.use('/api',(req,res)=>res.status(404).json({success:false,message:'API endpoint not found.'}));app.use(errorHandler);const port=Number(process.env.PORT)||4000;app.listen(port,'0.0.0.0',()=>console.log(`AstraUtilities API listening on ${port}`));
