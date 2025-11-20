

// step 1 cretae user 

const createUser=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:error.message})
        
        
    }
}

