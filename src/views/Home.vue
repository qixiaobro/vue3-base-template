<template>
  <div class="home">
    <!-- <div>{{ result }}</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { CommonService } from "@/api/common";

export default defineComponent({
  setup() {
    onMounted(async () => {
      const result = await CommonService.getIndexInfo();
      console.log(result);
    });
  }
});
</script>
