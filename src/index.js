const express =  require('express');
const emailRoutes = require('./routes/email.routes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', emailRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
    });



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});