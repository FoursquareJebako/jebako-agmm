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
      <h3>Total Votes</h3>
      <p>{{ totalVotes }}</p>
    </div>

    <div id="votes-wrapper">
      <div class="card" v-for="contestant in contestants">
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
      <details>
        <summary class="mobile-table">
          <p class="pw">123456</p>
          <p class="ts">12:34pm WAT</p>
          <p class="view">View <Icon name="fluent:arrow-fit-20-regular" size="3rem"></Icon>
          </p>
        </summary>
        <div class="details">
          <p>Mary Joe</p>
          <p>Taiwo Emmanuel</p>
          <p>Akindele Ayomide Jesutofunmi Joshua</p>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>

const contestants = ref([
  {
    image: '../img/user1.jpg',
    name: 'Mary Joe',
    votes: 62,
  },
  {
    image: '../img/user2.jpg',
    name: 'Akindele Ayomide Jesutofunmi Joshua',
    votes: 40,
  },
  {
    image: '../img/user1.jpg',
    name: 'Taiwo Emmanuel',
    votes: 60,
  },
  {
    image: '../img/user2.jpg',
    name: 'Abimbola Joseph',
    votes: 43,
  },
]);

const totalVotes = computed(() => {
  let total = 0;
  for (const c of contestants.value) {
    total = total + c.votes;
  }
  return total;
});
</script>

<style scoped lang="less">
@import '../assets/theme.less';

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

  h3 {
    font-weight: 500;
  }

  @media @desktop {
    .center();
  }

  details {
    margin-top: 20px;
    width: 100%;
    max-width: 500px;

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
