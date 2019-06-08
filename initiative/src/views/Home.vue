<template>
  <div class="container">
    <h1>Fight!</h1>

    <form @submit.prevent="addcharacter">
      <input v-model="form.name" placeholder="character name" required>
      <p>name</p>
      <input v-model.number="form.initiative" type="number" required>
      <p>Initiative value</p>
      <input type="checkbox" id="checkbox" v-model="form.isPlayer">
      <label for="checkbox">Is player</label>

      <div class="row justify-content-center">
        <button type="submit" class="btn btn-primary btn-override">Add Character</button>
      </div>
    </form>

    <button class="btn btn-danger btn-override" v-on:click="deleteCharacters">Delete all characters</button>
    <button
      class="btn btn-danger btn-override"
      v-on:click="deleteAllNonPlayers"
    >Delete all non player characters</button>
    <button class="btn btn-info btn-override" v-on:click="rollForInitiative">Roll For Initiative</button>
    <ol>
      <li class="character" v-for="character in characters" :key="character.id">
        {{ character }}
        <button
          class="btn btn-danger btn-override"
          v-on:click="deleteCharacter"
          :data-id="character.id"
        >Delete</button>
        <input type="checkbox" id="checkbox">
        <label for="checkbox">Has advantage</label>
      </li>
    </ol>
  </div>
</template>


<script>
import Character from "../characters/character";

export default {
  name: "initiative",
  components: {},
  data: () => ({
    characters: [], // Use LL instead
    form: {
      name: "",
      initiative: 0,
      isPlayer: false
    }
  }),
  // computed: {
  //   totalCategories() {}
  // },
  created() {
    const characters = this.$store.getters["initiative/getCharacters"];
    characters.forEach(character => {
      this.characters.push(
        new Character(character.id, character.name, character.initiative)
      );
    });
  },
  methods: {
    addcharacter() {
      const characterData = {
        id: this.$store.getters["initiative/currentCharacterId"],
        name: this.form.name,
        initiative: this.form.initiative,
        isPlayer: this.form.isPlayer
      };

      const newcharacter = new Character(
        characterData.id,
        characterData.name,
        characterData.initiative,
        characterData.isPlayer
      );

      console.log(newcharacter);
      this.$store.dispatch("initiative/addCharacter", characterData);
      this.form.name = "";
      this.form.initiative = 0;
      this.form.isPlayer = false;
      this.$store.dispatch("initiative/incrementCurrentId");
      this.characters.push(newcharacter);
    },
    deleteCharacters() {
      this.$store.dispatch("initiative/deleteCharacters");
      this.characters = [];
    },
    deleteCharacter() {
      const characterId = parseInt(
        event.currentTarget.attributes["data-id"].value
      );
      this.$store.dispatch("initiative/deleteCharacter", { id: characterId });
      for (let i = 0; i < this.characters.length; i++) {
        if (this.characters[i].id === characterId) {
          this.characters.splice(i, 1);
        }
      }
    },
    deleteAllNonPlayers() {
      for (let i = 0; i < this.characters.length; i++) {
        if (!this.characters[i].isPlayer) {
          this.$store.dispatch("initiative/deleteCharacter", {
            id: this.characters[i].id
          });
          this.characters.splice(i, 1);
        }
      }
    },
    rollForInitiative() {
      for (let i = 0; i < this.characters.length; i++) {
        const character = this.characters[i]
        const rollValue = this.rollD20();
        character.turnOrder = character.initiative + rollValue
      }
      this.characters.sort((playerA, playerB) => {
        return playerA.turnOrder > playerB.turnOrder
      })
    },
    rollD20() {
      return this.rollDie(1, 20);
    },
    rollDie(min, max) {
      return Math.floor(Math.random() * max) + min;
    }
  }
};
</script>
