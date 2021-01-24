const express = require('express');//intiate express
const mongoose = require('mongoose');
const {getAll} = require('./controllers/blog');
const routes=require('./routes');


const {DBURL}=process.env
mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));


const app=express();//isntance from express

// mongoose.connect('mongodb://localhost:27017/blog',{useUnifiedTopology: true})//connect to db
app.use(express.json());//middleware to read from body


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