import multer from "multer";
import {fileTypeFromFile} from 'file-type';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp/uploads')
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },

    fileFilter: (req, file, cb) => {
        
    }
})

const upload = multer({ storage });

export default upload;