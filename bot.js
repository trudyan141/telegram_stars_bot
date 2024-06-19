const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

const token = '7267860189:AAGvu7OOF1IEh6ytMfD5uK5o4fQqORGgw_E';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.json());

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! This is your Telegram bot.');
});

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const messageText = msg.text;

//     bot.sendMessage(chatId, `You said: ${messageText}`);
// });

bot.on('pre_checkout_query', (query) => {
    bot.answerPreCheckoutQuery(query.id, true)
        .then(() => {
            console.log('Pre-checkout query answered successfully');
        })
        .catch((err) => {
            console.error('Failed to answer pre-checkout query:', err);
        });
});


bot.on('successful_payment', (message) => {
    bot.sendMessage(message.chat.id, 'Thank you for your payment!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log('Bot is running...');