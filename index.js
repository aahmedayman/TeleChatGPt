const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

//require("dotenv").config();

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration)

// replace the value below with the Telegram token you receive from @BotFather
const token = "6092800778:AAHQOuA7PlHhsRwXT8FwDqdmos4O7WZ8k9E"

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: userInput,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });
    const generatedText = response.data.choices[0].text;

    bot.sendMessage(chatId, generatedText);
});