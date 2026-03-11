const express = require("express");
const path = require("path");

const app = express();
const port = 3003;

// Serve static files from the "public" folder

app.use(express.static(path.join(__dirname, "public")));

// GET endpoint to calculate the sum of a numbers
// Example: http://http://localhost:3003/sum?num1=3&num2=4

app.get("/sum", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.send("Error: Please provide valid numbers for num1 and num2.");
    }

    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

console.log("Loaded server file from:", __filename);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});