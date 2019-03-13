const clientFunction = require("./client.js")
class User {
    constructor({id,avatar,username,discriminator,email}) {
       this.avatarURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
       this.id = id;
       this.username = username;
       this.tag = `${username}#${discriminator}`;
       this.email = email;
       const client = clientFunction()
       if (client) this.displayAvatarURL = client.users.get(this.id) ? client.users.get(this.id).displayAvatarURL : this.avatarURL;
       else this.displayAvatarURL = this.avatarURL
       this.displayAvatarURL = client ? (client.users.get(this.id) ? client.users.get(this.id).displayAvatarURL : this.avatarURL) : this.avatarURL;
    }
    sizeAvatar(size){
        return `${this.avatarURL}?size=${size}`
    }
}

module.exports = User;