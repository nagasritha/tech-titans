class CLI {
    constructor() {
        this.commands = new Map();
        this.aliases = new Map();
    }

    registerCommand(name, handler, description = '', aliases = []) {
        if (this.commands.has(name)) {
            throw new Error(`Command "${name}" is already registered.`);
        }
        this.commands.set(name, {handler, description} );
        aliases.forEach(alias => {
            this.aliases.set(alias, name);
        });
    }

    showHelp() {
        console.log("Available commands:");
        this.commands.forEach((value, key) => {
            console.log(`  ${key}: ${value.description}`);
        });
    }

    runCommand(commandName, args) {
        if (commandName === 'help') {
            this.showHelp();
        } else if (commandName === 'exit') {
            console.log("Exiting CLI...");
            process.exit(0);
        } else if (this.commands.has(commandName)) {
            const { handler } = this.commands.get(commandName);
            handler(args);
        } else {
            console.log(`Unknown command: ${commandName}`);
            this.showHelp();
        }
    }

    run(args) {
        if (args.length === 0) {
            this.startPrompt();
            return;
        }

        const commandName = this.aliases.get(args[0]) || args[0];
        this.runCommand(commandName, args.slice(1));
    }

    startPrompt() {

        process.stdout.write(">");

        process.stdin.on('data',(data)=>{
            let args = data.toString().trim().split(/\s+/);
            let command = this.aliases.get(args[0]) || args[0];
            this.runCommand(command,args.slice[1]);
            process.stdout.write('>');
            
        })
    }
}

module.exports = CLI;
