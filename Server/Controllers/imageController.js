import cloudinary from 'cloudinary'
import streamifier from 'streamifier'
// import upload from '../middleware/upload'


export  const imageUpload = (req,res)=>{
    console.log(req.file); 
     const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
       { folder: "uploads" },
       (error, result) => {
        console.log("UPLOAD SUCCESS:", result.secure_url);
         if (error) {return res.status(500).json({ error });}
        //  res.json({ url: result.secure_url });
        console.log(result);
          return res.status(200).json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      });
        
        
        }
    );
    streamifier.createReadStream(req.file.buffer).pipe(cloudinaryStream);
    
    // res.status(200).json({message : 'success'}) 

     

 }



