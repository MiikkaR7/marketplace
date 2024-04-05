const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5030;

app.listen(PORT, () => {
    console.info(`BACKEND IS LISTENING ON PORT ${PORT}`)
});