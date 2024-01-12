import { INewUser, IDbUser } from "@/types";
import { ID } from 'appwrite';
import { account, appwriteConfig, databases } from './config';



export async function createUserAccount(user:INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
    } catch (error) {
        console.log(error);
        return error;
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