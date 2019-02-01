module.exports = {
    label: 'rps',
    enabled: true,
    isSubCommand: false,
    generator: (msg, args) => {
        let text = args.join(' ');
        let getUserChoice = userInput => {
            return userInput;
        };

        let getComputerChoice = choice => {
            choice = Math.floor(Math.random() * 3);
            switch (choice) {
                case 0:
                    return 'rock';
                case 1:
                    return 'paper';
                case 2:
                    return 'scissors';
            }
        };

        let determineWinner = (userChoice, computerChoice) => {
            if (userChoice === computerChoice) {
                return 'It\'s a tie!'

            } else if (userChoice === 'rock') {
                if (computerChoice === 'paper') {
                    return 'Paper wins!';
                } else {
                    return 'Rock wins!';
                }

            } else if (userChoice === 'paper') {
                if (computerChoice === 'scissors') {
                    return 'Scissors win!';
                } else {
                    return 'Paper wins!';
                }

            } else if (userChoice === 'scissors') {
                if (computerChoice === 'rock') {
                    return 'Rock wins!';
                } else {
                    return 'Scissors win!';
                }
            } else if (userChoice === 'no u') {
                return (`Reverse, ${computerChoice} wins!`)
            } else {
                return `${computerChoice} wins!`
            }
        }
        let playGame = () => {
            userChoice = getUserChoice(text)
            computerChoice = getComputerChoice()
            msg.channel.createMessage(`You used **${userChoice}**, I used **${computerChoice}**. \n${determineWinner(userChoice, computerChoice)}`)
        }

        if (args.length === 0) {                                         // If the user just typed '..rps', it would say 'Invalid input'
            msg.channel.createMessage('uhhhh you gotta use something');
        } else {
            playGame();
        };
    },
    options: {
        description: 'Play rock paper scissors',
        fullDescription: 'Play rock paper scissors with the bot - rock, paper, or scissors.',
        usage: '..rps <rock|paper|scissors>'
    }
};