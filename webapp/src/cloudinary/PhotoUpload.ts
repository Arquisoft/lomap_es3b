import { v2 as cloudinary } from "cloudinary";


export function uploadPhoto(file: File) {
    cloudinary.uploader.upload_stream({ resource_type: "image" }, onCloudinaryDone).end(file.arrayBuffer())
}

function onCloudinaryDone(error:any, result:any) {
    if (error) {
        console.log("Error in cloudinary.uploader.upload_stream\n", error);
        return;
    }
    console.log("Cloudinary audio info: ", result.audio);

    // If you want to see all the data that Cloudinary comes back with
    // console.log(result);
    
    console.log('Cloudinary url', result.url);
    
    return result.url;
}