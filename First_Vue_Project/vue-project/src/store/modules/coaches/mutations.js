export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    setCoaches(state, payload) { //payload is the list of coaches
        state.coaches = payload;
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }
};