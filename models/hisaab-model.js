const mongoose=require("mongoose");
const hisaabSchema= mongoose.Schema(
    {
        title:{
         type: String,
         trim:true,
         minLength:3,
         maxLength:100,
         required:true,
        },
        description:{
          type:String,
          required:true,
          trim:true,
        },

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        encrypted:{
            type:Boolean,
            default:false,
        },
        shareable:{
            type:Boolean,
            default:false,
        },
        passcode:{
            type:String,
            default:"",
        },
        editpermission:{
            type:Boolean,
            default:false,
        },
    },
    {timestamps:true}
);

const Hisaab=mongoose.model("Hisaab",hisaabSchema)

module.exports=mongoose.model("hisaab",hisaabSchema)