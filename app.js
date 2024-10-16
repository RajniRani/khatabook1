const express=require("express")
const app=express();
const path=require("path")
const cookieparser=require("cookie-parser")

require("dotenv").config();
const indexRouter=require("./routes/indexRouter")
const hisaabRouter=require("./routes/hisaabRouter")
const db=require("./config/mongoose-connection")

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(cookieparser());


app.use("/",indexRouter)
app.use("/hisaab",hisaabRouter);
app.listen(3000);