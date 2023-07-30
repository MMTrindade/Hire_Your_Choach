export default {
    request(state, _ , _2 , rootGetters) {
        const coachId = rootGetters.userId; // so the user can only see requests for him
        return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(state, getters) {
        return getters.requests && getters.requests.length > 0;
    }
};