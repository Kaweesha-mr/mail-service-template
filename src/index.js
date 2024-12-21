const express =  require('express');
const emailRoutes = require('./routes/email.routes')
const logger = require('./utils/logger');
require('dotenv').config();
const eurekaClient = require('./utils/eureka-client');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', emailRoutes);

app.get('/info', (req, res) => {
    res.json({ status: 'UP' });
  });

app.get('/', (req, res) => {
    res.send('Hello World');
    });



app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

