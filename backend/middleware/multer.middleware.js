import multer from "multer";
import path from "path";
import fs from "fs";
import { log } from "console";

//todo:insure the public/temp folder exists??


//configure disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        log(req);
        log(file);
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        log(req)
        log(file)
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext
        cb(null, uniqueName);
    }
})

//file type + size validation
function fileFilter(req, file, cb){
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if(allowed.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error('Invalid file type', false));
    }
}


const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

export default upload;