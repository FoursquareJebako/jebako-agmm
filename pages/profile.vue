<template>
  <div id="header">
    <button id="back-btn" @click="goBack()">
      <Icon name="solar:arrow-left-bold-duotone" color="#1565c0" size="3rem"></Icon>
    </button>
    <div id="banner">
      <p><span id="title">Edit Church Records</span><br />Update your details</p>
    </div>
  </div>

  <div id="container">
    <label>
      Full Name (Surname first):
      <input type="text" v-model="localUser.name" />
    </label>
    <div class="radio">
      <label>Male<input name="gender" type="radio" :checked="isMale" /></label>
      <label>Female<input name="gender" type="radio" :checked="isFemale" /></label>
    </div>
    <label>
      Home Address:
      <input type="text" v-model="localUser.address" />
    </label>
    <label>
      Date of Birth:
      <input type="date" />
    </label>
    <label>
      Phone Number:
      <input type="text" v-model="localUser.phone" />
    </label>
    <label>
      Email:
      <input type="email" v-model="localUser.email" />
    </label>
    <label>
      Church Department:
      <input type="text" v-model="localUser.dept" />
    </label>

    <button id="update-btn" @click="updateProfile">
      {{ updateLoad === true ? '' : 'Update Profile' }}
      <span id="spinner" v-show="updateLoad">
        <Icon name="mingcute:loading-fill" color="white" size="3rem" />
      </span>
    </button>
  </div>
</template>

<script setup lang="js">
import { ref, useState, definePageMeta } from '#imports'
const updateLoad = ref(false)
const user = useState('user')
const localUser = reactive(user.value)
const supabase = useSupabaseClient()

if (user.value.phone && !user.value.phone.startsWith('0') && !user.value.phone.startsWith('+')) {
  user.value.phone = `0${user.value.phone}`
}
definePageMeta({
  middleware: 'auth',
});

const isMale = computed(() => {
  return localUser.sex?.toUpperCase() === 'M'
})

const isFemale = computed(() => {
  return localUser.sex?.toUpperCase() === 'F'
})

const goBack = () => {
  useRouter().back();
}

const updateProfile = async () => {
  // update db and logout
  updateLoad.value = true
  const { data, error } = await supabase
    .from('members')
    .update({
      name: user.value.name,
      address: user.value.address,
      sex: user.value.sex,
      phone: user.value.phone,
      email: user.value.email,
      dept: user.value.dept,
    })
    .eq('id', user.value.id)
    .select()
  updateLoad.value = false
  localUser.value = data
  /* setTimeout(() => {
    updateLoad.value = false
  }, 1000) */
}
</script>

<style scoped lang="less">
@import '../assets/theme.less';

#header {
  background: #f4f4f5;
  color: #373a48;
  position: relative;
  border-bottom: 1px solid #ccc;
}

#back-btn {
  .center();
  flex-direction: row;
  position: absolute;
  top: 0;
  margin: 15px;
  padding: 4px 10px;
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
  align-items: center;
  text-align: center;
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
    color: #6e7376;
    font-weight: 500;

    &:not(:first-of-type) {
      margin-top: 30px;
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
    color: #6e7376;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      border-color: #1565c0;
      background: white;
    }
  }

  .radio {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
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
      accent-color: #1565c0;
    }
  }

  #update-btn {
    margin-top: 30px;
    padding: 10px;
    height: 45px;
    width: 200px;
    border: none;
    box-shadow: none;
    padding: 10px;
    border-radius: 5px;
    background: #1565c0;
    //border: 2px solid lighten(#4158f8, 10%);
    color: white;
    cursor: pointer;

    &:hover {
      background: darken(#1565c0, 5%);
    }
  }
}

#spinner {
  display: inline-block;
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
</style>
