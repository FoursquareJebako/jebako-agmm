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
      <table>
        <thead>
          <td>Password</td>
          <td>Name</td>
          <td>Votes</td>
          <td>Timestamp</td>
        </thead>
        <tbody>
          <tr>
            <td>@test</td>
            <td>*****</td>
            <td>MJ, TE, AJ</td>
            <td>12:05pm</td>
          </tr>
          <tr>
            <td>25RJ82</td>
            <td>*****</td>
            <td>Ayomide Jesutofunmi, Taiwo Emmanuel, Abimbola Joseph</td>
            <td>12:05pm</td>
          </tr>
        </tbody>
      </table>

      <div class="mobile-table">
        <p>123456</p>
        <p>Ayomide Jesutofunmi, Taiwo Emmanuel, Abimbola Joseph</p>
        <p><Icon name="fluent:arrow-fit-20-regular" size="3rem"></Icon></p>
      </div>
    </div>
  </div>
</template>

<script setup>
const contestants = ref([
  {
    image: '../img/user1.jpg',
    name: 'Mary Joe',
    votes: 100,
  },
  {
    image: '../img/user2.jpg',
    name: 'Akindele Ayomide Jesutofunmi Joshua',
    votes: 100,
  },
  {
    image: '../img/user1.jpg',
    name: 'Taiwo Emmanuel',
    votes: 100,
  },
  {
    image: '../img/user2.jpg',
    name: 'Abimbola Joseph',
    votes: 100,
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
    font-size: 2rem;

    p {
      display: inline-block;
      margin-top: 7px;
      background: lightgreen;
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
        font-weight: 700;
        font-size: 1.8rem;
      }

      .votes {
        display: inline-block;
        font-size: 1.7rem;
        margin-top: 7px;
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
    text-align: center
  }

  @media @desktop {
    .center();
  }

  table {
    width: 100%;
    max-width: 1000px;
    margin-top: 10px;
    font-size: 1.6rem;
    border-radius: 10px;

    thead td {
      font-size: 1.8rem;
      font-weight: 500;
      word-break: keep-all;
      background: none;
    }

    td {
      width: 100px;
      margin: 0 10px;
      word-wrap: break-word;
      word-break: break-all;
      padding: 10px 5px;
      background: #f2f2f2;
    }
  }

  .mobile-table {
    display: grid;
    grid-template-columns: 50px 1fr 100px;
    gap: 0 20px;
    align-items: center;
    justify-content: center;
  }
}
</style>
