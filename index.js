// ==============================================================================
// INICIO de configuraciones minimas para tener tus juegos andando
// ------------------------------------------------------------------------------
// Inserta tu token de bot de telegram
// Generalmente es algo como "asjdhS39XJS:dksjdk93483948928349384"
// ------------------------------------------------------------------------------
const BOT_TOKEN = "";
// ------------------------------------------------------------------------------
// IMPORTANTE: Inserta tu sitio web, por ejemplo https://sitioweb.com
// Cuidado, si o si necesitas que tu sitio sea seguro
// (es decir, que sea HTTPS y no solamente HTTP)
// ------------------------------------------------------------------------------
const BASE_URL = "";
// ==============================================================================
// FIN De las configuraciones mínimas
// ------------------------------------------------------------------------------
// Con esto ya tenés un bot de Telegram andando y pudiendo publicar juegos.
// Pero si queres mandar mensajes, o similar, vas a necesitar configurar y
// programar un poco más.
// ==============================================================================
// INICIO de las configuraciones avanzadas
// ------------------------------------------------------------------------------
// En esta zona estan todas las funciones de tu bot.
// Si queres que tu bot responda mensajes y demás, tenes que programar acá.
// ------------------------------------------------------------------------------

// Esta funcion maneja los mensajes que recibe el bot
function handleMessage(updateID, message) {
  // ----------------------------------------------------------------------------
  // EJEMPLO de responder un mensaje, descomentar para probar.
  // ----------------------------------------------------------------------------
  // NOTA: ¡CUIDADO! esto incluye grupos.
  //       Si queres que no lo haga, fijate si el id es > 0.
  //       Los grupos de Telegram tienen como ID un número negativo.
  //       Los usuarios de Telegram tienen como ID un número positivo.
  // ----------------------------------------------------------------------------
  // const { id } = message.chat;
  // telegram.sendMessage(id, "Hola, como estás.");
}

// Esta funcion maneja los mensajes editados que recibe el bot
function handleEditedMessage(updateID, editedMessage) {}

// Esta funcion llega cuando se publica un grupo
function handleChannelPost(updateID, channelPost) {}

// Esta funcion llega cuando se publica un edicion de un grupo
function handleEditedChannelPost(updateID, editedChannelPost) {}

// Esta funcion maneja cuando se envia una consulta que envia opciones
function handleInlineQuery(updateID, inlineQuery) {}

// Esta funcion maneja cuando se elige un boton de las opciones enviadas previamente
function handleChosenInlineResult(updateID, chosenInlineResult) {}
// ------------------------------------------------------------------------------
// Esta sección maneja respuestas a pedidos especificos, como
// cuando se presiona "jugar" en un juego. (o mandar el puntaje)
// ------------------------------------------------------------------------------
// Esta funcion es cuando se reciben mensajes especiales,
// Uno de estos es cuando se envia un juego
function handleCallbackQuery(updateID, callbackQuery) {
  const {
    id,
    game_short_name: game,
    from,
    chat_instance: chat
  } = callbackQuery;
  // Si el callback es para un juego
  if (game) {
    // Buscaría el juego en https://tusitio.com/telegram/games/<nombre-del-juego>/index.html
    // Eso significa que tenes que tener un archivo en public/telegram/games/<nombre-del-juego/index.html
    // En otras palabras, no necesitas más que agregar la carpeta y el juego en Telegram.
    const url = `${GAMES_URL}/${game}/index.html`;
    telegram.answerCallbackQuery(id, { url });
  }
}
// ------------------------------------------------------------------------------
// Esta sección es la referente a la plataforma de Pagos de Telegram.
// ------------------------------------------------------------------------------
// Esta es una consulta para pagos, que se pueden realizar por Telegram.
function handleShippingQuery(updateID, shippingQuery) {}

