//This is the wipe command. The wipe command clears up to 100 messages at a time in the channel including the one you just sent.
//There is a less powerfull version of this for clearing up to 10 commands. (See clear.js)
// This command is admin resticted. To see how to resrict a command go to the admin.js file.

module.exports = {
    name: 'wipe',
    description: "clear with bigger options",
    async execute({ message, args, roles }) {
        if (message.member.roles.cache.has(roles.admin)) {
            if (!args[0]) return message.reply("Please specify a number of messages to clear.")
            if (isNaN(args[0])) return message.reply("Please enter a number instead of text.")

            if (args[0] > 100) return message.reply("Slow down! This command resticts to 100 messages per command for safety.")
            if (args[0] < 11) return message.reply("You must delete at least 11 messages. Please use clear for smaller jobs.")

            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);
            });

        } else {
            message.channel.send('Sorry, this command is resticted!');
        }
    }
}