import {
  Account,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.hova.hovaAppTest",
  projectId: "6730085a0027bdd2842b",
  databaseId: "6730089e002bc1792668",
  userCollectionId: "673008b30001032bff83",
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);

export async function validatePhoneNumber(phone) {
  try {
   


    // Log the normalized phone number for debugging
    console.log("Normalized phone number:", phone);

    // Check if the user with this phone number already exists in the database
    console.log("Checking if user with phone number exists...");
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("phone", phone)]
    );

    // Log the result of the query
    console.log("Existing user search result:", existingUser);

    return existingUser.documents.length > 0 ? existingUser.documents[0] : null;
  } catch (error) {
    console.error("Error in phone number validation:", error.message);
    throw new Error("Error in phone number validation: " + error.message);
  }
}


// Function to create a new user with username, phone, and dateOfBirth
export async function createUser(username, dateOfBirth, gender, phone) {
  try {
    // Normalize the phone number to a string and remove any leading/trailing spaces


    // Log the normalized phone number

    await validatePhoneNumber(phone);
   

    // Check if the user with this phone number already exists
    console.log("Checking if user with this phone number already exists...");
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("phone", phone)]
    );

    // Log the existing user search result
    console.log("Existing user search result:", existingUser);

    if (existingUser.documents.length > 0) {
      console.log("User with this phone number already exists.");
      throw new Error("User with this phone number already exists.");
    }
    try {
      const activeSessions = await account.listSessions();
      if (activeSessions.total > 0) {
        await account.deleteSession("current")    
        console.log("All active sessions deleted.");
      }
    } catch (error) {
      console.log("No session available.");
    }

    console.log("Creating anonymous session...");
    const session = await account.createAnonymousSession().catch((error) => {
      console.error("Error creating anonymous session:", error);
      throw new Error("Session creation failed: " + error.message);
    });

    console.log("Session object:", session);

    if (!session || !session.userId) {
      console.error("Session or userId is undefined:", session);
      throw new Error("Session creation failed or no user found in session.");
    }

    console.log("Anonymous session created, userId:", session.userId);
    const accountId = session.userId;

    console.log("Generated account ID:", accountId);

    console.log("Storing user data in the database...");
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: accountId,
        username: username,
        dateOfBirth: dateOfBirth,
        gender: gender,
        phone: phone, 
      }
    );
    console.log("User data stored:", newUser);

    return newUser;
  } catch (error) {
    console.error("User creation failed:", error.message);
    throw new Error("User creation failed: " + error.message);
  }
}



// Function to sign in by phone number without creating a new user
export async function signIn(phone) {
  try {
    // Delete any active sessions to avoid conflicts
    try {
      const activeSessions = await account.listSessions();
      if (activeSessions.total > 0) {
        await account.deleteSession("current")    
        console.log("All active sessions deleted.");
      }
    } catch (error) {
      console.log("No session available.");
    }

    // Validate the phone number and check if user exists
    await validatePhoneNumber(phone);
    console.log("Checking if user with phone number exists...");

    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("phone", phone)]
    );

    if (existingUser.documents.length > 0) {
      console.log("User found, creating a new anonymous session...");
      
      // Create a new anonymous session for the existing user
      const session = await account.createAnonymousSession();
      console.log("Session created:", session);

      return existingUser.documents[0];
    } else {
      console.log("No user found with this phone number.");
    }
  } catch (error) {
    console.log("Error in sign-in:", error.message); 
   
  }
}

// export async function deleteSession() {
//   try {
//     console.log("Deleting all sessions if available...");
//     const activeSessions = await account.listSessions();
//     for (const session of activeSessions.sessions) {
//       await account.deleteSession(session.$id);
//     }
//     console.log("All active sessions deleted.");
//   } catch (error) {
//     console.error("Error while deleting session:", error.message);
//   }
// }



// Function to sign out and delete current session
export async function signOut() {
  try {
    console.log("Signing out...");
    const session = await account.deleteSession("current");
    console.log("User signed out.");
    return session;
  } catch (error) {
    console.error("Failed to sign out:", error.message);
    throw new Error("Failed to sign out: " + error.message);
  }
}
