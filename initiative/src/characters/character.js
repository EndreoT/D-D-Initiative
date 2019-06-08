export default class Character {
    // name: str
    // initiative: int
    // isPlayer: bool
    // turnOrder: int
    constructor(id, name, initiative, isPlayer, turnOrder = 0) {
        this.id = id;
        this.name = name;
        this.initiative = initiative;
        this.isPlayer = isPlayer;
        this.turnOrder = turnOrder;
    }
}
