<template>
  <div id="header-wrap">
    <div id="header">
      <nuxtLink id="profile-btn" to="/profile">
        <Icon name="solar:user-bold-duotone" size="3rem" color="#1565c0" />
      </nuxtLink>
    </div>

    <div id="welcome-banner">
      <p class="text">
        Welcome,<br /><span id="name">{{ user.name }}</span>
      </p>
      <p class="status" :class="{ active: hasVoted }">
        <span v-if="hasVoted">
          <Icon name="solar:check-circle-bold-duotone" size="3rem" color="#65ca65" />
        </span>
        {{ voteStatus }}
      </p>
    </div>
  </div>

  <p v-if="isDemo" id="demo-warn">Voting with Demo account won't be counted.</p>

  <div class="portal-note" v-if="!isDemo && !openPortal">
    <h4>AGMM Voting Schedule</h4>
    <p>
      Voting for the AGMM will start on <b>Saturday, 26th of July</b>, from
      <b>7AM to 10 PM</b>
    </p>
  </div>

  <div class="portal-note" v-else-if="openPortal && votePaused">
    <h4>AGMM Voting Schedule</h4>
    <p>
      Voting for the AGMM will resume by 7am and continue until 10am on
      <b>Sunday, July 27th</b>
    </p>
  </div>

  <div id="vote-summary" v-else-if="hasVoted || voteEnds">
    <h4>{{ voteEnds ? "Voting Has Ended" : "Thanks for voting" }}</h4>
    <p>
      Click the button below to see result
      {{ !voteEnds ? "when voting ends" : "" }}
    </p>
    <button id="result-btn" :disabled="!voteEnds" @click="fetchResult()">
      See result
    </button>

    <div id="votes-wrapper" v-if="showResult">
      <div id="totals">
        <h3>Total Voters</h3>
        <p>{{ totalVoters }}</p>
      </div>
      <div class="card" v-for="contestant in candidates">
        <img :src="contestant.image" />
        <div class="details">
          <p class="name">{{ contestant.name }}</p>
          <p class="votes">
            <span>{{ contestant.votes }}</span> votes
          </p>
        </div>
      </div>
    </div>
  </div>

  <div id="container" v-else>
    <div id="instruction">
      <div>
        <h4>You can only vote three cadidates</h4>
        <p>Click submit vote to confirm your vote</p>
      </div>
    </div>

    <div id="vote-container">
      <div class="card" v-for="contestant in candidates">
        <div class="profile">
          <img :src="contestant.image" />
        </div>
        <div class="content">
          <h3>{{ contestant.name }}</h3>
          <button ref="selectBtn" class="select-btn" :class="{ active: contestant.selected }"
            @click="chooseFn(contestant)">
            {{ contestant.selected ? "Selected" : "Select" }}
          </button>
        </div>
      </div>
    </div>

    <button :disabled="isDisabled" id="submit-btn" @click="submitVote">
      {{ getSubmitState }}
      <span id="spinner" v-show="submitState.loading">
        <Icon name="mingcute:loading-fill" color="white" size="3rem" />
      </span>
    </button>

    <button v-show="submitState.confirm" id="cancel-btn" @click="cancelVote">
      Cancel Selection
    </button>
  </div>
</template>

<script setup lang="js">
import { ref, useState, definePageMeta } from '#imports';
const user = useState('user');
const selectBtn = ref(null);
const submitState = reactive({
  loading: false,
  confirm: false
})
const candidates = ref([
  {
    image: './img/adura.jpg',
    name: 'Sis. Aduragbemi Rehoboth',
    selected: false,
    votes: 0
  },
  {
    image: './img/grace.jpg',
    name: 'Sis. Grace Asuquo',
    selected: false,
    votes: 0
  },
  {
    image: './img/tomisin.jpg',
    name: 'Sis. Tomisin George',
    selected: false,
    votes: 0
  },
  {
    image: './img/hassan.jpg',
    name: 'Bro. Kanmi Hassan',
    selected: false,
    votes: 0
  },
  {
    image: './img/richard.jpg',
    name: 'Bro. Richard Olaleye',
    selected: false,
    votes: 0
  },
]);
const client = useSupabaseClient();

