const express = require('express');
const rendertron = require('rendertron-middleware');

const app = express();

const DIST_FOLDER = process.cwd() + '/public';
const PORT = process.env.PORT || 8080;

// Add googlebot to the list of bots we will use Rendertron for
const BOTS = rendertron.botUserAgents.concat('googlebot');
const BOT_UA_PATTERN = new RegExp(BOTS.join('|'), 'i');

// app.set('view engine', 'html');

// Add Rendertron middleware to send bot requests to Rendertron
app.use(
    rendertron.makeMiddleware({
        proxyUrl: 'https://render-tron.appspot.com/render', // this is a DEMO URL! Do not use this in production!
        userAgentPattern: BOT_UA_PATTERN
    })
);

// Serve static assets (images, css, etc.)
app.get('*.*', express.static(DIST_FOLDER));

// Point all other URLs to index.html for our single page app
app.get('*', (req, res) => {
    res.sendFile(DIST_FOLDER + '/index.html');
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT} from ${DIST_FOLDER}`);
});
