const express=require('express');
const mongoose=require('mongoose');
const userData=require('./model');
const dns=require('dns');
dns.setServers(['8.8.8.8','8.8.4.4']);
const app=express();
app.use(express.json())
mongoose.connect("mongodb+srv://mounikaravivinjamuri_db_user:h6MMbFhzdAU54vYn@cluster0.zry2akr.mongodb.net")
.then(()=>console.log("database connected"))
.catch((err)=>console.log(err.message))
app.post("/send_data",async(req,res)=>{
  
      const{username,email,password}=req.body;
      try{
        if(!username||!email||!password){
          return res.json( {error:"all fields required"});
        }
          const userdata=new userData({
            username,
            email,
            password
          })
        
      
        await userdata.save()
       return res.json({message:"data sended",
                  userdata:userdata})
      }
      catch(err){
        console.log(err.message)
        
      }
      })
    
      

      
      

app.get("/get_data",async(req,res)=>{

  try{
    const user_data=await userData.find()
    res.json(user_data)
  }
  catch(err){
    console.log(err.message)
  }
})

app.get("/get_data/:id",async(req,res)=>{
  try{
      const user_data=await userData.findById(req.params.id)
      res.json(user_data)
  }
    catch(err){
       console.log(err.message)
  }
})
app.put("/update_data/:id",async(req,res)=>{
      const{username,email,password}=req.body;
      try{
        const user=await userData.findByIdAndUpdate(req.params.id,{
            username,
            email,
            password
        }
      )
        res.json({message:"data updated",
                  userdata:user
        })
      }
      catch(err){
        console.log(err.message)

      }
      
})
app.delete("/delete_data/:id",async(req,res)=>{
  try{
      const user_data=await userData.findByIdAndDelete(req.params.id)
      res.json(user_data)
  }
    catch(err){
       console.log(err.message)
    }
  })





app.listen(3000,()=> console.log("server is running.."))