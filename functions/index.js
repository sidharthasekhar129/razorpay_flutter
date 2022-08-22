// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const cors = require("cors");
const express = require("express");
const controller = require("./razorpay_controller.js");
admin.initializeApp();

const app = express();
// app.use(cors({origin: true}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.post("/createOrder", async (req, res) => {
  try {
    const order = await controller.createOrder(req.body);
    res.status(200).send({order});
  } catch (e) {
    res.status(400).send({errorMessage: e.message});
  }
});
app.post("/verifyPayment", async (req, res) => {
  try {
    const verified = await controller.verfiyPayment(req.body);
    if (verified) {
      res.status(200).send({message: "Order has been verified!"});
    } else {
      res.status(400).send({message: "Order not verified"});
    }
  } catch (e) {
    res.status(400).send({errorMessage: e.message});
  }
});
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", {structuredData: true});
//     response.send("Hello from Firebase!");
//   });
exports.raz = functions.https.onRequest(app);
