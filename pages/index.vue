<template>
  <div id="container">
    <div id="brand">
      <img id="logo" alt="foursquare jebako logo" src="@/assets/logo.png" />
      <h1>JEBAKO AGMM<br />VOTING PLATFORM 2025</h1>
    </div>

    <div id="ctr">
      <form @submit.prevent="onLogin">
        <input id="pw" v-model="password" maxlength="6" placeholder="Enter Password" />
        <p id="error" v-show="err.status">{{ errType }}</p>
        <div id="submit-wrapper" :class="{ loading }">
          <button id="submit-btn" type="submit" :disabled="submitDisabled">
            {{ submitValue }}
          </button>
          <span id="spinner" v-show="loading">
            <Icon name="mingcute:loading-fill" color="white" size="30px" />
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="js">
const password = ref();
const loading = ref(false);
let err = reactive({
  status: false,
  type: "password",
});
const client = useSupabaseClient();

useHead({
  title: "Jebako AGMM - Login",
  meta: [{ name: "description", content: "Jebako AGMM Voting Platform" }],
});

const errType = computed(() => {
  return err.type === "network"
    ? "An error occurred. Please try again"
    : "Wrong Password. No record found";
});

const submitDisabled = computed(() => {
  return loading.value ? true : false;
});

const submitValue = computed(() => {
  return loading.value === false ? "Login" : "";
});

const toggleLoading = (state) => {
  loading.value = state;
};

const setDemoUser = () => {
  clearNuxtState("user");
  let localVote = localStorage.getItem("vote2025");
  if (localVote === null) {
    localStorage.setItem("vote2025", false);
  }
  useState("user", () => {
    return {
      name: "Demo Account",
      phone: "08123456789",
      sex: "M",
      id: password.value,
      address: "24 Oluwalogbon Street",
      email: "demo@example.com",
      hasVoted: JSON.parse(localVote),
    };
  });
  console.log("Demo user data:", useState("user"));
};

const setRealUser = (data) => {
  clearNuxtState("user");
  useState("user", () => {
    return data;
  });
  console.log("Real user data:", useState("user").value);
};

const specialLogin = (login) => {
  if (login === "demo") {
    setDemoUser();
    setTimeout(async () => {
      await navigateTo("/vote");
      toggleLoading(false);
    }, 1000);
  }

  if (login === "admin") {
    toggleLoading(false);
    console.log("Admin login detected");
    return navigateTo("/admin");
  }
};

const onLogin = async (e) => {
  toggleLoading(true);
  const pass = password.value;

  // Handle special logins
  if (pass === "123456") {
    specialLogin("demo");
    return;
  }

  if (pass === "@admin") {
    specialLogin("admin");
    return;
  }

  // Validate password format
  if (!pass || pass.length !== 6) {
    handleError("password");
    return;
  }

  // Try to fetch user
  const result = await fetchUser(pass);
  if (!result.success) {
    handleError(result.type);
  }
};

const fetchUser = async (pass) => {
  try {
    const { data, error } = await client.from("members").select().eq("id", parseInt(pass)).single();
    if (error && error.message === 'TypeError: Failed to fetch') {
      return { success: false, type: "network" };
    }

    if (data === null) {
      return { success: false, type: "password" };
    }
    
    setRealUser(data);
    await navigateTo("/vote");
    toggleLoading(false);
    return { success: true };
  } catch (error) {
    console.error("Network error while fetching user:", error);
    return { success: false, type: "network" };
  }
};

// Unified error handler
const handleError = (type) => {
  toggleLoading(false);
  err.status = true;
  err.type = type;
};
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
    box-shadow:
      rgba(17, 17, 26, 0.05) 0px 4px 16px,
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
