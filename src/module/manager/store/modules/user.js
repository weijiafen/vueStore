export default {
    state: {
        name: '',
        type: 1,
        shopId:''
    },
    mutations: {
        update(state, valObj) {
            for (let key in valObj) {
                state[key] = valObj[key];
            }
        }
        //在全局中更新：this.$store.commit('update', { step: 2 });
        //在全局中获取：this.$store.state.user.name
    },
    actions: {},
    getters: {}
}
