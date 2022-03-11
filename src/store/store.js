import Vue from 'vue';
import Vuex from 'vuex';

import Start from './modules/Start';
import News from './modules/News';
//import Lessons from './modules/Lessons';
import Library from './modules/Library';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        Start,
        News,
        Library
    }
})