const initDb = async () => {
  try {
    // Handle init DB
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export default initDb;
