const request = require("request")
const User = require("../structures/user.js")
const bt = require('btoa')
const firebase = require("../utils/firebase.js")
const clientFunction = require("../structures/client.js")
const secret = "secret";
const id = "id"
const redirect_uri = "redirect_uri"
function login(req, res) {
    if (!req.query.code) return res.redirect("/");
    request({
        method: 'POST', url: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirect_uri}`, headers: {
            Authorization: `Basic ${bt(id+":"+secret)}`
        }
    }, function (_, _, body) {
        const json = JSON.parse(body);
        request({
            method: 'GET',
            url: 'https://discordapp.com/api/users/@me',
            headers: {
                Authorization: 'Bearer ' + json['access_token']
            }
        },  async function (_,_,userBody) {
            userBody = JSON.parse(userBody)
           if (!userBody.id || !userBody.email) return res.redirect("/");
           req.session.user = new User(userBody)
           res.redirect("/");
        })
    })
}

function users(req,res){
    if (!req.session.user) return res.end("Invalid")
    const client = clientFunction()
    if (!client) return;
    const {name} = req.body;
    res.json(client.fetchName(name).slice(0,50))
}

function user(req,res){
    
}

function logout(req,res){
 if (req.session.user) req.session.user = null
 return res.redirect("/")
}

module.exports = function (route) {
    if (route == "/login") return login
    if (route == "/logout") return logout
    if (route == "/users") return users
    if (route == "/user/id") return user
    
}