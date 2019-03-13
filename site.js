const express = require("express")
const app = express();
const session = require("express-session");
const routers =  require("./routers.js");
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit");

app.enable("trust proxy"); 
 
const limiter = rateLimit({
  windowMs: 25 * 60 * 1000, 
  max: 300,
  message: require("./utils/message.json").message
});
 
app.use(limiter)
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use('/assets', express.static('assets'));
const sess = {
    secret: 'keyboard cat',
    cookie: {}
}

app.use(session(sess))


routers.forEach(router => app.use(router.rote,router))


app.get("*",function(_,res){
    res.render("error.ejs")
})

app.listen(process.env.PORT || 4000)
