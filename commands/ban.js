const getMember = require("../utils/getMember")

module.exports = {
    name: "ban",
    execute(message, args) {
        const userId = getMember(args[0]);

        if (!userId) {
            return message.reply("укажите участника!");
        }

        const member = message.guild.members.cache.get(userId);

        if (!member) {
            return message.reply("укажите участника!");
        }

        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply("вы не можете забанить этого участника!");
        }

        else if (message.author.roles.highest.position === member.roles.highest.position) {
            return message.reply("вы не можете забанить человека который на одинаковой с вами роли!");
        }

        let reason = args.slice(1).join(" ");

        if (!reason) {
            reason = "не указано";
        }


        member.user.send(`Вы были забанены на сервере ${message.guild.name} по причине \`${reason}\``);
        message.react("✅");
        return member.ban({ reason });
    },


    category: "Модерация",
    description: "Забанить пользователя",
    usage: "ban <юзер> [причина]",
    aliases: ["бан"],
    permissions: ["BAN_MEMBERS"],
};