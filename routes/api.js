const express= require("express")
const bodyParser=require('body-parser')
var jsonParser = bodyParser.json()
const router=express.Router()
const Student=require('../models/student')
const { response } = require("express")


router.get('/',async (req,res)=>{
    try{
        const students= await Student.find()
        res.json(students)
    }catch(err){
        res.status(500).json({message:err.message})
    }

    

})
router.get('/:id',getStudent,async (req,res)=>{
    res.json(res.student)
    

})
router.get('/roll/:roll',async (req,res)=>{
    let student
    
    try{
        student=await Student.findOne({rollNumber:req.params.roll})
        if(student==null){
            return res.status(404).json({message: 'cannot find student'})
        }
        else{
            console.log(student.branch)
            res.json({"branch": student.branch})
        }
    }   catch(err){
        return res.status(500).json({message:err.message})
    }
})




router.post('/',async (req,res)=>{
    console.log(req.body.name)
    const student= new Student({
        name:req.body.name,
        rollNumber:req.body.rollNumber,
        branch:req.body.branch
    })

    try{
        const newstudent=await student.save()
        res.status(201).json(newstudent)

    }catch(err){
        res.status(400).json({message:err.message})

    }
})

router.get('/search/:key',async (req,res)=>{
    var key=req.params.key
    console.log(req.params.key,new RegExp('/'+key+'/', "i"))

    let list
    
        Student.find().or([{"name": new RegExp('.*'+key+'.*', "i")},{"rollNumber": new RegExp('.*'+key+'.*', "i")}]).then(result=>{
            res.json(result)
            
        }).catch(err=>{
            res.status(400).json({message:err.message})})


  
})


router.delete('/:id',getStudent,async (req,res)=>{
    try{
        await res.student.remove()
        res.json({message: "record deleted"})
    }catch(err){
        res.status(500).json({message:err.message})
    }

})
router.patch('/:id',getStudent,async (req,res)=>{
    if(req.body.name!=null){
        res.student.name=req.body.name
    }
    if(req.body.rollNumber!=null){
        res.student.rollNumber=req.body.rollNumber
    }

    if(req.body.branch!=null){
        res.student.branch=req.body.branch
    }
    try{
        updatedStudent=await res.student.save()
        res.json(updatedStudent)
    }catch(err){
        res.status(400).json({message:err.message})
    }

})



async function getStudent(req,res,next){
    let student
    try{
    student=await Student.findById(req.params.id)
    if(student==null){
        return res.status(404).json({message: 'cannot find student'})
    }
}   catch(err){
    return res.status(500).json({message:err.message})
}
res.student=student
next()
}

module.exports=router
