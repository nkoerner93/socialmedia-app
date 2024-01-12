import { INewUser, IDbUser } from "@/types";
import { ID } from 'appwrite';
import { account, appwriteConfig, databases } from './config';



export async function createUserAccount(user: INewUser) {
    try {
        // Using the Appwrite library to create a new user account
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );
        return true; // Indicate success
    } catch (error) {
        console.log(error);
        return false; // Indicate failure
    }
}

export async function saveUserToDb(user:IDbUser) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )  
    } catch (error) {
        
    }
}

export async function signInAccount(user: { email: string; password:string;}) {
    try {
        const session = await account.createEmailSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
    }
}