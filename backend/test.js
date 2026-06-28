const dns = require("dns");

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://LinkedIn:ChatBot%402026%23Mongo@cluster0.elfehya.mongodb.net/?appName=Cluster0"
  )
  .then(() => {
    console.log("✅ MongoDB Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });