<template>
    <div>
        <base-dialog :show="!!error" title="An error ocurred" @close="handleError"> <!-- "!!" Converts a truth string into a true boolean -->
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button v-if="!isCoach && !isLoading" link to="/register">Register a coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <coach-item 
                        v-for="coach in filteredCoaches" 
                        :key="coach.id" 
                        :id="coach.id" 
                        :first-name="coach.firstName"
                        :last-name="coach.lastName"
                        :rate="coach.hourlyRate"
                        :areas="coach.areas"
                    ></coach-item>
                </ul> 
                <h3 v-else>No coaches found.</h3> 
            </base-card>  
        </section>
    </div>
    
</template>

<script> //bind the key to coach id, cause every coach has an ID / v-for is used to render a list of items based on an array.
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';


export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        };
    },
    computed: {
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches']; //second coach after the slash is the getter name
            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) { 
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) { 
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
        return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
    },
    created() {
        this.loadCoaches();
    },
    methods: {
        setFilters(updatedFilters) { //Where we listen to the event
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false) { //use async because it returns a promise -> loadCoaches, ait for the promise to complete
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh});
            }       catch (error) {
                this.error = error.message || 'Something went wrong';
            }
            this.isLoading = false; //set to false once the request is done
        },
        handleError() {
            this.error = null;
        }
    },
};

/*filteredCoaches: This computed property returns a new array of coaches that pass the filtering criteria based on activeFilters. Here's how it works:

It first retrieves a list of all coaches from Vuex state using the getter 'coaches/coaches'.

Then, it applies a filter function on this coaches array. For each coach, the function checks if the coach's areas include any of the active filters. If a coach's areas match with an active filter (e.g., frontend, backend, or career), that coach is included in the filtered list.

In other words, if 'frontend' is an active filter and a coach's areas include 'frontend', this coach passes the filter. The same logic applies to 'backend' and 'career'. If a coach does not match any of the active filters, it will not be included in the filtered list.

hasCoaches: This computed property returns a boolean indicating if there are any coaches. It uses the getter 'coaches/hasCoaches' from Vuex.

In the methods section, there's a setFilters method that updates the activeFilters data property based on the updatedFilters object received as an argument. This function is used to update the active filters based on user interaction in the filter component.

So, when the filters are changed in the filter component (which we saw in the previous question), this component listens to that change and updates its activeFilters. As a result, the filteredCoaches computed property is re-calculated, and the list of displayed coaches is updated according to the new filters.
*/
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

