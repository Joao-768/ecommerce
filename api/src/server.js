import app from "./app.js";

// Start the server
app.listen(3001, '0.0.0.0', () => {
    console.log("API running on http://localhost:3001");
});
