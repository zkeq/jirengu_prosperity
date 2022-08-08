<template>
  <div>
    <Layout> 
        {{recordList}}
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Statistics",
  data(){
    return {
      recordList: window.recordList,
    }
  }
});
</script>