const Blog = require('../models/Blog');
//create blog
const create =(blog) =>{
    return Blog.create(blog);
}
//get all blogs
const getAll=() => Blog.find({}).exec();
//edit by id (my blogs only)
const editbyId=(id,editid,body) =>Blog.updateOne({$and:[{_id:editid},{author:id}]},{$set:body});
//delete by id (my blogs only)
const deletbyId=(id,delid) =>{ return Blog.find({$and:[{_id:delid},{author:id}]}).remove()};
//get my blogs only
const getMine=(id) => Blog.find(id).exec();
//search blog by id
const getbyId=(id) => Blog.findById(id).exec();
//search by title
const getByTitle=(title) =>Blog.find({title}).exec();
//search by tag
const getByTag=(tags) =>Blog.find({tags}).exec();
//write comment
const comment = (id,body) =>Blog.findByIdAndUpdate( id ,{ $push: {comments:body} },{ new: true, useFindAndModify: false })
// findByIdAndUpdate( id, { $push: { comments:body} },{ new: true, useFindAndModify: false })
//  Blog.updateOne({_id:id},{$set:body},{new:true}).exec()

//like blog
const like = (id,lid) =>Blog.findByIdAndUpdate( lid, { $push: { likes:id} },{ new: true, useFindAndModify: false })

module.exports = {
    create,getAll,getbyId,editbyId,deletbyId,getMine,getByTitle,getByTag,comment,like
}

