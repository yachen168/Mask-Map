<template>
  <section class="info-card">
    <div class="mask-quantity-wrapper">
      <StockBoard :stockOfMask="storeInfo.properties.mask_adult"
        >成人口罩數量</StockBoard
      >
      <StockBoard :stockOfMask="storeInfo.properties.mask_child"
        >兒童口罩數量</StockBoard
      >
    </div>
    <div class="info-card-title" :class="{ closed: isClosed }">
      <h1 class="store-name">{{ storeInfo.properties.name }}</h1>
      <h4 class="distance">{{ storeInfo.properties.distance }} km</h4>
      <h4 class="store-status">{{ isClosed ? "休息中" : "營業中" }}</h4>
    </div>
    <div class="info-card-body">
      <div class="item">
        <h3 class="address">
          <span>地址</span><span>{{ storeInfo.properties.address }}</span>
        </h3>
        <a
          class="link"
          :href="`https://www.google.com.tw/maps/search/${storeInfo.address}`"
          target="_blank"
          >於地圖查看</a
        >
      </div>
      <div class="item">
        <h3 class="phone">
          <span>電話</span><span>{{ storeInfo.properties.phone }}</span>
        </h3>
        <a class="link" :href="`tel:+${storeInfo.properties.phone}`"
          >撥打電話</a
        >
      </div>
      <div class="item">
        <h3 class="note">
          <span>備註</span
          ><span>{{
            storeInfo.properties.custom_note
              ? storeInfo.properties.custom_note
              : "-"
          }}</span>
        </h3>
      </div>
    </div>
  </section>
</template>

<script>
import StockBoard from "./StockBoard";

export default {
  name: "InfoCard",
  props: {
    storeInfo: {
      type: Object,
      required: true
    },
    storeServicePeriods: {
      type: Array,
      required: true
    }
  },
  components: {
    StockBoard
  },
  computed: {
    isClosed() {
      const today = new Date().getDay();
      return this.storeServicePeriods[today] === "Y";
    }
  }
};
</script>

<style lang="scss" scoped>
.info-card {
  position: relative;
  padding: 15px;
  width: 343px;
  margin: 0 auto;
  box-shadow: 0px 3px 10px #0000001a;
  border-radius: 10px;
  &-title {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-end;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 4px;
      height: 24px;
      background-color: #11787a;
      border-radius: 0px 4px 4px 0px;
    }
    .store-status {
      background-color: #e7f5f3;
      color: #16a085;
    }
    .store-name {
      margin-right: 5px;
      line-height: 1.2;
      font-size: 16px;
      color: #34495e;
    }
    .distance {
      margin-right: 14px;
      font-size: 11px;
    }
  }
  &-body {
    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 18px;
      h3 {
        display: flex;
        color: #70777c;
        font-size: 14px;
        font-weight: 400;
      }
      h3 span:last-of-type {
        width: 160px;
      }
      h3 span:first-of-type {
        width: 30px;
        margin-right: 10px;
        color: #34495e;
      }
      .link {
        color: #71777c;
        font-size: 12px;
      }
    }
  }
}

.info-card + .info-card {
  margin-top: 20px;
}
.mask-quantity-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.store-status {
  padding: 4px 6px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  border-radius: 6px;
}

.info-card-title.closed {
  &::before {
    background-color: #a9a9a9;
  }
  .store-status {
    background-color: #f6f6f6;
    color: #a9a9a9;
  }
}
.info-card-title.close-soon {
  &::before {
    background-color: #f39c12;
  }
  .store-status {
    background-color: #fef5e7;
    color: #f39c12;
  }
}
</style>
