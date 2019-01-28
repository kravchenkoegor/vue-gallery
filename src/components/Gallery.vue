<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <template v-if="images.length">
        <v-flex
          v-for="(image, index) in images"
          :key="index"
          xs6
          md3
        >
          <v-card>
            <v-img
              height="180"
              :src="index <= 2 ? image.src : `data:image/jpeg;base64,${image.src}`"
              :alt="image.title"
            />
            <v-card-title
              class="v-card__title"
              primary-title
              @click="editTitle = true"
            >
              <edit-title :imageTitle="image.title" />
            </v-card-title>
          </v-card>
        </v-flex>
      </template>

      <template v-else>
        <v-flex xs12 my-3 class="text-xs-center">
          <h2 class="text-xs-center mb-0">Sorry, nothing was found 🙁</h2>
        </v-flex>
      </template>

    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import EditTitle from './EditTitle.vue';

  @Component({
    components: {EditTitle}
  })
  export default class Gallery extends Vue {
    @Prop({required: true}) images!: Array<{ title: string, src: string }>;
  }
</script>

<style scoped lang="scss">
  .v-card__title {
    cursor: pointer;
  }
</style>
