<template>
  <div
    class="mask-quantity"
    :class="{
      full: stockOfMask >= 200,
      few: stockOfMask < 200 && stockOfMask > 0,
      none: stockOfMask === 0
    }"
  >
    <h2 class="mask-kind"><slot></slot></h2>
    <h3 class="quantity">{{ stockOfMask }} <span>片</span></h3>
  </div>
</template>

<script>
export default {
  props: {
    stockOfMask: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.mask-quantity {
  width: 150px;
  padding: 13px;
  color: #fff;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: 33%;
  background-position: 105% 85%;
  .quantity {
    font-size: 32px;
    span {
      font-size: 12px;
      font-weight: 400;
      opacity: 0.7;
    }
  }
}

.mask-quantity.full {
  background-color: #12797a;
  background-image: url("../assets/images/stock_full.png");
}

.mask-quantity.few {
  background-color: #e67e22;
  background-image: url("../assets/images/stock_few.png");
}

.mask-quantity.none {
  background-color: #b7bbbd;
  background-image: url("../assets/images/stock_none.png");
}

.mask-kind {
  margin-bottom: 17px;
  font-size: 14px;
  font-weight: 400;
}
</style>
