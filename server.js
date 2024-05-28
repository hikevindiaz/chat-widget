const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003', // or your custom model
        prompt: `Using the knowledge base of Antiguo Casino: ${userMessage}`,
        max_tokens: 150
    }, {
        headers: {
            'Authorization': `Bearer sk-proj-bCKH76o8iSzMUAF4F7vfT3BlbkFJBs8kfKgiVT1sbreicYoX`
        }
    });

    const botMessage = response.data.choices[0].text.trim();
    res.json({ message: botMessage });
});

app.listen(port, () => {
    console.log(`Chatbot server running at http://localhost:${port}`);
});
