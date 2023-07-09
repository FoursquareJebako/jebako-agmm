<template>
  <div id="header-wrap">
    <nuxtLink id="header" to="vote/">
      <Icon name="solar:arrow-left-bold-duotone" color="#343f46" size="3rem"></Icon>
      <p>Back</p>
    </nuxtLink>
    <div id="banner">
      <p><span id="title">Edit Church Records</span><br />Update your details</p>
    </div>
  </div>

  <div id="container">
    <label>
      Full Name (Surname first):
      <input type="text" :value=user.name />
    </label>
    <div class="radio">
      <label>Male<input name="gender" type="radio"/></label>
      <label>Female<input name="gender" type="radio" checked /></label>
    </div>
    <label>
      Home Address (Residential):
      <input type="text" :value=user.address />
    </label>
    <label>
      Date of Birth (date/month/year):
      <input type="text" />
    </label>
    <label>
      Phone Number:
      <input type="text" :value=user.phone />
    </label>
    <label>
      Email:
      <input type="text" :value=user.email />
    </label>
    <label>
      Church Department:
      <input type="text" :value=user.dept />
    </label>

    <button id="update-btn">Upadate Profile</button>
  </div>
</template>

<script setup lang="js">
import { ref, useState, definePageMeta } from '#imports'
const user = useState('user')
definePageMeta({
  middleware: 'auth',
});

const chooseFn = (e) => {
  //e.target.classList.add('active')
}
</script>

<style scoped lang="less">
@import '../assets/theme.less';

#header-wrap {
  background: #f4f4f5;
  color: #373a48;
  position: relative;
  border-bottom: 1px solid #ccc;
}

#header {
  .center();
  flex-direction: row;
  position: absolute;
  top: 0;
  margin: 15px;
  padding: 5px 10px;
  gap: 0 5px;
  font-size: 1.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
  color: @color2;
  text-decoration: none;
}

#banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
  padding: 15px;

  p {
    word-wrap: break-word;
    font-size: 1.6rem;
  }

  #title {
    font-size: 2.3rem;
    font-weight: 700;
  }
}

#container {
  padding: 15px;
  padding-bottom: 100px;
  margin-top: 20px;
  font-size: 1.5rem;

  @media @desktop {
    //background: red;
    width: 600px;
    padding-left: 50px;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 80%;
    color: rgba(31, 31, 31, 0.747);
    color: @color2;

    &:not(:first-of-type) {
      margin-top: 20px;
    }
  }

  input:not([type='radio']) {
    width: 300px;
    max-width: 100%;
    margin-top: 5px;
    height: 45px;
    border: 2px solid #e6e6e6;
    border-radius: 5px;
    padding: 10px;
    background: #f2f2f2;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      border-color: #4e4feb;
      background: white;
    }
  }

  .radio {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    color: @color2;
    width: 200px;

    label {
      display: flex;
      flex-direction: row;
      margin: 0;
    }

    input {
      margin: 0;
      margin-left: 10px;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      accent-color: #4e4feb;
    }
  }

  #update-btn {
    margin-top: 30px;
    padding: 10px;
    //width: 600px;
    height: 45px;
    border: none;
    box-shadow: none;
    padding: 10px;
    border-radius: 5px;
    background: #4e4feb;
    //border: 2px solid lighten(#4158f8, 10%);
    color: white;
    cursor: pointer;

    &:hover {
      background: darken(#4e4feb, 5%);
    }
  }
}
</style>
