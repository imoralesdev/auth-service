import "express-session";

declare module "express-session" {
  interface SessionData {
    user: {
      userId: string; // Adjust the type based on your user data structure
      // Add any additional properties you might need
    };
  }
}