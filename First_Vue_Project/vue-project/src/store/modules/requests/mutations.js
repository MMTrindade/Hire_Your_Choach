export default {
    addRequest(state, payload) { //The payload in the end will hold the request data.
        state.requests.push(payload);
    },
    setRequests(state,payload) {
        state.requests = payload;
    }
};