//This is the mute command. The mute command mutes members. 
//You can either specify a time or just mute untill an admin unmutes them.
// This command is admin resticted. To see how to resrict a command go to the admin.js file.
// ms is the timings module we use

const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "mutes user",
    execute({ message, args, roles }) {

        if (message.member.roles.cache.has(roles.admin)) {

            const target = message.mentions.users.first();
            if (target) {

                let mainRole = message.guild.roles.cache.get(roles.users);
                let muteRole = message.guild.roles.cache.get(roles.muted);

                let memberTarget = message.guild.members.cache.get(target.id);

                if (!args[1]) {
                    memberTarget.roles.remove(mainRole.id);
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                    return
                }
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                    memberTarget.roles.add(mainRole.id);
                }, ms(args[1]));
            } else {
                message.reply('Please specify a user to mute!');
            }

        } else {
            message.channel.send('Sorry, this command is resticted!');
        }
    }
}