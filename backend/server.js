const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const cors = require("cors");
const fs = require("fs");
const validateRow = require("./validators");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
    const accepted = [];
    const rejected = [];
    let total = 0;

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (row) => {
            total++;
            const reason = validateRow(row);

            if (reason) {
                rejected.push({
                    rowNumber: total,
                    data: row,
                    reason
                });
            } else {
                accepted.push(row);
            }
        })
        .on("end", () => {
            fs.unlinkSync(req.file.path);

            res.json({
                metrics: {
                    total,
                    accepted: accepted.length,
                    rejected: rejected.length
                },
                accepted,
                rejected
            });
        });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
