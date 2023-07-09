<template>
  <div id="header-wrap">
    <div id="header">
      <nuxtLink id="profile-btn" to="/profile">
        <Icon name="solar:user-bold-duotone" size="3rem"/>
      </nuxtLink>
    </div>

    <div id="welcome-banner">
      <p class="text">Welcome,<br /><span id="name">{{user.name}}</span></p>
      <p class="status">Yet to vote</p>
    </div>
  </div>

  <div id="container">
    <div id="instruction">
      <div>
        <h4>Choose your preferred candidate</h4>
        <p>Click submit vote to confirm your vote</p>
      </div>
    </div>

    <div id="vote-container">
      <div class="card">
        <div class="profile">
          <img src="@/assets/user1.jpg" />
        </div>
        <div class="content">
          <h3>Mary Joe</h3>
          <button :class="{ active: ac === 1 }" @click="chooseFn(1)">{{ac === 1 ? 'Selected': 'Select'}}</button>
        </div>
      </div>

      <div class="card">
        <div class="profile">
          <img src="@/assets/user2.jpg" />
        </div>
        <div class="content">
          <h3>Akindele Ayomide Jesutofunmi Joshua</h3>
          <button :class="{active: ac === 2}" @click="chooseFn(2)">{{ac === 2 ? 'Selected': 'Select'}}</button>
        </div>
      </div>

      <button disable id="submit">Submit Vote</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useState, definePageMeta } from '#imports'
const user = useState('user')
const ac = ref(1)
definePageMeta({
  middleware: 'auth',
});


const chooseFn = (num: number) => {
  console.log(typeof(num))
  ac.value = num
}
</script>

<style lang="less" scoped>
@import "../assets/theme.less";

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
    font-size: 2rem;
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
    border-radius: 16px;
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
  font-size: 1.6rem;
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

  .card {
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: space-evenly;
    padding: 15px;
    gap: 0 20px;
    //box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    //box-shadow: rgba(9, 30, 66, 0.13) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    border: 1.4px solid #e6e6e6;
    border-radius: 10px;
    //background: #f4f4f5;

    &:not(:first-of-type) {
      margin-top: 25px;
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
      flex: 0 0 200px;
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
      padding: 10px;
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

  #submit {
    margin-top: 50px;
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
      background: #f4f4f5;
      border: none;
      color: #ccc;
    }

    &:not(:disabled):hover {
      background: darken(#4e4feb, 5%);
    }
  }
}
</style>
