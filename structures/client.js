const {Client} = require("discord.js")
const client = new Client()

client.fetchName = function(name){
    return this.users.filter(a => a.username.toLowerCase().includes(name.toLowerCase())).first(100).map(a => ({
        id:a.id,
        avatar:a.displayAvatarURL,
        username:a.username,
        tag: a.tag
    }))
}
client.login("token")
module.exports =  () => client.users ? client : null