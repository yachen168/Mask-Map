<template>
  <div class="popup-wrapper">
    <div class="close" @click="$emit('togglePopup')">
      <img src="@/assets/images/close.png" alt="" />
    </div>
    <div class="popup">
      <div class="title">
        <div class="tag">New</div>
        <h1>口罩實名制2.0</h1>
      </div>
      <div class="image">
        <img src="@/assets/images/pre_order.png" alt="" />
      </div>
      <div class="buttons">
        <a href="https://emask.taiwan.gov.tw/msk/index.jsp" target="_blank"
          >立即線上預購</a
        >
        <a
          href="https://www.nhi.gov.tw/Content_List.aspx?n=F834AD6472551F9A"
          target="_blank"
          >下次可購買日計算</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.popup-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: #34495e;
  opacity: 0.89;
  z-index: 2500;
  .popup {
    position: absolute;
    width: 700px;
    height: 80%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    text-align: center;
  }
  .title {
    color: #fff;
    h1 {
      display: inline-block;
      font-size: 36px;
      vertical-align: middle;
    }
    .tag {
      width: 40px;
      padding: 2px 0;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      text-align: center;
      font-size: 12px;
      background: #e67e22;
      border-radius: 4px;
    }
  }
  .image {
    height: 60vh;
    img {
      height: 100%;
      object-fit: fill;
    }
  }
  .buttons {
    a {
      display: block;
      padding: 15px 0;
      width: 326px;
      margin: 0 auto;
      text-align: center;
      border: 2px solid #ffffff;
      border-radius: 27px;
      font-weight: 500;
      text-decoration: none;
    }
    a:first-child {
      color: #34495e;
      background: #ffffff;
    }
    a:last-child {
      color: #fff;
      margin-top: 20px;
      border: 2px solid #ffffff;
    }
  }
  .close {
    width: 24px;
    position: absolute;
    top: 30px;
    right: 25px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
</style>
