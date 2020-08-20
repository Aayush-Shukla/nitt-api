const mongoose=require('mongoose')
const studentSchema=new mongoose.Schema({
        // _id:{
        //     type:Object,
        //     required:false
        // },
    name:{

        type:String,
        required:true
    },
    rollNumber:{
        type:Number,
        required:true,
        unique:true
        
    },
    branch:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('infos',studentSchema)