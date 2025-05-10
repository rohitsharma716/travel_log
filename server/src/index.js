require('dotenv').config();
const express = require('express')
const morgan  = require('morgan');
const helmet = require('helmet');
const cors    =  require('cors');
const middleware =  require('./middlewares');
const  mongoose  = require('mongoose');
const logs = require('./routes/logs');
const auth = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://localhost/travel-log' ,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(()=> console.log("mongoDB connected"))
  .catch( err => console.error('MongoDb connection error: ' ,err))

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN ||  '*',
    optionsSuccessStatus: 200, // For legacy browser support

}));
app.use(express.json());

app.get('/' , (req,res)=>{
    res.json({
        message: 'hello from rohit',
    })
})
app.use('/api/auth', auth);
app.use('/api/logs' , logs);

//node found middleware 
app.use(middleware.notfound)
// general middleware
app.use(middleware.errorHandler)
const port = process.env.PORT || 5001;

app.listen(port , ( )=>{
     console.log(`Listening at port no : ${port}`)
})