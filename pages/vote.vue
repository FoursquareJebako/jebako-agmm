<template>
  <div id="header-wrap">
    <div id="header">
      <nuxtLink id="profile-btn" to="/profile">
        <Icon name="solar:user-bold-duotone" size="3rem" />
      </nuxtLink>
    </div>

    <div id="welcome-banner">
      <p class="text">
        Welcome,<br /><span id="name">{{ user.name }}</span>
      </p>
      <p class="status">Yet to vote</p>
    </div>
  </div>

  <div id="container">
    <div id="instruction">
      <div>
        <h4>You can only vote three cadidates</h4>
        <p>Click submit vote to confirm your vote</p>
      </div>
    </div>

    <div id="vote-container">
      <div class="card" v-for="contestant in contestants">
        <div class="profile">
          <img :src="contestant.image" />
        </div>
        <div class="content">
          <h3>{{ contestant.name }}</h3>
          <button ref="selectBtn" :class="{ active: contestant.selected }" @click="chooseFn(contestant)">
            {{ contestant.selected ? 'Selected' : 'Select' }}
          </button>
        </div>
      </div>
    </div>

    <button ref="submitBtn" id="submit-btn" @click="submitVote">
      {{ getSubmitState }}
      <span id="spinner" v-show="submitState.loading">
        <Icon name="mingcute:loading-fill" color="white" size="3rem" />
      </span>
    </button>

    <button v-show="submitState.confirm" id="cancel-btn" @click="cancelVote">Cancel Selection</button>
  </div>
</template>

<script setup lang="js">
import { ref, useState, definePageMeta } from '#imports';
const user = useState('user');
const submitBtn = ref(null);
const selectBtn = ref(null);
const submitState = reactive({
  loading: false,
  confirm: false
})

console.log(user.value)

onMounted(() => {
  isDisabled()
})

/* interface C {
  image: string;
  name: string;
  selected: boolean
} */

const contestants = ref([
  {
    image: '../img/user1.jpg',
    name: 'Mary Joe',
    selected: false,
  },
  {
    image: '../img/user2.jpg',
    name: 'Akindele Ayomide Jesutofunmi Joshua',
    selected: false,
  },
  {
    image: '../img/user1.jpg',
    name: 'Taiwo Emmanuel',
    selected: false,
  },
  {
    image: '../img/user2.jpg',
    name: 'Abimbola Joseph',
    selected: false,
  },
]);

/* interface User {
  name: string;
  sex: string;
  address: string;
  phone: string;
  email: string;
} */

definePageMeta({
  middleware: 'auth',
});

const selected = computed(() => {
  const all = []
  for (const x of contestants.value) {
    if (x.selected) {
      all.push(x)
    }
  }
  return all
})

const getSubmitState = computed(() => {
  if (submitState.confirm) {
    return 'Click again to confirm'
  } else if (submitState.loading) {
    return ''
  } else {
    return 'Submit Vote'
  }
})

const isDisabled = () => {
  const selectedLen = selected.value.length
  if (selectedLen === 3) {
    submitBtn.value.disabled = false
  } else {
    submitBtn.value.disabled = true
  }
}

const chooseFn = (contestant) => {
  if (selectBtn.value.disabled) {
    return;
  }
  if (contestant.selected) {
    contestant.selected = false
    submitState.confirm = false
  } else if (selected.value.length < 3) {
    contestant.selected = !contestant.selected
  }
  isDisabled()
  //console.log(selected.value)
};

const submitVote = () => {
  if (submitState.confirm) {
    //final submit
    submitState.confirm = false
    submitState.loading = true
    submitBtn.value.disabled = true
    selectBtn.value.disabled = true
  } else if (!submitState.confirm) {
    submitState.confirm = true
  }
}

const cancelVote = () => {
  for (const x of contestants.value) {
    if (x.selected) {
      x.selected = false
    }
  }
  submitState.confirm = false
  isDisabled()
}
</script>

<style lang="less" scoped>
@import '../assets/theme.less';

#header-wrap {
  background: #f4f4f5;
  position: relative;

  #header {
    padding: 15px;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;

    #profile-btn {
      display: flex;
      gap: 0 5px;
      padding: 5px;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.4);
      border: 1px solid #ccc;
      border-radius: 5px;
      text-decoration: none;
      color: @color2;
    }
  }
}

#welcome-banner {
  .center();
  align-items: flex-start;
  height: 350px;
  padding: 15px;
  border-bottom: 1px solid #ccc;

  @media @desktop {
    text-align: center;
    align-items: center;
  }

  .text {
    font-size: 1.8rem;
    width: 100%;
    word-wrap: break-word;
    color: #373a48;
  }

  #name {
    font-weight: 700;
    font-size: 2.5rem;
  }

  .status {
    margin-top: 10px;
    display: inline-block;
    //background: #e4e4e7;
    background: rgba(255, 255, 255, 0.4);
    //box-shadow: 0 4px 2px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border: 1px solid #ccc;
    padding: 7px 30px;
    text-align: center;
    border-radius: 5px;
  }
}

#container {
  padding: 15px;
  padding-bottom: 100px;
  font-size: 1.6rem;
  .center();
}

#instruction {
  //background: #fff1cc;
  padding: 15px 0;
  border-radius: 5px;
  //color: #373a48;

  @media @desktop {
    text-align: center;
  }

  p {
    color: #595d73;
    color: #373a48;
  }
}

#vote-container {
  .center();
  margin-top: 25px;

  @media @desktop {
    display: grid;
    grid-template-columns: repeat(2, 400px);
    gap: 30px;
  }

  .card {
    width: 100%;
    max-width: 600px;
    min-height: 150px;
    display: grid;
    align-items: center;
    padding: 15px;
    gap: 0 10px;
    grid-template-columns: 100px 1fr;
    //box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    //box-shadow: rgba(9, 30, 66, 0.13) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    border: 1.4px solid #e6e6e6;
    border-radius: 10px;

    &:not(:first-of-type) {
      margin-top: 25px;

      @media @desktop {
        margin-top: 0;
      }
    }

    img {
      width: 100px;
      height: 100px;
      border-radius: 100%; //100%
      object-fit: cover;
    }

    .content {
      display: flex;
      flex-direction: column;
      max-width: 350px;
      //background: red;
      text-align: center;
      justify-content: center;
      align-items: center;
    }

    h3 {
      font-size: 1.8rem;
    }

    button {
      width: 150px;
      margin-top: 10px;
      padding: 7px;
      outline: none;
      border-radius: 3px;
      background: transparent;
      border: 2px solid #e6e6e6;

      &.active {
        background: #74757c;
        color: white;
      }
    }
  }
}

#submit-btn {
  margin-top: 30px;
  width: 100%;
  padding: 10px;
  max-width: 600px;
  height: 45px;
  border: none;
  box-shadow: none;
  padding: 10px;
  border-radius: 5px;
  background: #4e4feb;
  color: white;
  cursor: pointer;

  &:disabled {
    background: #dddcdc;
    border: none;
    color: #979797;
  }

  &:not(:disabled):hover {
    background: darken(#4e4feb, 5%);
  }
}

#spinner {
  display: inline-block;
  transform: translateY(-2px);
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: translateY(-2px) rotate(0deg);
  }

  to {
    transform: translateY(-2px) rotate(360deg);
  }
}

#cancel-btn {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  position: relative;

  &:hover {
    background: darken(#fff, 20%);
  }
}
</style>
