"use strict";


class Player {
    // name: str
    // initiative: int
    constructor(name, initiative) {
        this.name = name;
        this.initiative = initiative;
    }
}

class Fight {
    // players: Array<Player>
    constructor(players) {
        this.players = players;
    }

    // player: Player
    addPlayer(player) {
        this.players.push(player);
    }
}


$(document).ready(function () {
    const playersElem = $('#players')

    const players = [
        {
            name: "dave",
            initiative: 3
        },
        {
            name: "karen",
            initiative: 1
        },
        {
            name: "broski",
            initiative: 6
        }
    ]

    const fight = new Fight([]);

    players.forEach(player => {
        fight.addPlayer(new Player(player.name, player.initiative))
    });

    fight.players.forEach(player => {
        const playerElem = $('<div>')
            .addClass('list-group-item')
        const nameElem = $('<p>').text(player.name)
        const initiativeElem = $('<p>').text(player.initiative);
        const deleteButton = $('<button>').addClass('btn btn-danger active delete-character');
        const advantageCheckBox = $('<input>').addClass('form-check-input').attr('type', 'checkbox')
        const checkBoxLabel = $('<label>').addClass('form-check-label').text('Advantage')




        playerElem.append(nameElem, initiativeElem, deleteButton, advantageCheckBox, checkBoxLabel)
        playersElem.append(playerElem)


    })
});