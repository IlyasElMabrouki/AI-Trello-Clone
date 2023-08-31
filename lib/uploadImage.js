import { ID, storage } from '@/appwrite';

export default async function uploadImage(image) {
  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_BUCKET_ID,
    ID.unique(),
    image
  );

  return fileUploaded;
}
