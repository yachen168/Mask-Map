<template>
  <div class="home-page">
    <NavBar @togglePopup="togglePopup"></NavBar>
    <main>
      <!-- ============= storeServicePeriods 有問題-->
      <SearchSection
        @back="isSearchSectionShow = false"
        @search="search"
        :storeServicePeriods="storeServicePeriods"
        :matchedStores="matchedStores"
        v-if="isSearchSectionShow"
      ></SearchSection>
      <section class="info-wrapper">
        <div class="search">
          <div class="search-button" @click="isSearchSectionShow = true">
            目前位置
          </div>
        </div>
        <div class="info-header">
          <div class="info-header-top">
            <div class="day">
              <span class="large-font">{{ typeOfDay }}</span>
              <span>購買日</span>
              <img class="help" src="@/assets/images/help.png" alt="" />
              <div class="tool-tip">
                偶數：身分證末碼雙號者可於每週二、四、六購買<br />奇數：單號者可於每週一、三、五購買<br />全民：週日開放全民皆可購買
              </div>
            </div>
            <a
              href="https://emask.taiwan.gov.tw/msk/index.jsp"
              class="pre-order-link"
              target="_blank"
              >口罩線上預購</a
            >
          </div>
          <div class="info-header-bottom">
            <div class="hint">
              方圓 1 公里內的供應商<br />資訊更新時間：
              {{ storesInfo[0].properties.updated }}
            </div>
            <div class="reload-button">重整列表</div>
          </div>
        </div>
        <!-- storeServicePeriods 沒對到，要再改 -->
        <InfoCard
          :storeInfo="storeInfo"
          :storeServicePeriods="storeServicePeriods[index]"
          v-for="(storeInfo, index) in showListOfStoresIn1km"
          :key="index"
        ></InfoCard>
        <div class="backToTop" @click="backToTop($event)">TOP</div>
        <div class="more" v-if="leftStores > 0">
          <span class="left">尚有 {{ leftStores }} 筆</span>
          <div class="more-button" @click="loadedTimes += 10">查看更多</div>
        </div>
      </section>
      <div class="map-wrapper">
        <Map
          :storesInfo="storesInfo"
          :userCoords="userCoords"
          :searchCoords="searchCoords"
        ></Map>
      </div>
    </main>
    <Popup @togglePopup="togglePopup" v-if="isPopupShow"></Popup>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";

import SearchSection from "@/components/SearchSection";
import NavBar from "@/components/NavBar";
import InfoCard from "@/components/InfoCard";
import Map from "@/components/Map";
import Popup from "@/components/Popup";
import Footer from "@/components/Footer";

export default {
  components: {
    SearchSection,
    NavBar,
    InfoCard,
    Map,
    Popup,
    Footer
  },
  data() {
    return {
      day: "",
      loadedTimes: 10,
      isSearchSectionShow: false,
      isPopupShow: false,
      typeOfDay: ""
    };
  },
  created() {
    this.getDay();
    this.getTypeOfDay();
  },
  methods: {
    getDay() {
      this.day = new Date().getDay();
    },
    togglePopup() {
      this.isPopupShow = !this.isPopupShow;
    },
    getTypeOfDay() {
      if (this.day % 2 === 0 && this.day !== 0) this.typeOfDay = "偶數";
      if (this.day % 2) this.typeOfDay = "奇數";
      if (!this.day) this.typeOfDay = "全民";
    },
    backToTop() {
      document.querySelector(".info-wrapper").scrollTop = 0;
    },
    search(searchedKeywords) {
      store.commit("setSearchKeywords", searchedKeywords);
    }
  },

  computed: {
    ...mapGetters([
      "storesInfo",
      "storeServicePeriods",
      "userCoords",
      "storesCoordinates",
      "storesIn1km",
      "matchedStores",
      "searchCoords"
    ]),
    showListOfStoresIn1km() {
      return this.storesIn1km.slice(0, this.loadedTimes);
    },
    leftStores() {
      return this.storesIn1km.length - this.loadedTimes;
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  .info-wrapper {
    position: relative;
    width: 375px;
    height: 100vh;
    overflow: scroll;
    padding: 0 15px;
  }
  .map-wrapper {
    flex: 1 0 0;
  }
}

.home-page {
  background-color: #fafafa;
}

.search {
  position: relative;
  padding: 15px 0;
  &-button {
    display: block;
    margin: 0 auto;
    padding: 0 15px;
    width: 100%;
    height: 46px;
    line-height: 46px;
    border: 1px solid #34495e33;
    color: #34495e;
    border-radius: 10px;
    background: url("../assets/images/location.png") no-repeat;
    background-size: 24px;
    background-position: 97% 50%;
    cursor: pointer;
  }
}

.info-header-top,
.info-header-bottom {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 20px 0;
}

.day {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 150px;
  color: #34495e;
  .large-font {
    font-size: 36px;
    line-height: 1;
    font-weight: 500;
  }
  .help {
    width: 24px;
    cursor: pointer;
    &:hover ~ .tool-tip {
      display: block;
    }
  }
}

.hint {
  width: 157px;
  font-size: 14px;
  color: #566778;
  line-height: 1.5;
}

.tool-tip {
  display: none;
  position: absolute;
  width: 250px;
  padding: 10px;
  top: 95%;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: rgba($color: #34495e, $alpha: 0.9);
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
  z-index: 10;
  transition: 0.5s;
  &::before {
    content: "";
    position: absolute;
    width: 12px;
    height: 8px;
    left: 80px;
    bottom: 99%;
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    background-color: rgba($color: #34495e, $alpha: 0.9);
  }
}

.pre-order-link,
.more-button {
  display: block;
  width: 152px;
  height: 46px;
  background: #34495e 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 20px #34495e4d;
  border-radius: 23px;
  color: #fff;
  text-align: center;
  line-height: 46px;
  font-weight: 300;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
}
.reload-button {
  width: 96px;
  height: 36px;
  line-height: 34px;
  text-align: center;
  font-size: 14px;
  color: #34495e;
  border: 2px solid #34495e;
  border-radius: 100px;
  cursor: pointer;
}

.more {
  padding: 15px 0 52px;
  text-align: center;
  &-button {
    margin: 10px auto 0;
  }
  .left {
    color: #34495e;
    font-size: 12px;
  }
}

.backToTop {
  display: block;
  position: sticky;
  margin-left: auto;
  bottom: 8vh;
  // top: 10px;
  color: #fff;
  width: 46px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  font-size: 14px;
  border-radius: 50%;
  background-color: #34495e;
  box-shadow: 0px 10px 20px #34495e4d;
  cursor: pointer;
}
</style>
