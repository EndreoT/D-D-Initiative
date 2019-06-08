// Vuex Initiative module

const state = {
  currentPlayerId: 0,
  players: [],
};

const getters = {
  currentPlayerId: (state) => state.currentPlayerId,
  getPlayers: (state) => state.players,
  // userAvatarImage: (state) => {
  //   return state.user.avatar_image.path;
  // },
};

const mutations = {
  incrementCurrentId(state) {
    state.currentPlayerId++;
  },
  addPlayer(state, payload) {
    state.players.push(
      {
        id: payload.id,
        name: payload.name,
        initiative: payload.initiative,
      },
    );
  },
  deleteAllPlayers(state) {
    state.players = [];
  },
  // setUser(state, payload) {
  // 	state.user = payload.user;
  // }
};

const actions = {
  incrementCurrentId({ commit }) {
    commit('incrementCurrentId');
  },
  addPlayer({ commit }, payload) {
    commit('addPlayer', payload);
  },
  deletePlayers({ commit }) {
    commit('deleteAllPlayers');
  },
  // setUser({ commit }, payload) {
  // 	commit('setUser', payload);
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
