<template>
  <nav :class="{ extend: isNavBarOpen }">
    <h1>口罩即時查</h1>
    <div class="toggler" @click="toggleNavBar">
      <img :src="isNavBarOpen ? closeNavIcon : toggleNavIcon" />
    </div>
    <div class="menu">
      <div class="menu-item active">口罩供給現況</div>
      <div
        class="menu-item"
        @click="
          openPopup();
          toggleNavBar();
        "
      >
        口罩怎麼買
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isNavBarOpen: false,
      toggleNavIcon: require("@/assets/images/toggler.png"),
      closeNavIcon: require("@/assets/images/close.png")
    };
  },
  methods: {
    openPopup() {
      this.$emit("togglePopup");
    },
    toggleNavBar() {
      this.isNavBarOpen = !this.isNavBarOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 15px;
  background-color: #fff;
  z-index: 2000; // in order to over the z-index of Map
}

nav.extend {
  background-color: #35495f;
  h1 {
    color: #fff;
  }
  .menu {
    display: block;
    top: 100%;
    height: fit-content;
    .menu-item {
      flex: 0 0 56px;
    }
    .menu-item.active {
      background-color: #485b6f;
    }
  }
}

.menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 0;
  top: 0;
  left: 0;
  color: #fff;
  background-color: #35495f;
  transition: 0.2s;
  overflow: hidden;
  z-index: -1;
  &-item {
    flex: 0;
    padding: 15px 0;
    text-align: center;
    cursor: pointer;
  }
}

h1 {
  padding-left: 40px;
  color: #34495e;
  font-size: 18px;
  font-weight: 400;
  background-image: url("../assets/images/logo.png");
  background-repeat: no-repeat;
  background-size: 30px;
  background-position: 0% 50%;
}

.toggler {
  width: 26px;
  height: 24px;
  cursor: pointer;
  img {
    width: 100%;
  }
}
</style>
