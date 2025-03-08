const express = require("express");
const userRouter = require("./routers/userRouter");
const { DB_connect } = require("./db");
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const adminRouter = require("./routers/adminRouter");
const serviceRouter = require("./routers/serviceRouter");
const reviewRouter = require("./routers/reviewRouter");
const galleryRouter = require("./routers/galleryRouter")
const bookingRouter = require("./routers/bookingRouter");
const packageroutes =require("./routers/packageRoutes.js");
const paymentRouter = require("./routers/paymentRouter.js");
const invoiceRouter = require("./routers/invoiceRouter.js");
const searchRouter = require("./routers/searchRouter.js");

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get("/", (req, res) => {
    res.json({ msg: "Hello" });
})

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin",adminRouter)
app.use("/api/gallery",galleryRouter);

app.use("/api/v1/service",serviceRouter);
app.use("/api/v1/review",reviewRouter);
app.use("/api/v1/booking",bookingRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/packages",packageroutes);
app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/invoice",invoiceRouter)
app.use("/api/v1/search",searchRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    DB_connect();
});