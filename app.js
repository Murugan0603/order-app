const express = require("express");
const path = require("path");
const AWS = require("aws-sdk");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// AWS DynamoDB config
AWS.config.update({
  region: process.env.AWS_REGION || "ap-south-1"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create order
app.post("/order", async (req, res) => {
  try {
    const { user_id, order_id } = req.body;

    if (!user_id || !order_id) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await dynamodb.put({
      TableName: "Orders",
      Item: {
        user_id,
        order_id,
        timestamp: Date.now()
      }
    }).promise();

    res.json({ message: "Order created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get orders
app.get("/orders", async (req, res) => {
  try {
    const data = await dynamodb.scan({
      TableName: "Orders"
    }).promise();

    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));