const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash  = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions = {
    secret : "mysupersecretstring",
    resave : false ,
    saveUninitialized : true
}
app.use(session( sessionOptions ));
app.use(flash());

app.use((req,res,next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res) => {
    let { name="anonymous" } = req.query;
    req.session.name  = name;
    if(name === "anonymous"){
        req.flash("error" ,"Not registered yet.");
    }else{
        req.flash("success","user registered successfully!");
    }
    console.log(req.session);
    res.redirect("/hello");
});

app.get("/hello",(req,res) => {
    res.render("page.ejs",{ name : req.session.name });
})



// app.get("/reqcount",(req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//      res.send("You send a request x times")
// })

// app.get("/test", (req,res) => {
//     res.send("test successful");
// });

app.listen(3000, () => {
    console.log("Server is listening to 3000");
})






// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.use("/posts",posts);
// app.use("/users",users);


// // Send Signed cookie
// app.get("/getsignedcookie",(req,res) => {
//     res.cookie("color","red", {signed : true});
//     res.send("Signed cookie send");
// });

// // verify signed cookie
// app.get("/verify", (req,res) => {
//     console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// // send some cookie
// app.get("/getcookies", (req,res) => {
//     res.cookie("madein","india")
//     res.cookie("greet","hello");
//     res.send("send you some cookie");
// })

// app.get("/",(req,res) => {
//     console.dir(req.cookies);
//     res.send("Hi am root!");
// });





