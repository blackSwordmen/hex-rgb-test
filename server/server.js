const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const fs = require('fs');
const fastify = require('fastify')({
  logger: false,
});
const fastifyCors = require('@fastify/cors');

fastify.register(fastifyCors, {
  origin: 'https://blackswordmen.github.io', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});

const chatIdsFile = path.join(__dirname, 'chatIds.json');

function loadChatIds() {
  if (fs.existsSync(chatIdsFile)) {
    const data = fs.readFileSync(chatIdsFile, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

function saveChatIds() {
  fs.writeFileSync(chatIdsFile, JSON.stringify(users, null, 2), 'utf8');
}

function pushUserId(userId) {
  if (users.includes(userId)) return;
  else {
    users.push(userId);
    saveChatIds();
  }
}

const TOKEN = '7188800096:AAH2gi3R3wxU2_gL3c_Dcds3NfRFbby4yBA';
let bot;
var users = loadChatIds();

function sendToAllUsers(message) {
  users.forEach((chatId) => {
    bot.sendMessage(chatId, message)
      .then(() => console.log(`Message has been sent to CHAT_ID: ${chatId}`))
      .catch((error) => console.error(`Sending message error CHAT_ID: ${chatId}`, error));
  });
}

if (!bot) {
  bot = new TelegramBot(TOKEN, { polling: true });
  bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    pushUserId(chatId);
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    pushUserId(chatId);
  });

  bot.onText(/\/register/, (msg) => {
    const chatId = msg.chat.id;
    pushUserId(chatId);
    console.log('User has been registered');
    bot.sendMessage(chatId, 'You are registered!.');
  });
}

fastify.post('/sendform', async (request, reply) => {
  const { userData, telephone, email, timeStamp, userAgent } = request.body;

  if (!userData || !telephone || !email) {
    reply.code(400).send({ error: 'No required fields' });
    return;
  }

  try {
    const message = `Нова форма була заповнена:\nДані користувача: ${userData}\nТелефон: ${telephone}\nEmail: ${email}\n timeStamp: ${timeStamp}\n userAgent: ${userAgent}`;
    sendToAllUsers(message);
    reply.send({ message: 'The form data was successfully submitted' });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: 'Error sending data' });
  }
});

const seo = require('./src/seo.json');
if (seo.url === 'glitch-default') {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

fastify.listen({ port: process.env.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`application is listened on ${address}`);
});
