const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors()); // Allow frontend to access API
app.use(express.json());

const PORT = 8080; // Backend server port

// Load job data from JSON file
const jobs = JSON.parse(fs.readFileSync("job.json", "utf8"));

// Search API
app.get("/search", (req, res) => {
    const { title, location } = req.query;
    console.log("Search Query:", { title, location });

    // Filter jobs based on title & location
    const filteredJobs = jobs.filter(job =>
        (title ? job.title.toLowerCase().includes(title.toLowerCase()) : true) &&
        (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true)
    );
   res.json(filteredJobs);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
