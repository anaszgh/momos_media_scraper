const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const app = express();

dotenv.config({
    path: ".env",
  });
  const PORT = process.env.PORT || 3000;
//Register front-end
app.use(express.static(path.join(__dirname, 'public')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, async () => {
  const _baseUrl = process.env.BASE_URL || "http://localhost";
  const _launchUrl = `${_baseUrl}:${PORT}`;
  console.log(`server started at ${_launchUrl}`);
});

