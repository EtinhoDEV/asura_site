const clientFunction = require("../structures/client.js")
const ChangeLog = require("../utils/changelog.json")
const firebase = require("../utils/firebase.js")
async function main(req, res) {
  const client = clientFunction();
  if (!client) return;
  const commandsValue = await  firebase.ref("/commands").once("value")
  const value = commandsValue.val();
  if (req.session.user) {
    res.render("main/dashboard.ejs", {
      id: req.session.user.id,
      username: req.session.user.username,
      servers: client.guilds.size,
      avatar: req.session.user.displayAvatarURL,
      channels: client.channels.size,
      emojis: client.emojis.size,
      users: client.users.size,
      commands: value,
      logged:true
    })
  }
  else res.render("main/dashboard.ejs", {
    logged:false,
    commands: value,
    servers: client.guilds.size,
    channels: client.channels.size,
    emojis: client.emojis.size,
    users: client.users.size
  })
}

function changelog(req, res) {
  res.render("main/changelog.ejs", {
    changelog: ChangeLog,
    logged: !!req.session.user,
    avatar: req.session.user ? (req.session.user.displayAvatarURL) : "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
  })
}

function users(req,res){
  res.render("main/users.ejs",{
    logged: !!req.session.user,
    avatar: req.session.user ? (req.session.user.displayAvatarURL) : "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
  })
}

async function user(req,res){
  const client = clientFunction();
  if (!client) return;
  const userValue = await  firebase.ref("/users/"+ req.params.id).once("value")
  const value = userValue.val();
  const user = client.users.get(req.params.id);
  if (!user) return res.redirect("/404");
  res.render("main/user.ejs",{
    logged: !!req.session.user,
    avatar:req.session.user ? (req.session.user.displayAvatarURL) : "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png" ,
    useravatar:  user.displayAvatarURL,
    id:user.id,
    tag:user.tag,
    avatars:value ? value.avatar.reverse() : [],
    usernames:value ? value.username : []
  })
}

module.exports = function (route) {
  if (route == "/") return main
  if (route == "/novidades") return changelog
  if (route == "/usuarios") return users
  if (route == "/user/id") return user
}
