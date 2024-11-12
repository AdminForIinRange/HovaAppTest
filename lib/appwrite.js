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




// Function to create a new user with name, phoneNumber, and dateOfBirth
export async function createUser(name, dateOfBirth, gender, phoneNumber) {
  try {
    // Normalize the phoneNumber number to a string and remove any leading/trailing spaces


    // Log the normalized phoneNumber number

    console.log("phoneNumber:", phoneNumber);
   

    // Check if the user with this phoneNumber number already exists
    console.log("Checking if user with this phoneNumber number already exists...");
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("phoneNumber", phoneNumber)]
    );

    // Log the existing user search result
    console.log("Existing user search result:", existingUser);

    if (existingUser.documents.length > 0) {
      console.log("User with this phoneNumber number already exists.");
      throw new Error("User with this phoneNumber number already exists.");
    }

    await deleteSession();

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
        name: name,
        gender: gender,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber, 
      }
    );
    console.log("User data stored:", newUser);

    return newUser;
  } catch (error) {
    console.error("User creation failed:", error.message);
    throw new Error("User creation failed: " + error.message);
  }
}



// Function to sign in by phoneNumber number without creating a new user
export async function signIn(phoneNumber) {
  try {
    console.log("Checking if user with phoneNumber number exists...");

    // Step 1: Check if the user with this phoneNumber number already exists
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("phoneNumber", phoneNumber)]
    );

    if (existingUser.documents.length > 0) {
      // User exists, create a new session for them
      console.log("User found, creating session...");
      await account.createAnonymousSession();
      console.log("Session created. Returning existing user data.");

      return existingUser.documents[0];
    } else {
      throw new Error("No user found with this phoneNumber number.");
    }
  } catch (error) {
    console.error("Error in sign-in:", error.message);
    throw new Error("Error in sign-in: " + error.message);
  }
}

// Function to retrieve user data for the given account ID
export async function getUserData(accountId) {
  try {
    console.log("Retrieving user data for account ID:", accountId);
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", accountId)]
    );

    if (user.documents.length > 0) {
      console.log("User data retrieved:", user.documents[0]);
      return user.documents[0];
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    console.error("Failed to retrieve user data:", error.message);
    throw new Error("Failed to retrieve user data: " + error.message);
  }
}

// Function to delete the current session
export async function deleteSession() {
  try {
    console.log("Deleting current session if available...");
    const activeSessions = await account.listSessions();
    if (activeSessions.total > 0) {
      await account.deleteSession("current");
      console.log("Current session deleted.");
    } else {
      console.log("No active session available.");
    }
  } catch (error) {
    console.error("Error while deleting session:", error.message);
  }
}

// Function to retrieve the current account
export async function getAccount() {
  try {
    console.log("Retrieving current account...");
    const currentAccount = await account.get();
    console.log("Current account retrieved:", currentAccount);

    return currentAccount;
  } catch (error) {
    console.error("Failed to retrieve account:", error.message);
    throw new Error("Failed to retrieve account: " + error.message);
  }
}

// Function to retrieve the current user
// export async function getCurrentUser() {
//   try {
//     console.log("Retrieving current user...");
//     const currentAccount = await getAccount();
//     if (!currentAccount) throw new Error("No current account found.");

//     const currentUser = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("accountId", currentAccount.$id)]
//     );

//     if (currentUser.documents.length === 0) {
//       throw new Error("User document not found.");
//     }
//     console.log("Current user document retrieved:", currentUser.documents[0]);

//     return currentUser.documents[0];
//   } catch (error) {
//     console.error("Failed to retrieve current user:", error.message);
//     return null;
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
