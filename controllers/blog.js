const Blog = require('../models/Blog');
//create blog
const create =(blog) =>{
    return Blog.create(blog);
}
const createimage =(blog) =>{
    return Blog.create(blog);
}
const uploadImg =(blog) =>{
    return Blog.create(blog);
}

//get all blogs
//const getAll=() => Blog.find({}).exec();
const getAll=() => Blog.find().sort({createdAt:'desc'}).populate('author').exec();
//edit by id (my blogs only)
const editbyId=(id,editid,body) =>Blog.updateOne({$and:[{_id:editid},{author:id}]},{$set:body});
//delete by id (my blogs only)
const deletbyId=(id,delid) =>{ return Blog.find({$and:[{_id:delid},{author:id}]}).remove()};
//get my blogs only
const getMine=(id) => Blog.find(id).sort({createdAt:'desc'}).populate('author').exec();
//search blog by id
const getbyId=(id) => Blog.findById(id).exec();
//search by title
const getByTitle=(title) =>Blog.find({title}).populate('author').exec();
//search by tag
const getByTag=(tags) =>Blog.find({tags}).populate('author').exec();
//write comment
const comment = (id,body) =>Blog.updateOne({_id:id},{$addToSet:body},{new:true}).exec()
//Blog.findByIdAndUpdate( id ,{ $set: {comments:body} },{ new: true, useFindAndModify: false })
// findByIdAndUpdate( id, { $push: { comments:body} },{ new: true, useFindAndModify: false })
//  Blog.updateOne({_id:id},{$set:body},{new:true}).exec()

//like blog
const like = (id,lid) =>Blog.findByIdAndUpdate( lid, { $push: { likes:id} },{ new: true, useFindAndModify: false }).populate('author');
//unlike blog
const unlike= (id,lid) =>Blog.findByIdAndUpdate( lid, { $pull: { likes:id} },{ new: true, useFindAndModify: false }).populate('author');


module.exports = {
    create,createimage,getAll,getbyId,editbyId,deletbyId,getMine,getByTitle,getByTag,comment,like,unlike,uploadImg
}

