import { INewPost, INewUser } from "@/types";
import { ID, Query } from 'appwrite';
import { account, appwriteConfig, databases, avatars, storage } from './config';



// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(user.name);

      const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl,
      });
  
      return newUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
  }) {
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
      );
    console.log("Document created with User: " + user);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAccount() {
  try {
    console.log("try reached");
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER

export async function getCurrentUser() {
  try {
    // Retrieve the current account
    const currentAccount = await account.get();

    if (!currentAccount) {
      console.error("Unable to retrieve current account");
      throw new Error("Unable to retrieve current account");
    }

    // Fetch additional user data from the database
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) {
      console.warn("No user data found in the database");
      return null; // or handle the lack of user data appropriately
    }

    return currentUser.documents[0];
  } catch (error) {
    // Handle the case where there is no active session
    return null;
  }
}

// ============================== CREATE POST

export async function createPost(post: INewPost) {
  try {
    // Upload image to storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    const fileUrl = await getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      deleteFile(uploadedFile.$id)
      throw Error;
    }

    // Convert Post-Tags into an Array
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    const newPost = databases.createDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, ID.unique(), {
      creator: post.userId,
      caption: post.caption,
      location: post.location,
      imageUrl: fileUrl,
      imageId: uploadedFile.$id,
      tags: tags
    })

    if (!newPost) {
      await deleteFile(uploadedFile.$id)
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPLOAD FILE

export async function uploadFile(file: File) {
  try {
    // Await upload-file
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE PREVIEW

export async function getFilePreview(fileId: string) {
  try {
    // Await upload-file
    const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, "top", 100)

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)
    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET RECENT POSTS

export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId, 
    appwriteConfig.postCollectionId, 
    [Query.orderDesc(''), Query.limit(20)])

  if(!posts) throw Error

  return posts;
}