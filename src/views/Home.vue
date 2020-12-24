<template>
  <div class="home">
    <div>name:{{ name }}</div>
    <div>getter name:{{ lowCaseName }}</div>
    <br />
    <div>Vuex.age: {{ age }}</div>
    <div>input:<input v-model.number="ageIncreaeNum" /></div>
    <div><button @click="increase">age+input</button></div>
    <br />
    <div>接口数据：{{ indexInfo }}</div>
    <div><button @click="changeIndexInfo">修改数据</button></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  computed,
  ref
} from "vue";
import { CommonService } from "@/api/common";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const data = reactive({
      indexInfo: {}
    });
    onMounted(async () => {
      const result = await CommonService.getIndexInfo();
      data.indexInfo = result.data;
    });
    const changeIndexInfo = () => {
      data.indexInfo = { 1: 2 };
    };

    const store = useStore();
    const state = reactive({
      name: computed(() => store.state.user.name),
      age: computed(() => store.state.user.age)
    });
    const getter = reactive({
      lowCaseName: computed(() => store.getters.lowCaseName)
    });
    const ageIncreaeNum = ref(1);
    const increase = () => {
      store.commit({ type: "INCREASE_AGE", age: ageIncreaeNum.value || 0 });
    };

    return {
      ...toRefs(data),
      changeIndexInfo,
      ...toRefs(state),
      ...toRefs(getter),
      increase,
      ageIncreaeNum
    };
  }
});
</script>
<style lang="less" scoped>
.home {
  color: @primary-color;
  width: 400px;
}
</style>
