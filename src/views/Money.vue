<template>
  <div>
    <Layout class-prefix="layout">

      <NumberPad :value.sync="record.amount"/>

      <Types :value.sync="record.type"/>

      <Notes @update:value="onUpdateNotes"/>

      <Tags :data-source.sync="tags" @update:value="onupdateTags"/>

      {{record}}

    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Component from "vue-class-component";

type Record = {
  amount: number;
  type: string;
  notes: string;
  tags: string[];
}

@Component({
  components: {
    NumberPad,
    Types,
    Notes,
    Tags,
  },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
    amount: 0,
    type: "-",
    notes: "",
    tags: [],
  };

  onupdateTags(value :string[]){
    this.record.tags = value;
  }
  onUpdateNotes(value :string){
    this.record.notes = value;
  }
  onUpdateAmount(value :string){
    this.record.amount = parseFloat(value);
  }
}
</script>

<style lang="scss">
.layout-content {
  // border: 3px solid red;
  display: flex;
  flex-direction: column-reverse;
}
</style>
