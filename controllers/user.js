const User =require('../models/User');
const jwt = require('jsonwebtoken');
const {promisify} =require('util');
const asyncSign= promisify(jwt.sign)

//register new user
const create=(user)=>{return User.create(user);}
//get all users
const getAll=()=>User.find({}).exec();
//get one user
const getbyId=(id)=>User.findById(id).exec();
//edit username and password
const editbyId=(id,body) => User.findByIdAndUpdate(id,body,{new:true}).exec();

//delete user
const deletbyId=(id) => {User.findByIdAndDelete(id).exec()
return {"status":"deleted"}};

//follow users
const pushfollowID = async(id, targetid)=>{
    const loggedUser = await User.findById(id).exec();
  //  console.log(loggedUser)
   if(targetid != id  &&  !loggedUser.followings.find(item => item == targetid)  ){
    User.updateOne({_id:id} ,{ $push : {followings: targetid } } ,{new:true}).exec()
    User.updateOne({_id:targetid}, { $push: { followers: id } }, { new: true }).exec();
    return {"status":"followed"}

   }else{
       return{"status":"Id invalid"};
   }
}

//unfollow user 
const unfollow = (id, targetid)=>{
    User.updateOne({_id:id },{ $pull : {followings: targetid } } ,{new:true}).exec()
    User.updateOne({_id:targetid}, { $pull: { followers: id } }, { new: true }).exec();
    return {"status":"unfollowed"}
    }
    

const login=async ({ username, password }) => {
     const user = await User.findOne({ username }).exec();
    if(!user){
        throw Error('UN_AUTHENTICATED');
    }
    const ValidPass=await user.validatePassword(password);
    if(!ValidPass){
        throw Error('UN_AUTHENTICATED');
    }
   
    const token = await asyncSign({
        username: user.username,
        id: user.id,
      }, 'SECRET_COMPLEX??*', { expiresIn: '1d' });
      return { ...user.toJSON(), token };

}

module.exports = {
    create,getAll,getbyId,editbyId,deletbyId,login,pushfollowID,unfollow
}