<template>
  <div id="container">
    <!-- <NuxtWelcome /> -->
    <div id="brand">
      <img id="logo" alt="foursquare jebako logo" src="assets/logo.png" />
      <h1>JEBAKO AGMM<br />Voting Platform</h1>
    </div>

    <div id="ctr">
      <label for="pw">Password</label>
      <input id="pw" type="number" size="6" placeholder="Enter Password">
      <button>Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Jebako AGMM - Login',
  meta: [
    { name: 'description', content: 'Jebako AGMM Votin Platform' }
  ]
})
</script>

<style lang="less" scoped>
.center() {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#container {
  width: 100%;
  height: 100vh;
  display: flex;
  font-family: 'Noto Sans';
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
  }

  h1 {
    margin-top: 20px;
    text-align: center;
    font-size: 25px;
  }
}

#ctr {
  .center();
  align-items: start;
  margin-top: 20px;

  label {
    text-align: left;
    color: rgba(31, 31, 31, 0.418);
  }

  input {
    width: 300px;
    max-width: 100%;
    margin-top: 5px;
    height: 50px;
    border: 2px solid #e6e6e6;
    border-radius: 5px;
    padding: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    &:hover, &:focus, &:active, &:focus-visible {
      outline: none;
      border-color: #2a52be;
    }
  }

  button {
    .center();
    width: 300px;
    max-width: 100%;
    margin-top: 15px;
    height: 50px;
    border: none;
    padding: 10px;
    border-radius: 5px;
    background: #2a52be;
    color: white;

    &:hover {
      background: ;
    }
  }
}
</style>
