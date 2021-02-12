const mongoose =require('mongoose');
const {Schema}=mongoose;

const blogSchema=new Schema({
    cloudinary_id:{
        type:String
    },
    title:{
        type: String,
        maxLength:256,
        required:true
    },
    body:String,
    image:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    updatedAt:{
        type:Date,
        default:Date.now(),
    },
     comments:[String],
        // comments:[{​​

        //     userId:{​​type: Schema.Types.ObjectId, ref: 'User'}​​,
            
        //     body:{​​type:string}​​
            
        //     }​​],
    likes:[{type: Schema.Types.ObjectId, ref: 'User'}]
  
})

const blogModel= mongoose.model('Blog',blogSchema)
module.exports=blogModel;