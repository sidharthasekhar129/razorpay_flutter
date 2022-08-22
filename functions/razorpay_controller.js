// const admin = require("firebase-admin");
const Razorpay = require("razorpay");
const crypto = require("crypto");
class RazorPayController {
  constructor() {
    this._razorpay = new Razorpay({
      key_id: "rzp_live_QbtGKyliiet2WC",
      key_secret: "UPF2Q7mAW7ckgbmeUkNUgkrg",
    });
  }
  // to create order for the payment
  async createOrder(body) {
    const amount = body.amount; // amount in paisa
    if (!amount || isNaN(amount)) {
      throw new Error("Invalid amount");
    }
    const options = {amount, currency: "INR"};
    const order = await this._razorpay.orders.create(options);
    // await admin.firestore()
    //     .collection("transactions")
    //     .add({
    //       orderId: order.id,
    //       amount,
    //       dateTime: Date.now(),
    //       status: "PENDING",
    //     });
    return order.id;
  }
  // to verify payment signature
  async verifyPayment(body) {
    const orderId = body.orderId;
    // const razorpayOrderId = body.razorpayOrderId;
    const razorpayPaymentId = body.paymentId;
    const razorpaySignature = body.signature;
    // if (orderId == null || razorpayOrderId == null || razorpayPaymentId==null || razorpaySignature == null) {
    //   throw new Error("Invalid request");
    // }
    // const snap = await admin.firestore()
    //     .collection("transactions")
    //     .where("orderId", ""=="", orderId)
    //     .limit(1)
    //     .get();
    // if (snap.docs.length === 0) {
    //   throw new Error("Invalid order Id");
    // }
    const sign = crypto.createHmac(
        "sha256",
        "UPF2Q7mAW7ckgbmeUkNUgkrg",
    ).update(`${orderId}|${razorpayPaymentId}`).digest("hex");
    // await snap.docs[0].ref.set({
    //   orderId,
    //   razorpayOrderId,
    //   razorpayPaymentId,
    //   razorpaySignature,
    //   status: sign === razorpaySignature ? "COMPLETED" : "FAILED",
    // }, {merge: true});
    console.log("SIgnature" + sign);
    return sign === razorpaySignature;
  }
}
module.exports = new RazorPayController();