// Esta es una consulta de un resumen/factura de un pago realizado por Telegram.
function handleCheckoutQuery(updateID, preCheckoutQuery) {}
// ==============================================================================
// FIN De las configuraciones avanzadas
// ------------------------------------------------------------------------------
// Todo lo que va desde acá en adelante, es código de Node.js para hacer
// funcionar tu código que escribis más arriba.
// ==============================================================================

// ==============================================================================
// ==============================================================================
// ==============================================================================
// PROSEGUIR BAJO SU PROPIO RIESGO
// ==============================================================================
// ==============================================================================
// ==============================================================================

// Estos son modulos de Node.js que se usan

// Se dedica a manejar rutas de forma cómoda
const express = require("express");
// Se encarga de manejar nuestro bot de Telegram
const TelegramBot = require("node-telegram-bot-api");
// Genera números y textos aleatoreos de forma segura
const securerandom = require("securerandom");
// Manejo de cookies
const cookieParser = require("cookie-parser");
// Manejo de cuerpo (body) de un request,
// se usa para poder recibir pedidos en JSON.
const bodyParser = require("body-parser");
// Manejo de rutas de archivos
const path = require("path");

// Con esto podes llamar a funciones de telegram facil
// (Mientras no haya token, no hace nada)
const telegram = BOT_TOKEN.length > 0 && new TelegramBot(BOT_TOKEN);

const app = express();

// Path autogenerado del webhook
const WEBHOOK_PATH = `/telegram/bot/hooks/${securerandom.hex(16)}`;

// Generamos una URL al azar para el webhook
// Sin embargo de momento no se usa.
const WEBHOOK_URL = `${BASE_URL}${WEBHOOK_PATH}`;

// Usamos una url basica para los juegos
const GAMES_URL = `${BASE_URL}/telegram/games`;

// Necesitamos esto para leer request de telegram
app.use(cookieParser());
app.use(bodyParser.json());

// Todo lo que esta dentro de "public" se puede ver directamente
// Es decir, si tenes un public/images/x.png podes acceder como
// "sitioweb.com/images/x.png"
app.use(express.static(path.join(__dirname, "public")));

// ==============================================================================
// Aca va todo el codigo del BOT, que hace y demás
// ==============================================================================
// Esto es cuando se obtiene un mensaje en tu Bot
// Esta funcion separa el mensaje que recibio y llama uno de las funciones
// de arriba, en base a lo que llegó.
app.post(WEBHOOK_PATH, (request, response) => {
  // En body estan todos los datos, como chat_id y demás
  const {
    update_id: updateID,
    message,
    edited_message: editedMessage,
    channel_post: channelPost,
    edited_channel_post: editedChannelPost,
    inline_query: inlineQuery,
    chosen_inline_result: chosenInlineResult,
    callback_query: callbackQuery,
    shipping_query: shippingQuery,
    pre_checkout_query: preCheckoutQuery
  } = request.body;
  if (message) {
    handleMessage(updateID, message);
  }
  if (editedMessage) {
    handleEditedMessage(updateID, editedMessage);
  }
  if (channelPost) {
    handleChannelPost(updateID, channelPost);
  }
  if (editedChannelPost) {
    handleEditedChannelPost(updateID, editedChannelPost);
  }
  if (inlineQuery) {
    handleInlineQuery(updateID, inlineQuery);
  }
  if (chosenInlineResult) {
    handleChosenInlineResult(updateID, chosenInlineResult);
  }
  if (callbackQuery) {
    handleCallbackQuery(updateID, callbackQuery);
  }
  if (shippingQuery) {
    handleShippingQuery(updateID, shippingQuery);
  }
  if (preCheckoutQuery) {
    handleCheckoutQuery(updateID, preCheckoutQuery);
  }
  response.status(200).json({});
});

// Actualizamos el webhook de telegram cada vez que reiniciamos
if (telegram) {
  telegram.setWebHook(WEBHOOK_PATH);
}

// Iniciamos el servidor en el puerto para el Proxy
app.listen(8081);

// ==============================================================================
// Aca termina el código del BOT
// ==============================================================================
