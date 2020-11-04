<template>
  <div class="search-section">
    <div class="input-wrapper">
      <span class="back" @click="$emit('back')"
        ><img src="@/assets/images/back.png" alt="back"
      /></span>
      <input type="text" placeholder="請輸入地址與區域" />
    </div>
    <div class="history">
      <div class="history-header">
        <span class="title">最近搜尋</span>
        <span class="clear">清除</span>
      </div>
      <div class="history-body">
        <h3>新北市中正路</h3>
        <h3>新北市中正路</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchSection"
};
</script>

<style lang="scss" scoped>
.search-section {
  position: absolute;
  height: 100%;
  width: 375px;
  background-color: #fafafa;
  z-index: 20;
  .input-wrapper {
    padding: 15px;
  }
  input {
    width: 310px;
    height: 46px;
    padding: 0 15px;
    border: 1px solid #34495e33;
    border-radius: 10px;
    vertical-align: middle;
    outline: none;
    &::placeholder {
      color: #566778;
      opacity: 0.4;
    }
  }
  .back {
    display: inline-block;
    width: 10%;
    vertical-align: middle;
    cursor: pointer;
    img {
      width: 20px;
    }
  }
}

.history {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
    color: #fff;
    font-size: 12px;
    background: #34495e;
    .clear {
      width: 52px;
      height: 26px;
      line-height: 24px;
      text-align: center;
      border: 2px solid #fafafa;
      border-radius: 100px;
      opacity: 0.8;
      cursor: pointer;
    }
  }
  &-body {
    padding: 5px 15px;
    h3 {
      padding: 15px 10px;
      color: #34495e;
      font-size: 14px;
      font-weight: 400;
      border-bottom: 1px solid #d2d7db;
    }
  }
}
</style>
