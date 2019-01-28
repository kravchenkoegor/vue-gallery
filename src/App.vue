<template>
  <v-app class="app">
    <v-toolbar
      app
      color="primary"
      class="navbar app__navbar"
    >
      <v-toolbar-title
        v-if="$vuetify.breakpoint.smAndUp"
        class="headline text-uppercase mr-4"
      >
        <span class="navbar__title">Gallery</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        class="navbar__input navbar__input_search py-2"
        label="Search"
        solo
        clearable
        hide-details
        @input="value => performSearch(value)"
      ></v-text-field>

      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        dark
        color="pink"
        class="ml-4"
        @click="addImage"
      >
        <v-icon left>cloud_upload</v-icon>
        <span>upload</span>
      </v-btn>

      <input
        id="uploadImage"
        ref="uploadImage"
        type="file"
        hidden
        @change="onFileChange"
      >
    </v-toolbar>

    <v-content>
      <gallery :images="showImages"/>

      <upload-dialog
        :isOpen="showDialog"
        :imageSrc="image"
        @closeDialog="closeDialog"
      />
    </v-content>

    <v-btn
      v-if="!$vuetify.breakpoint.mdAndUp"
      fixed
      dark
      fab
      right
      color="pink"
      style="bottom: 16px;"
      @click="addImage"
    >
      <v-icon>cloud_upload</v-icon>
    </v-btn>
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter, Action} from 'vuex-class';
  import Gallery from '@/components/Gallery.vue';
  import UploadDialog from '@/components/UploadDialog.vue';

  @Component({
    components: {
      Gallery,
      UploadDialog
    }
  })
  export default class App extends Vue {
    @Getter images!: Array<{ title: string, src: string }>;
    @Action('uploadImage') actionUploadImage: any;

    search: string = '';
    image: string = '';
    showDialog: boolean = false;
    searchResults: Array<{ title: string, src: string }> = [];

    get showImages(): Array<{ title: string, src: string }> {
      if (!this.search) {
        return this.images;
      } else {
        return this.searchResults;
      }
    }

    performSearch(value: string): void {
      if (!value) return;
      // @ts-ignore
      this.searchResults = this.images.filter((image: { title: string, src: string }) => {
        return image.title.includes(this.search);
      });
    }

    addImage(): void {
      (this.$refs.uploadImage as HTMLElement).click();
    }

    onFileChange(event: any): void {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      const targetId = event.target.attributes.id.value;
      this.createImage(files[0], targetId);
    }

    createImage(file: File, target: string): void {
      (this as any)[target] = new Image();
      const reader = new FileReader();
      reader.onload = (e: any): void => {
        const {result}: { result: HTMLImageElement } = e.target;
        (this as any)[target] = result;
        this.image = (result.toString()).split(',')[1];
      };
      reader.readAsDataURL(file);
      this.showDialog = true;
    }

    closeDialog(): void {
      this.image = '';
      this.showDialog = false;
    }
  }
</script>

<style lang="scss">
  html {
    overflow-y: auto !important;
  }

  .container {
    max-width: 1170px !important;
  }

  .navbar {
    &__title {
      color: #ffffff;
    }

    &__input {
      &_search {
        width: 100%;

        @media (min-width: 600px) {
          max-width: 300px;
        }
      }
    }
  }
</style>
