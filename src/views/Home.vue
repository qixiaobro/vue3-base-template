<template>
  <div class="home">
    <div>{{ indexInfo }}</div>
    <div><button @click="changeIndexInfo">修改数据</button></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { CommonService } from "@/api/common";

export default defineComponent({
  setup() {
    const data = reactive({
      indexInfo: {}
    });
    onMounted(async () => {
      const result = await CommonService.getIndexInfo();
      console.log(result);
      data.indexInfo = result.data;
    });

    const changeIndexInfo = () => {
      data.indexInfo = { 1: 2 };
    };

    return {
      ...toRefs(data),
      changeIndexInfo
    };
  }
});
</script>
<style lang="less" scoped>
.home {
  color: @primary-color;
}
</style>
