const axios = require("axios");
const User=require("../models/User.js");
require("dotenv").config();

const secretkey = process.env.RECAPTCHA_SECRET_KEY;

exports.register=async(req,res)=>{
    try{
  const{name,email,studentnumber,Year,Branch, section,residence,recaptchaToken,contact}=req.body;
  

  if (!name || !studentnumber) {
    return res.status(400).json({
      success: false,
      message: "Name and student number are required fields",
    });
  }
  
  if (!contact || contact.toString().length !== 10) {
    return res.status(400).json({
      success: false,
      message: "Please enter a 10-digit contact number.",
    });
  }
  
      if(!email|| !email.endsWith("@akgec.ac.in")){
        return res.status(400).json({
            success:false,
            message:"please enter a valid email",
        });
      }
    
       if(!section ){
        return res.status(400).json({
            success:false,
            message:"please enter a valid section",
        });
       }
    
       if(!Branch)
       {
        return res.status(400).json({
            success:false,
            message:"required branch",
        });
       }
    
       if(!Year){
        return res.status(400).json({
            success:false,
            message:"please enter a valid Year",
        });
       }
    
       if(!residence){
        return res.status(400).json({
            success:false,
            message:"enter residence",
        });
    }

    
    // try {
    //   const rresponse = await axios.post(
    //     `https://www.google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${recaptchaToken}`
    //   );
    //   const data = rresponse.data;
    //   if (!data.success) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Failed reCAPTCHA verification",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error during reCAPTCHA verification:", error);
    //   return res.status(500).json({
    //     success: false,
    //     message: "Error during reCAPTCHA verification",
    //   });
    // }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "Already regitered",
          });
        }
    

      const user= await  User.create({
        name,email,studentnumber,Year,Branch, section,residence,contact,
      });

    
      return res.status(200).json({
    success:true,
    message:"Succesfully registered",
    user: {
        name: user.name,
        email: user.email,
        Year: user.Year,
        Branch: user.Branch,
        section: user.section,
        residence: user.residence,
      },
    
    });
 }
 catch (error) {
console.error("Error during user registration:", error);
return res.status(500).json({
success: false,
message: "Cannot register, please try again later",
});
}
};
