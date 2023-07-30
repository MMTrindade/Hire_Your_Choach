import { createApp } from 'vue';

import router from './router.js'; // The router for Vue.js, used to build Single Page Applications (SPA)
import store from './store/index.js';
import App from './App.vue'; //Root component for the application
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from  './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';

const app = createApp(App)

app.use(router); // install the router plugin to the App component
app.use(store);

app.component('base-card', BaseCard); //global components should enter in main.js
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');//mounts this app to an HTML element with the id of app.