definePageMeta({
  middleware: 'auth',
});

/* AUTO CONTROLED STATES !! */
const openPortal = ref(false)
const votePaused = ref(false)
const voteEnds = ref(false)
const showResult = ref(false)
/* AUTO CONTROLLED STATES !! */

const totalVoters = ref(null)


const hasVoted = computed(() => {
  return user.value.hasVoted
})

const isDemo = computed(() => {
  return user.value.id === '123456'
})

const voteStatus = computed(() => {
  return hasVoted.value ? 'Voted successfully' : 'Yet to vote'
})

const selected = computed(() => {
  const list = []
  for (const x of candidates.value) {
    if (x.selected) {
      list.push(x)
    }
  }
  return list
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

const isDisabled = computed(() => {
  const selectedLen = selected.value.length
  if (submitState.loading) {
    return true
  } else if (selectedLen === 3) {
    return false
  } else {
    return true
  }
})

const autoPortal = () => {
  const now = new Date()
  const startTime = new Date('July 26, 2025 07:00:00') - now
  const pauseTime = new Date('July 26, 2025 16:01:00') - now
  const resumeTime = new Date('July 27, 2025 07:00:00') - now
  const endTime = new Date('July 27, 2025 10:01:00') - now

  if (startTime <= 0) {
    // time lapse 1
    openPortal.value = true
  }
  if (pauseTime <= 0) {
    // time lapse 2
    votePaused.value = true
  }
  if (resumeTime <= 0) {
    // time lapse 3
    votePaused.value = false
  }
  if (endTime <= 0) {
    // time lapse 4
    voteEnds.value = true
  }
}

autoPortal()

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
  //console.log(selected.value)
};

const submitVote = async () => {
  if (submitState.confirm) {
    //final submit
    submitState.confirm = false
    submitState.loading = true
    selectBtn.value.disabled = true
    const date = new Date()
    const day = date.toLocaleString('en-US', { weekday: 'short' })
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const voter = {
      id: user.value.id,
      candidates: getName(),
      timestamp: `${day}, ${time}`
    }
    await handleSubmit(voter)
    submitState.loading = false
  } else if (!submitState.confirm) {
    //confirm submit
    submitState.confirm = true
  }
}

const handleSubmit = async (voter) => {
  if (isDemo.value) {
    setTimeout(() => {
      localStorage.setItem('vote2025', true)
      user.value.hasVoted = true
      console.log('Demo user has voted:', user.value)
    }, 2000)
    await new Promise(resolve => setTimeout(resolve, 2000))
  } else {
    const { error: voterErr  } = await client.from('voters').insert(voter)
    const { error: userErr } = await client.from('members').update({ hasVoted: true }).eq('id', user.value.id)
    if (voterErr || userErr) {
      console.error('Error submitting vote:', voterErr || userErr)
      alert('We could not submit your vote, please try again later.')
      return false
    } else {
      user.value.hasVoted = true
      console.log('Real user has voted:', user.value)
      return true
    }
  }
}

const fetchResult = async () => {
  if (showResult.value) {
    // fetched and result is on page already
    return false
  }
  const { data: voters, error } = await client.from('voters').select('candidates')
  if (error) {
    return false;
  }
 
  for (const voter of voters) {
    const arr = voter.candidates.split(',')
    for (const candidate of arr) {
      candidates.value.forEach(contestant => {
        if (contestant.name === candidate.trim()) {
          contestant.votes = contestant.votes + 1
        }
      });
    }
  }
 
  totalVoters.value = voters.length || 'null'
  showResult.value = true
}

const getName = () => {
  const name = []
  for (const x of candidates.value) {
    if (x.selected) {
      name.push(x.name)
    }
  }
  return name.join(',')
}

const cancelVote = () => {
  for (const x of candidates.value) {
    if (x.selected) {
      x.selected = false
    }
  }
  submitState.confirm = false
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
  align-items: center;
  text-align: center;
  height: 330px;
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

    @media @desktop {
      font-size: 2rem;
    }
  }

  #name {
    font-weight: 700;
    font-size: 2.5rem;

    @media @desktop {
      font-size: 3rem;
    }
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

    &.active {
      background: rgb(205, 241, 205);
      border: 1px solid #65ca65;
    }
  }
}

