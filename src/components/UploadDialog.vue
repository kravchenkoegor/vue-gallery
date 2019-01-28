<template>
  <v-dialog
    class="dialog"
    v-model="showDialog"
    width="600"
    persistent
  >
    <v-card class="dialog-card">
      <a @click="closeDialog" class="dialog__close"></a>

      <v-card-title class="pa-0">
        <v-toolbar color="primary" dark>
          <p class="headline mb-0">Upload image</p>
        </v-toolbar>
      </v-card-title>

      <v-card-text v-if="imageSrc">
        <v-img :src="`data:image/jpeg;base64,${imageSrc}`" alt=""/>

        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="imageTitle"
            class="mt-3"
            label="Image title"
            :rules="[name => !!name || 'Image title is required']"
          />
        </v-form>

      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          flat
          @click="closeDialog"
        >
          Cancel
        </v-btn>

        <v-btn
          color="success"
          raised
          @click="onSubmit"
        >
          Upload
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Action} from 'vuex-class';

  @Component
  export default class UploadDialog extends Vue {
    @Prop({required: true}) isOpen: boolean = false;
    @Prop({required: true}) imageSrc!: string;
    @Action('uploadImage') actionUploadImage: any;

    isDialogOpen: boolean = false;
    imageTitle: string = '';

    get showDialog(): boolean {
      this.isDialogOpen = this.isOpen;
      return this.isDialogOpen;
    }

    closeDialog(): void {
      this.isDialogOpen = false;
      this.imageTitle = '';
      this.$emit('closeDialog');
    }

    onSubmit() {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.actionUploadImage({
          src: this.imageSrc,
          title: this.imageTitle
        });

        this.closeDialog();
      }
    }
  }
</script>
