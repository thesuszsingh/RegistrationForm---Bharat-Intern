const express = require("express")
const mongoose = require("mongoose")
const BodyParser = require("body-parser")
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://krishna:${password}@cluster0.j4m4w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded ({extended : true}));
app.use(bodyParser.json())

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/pages/index.html")
})

app.post("/register", async (req, res) =>{
    try {
        const {name,email,password} = req.body;
        const existingUser = await Registration.findOne({email : email})
        if(!existingUser){
            const RegistrationData = new Registration({
                name,
                email,
                password
            })
            await RegistrationData.save()
            res.redirect("success");
        }
        else{
            document.write("User Alredy Exist");
            res.redirect("/pages/error.html")
        }
  
    } catch (error) {
        console.log(error)
        res.redirect("error")
    }
})

app.get("/success", (req, res) =>{
    res.sendFile(__dirname + "/pages/success.html")
})

app.get("/error", (req, res) =>{
    res.sendFile(__dirname + "/pages/error.html")
})

app.listen(port, () =>{
    console.log(`server is started on port ${port}`);
})