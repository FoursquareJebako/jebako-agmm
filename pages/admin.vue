<template>
  <div id="header">
    <div class="title">
      <p class="head">Admin Dashboard</p>
      <p>Realtime counts</p>
    </div>
    <nuxtLink to="/" id="logout-btn">
      <Icon name="solar:logout-line-duotone" size="3rem"></Icon>
    </nuxtLink>
  </div>

  <div id="container">
    <div id="totals">
      <h3>Total Voters</h3>
      <p>{{ totalVotes }}</p>
    </div>

    <div id="votes-wrapper">
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

    <div id="voters-wrapper">
      <h3>All Voters</h3>

      <details v-for="voter in voters">
        <summary class="mobile-table">
          <p class="pw">{{ voter.id }}</p>
          <p class="ts">{{ voter.timestamp }}</p>
          <p class="view">
            <Icon name="material-symbols:top-panel-open-rounded" color="#595959" size="2.5rem"></Icon>
          </p>
        </summary>
        <div class="details">
          <p>{{ listContestant(voter.candidates)[0] }}</p>
          <p>{{ listContestant(voter.candidates)[1] }}</p>
          <p>{{ listContestant(voter.candidates)[2] }}</p>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>

const supabase = useSupabaseClient();

let realtimeChannel;
const { data: voters, refresh: refreshVoters } = await useAsyncData(
  "voters",
  async () => {
    const { data } = await supabase.from("voters").select();
    return data;
  }
);

const candidates = ref([
  {
    image: './img/adura.jpg',
    name: 'Sis. Aduragbemi Rehoboth',
    votes: 0
  },
  {
    image: './img/grace.jpg',
    name: 'Sis. Grace Asuquo',
    votes: 0
  },
  {
    image: './img/tomisin.jpg',
    name: 'Sis. Tomisin George',
    votes: 0
  },
  {
    image: './img/hassan.jpg',
    name: 'Bro. Kanmi Hassan',
    votes: 0
  },
  {
    image: './img/richard.jpg',
    name: 'Bro. Richard Olaleye',
    votes: 0
  },
]);

watchEffect(() => {
  // console.log('voters updated')
  // reset to all votes to zero
  candidates.value.forEach((contestant) => {
    contestant.votes = 0;
  });

  for (const voter of voters.value) {
    const arr = voter.candidates.split(",");
    for (const candidate of arr) {
      candidates.value.forEach((contestant) => {
        if (contestant.name === candidate.trim()) {
          contestant.votes = contestant.votes + 1;
        }
      });
    }
  }
});

const listContestant = (candidates) => {
  const arr = candidates.split(",");
  return arr;
};

onMounted(() => {
  realtimeChannel = supabase
    .channel("public:voters")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "voters" },
      () => refreshVoters()
    );
  realtimeChannel.subscribe();
});

onUnmounted(() => {
  supabase.removeChannel(realtimeChannel);
});

const totalVotes = computed(() => {
  return voters.value.length || 0;
});
</script>

<style scoped lang="less">
@import "../assets/theme.less";

#header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;

  .title {
    display: flex;
    flex-direction: column;
  }

  .head {
    font-size: 2.5rem;
    font-weight: 700;
  }
}

#container {
  .center();
  margin-top: 30px;
  padding-bottom: 100px;

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

  #votes-wrapper {
    .center();
    padding: 15px;

    @media @desktop {
      width: 100%;
      max-width: 900px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
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

#voters-wrapper {
  width: 100%;
  margin-top: 40px;
  padding: 15px;
  .center();

  h3 {
    font-weight: 500;
  }

  details {
    margin-top: 20px;
    width: 100%;
    max-width: 500px;

    summary {
      cursor: pointer;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &[open] {
      summary {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    .details {
      background: #f1f1f2;
      padding: 15px;
      padding-top: 5px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  .mobile-table {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 0 10px;
    align-items: center;
    justify-content: center;
    background: #f1f1f2;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    .pw,
    .ts {
      background: #fff;
      border-radius: 5px;
      border: 1px solid #ccc;
      padding: 3px 15px;
    }

    .view {
      //background: red;
      text-align: right;
    }
  }
}
</style>
