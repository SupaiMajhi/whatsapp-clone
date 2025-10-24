import { errorResponse } from "../lib/lib.js";
import { fileTypeFromBuffer } from "file-type";

const allowedMimeTypes = [
    'image/jpeg',
    'image/png'
];

const verifyFileTypes = async (req, res, next) => {
    if(!req.files || req.files.length === 0){
        return errorResponse(res, 400, 'No files uploaded.');
    }

    try {
        for(const file of req.files){
            const type = await fileTypeFromBuffer(file.buffer);
            console.log('type in verifyFileTypes', type);
            if(!type || !allowedMimeTypes.includes(type.mime)){
                return errorResponse(res, 400, 'file format is not accepted.');
            }
        }
        next();
    } catch (error) {
        console.log(`Error in verifyFileTypes ${error.message}`);
        return errorResponse(res, 500, 'Internal Server error');
    }
}

export default verifyFileTypes;