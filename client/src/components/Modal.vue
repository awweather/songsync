<template>
  <div class>
    <slot name="activator"></slot>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{title}}</v-card-title>
        <slot name="content"></slot>
        <v-divider></v-divider>
        <v-card-actions>
          <slot :action="action" name="actions">
            
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop({ required: true }) dialog: boolean;
  @Prop({ required: true }) title: string;
  @Prop() valid: boolean;
  @Prop() action: object;
}
</script>
