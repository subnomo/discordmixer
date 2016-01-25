var Command;
(function (Command) {
    Command[Command["add"] = 0] = "add";
    Command[Command["pause"] = 1] = "pause";
    Command[Command["resume"] = 2] = "resume";
    Command[Command["skip"] = 3] = "skip";
    Command[Command["shuffle"] = 4] = "shuffle";
    Command[Command["volume"] = 5] = "volume";
    Command[Command["help"] = 6] = "help";
})(Command || (Command = {}));
module.exports = Command;
