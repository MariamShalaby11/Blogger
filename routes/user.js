const express =require('express');
const {create,getAll,getbyId,editbyId,deletbyId,login,pushfollowID,unfollow}=require('../controllers/user')
const router =express.Router();
const authMiddleware = require('../middlewares/auth');


router.post('/register',async(req,res,next) =>{
    const { body } = req;
    try{
        const user = await create(body);
        res.json(user);
    }catch(e){
        next(e);
    }
})
router.get('/',async(req,res,next) => {
    try{
        const blog= await getAll();
        res.json(blog)

    }catch(e){
        next(e);
    }
})
router.get('/:id',async(req,res,next)=>{
    const{ params : { id } } = req;
    try{
        const blogs= await getbyId(id);
        res.json(blogs)

    }catch(e){
        next(e);
    }
})
router.patch('/:id',authMiddleware,async(req,res,next) =>{
    const { params: { id }, body } = req;
    try {
        const users = await editbyId(id,body);
        res.json(users);
      } catch (e) {
        next(e);
      }

})
router.delete('/:id',authMiddleware,async(req,res,next) =>{
    const {params :{id}}=req;
    try{
        const user= await deletbyId(id);
        res.json(user)

    }catch(e){
        next(e);
    }
})
router.post('/login',async(req,res,next)=>{
    const { body}=req;
    try{
        const user = await login(body);
        res.json(user);
    }catch(e){
        next(e);
    }
})
// authMiddleware
router.post('/follow/:id/:fid',authMiddleware,async(req,res,next)=>{
    const {params: { id }, params: { fid } } = req;
    try { 
      const userfollowID = await pushfollowID(id,fid);
      res.json(userfollowID);
    } catch (e) {
      next(e);
    }
  })
  router.post('/unfollow/:id/:fid',authMiddleware,async(req,res,next)=>{
    const {params: { id }, params: { fid } } = req;
    try {    
      const userunfollowID = await unfollow(id,fid);
      res.json(userunfollowID);
    } catch (e) {
      next(e);
    }
  })





module.exports = router;