<template>
  <div class="form-panel">
    <div class="form-container">
      <form action="">
        <div class="form-content" id="a-form">
          <!-- .part  step 三種不同內容-->
          <div class="part part-payment">
            <h4 class="title">付款資訊</h4>
            <div class="grid-row">
              <div class="form-row grid-name">
                <label for="">持卡人姓名</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    placeholder="john Doe"
                    v-model="user.ccname"
                    @click.prevent.stop="handleDataChange"
                  />
                </div>
              </div>
              <div class="form-row grid-number">
                <label for="">卡號</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    placeholder="1111 2222 3333 4444"
                    v-model="user.cardnumber"
                    @click.prevent.stop="handleDataChange"
                  />
                </div>
              </div>
              <div class="form-row grid-date">
                <label for="">有效日期</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    v-model="user.expdate"
                    @click.prevent.stop="handleDataChange"
                  />
                </div>
              </div>
              <div class="form-row grid-ccv">
                <label for="">CVC/CCV</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    placeholder="123"
                    v-model="user.cvv"
                    @click.prevent.stop="handleDataChange"
                  />
                </div>
              </div>
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
    this.handlePageThree();
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user = this.initialUser;
    },
    handlePageThree() {
      this.$emit("sentPageThree");
    },
    handleDataChange() {
      const userData = this.user;
      this.$emit("handleDataChange", userData);
      console.log("1234");
    },
  },
};
</script>

<style scoped>
.part-payment .grid-row {
  padding: 0.5rem 0rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    "name name name ."
    "number number number ."
    "date date ccv ccv";
  grid-gap: 1rem;
}
.part-payment .grid-name {
  grid-area: name;
}
.part-payment .grid-number {
  grid-area: number;
}
.part-payment .grid-date {
  grid-area: date;
}
.part-payment .grid-ccv {
  grid-area: ccv;
}
</style>