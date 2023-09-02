import { storage } from "@/appwrite"

export default function getUrl(image){
    const url = storage.getFilePreview(image.bucketId, image.fileId);
    return url;
}