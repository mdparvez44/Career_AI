import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "src/uploads/");
    },
    filename: function(req, file, cb){
        const uniqueName = Date.now()+"-"+file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) =>{
    const ext = path.extname(file.originalname);

    if (ext !== ".pdf" && ext !== ".docx"){
        return cb(new Error("Only PDF and DOCX allowed"), false);
    }
    cb(null, true); 
}

export const upload = multer({
    storage,
    fileFilter
});