const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

//initializing app
const app = express();

// applying cors middlwware for handling CORS 
// var whitelist = ['http://localhost:4000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(cors());
 
//adding body parser middleware to handle request body
app.use(bodyParser.json());

//configuring static folder for app
app.use(express.static(path.join(__dirname + '/static')));

//configuring port for app
const port = require('./config/port');

app.listen(port,(err)=>{
    if(err){
        console.log('Something went wrong while initializing the app')
    } else{
        console.log(`App is initialized and configured at port ${port}`)
    }
});

//configuring mongodb
const dbConfig = require('./config/database');
mongoose.connect(dbConfig.connectionUrl,{useNewUrlParser:true,useUnifiedTopology:true});

mongoose.connection.on('connected',()=>{
    console.log(`App is successfully connected to database on port ${dbConfig.port}`)
});

mongoose.connection.on('error',()=>{
    console.log('Something went wrong while connecting to database.')
});

//handing base '/' request
app.get('/',(req,res)=>{
       res.render(index.html); 
});

const taskRoutes = require('./routes/taskRoute');
app.use('/api/tasks',taskRoutes);

const subtaskRoutes = require('./routes/subtaskRoute');
app.use('/api/subtasks',subtaskRoutes);