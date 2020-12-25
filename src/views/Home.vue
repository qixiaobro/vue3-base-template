<template>
  <div class="home">
    <div>name:{{ name }}</div>
    <div>getter name:{{ lowCaseName }}</div>
    <div>Vuex.age: {{ age }}</div>
    <div>input:<input v-model.number="ageIncreaeNum" /></div>
    <div><button @click="increase">age+input</button></div>
    <div>接口数据：{{ indexInfo }}</div>
    <div><button @click="changeIndexInfo">修改数据</button></div>
    <div><input v-model="copyValue" /></div>
    <div><button @click="copyToClipboard(copyValue)">一键复制</button></div>
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

    const copyValue = ref("");
    const copyToClipboard = (str: string) => {
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const getSelection = window?.getSelection();
      const selected =
        getSelection && getSelection.rangeCount > 0
          ? window.getSelection()?.getRangeAt(0)
          : false;
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(selected);
      }
    };

    return {
      ...toRefs(data),
      changeIndexInfo,
      ...toRefs(state),
      ...toRefs(getter),
      increase,
      ageIncreaeNum,
      copyValue,
      copyToClipboard
    };
  }
});
</script>
<style lang="less" scoped>
.home {
  div {
    width: 100%;
    margin-top: 10px;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: @primary-color;
  width: 750px;
  height: 100%;
  font-size: 36px;
  line-height: 50px;
}
</style>
