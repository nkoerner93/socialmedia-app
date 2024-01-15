import { INewUser, IDbUser } from "@/types";
import { ID, Query } from 'appwrite';
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
        return; // Indicate success
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

export async function getUserFromDbByEmail(email: string) {
    try {
        const query = [
            // Query to find a document with the specified email
            Query.equal('email', email),
        ];

        const result = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            query
        );

        // If documents are returned, return the first one
        console.log(result.documents);
        console.log(result.documents.length);
        if (result.documents.length > 0) return true;
    } catch (error) {
        console.error(error);
        return false; // Indicate failure
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

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)],
        )

        if(!currentAccount) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}