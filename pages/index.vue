<template>
  <div id="container">
    <div id="brand">
      <img id="logo" alt="foursquare jebako logo" src="@/assets/logo.png" />
      <h1>JEBAKO AGMM<br />VOTING PLATFORM 2025</h1>
    </div>

    <div id="ctr">
      <form @submit="onLogin">
        <input id="pw" v-model="password" maxlength="6" placeholder="Enter Password" />
        <p id="error" v-show="err.status">{{ errType }}</p>
        <div id="submit-wrapper" :class="{ loading }">
          <input id="submit-btn" type="submit" :value="submitValue" :disabled="submitDisabled" />
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
//const supabase = useSupabaseClient();

useHead({
  title: 'Jebako AGMM - Login',
  meta: [{ name: 'description', content: 'Jebako AGMM Voting Platform' }],
});

const errType = computed(() => {
  return err.type === 'network' ?
    'Network Error. Please try again' :
    'Wrong Password. No record found'
})

const submitDisabled = computed(() => {
  return loading.value ? true : false
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

const specialLogin = (login) => {
  if (login === 'demo') {
    useState('user', () => {
      return { name: 'Demo Account', phone: '08123456789', sex: 'M', id: password.value }
    })
    if (localStorage.getItem('vote242') === null) {
      localStorage.setItem('vote242', false)
    }
    setTimeout(async () => {
      await navigateTo('/vote');
      toggleLoading(false)
    }, 1500)

  }

  if (login === 'admin') {
    return navigateTo('/admin');
    toggleLoading(false)
  }
}

const onLogin = async (e) => {
  e.preventDefault();
  clearNuxtState(['user', 'vote'])
  toggleLoading(true);

  if (password.value && password.value.length === 6) {
    if (password.value === '123456') {
      specialLogin('demo')
      return
    } else if (password.value === '@admin') {
      specialLogin('admin')
      return
    } else {
      toggleLoading(false)
      err.status = true
      err.type = 'password'
    }

    /* let { user, vote } = await getUser();
    if (user && (vote || vote === false)) {
      useState('user', () => user)
      useState('vote', () => vote)
      return navigateTo('/vote')
    }

    if (user === null || vote === null) {
      toggleLoading(false)
      err.status = true
      err.type = 'network'
    }

    if (user === false) {
      toggleLoading(false)
      err.status = true
      err.type = 'password'
    } */
  } else {
    toggleLoading(false)
    err.status = true
    err.type = 'password'
  }
};

/* const getUser = async () => {
  const re = { user: false, vote: false }
  const {
    data: userData, error: userError, status: userStatus
  } = await supabase.from('members').select().eq('id', password.value).maybeSingle();
  if (userData === null && userStatus === 200) {
    return { user: false, vote: false }
  } else if (userError || userStatus !== 200) {
    return { user: null, vote: null }
  } else {
    re.user = userData
  }

  const {
    data: voteData, error: voteError, status: voteStatus
  } = await supabase.from('voters').select().eq('id', password.value).maybeSingle();
  //console.log(voteData)
  if (voteData === null && voteStatus === 200) {
    // yet to vote
    re.vote = false
  } else if (voteError || voteStatus !== 200) {
    //network
    re.vote = null
  } else {
    re.vote = voteData
  }

  return re
} */
</script>

<style lang="less" scoped>
@import "../assets/theme.less";

#container {
  width: 100%;
  height: 100vh;
  display: flex;
  font-family: "Poppins", sans-serif;
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
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
      rgba(17, 17, 26, 0.05) 0px 8px 32px;
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
    border: 3px solid #dadada;
    border-radius: 5px;
    padding: 10px;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      border-color: #1565c0;
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
    background: #1565c0;
    color: white;
    cursor: pointer;
    margin-top: 10px;

    &:disabled {
      background: #dddcdc;
      border: none;
      color: #979797;
    }

    &:not(:disabled):hover {
      background: darken(#1565c0, 3%);
    }
  }
}
</style>