#demo-warn {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 20px;
  background: lightgoldenrodyellow;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

.portal-note {
  .center();
  width: 90%;
  max-width: 600px;
  text-align: center;
  padding: 15px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  color: #373a48;

  h4 {
    font-size: 1.8rem;
  }

  p {
    margin-top: 10px;
  }
}

#your-votes {
  margin-top: 10px;

  button {
    .center();
    font-size: 1.55rem;
    width: 200px;
    height: 40px;
    border: none;
    box-shadow: none;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid #ccc;
    background: transparent;
    cursor: pointer;
  }
}

#vote-summary {
  .center();
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  text-align: center;
  color: #373a48;

  h4 {
    font-size: 1.8rem;
  }

  p {
    margin-top: 5px;
  }

  #result-btn {
    .center();
    width: 200px;
    height: 40px;
    border: none;
    box-shadow: none;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    background: #1565c0;
    color: white;
    cursor: pointer;

    &:disabled {
      background: #dddcdc;
      border: none;
      color: #979797;
    }

    &:not(:disabled):hover {
      background: darken(#1565c0, 5%);
    }
  }
}

#votes-wrapper {
  .center();
  padding: 15px;
  margin-top: 20px;

  @media @desktop {
    width: 100%;
    max-width: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  #totals {
    .center();
    width: 80%;
    max-width: 400px;
    padding: 15px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    font-size: 1.8rem;

    p {
      display: inline-block;
      margin-top: 7px;
      background: rgb(192, 255, 192);
      padding: 3px 20px;
      border-radius: 20px;
    }
  }

  .card {
    width: 100%;
    max-width: 400px;
    min-height: 130px;
    padding: 15px;
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    gap: 10px 0;
    text-align: center;
    margin-top: 20px;
    //box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border: 1px solid #ccc;
    border-radius: 10px;

    @media @desktop {
      max-width: 1600px;
    }

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 50%;
    }

    .details {
      max-width: 350px;

      .name {
        font-weight: 500;
        font-size: 1.7rem;
      }

      .votes {
        display: inline-block;
        font-size: 1.7rem;
        margin-top: 12px;
        background: #f2f2f2;
        padding: 3px 15px;
        border-radius: 20px;
      }
    }
  }
}

#container {
  width: 100%;
  .center();
  padding: 15px;
  padding-bottom: 100px;
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
  width: 100%;
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    gap: 0 50px;
    //grid-template-columns: 100px 1fr;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    //border: 1.4px solid #e6e6e6;
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
      max-width: 170px;
      //background: red;
      text-align: center;
      justify-content: center;
      align-items: center;
    }

    h3 {
      font-size: 1.8rem;
    }

    .select-btn {
      width: 130px;
      margin-top: 10px;
      padding: 7px;
      outline: none;
      border-radius: 3px;
      background: transparent;
      border: 2px solid #e6e6e6;

      &.active {
        background: #8d8e92;
        color: white;
        border: 2px solid #8d8e92;
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
  background: #1565c0;
  color: white;
  cursor: pointer;

  &:disabled {
    background: #dddcdc;
    border: none;
    color: #979797;
  }

  &:not(:disabled):hover {
    background: darken(#1565c0, 5%);
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
