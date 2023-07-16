<template>
  <div id="container">
    <div id="brand">
      <img id="logo" alt="foursquare jebako logo" src="@/assets/logo.png" />
      <h1>JEBAKO AGMM<br />VOTING PLATFORM</h1>
    </div>

    <div id="ctr">
      <form @submit="onLogin">
        <label for="pw">Password</label>
        <input id="pw" v-model="password" maxlength="6" placeholder="Enter Password" />
        <p id="error" v-show="err.status">{{ errType }}</p>
        <div id="submit-wrapper" :class="{ loading }">
          <input id="submit-btn" type="submit" :value="submitValue" />
          <span id="spinner" v-show="loading">
            <Icon name="mingcute:loading-fill" color="white" size="30px" />
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="js">
const password = ref()
const loading = ref(false)
let err = reactive({
  status: false,
  type: 'password'
})
const supabase = useSupabaseClient();

useHead({
  title: 'Jebako AGMM - Login',
  meta: [{ name: 'description', content: 'Jebako AGMM Voting Platform' }],
});

const errType = computed(() => {
  return err.type === 'network' ?
    'Network Error. Please try again' :
    'Wrong Password. No record found'
})

const submitValue = computed(() => {
  return loading.value === false ? 'Login' : ''
})

const toggleLoading = (state) => {
  if (state === true) {
    loading.value = true
  } else {
    loading.value = false
  }
}

const onLogin = async (e) => {
  e.preventDefault();
  clearNuxtState(['user, vote'])
  toggleLoading(true);

  if (password.value === '123456') {
    useState('user', () => {
      return { name: 'Temiloluwa John Victor', phone: '08123456789', sex: 'M' }
    })
    /* useState('vote', () => {
      return { 'status': false }
    }) */
    console.log(localStorage.getItem('vote'))
    if (!localStorage.getItem('vote')) {
      localStorage.setItem('vote', false)
    }
    setTimeout(() => {
      toggleLoading(false)
      return navigateTo('/vote');
    }, 1500)
  }

  if (password.value === '@admin') {
    toggleLoading(false)
    return navigateTo('/admin');
  }

  if (password.value && password.value.length === 6) {
    /* let data = await getData();
    if (data) {
      let vote = await getVote()
      if (vote) {
        useState('user', () => data)
        useState('vote', () => {
          status: vote.status || true;
          timestamp: vote.timestamp || false;
          candidates: vote.candidates || false
        })
        console.log(useState('vote'))
        return navigateTo('/vote')
      } else {
        toggleLoading(false)
        err.status = true
        err.type = 'network'
      }
    } */

    /* toggleLoading(false)
    err.status = true
    err.type = 'password' */
  } else {
    toggleLoading(false)
    err.status = 'password'
  }
};

const getData = async () => {
  const { data, error } = await supabase.from('members').select().eq('id', password.value).single();
  if (error) {
    return false
  }
  return data
}

const getVote = async () => {
  const { data, error } = await supabase.from('voters').select().eq('id', password.value).single();
  if (data === null && error.hint === null) {
    return { status: false }
  } else if (error) {
    return false
  } else {
    return data
  }
}
</script>

<style lang="less" scoped>
@import '../assets/theme.less';

#container {
  width: 100%;
  height: 100vh;
  display: flex;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #logo {
    width: 100px;
    height: 100px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  }

  h1 {
    margin-top: 20px;
    text-align: center;
    font-size: 25px;
  }
}

form {
  display: flex;
  flex-direction: column;
}

#ctr {
  .center();
  align-items: flex-start;
  margin-top: 20px;

  label {
    text-align: left;
    color: rgba(31, 31, 31, 0.747);
  }

  input {
    width: 300px;
    max-width: 100%;
    margin-top: 5px;
    height: 45px;
    border: 2px solid #e6e6e6;
    border-radius: 5px;
    padding: 10px;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      border-color: #4e4feb;
    }
  }

  #error {
    margin-top: 5px;
    background: #ffe6e6;
    color: #b30000;
    padding: 3px 7px;
    border-radius: 2px;
  }

  #submit-wrapper {
    position: relative;
  }

  #spinner {
    .center();
    //content: url(../assets/spinner.svg); /* Replace with loading icon or SVG */
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 3px;
    transform: translate(-50%, -50%);
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  #submit-btn {
    .center();
    width: 300px;
    max-width: 100%;
    height: 45px;
    border: none;
    box-shadow: none;
    padding: 10px;
    border-radius: 5px;
    background: #4e4feb;
    color: white;
    cursor: pointer;

    &:hover {
      background: darken(#4e4feb, 5%);
    }
  }
}
</style>
