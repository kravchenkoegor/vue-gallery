<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
    style="width: 100%;"
  >
    <h3
      class="mb-0"
      slot="activator"
    >
      {{ imageTitle }}
    </h3>

    <div class="px-3" style="background: #fff;">
      <v-text-field
        v-model="imageTitle"
        class="mt-3"
        label="Image title"
        :rules="[name => !!name || 'Image title is required']"
      />
    </div>
  </v-menu>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Action} from 'vuex-class';

  @Component
  export default class EditTitle extends Vue {
    @Prop({required: true}) imageTitle!: string;
    @Action('uploadImage') actionUploadImage: any;
  }
</script>

<style lang="scss">
  .v-menu__content {
    background: #ffffff;
  }
</style>
