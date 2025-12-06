const mongoose = require('mongoose');
const express = require('express');
mongoose.connect("mongodb+srv://task:test123@tasks.yifpxn4.mongodb.net/")
    .then((result) => {
        console.log("succses");
        app.listen(5000, () => {
            console.log(`Server running on port 5000!`);
        })
    }).catch((err) => {
        console.log("failed", err);
    }
)


const app = express();
app.use(express.json());




