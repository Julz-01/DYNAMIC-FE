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

    async createInfo({ }, payload) {
        // const mapped = [];
        // payload.forEach((value, userFieldId) => {
        //     if (value !== '') {
        //         mapped.push({ userId: 1, userFieldId, value })
        //     }
        // });

        // console.log(mapped);
        // const res = await this.$axios.post('/user-info', { userInfo: mapped })
        // return res;

        const mapped = [];
        payload.userInfo.forEach((value, userFieldId) => {
            if (value !== '') {
                mapped.push({ userId: payload.userId, userFieldId, value })
            }
        })
        console.log(mapped);
        const res = await this.$axios.post('/user-info', { userInfo: mapped })
        return res;
    },

    updateInfo({ }, payload) {
        const mapped = [];
        payload.userInfo.forEach((value, userFieldId) => {
            if (value !== '') {
                mapped.push({ userId: payload.userId, userFieldId, value })
            }
        })
        console.log(payload);

        const res = this.$axios.patch('/user-info', { userInfo: mapped })
        return res;
    }
};