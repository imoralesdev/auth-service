import "express-session";

// Declare a global module for express-session to extend its SessionData interface
declare module 'express-session' {
  interface SessionData {
      // Ensure the 'user' object is consistently declared across your project
      user?: {
          userId: string; // Assuming userId is a string, change the type if needed
          // Add other properties of user here as needed, for example:
          // username?: string;
          // email?: string;
          // etc.
      };
  }
}
