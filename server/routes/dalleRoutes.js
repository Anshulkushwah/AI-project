import express from 'express';
import * as dotenv from 'dotenv';
// const { Configuration, OpenAIApi } = require("openai");

import OpenAI from "openai";


dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//     apiKey : process.env.OpenAi_API.KEY,
    
// });


// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });
// const openai = new OpenAiApi(configuration);

router.route('/').get((req,res) => {
    res.send('Hello from DALL-E!');
});

router.route('/').post(async (req,res) =>{
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.images.generate({
            prompt,
            n:1,
            size : '1024x1024',
            response_format: 'b64_json',
        });
        
        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({photo : image});

    } catch (error){
            console.log(error);
            res.status(500).send(error?.response.data.error.message || 'Something wrong in')
    }
});

export default router;