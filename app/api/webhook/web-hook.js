import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "http://localhost:8080", // Địa chỉ của backend
});

export default async function handler(req, res) {
  await new Promise((resolve) => cors(req, res, resolve));

  if (req.method === "POST") {
    const { body } = req;
    console.log("Received webhook payload:", body);
    res.status(200).json({ message: "Webhook received successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
