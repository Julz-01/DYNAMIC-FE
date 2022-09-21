export const state = () => ({
    info: []
});

export const getters = {
    getInf: (state) => (id) => {
        return state.info.find(inf => inf.id === id);
    }
};

export const mutations = {
    SET_INFO(state, payload) {
        state.info = payload;
    }
};

export const actions = {
    async getInfo({ commit }) {
        const res = await this.$axios.get('/user-info')
        if (res.status === 200) {
            commit('SET_INFO', res.data)
        }
        return res;
    },

    async createInfo({  }, payload) {
        console.log(payload)
        // const res = await this.$axios.post('/user-info', payload) 
        // return res;
    }
};