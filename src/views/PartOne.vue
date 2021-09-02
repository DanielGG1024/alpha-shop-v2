<template>
  <div class="form-panel">
    <div class="form-container">
      <form action="">
        <div class="form-content" id="a-form">
          <!-- .part  step 三種不同內容-->
          <div class="part part-delivery">
            <h4 class="title">寄送地址</h4>
            <div class="grid-row">
              <div class="form-row gird-salutation">
                <label for="">稱謂</label>
                <div class="select-wrapper">
                  <select
                    name="a-type"
                    id="a-type"
                    required
                    v-model="user.saluation"
                    @change="handelDataChange"
                  >
                    <option value="" disabled selected>稱謂</option>
                    <option value="male">先生</option>
                    <option value="female">小姐</option>
                  </select>
                </div>
              </div>
              <div class="form-row grid-name">
                <label for="">姓名</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    placeholder="姓名"
                    v-model="user.name"
                    @change="handelDataChange"
                  />
                </div>
              </div>
              <div class="form-row grid-phone">
                <label for="">電話</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    placeholder="請輸入行動電話"
                    v-model="user.phone"
                    @change="handelDataChange"
                  />
                </div>
              </div>
              <div class="form-row grid-email">
                <label for="">Email</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    placeholder="請輸入電子郵件"
                    v-model="user.email"
                    @change="handelDataChange"
                  />
                </div>
              </div>
              <div class="form-row grid-location">
                <label for="">縣市</label>
                <div class="select-wrapper">
                  <select
                    name="a-type"
                    id="a-type"
                    required
                    v-model="user.city"
                    @change="handelDataChange"
                  >
                    <option value="" disabled selected>縣市</option>
                    <option value="Taipei">台北</option>
                    <option value="Taoyuan">桃園</option>
                    <option value="Hsinchu">新竹</option>
                    <option value="Miaoli">苗栗</option>
                    <option value="Taichung">台中</option>
                  </select>
                </div>
              </div>
              <div class="form-row grid-address">
                <label for="">地址</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    placeholder="請輸入地址"
                    v-model="user.addr"
                    @change="handelDataChange"
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
  props:{
    initialUser:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      user: {
      },
    };
  },
  created() {
    this.fetchUser()
    this.handlePageOne();
  },
  methods: {
    fetchUser(){
      this.user = this.initialUser
    },
    handlePageOne() {
      this.$emit("sentPageOne");
    },
    handelDataChange() {
      const userData = this.user;
      this.$emit("handleDataChange", userData);
    },
  },
};
</script>

<style scoped>
.part-delivery .grid-row {
  padding: 0.5rem 0rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    "salutation name name name"
    "phone phone email email"
    "location address address address";
  grid-gap: 1rem;
}
.gird-salutation {
  grid-area: salutation;
}
.grid-name {
  grid-area: name;
}
.grid-phone {
  grid-area: phone;
}
.grid-email {
  grid-area: email;
}
.grid-location {
  grid-area: location;
}
.grid-address {
  grid-area: address;
}

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