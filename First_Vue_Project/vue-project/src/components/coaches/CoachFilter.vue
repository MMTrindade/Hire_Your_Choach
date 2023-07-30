<template>
    <base-card>
        <h2>Find Your Coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked @change="setFilter"/>
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backend" checked @change="setFilter"/>
            <label for="backend">Backend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" checked @change="setFilter"/>
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                frontend:true, 
                backend: true,
                career: true
            }
        };
    },
    methods: {
        setFilter(event) {
            const inputId = event.target.id;
            const isActive = event.target.checked;
            const updateFilters = {
                ...this.filters,
                [inputId]: isActive
            };
            this.filters = updateFilters;
            this.$emit('change-filter', updateFilters);
        }
    }
}
/*
Methods - setFilter(): Whenever a checkbox is changed (either checked or unchecked), the setFilter function is triggered because of the @change directive. This function does a few things:

const inputId = event.target.id; - It captures the id of the checkbox that triggered the event.

const isActive = event.target.checked; - It captures whether the checkbox is now checked or unchecked. If it is checked, isActive will be true, otherwise it will be false.

const updateFilters = {...this.filters, [inputId]: isActive }; - This line creates a new object (updateFilters) that is a copy of the current filters object, but with the property corresponding to the checkbox's id updated to the checkbox's new state (isActive).

this.filters = updateFilters; - This line updates the component's filters data property with the newly created updateFilters object.

this.$emit('change-filter', updateFilters); - Finally, it emits a custom event called 'change-filter', passing the updated filters object as the payload. This allows a parent component to listen for this event and react accordingly.

*/
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>