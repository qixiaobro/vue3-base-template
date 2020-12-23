interface UserState {
  name: string;
  age: number;
  github: string;
}

const state: UserState = {
  name: "Vue3.0-Base-Tempalte",
  age: 18,
  github: "https://github.com/qixiaobro"
};

const mutations = {
  INCREASE_AGE: (state: UserState, payload: { age: number }) => {
    state.age = state.age + payload.age;
  }
};

const actions = {};
const getters = {
  lowCaseName: (state: UserState) => state.name.toLowerCase()
};

export default {
  state,
  mutations,
  actions,
  getters
};
