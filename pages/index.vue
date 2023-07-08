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
        <p id="error" v-show="err">Wrong Password. No record found</p>
        <input id="submit-btn" type="submit" value="Login" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
let err = ref(false);
const password = ref()
const userState = useState('password', () => password);

useHead({
  title: 'Jebako AGMM - Login',
  meta: [{ name: 'description', content: 'Jebako AGMM Voting Platform' }],
});

const onLogin = (e: Event) => {
  e.preventDefault();
  if (password.value === '@admin') {
    return navigateTo('/vote');
  } else {
    err.value = true;
  }
};
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
