<template>
  <div class="form-panel">
    <div class="form-container">
      <form action="">
        <div class="form-content" id="a-form">
          <!-- .part  step 三種不同內容-->
          <div class="part part-courier">
            <h4 class="title">運送方式</h4>
            <div class="part-courier-conrainer">
              <label for="standard" class="form-row">
                <div class="description">
                  <input
                    type="radio"
                    id="standard"
                    name="delivery"
                    value="0"
                    @click="handleDeliveryStandard"
                    v-model="initialUser.shippingFee"
                  />
                  <div class="">
                    <p>標準運送</p>
                    <small>約3~7個工作天</small>
                  </div>
                </div>
                <div>
                  <span>免費</span>
                </div>
              </label>
              <label for="dhl" class="form-row">
                <div class="description">
                  <input
                    type="radio"
                    id="dhl"
                    name="delivery"
                    value="500"
                    @click="handleDeliveryDhl"
                    v-model="initialUser.shippingFee"
                  />
                  <div>
                    <p>DHL 貨運</p>
                    <small>48小時內送達</small>
                  </div>
                </div>
                <span>500</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.handlePageTwo();
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user = this.initialUser;
    },
    handleDeliveryStandard() {
      this.$emit("deliveryStandard");
    },
    handleDeliveryDhl() {
      this.$emit("deliveryDhl");
    },
    handlePageTwo() {
      this.$emit("sentPageTwo");
    },
  },
};
</script>

<style scoped>
.part-courier label {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.part-courier .description {
  display: flex;
  align-items: center;
}
.part-courier-conrainer {
  /* padding: 0.5rem 1rem; */
}

.part-courier .form-row {
  margin-top: 16px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
  padding: 8px;
  align-items: center;
  cursor: pointer;
  width: 80%;
}
.part-courier .form-row small {
  display: block;
  color: gray;
}
.description > div {
  margin-left: 0.5rem;
}
p {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}
</style>