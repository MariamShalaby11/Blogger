const express = require('express');//intiate express
const mongoose = require('mongoose');
const {getAll} = require('./controllers/blog');
const cors = require('cors');
const routes=require('./routes');


const {MONGODB_DBURL}=process.env
mongoose.connect(MONGODB_DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));


const app=express();//isntance from express
// app.use(function (req, res, next) {​​

//     //Enabling CORS

//     res.header("Access-Control-Allow-Origin", "*");

//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

//     next();

// }​​);
app.use(cors());
app.use(express.json());//middleware to read from body
app.use(express.urlencoded({​​​​ extended: true }​​​​))
 

// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE,PATCH");
//      res.header("Access-Control-Allow-Origin: *");
//      res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
// mongoose.connect('mongodb://localhost:27017/blog',{useUnifiedTopology: true})//connect to db



app.use(express.static(__dirname + '/public'));


app.get('/',async(req,res,next) =>{//home page
    try{
        const blog= await getAll();
        res.json(blog)

    }catch(e){
        next(e);
    }

})



app.use('/',routes);


//not found middleware
app.use('*',(req,res, next) =>{
    res.status(404).json({err:'NOT FOUND'});
})

//error handler middleware
app.use((err,req,res,next) => {
    console.error(err)
    if(err instanceof mongoose.Error.ValidationError){
        return   res.status(422).json(err.errors);
    }else if(err.code===11000){
        res.status(422).json({statusCode:'ValidationError',property: err.KeyValue});
    }else if(err.message ==='UN_AUTHENTICATED'){
        res.status(401).json({statusCode:'UN_AUTHENTICATED'})
    }else{
    res.status(503).end();//server error
    }
})



const{PORT=3000}=process.env;//get port and listen
app.listen(PORT,()=>{
    console.log("Server is up and ready on :",PORT)
})