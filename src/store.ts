import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [
      {
        title: 'Alex',
        src: 'images/pexels-photo.jpg'
      },
      {
        title: 'Betsy',
        src: 'images/pexels-photo-126407.jpeg'
      },
      {
        title: 'Elizabeth',
        src: 'images/pexels-photo-399647.jpeg'
      }
    ],
    searchResults: []
  },
  mutations: {
    uploadImage(state, image) {
      // @ts-ignore
      state.images.push(image);
    },
    find(state, results) {
      state.searchResults = results;
    }
  },
  actions: {
    uploadImage({commit}, image) {
      commit('uploadImage', image);
    },
    find({commit}, results) {
      commit('find', results);
    }
  },
  getters: {
    images: (state) => state.images,
    searchResults: (state) => state.searchResults
  }
});
