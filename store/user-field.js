export const state = () => ({
    fields: []
});

export const getters = {

};

export const mutations = {
    SET_FIELDS(state, payload) {
        state.fields = payload;
    }
};

export const actions = {
    async getFields({ commit }) {
        const res = await this.$axios.get('field')
        if (res.status === 200) {
            // console.log(res)
            commit('SET_FIELDS', res.data)
        }

        return res;
    }
};