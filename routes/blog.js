const express =require('express');
const {create,getAll,getbyId,editbyId,deletbyId, getMine,getByTitle,getByTag,comment,like,createimage}=require('../controllers/blog')
const router =express.Router();
const multer = require('multer');
const path = require('path');




const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

//create blog
router.post('/addimg',upload.single('image'), async (req, res, next) =>{

const {body ,user :{id}}=req;
const _file =req.file.filename;

try{
    const blog= await createimage({...body,image:_file,author : id });
    res.json(blog)

}catch(e){
    next(e);

}

})
router.post('/add', async (req, res, next) =>{

    const {body ,user :{id}}=req;

    
    try{
        const blog= await create({...body,author : id });
        res.json(blog)
    
    }catch(e){
        next(e);
    
    }
    
    })
//get all blogs
router.get('/',async(req,res,next) =>{
    try{
        const blog= await getAll();
        res.json(blog)

    }catch(e){
        next(e);
    }

})
//get user posts only
router.get('/getmyblog/:id',async(req,res,next)=>{
    //const {user :{id}}=req;
    const {params :{id}}=req;
    try{
        const blog= await getMine({author: id });
        res.json(blog)

    }catch(e){
        next(e);
    }
})
//search by id
router.get('/:id',async(req , res,next) =>
{
    const{ params : { id } } = req;
    try{
        const blogs= await getbyId(id);
        res.json(blogs)

    }catch(e){
        next(e);
    }
})
//search by title
router.get('/title/:title', async (req, res, next) => {
    const { params: {title}   } = req;
    try {
        // debugger;
        const blogs = await getByTitle( title );
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//search by tag
router.get('/tags/:tag', async (req, res, next) => {
    const { params: {tag}   } = req;
  
    try {
        const blogs = await getByTag( tag );
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//write comment
router.patch('/comment/:id',async(req , res , next) =>{
    const{ body,params : { id } } = req;
    try{
        const blogs= await comment(id,body);
        res.json(blogs)

    }catch(e){
        next(e);
    }

})
//like post
router.post('/like/:lid',async(req , res , next)=>{
    const{ user :{id},params : { lid } } = req;
    try{
        const blogs= await like(id,lid);
        res.json(blogs)

    }catch(e){
        next(e);
    }
})
//edit specific blog
router.patch('/:editid',async(req , res , next ) => 
{
    const{ user:{id}, params :{ editid }, body }=req;
    const update=Date.now();
    try{
        const blog= await editbyId(id,editid,{...body,updatedAt:update});
        res.json(blog)
        console.log('edited')
    }catch(e){
        next(e);
    }
})
//delete blog
router.delete('/:delid',async(req , res , next) =>
{
    const {user:{id}, params :{delid} }=req;
    
    try{
        const blog= await deletbyId(id,delid);
        res.json(blog)
        console.log('deleted')

    }catch(e){
        next(e);
    }

})


module.exports = router;