const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;

//Initialize the environmental variable
dotenv.config();

//List all the middlewares you'll use in this project;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("dist"));

app.get("/home", (req, res) => {
    res.status(200).json("This is my homepage...")
})

//POST
app.post("/api/send-mail", async (req, res) => {
    const { email, subject, message } = req.body;

    //Create a transport;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    //Email Options
    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        message
    }

    try {
        await transporter.sendMail(emailOptions);
        res.status(200).json({ "message": 'Email sent successfully' });
    } catch (error) {
        res.status(500).send({ "message": 'Error sending email' });
    }
});

app.listen(PORT, console.log(`Our Server is life @ port ${PORT}`))