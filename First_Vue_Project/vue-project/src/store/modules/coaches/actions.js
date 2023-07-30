export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        //Store inputted coaches into database
        //fetch generates a promise, use await in front of the promise
        const response = await fetch(
            `https://coach-platform-58b80-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData)//converts the object coachData into JSON
        }); 
            
            //By default, this fetch executes a GET, but we want to store the coaches info into the website, so we need to execute a POST
            //PUT guarantees that the data for a coach will be overwritten in case a regsitration to that ID already exists, instead of creating multiple registrations per ID, as POST would do.

        //const reponseData = await response.json(); 

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        }); //object that copies coachData
    },

    //Load stored coaches into the page
    async loadCoaches(context, payload) { 
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        const response = await fetch(
            `https://coach-platform-58b80-default-rtdb.firebaseio.com/coaches.json`);
        
        const responseData = await response.json();

        if (!response.ok) {
            // error ...
        }

        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }

        context.commit ('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }
};