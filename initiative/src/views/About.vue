<template>
  <div class="container">
    <h1>This is an about page</h1>

    <form @submit.prevent="addPlayer">
      <input v-model="form.name" placeholder="edit me">
      <p>name</p>
      <input v-model.number="form.initiative" type="number">
      <p>Initiative value</p>

      <div class="row justify-content-center">
        <button type="submit" class="btn btn-primary btn-override">Add Player</button>
      </div>
    </form>

    <button v-on:click="deletePlayers">Delete all players</button>
    <ol>
      <li v-for="player in players" :key="player.id">{{ player }}</li>
    </ol>
  </div>
</template>


<script>
import Player from "../players/player";

export default {
  name: "initiative",
  components: {},
  data: () => ({
    players: [],
    form: {
      name: "",
      initiative: 0
    }
  }),
  // computed: {
  //   totalCategories() {}
  // },
  created() {
    const players = this.$store.getters["initiative/getPlayers"];
    players.forEach(player => {
      this.players.push(new Player(player.id, player.name, player.initiative));
    });
  },
  methods: {
    addPlayer() {
      const playerData = {
        id: this.$store.getters["initiative/currentPlayerId"],
        name: this.form.name,
        initiative: this.form.initiative
      };

      const newPlayer = new Player(
        playerData.id,
        playerData.name,
        playerData.initiative,
      );
      this.$store.dispatch("initiative/addPlayer", playerData);
      this.form.name = "";
      this.form.initiative = 0;
      this.$store.dispatch("initiative/incrementCurrentId");
      this.players.push(newPlayer);
    },
    deletePlayers() {
      this.$store.dispatch("initiative/deletePlayers");
      this.players = 0;
    }
  }
};
</script>
