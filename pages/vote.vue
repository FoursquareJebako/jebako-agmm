<template>
  <div id="welcome-banner">
    <p class="text">Welcome,<br /><span id="name">Bukunmi Ransome-Kuti</span></p>
    <p class="status">Yet to vote</p>
  </div>
</template>

<script lang="ts">
definePageMeta({
    middleware: 'auth'
})
</script>

<style lang="less" scoped>
.center() {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#welcome-banner {
  .center();
  align-items: flex-start;
  height: 400px;
  background: #f4f4f5;
  padding: 15px;
  border-bottom: 1px solid #ccc;

  .text {
    font-size: 2rem;
    width: 100%;
    word-wrap: break-word;
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
</style>
