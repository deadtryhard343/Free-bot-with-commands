const ms = require('ms');

module.exports = {
  name: 'timeout',
  description: 'Temporarily restrict a user for a specified duration to prevent them from talking.',
  async execute(message, args) {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      return message.reply("You don't have permission to use this command.");
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a user to put in timeout.');
    }

    if (!member.kickable) {
      return message.reply('I cannot put this user in timeout.');
    }

    const duration = args[1];
    if (!duration) {
      return message.reply('Please provide a duration for the timeout.');
    }

    const reason = args.slice(2).join(' ') || 'No reason provided.';

    // Get the duration in milliseconds using the 'ms' library
    const durationMs = ms(duration);
    if (isNaN(durationMs)) {
      return message.reply('Invalid duration format. Please use a valid format (e.g., 1d, 2h, 30m).');
    }

    // Add your code here to handle the timeout, e.g., restrict permissions, add role, etc.

    setTimeout(async () => {
      // Remove the timeout, e.g., restore permissions or remove role after the duration

      message.reply(`${member.user.tag} has been released from timeout.`);
    }, durationMs);

    message.reply(`${member.user.tag} has been put in timeout for ${duration}.`);

    // Optionally, you can log the timeout information to a separate channel or a log file.
  },
};
