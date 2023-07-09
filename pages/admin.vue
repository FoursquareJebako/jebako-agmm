<template>
  <div id="header">
    <div class="title">
      <p class="head">Admin Dashboard</p>
      <p>Realtime counts</p>
    </div>
    <nuxtLink to="/">
      <Icon name="solar:logout-line-duotone" size="3rem"></Icon>
    </nuxtLink>
  </div>

  <div id="totals">
    <div id="ovr">
      <h3>Total Votes</h3>
      <p>143</p>
    </div>

    <div id="unit-ovr">
      <div class="card">
        <img src="@/assets/user1.jpg" />
        <p><span>50</span> votes</p>
      </div>
      <div class="card">
        <img src="@/assets/user2.jpg" />
        <p><span>50</span> votes</p>
      </div>
      <div class="card">
        <img src="@/assets/user1.jpg" />
        <p><span>50</span> votes</p>
      </div>
      <div class="card">
        <img src="@/assets/user2.jpg" />
        <p><span>50</span> votes</p>
      </div>
    </div>
  </div>
</template>

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

#totals {
  .center();
  margin-top: 30px;

  #ovr {
    .center();
    width: 80%;
    max-width: 200px;
    padding: 15px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    font-size: 2rem;
  }

  #unit-ovr {
    width: 700px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media @desktop {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }

  .card {
    width: 80%;
    max-width: 400px;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 40px;
    //box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border: 1px solid #ccc;
    border-radius: 10px;

    @media @desktop {
    }

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 50%;
    }

    p {
      margin-top: 10px;
      font-size: 2rem;
    }
  }
}
</style>
