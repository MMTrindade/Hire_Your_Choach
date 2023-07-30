import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsReceived from './pages/requests/RequestsReceived.vue'
import NotFound from './pages/NotFound.vue';

const router = createRouter ({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component:CoachesList},
        {
        path: '/coaches/:id', 
        component: CoachDetail,
        props: true, //by adding props true, the router willpass the value ID holds as a prop to coachDetail 
        children: [
            {path: 'contact', component: ContactCoach} //this is a nested route, the contact option comes after the coach ID coaches/c1/contact
        ]},
        {path: '/register', component:CoachRegistration},
        {path: '/requests', component: RequestsReceived}, //view all requests we might receive.
        {path: '/:notFound(.*)', component:NotFound} //for when the user enters something invalid as a path (.*) is a regular expression for everything
    ] ,
});

export default router;