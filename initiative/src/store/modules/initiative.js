// Vuex Initiative module

const state = {
	currentCharacterGeneratorId: 0,
	characters: [],
};

const getters = {
	currentCharacterId: (state) => state.currentCharacterGeneratorId,
	getCharacters: (state) => state.characters,
	// userAvatarImage: (state) => {
	//   return state.user.avatar_image.path;
	// },
};

const mutations = {
	incrementCurrentId(state) {
		state.currentCharacterGeneratorId++;
	},
	addCharacter(state, payload) {
		state.characters.push(
			{
				id: payload.id,
				name: payload.name,
				initiative: payload.initiative,
				isPlayer: payload.isPlayer,
			},
		);
	},
	deleteAllCharacters(state) {
		state.characters = [];
	},
	deleteCharacter(state, payload) {
		for (let i = 0; i < state.characters.length; i++) {
			if (state.characters[i].id === payload.id) {
				state.characters.splice(i, 1);
			}
		}
	},
};

const actions = {
	incrementCurrentId({ commit }) {
		commit('incrementCurrentId');
	},
	addCharacter({ commit }, payload) {
		commit('addCharacter', payload);
	},
	deleteCharacters({ commit }) {
		commit('deleteAllCharacters');
	},
	deleteCharacter({ commit }, payload) {
		commit('deleteCharacter', payload);
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
