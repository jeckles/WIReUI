// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "hello from server!"});
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
});