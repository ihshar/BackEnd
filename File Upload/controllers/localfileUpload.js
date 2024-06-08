const { cloudinaryConnect } = require("../config/cloudinary");
const File = require("../models/File");
const { options } = require("../routes/FileUpload");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req,res) =>{
        try{
            const file = req.files.file;
            console.log("FIle",file);
    
            let path = __dirname+"/files/"+Date.now()+`.${file.name.split(".")[1]}`;
            console.log("path",path);
    
            file.mv (path,(error) =>{
                console.log(error);
            })
    
            res.json({
                success:true,
                message:"Local File Upload Successfully"
            });
        } catch(error){
            console.log("Not able to upload file on server");
            console.log(error);
        }

}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    console.log("temp File Path",file.tempFilePath,options);

    if(quality){
        options.quality = quality;
    }
    
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload = async(req,res) => {
    try{    
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Types:",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported",
            });
        }

        console.log("Uploading to Himanshu");
        const response = await uploadFileToCloudinary(file,"Himanshu");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Uploaded",
        })

    } catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        });
    }
}




exports.videoUpload = async(req,res) => {
    try{    
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        // Validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Types:",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported",
            });
        }

        console.log("Uploading to Himanshu");
        const response = await uploadFileToCloudinary(file,"Himanshu");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video Successfully Uploaded",
        })

    } catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        });
    }
}


exports.imageSizeReducer = async(req,res) => {
    try{    
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Types:",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported",
            });
        }

        console.log("Uploading to Himanshu");
        const response = await uploadFileToCloudinary(file,"Himanshu",90);
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"imageSizeReducer Successfully Uploaded",
        })

    } catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        });
    }
}

