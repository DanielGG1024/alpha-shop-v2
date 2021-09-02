<template>
  <div id="app">
    <div class="main">
      <h1 class="main-title">結帳</h1>
      <div class="main-container">
        <div class="left-content">
          <Stepper :currentPage="currentPage" :prevPage="prevPage" />
          <router-view
            :initial-user="user"
            @deliveryStandard="deliveryStandard"
            @deliveryDhl="deliveryDhl"
            @sentPageOne="sentPageOne"
            @sentPageTwo="sentPageTwo"
            @sentPageThree="sentPageThree"
            @handleDataChange="handleDataChange"
          />
        </div>
        <div class="right-content">
          <Cart
            :cart="cart"
            :delivery="delivery"
            :total="total"
            @after-add="handleAmountAdd"
            @after-subtract="handleAmountSubtract"
          />
        </div>
        <div class="btn-panel">
          <div class="btn-container">
            <div class="btn-content" id="btn-control">
              <button
                class="btn btn-prev"
                @click.prevent.stop="handlePrevPage"
                v-show="currentPage > 1"
              >
                上一步
              </button>
              <button
                class="btn btn-next"
                @click.prevent.stop="handleNextPage"
                v-if="currentPage < 3"
              >
                下一步
              </button>
              <button
                v-else
                class="btn-complete"
                data-bs-target="#exampleModal"
                data-bs-toggle="modal"
                @click.prevent.stop="handleSubmit"
              >
                確認下單
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <p>{{ user }}</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Stepper from "./components/Stepper";
import Cart from "./components/Cart";

const dummyData = [
  {
    id: 1,
    name: "破壞補釘修身牛仔褲",
    amount: 1,
    price: 3999,
    // ??
    image: require("./assets/1.png"),
    // ??
  },
  {
    id: 2,
    name: "刷色直筒牛仔褲",
    amount: 1,
    price: 1299,
    image: require("./assets/2.png"),
  },
];

export default {
  name: "App",
  components: {
    Stepper,
    Cart,
  },
  data() {
    return {
      cart: [],
      delivery: "免費",
      total: 0,
      currentPage: 1,
      prevPage: 0,
      user: {
        saluation: "",
        name: "",
        phone: "",
        email: "",
        city: "",
        addr: "",
        shippingFee: 0,
        ccname: "",
        cardnumber: "",
        expdate: "",
        cvv: "",
        totalPrice: "",
      },
    };
  },
  created() {
    this.fetchCart();
    this.fetchUser();
    // ??
    this.totalAmount();
  },
  methods: {
    fetchUser() {
      const localData = JSON.parse(localStorage.getItem("localData"));
      if (localData) {
        this.user = localData;
      }
    },
    fetchCart() {
      const cartData = JSON.parse(localStorage.getItem("cartData"))||dummyData;
      this.cart = cartData
    },
    handleNextPage() {
      const nextPage = this.currentPage + 1;
      this.currentPage += 1;
      this.prevPage += 1;
      this.$router.push("/alphashop/" + nextPage);
    },
    handlePrevPage() {
      const prevPage = this.currentPage - 1;
      this.currentPage -= 1;
      this.prevPage -= 1;
      this.$router.push("/alphashop/" + prevPage);
    },
    handleAmountAdd(id) {
      this.cart = this.cart.map((item) => {
        if (item.id === id) {
          item.amount += 1;
          this.totalAmount();
          localStorage.setItem('cartData',JSON.stringify(this.cart))
          
        }
        return item;
      });
    },
    handleAmountSubtract(id) {
      this.cart = this.cart.map((item) => {
        if (item.id === id && item.amount > 1) {
          item.amount -= 1;
          this.totalAmount();
          localStorage.setItem('cartData',JSON.stringify(this.cart))
        }
        return item;
      });
    },
    deliveryStandard() {
      this.user.shippingFee = 0;
      this.delivery = "免費";
      localStorage.setItem("localData", JSON.stringify(this.user));
      this.totalAmount();
    },
    deliveryDhl() {
      this.user.shippingFee = 500;
      this.delivery = 500;
      localStorage.setItem("localData", JSON.stringify(this.user));
      this.totalAmount();
    },
    totalAmount() {
      let itemsPrice = 0;
      let deliveryPrice = 0;
      if (isNaN(Number(this.delivery))) {
        deliveryPrice = 0;
        this.delivery = "免費";
      } else {
        deliveryPrice = this.delivery;
      }
      this.cart.map((item) => {
        itemsPrice += item.amount * item.price;
      });
      this.total = itemsPrice + deliveryPrice;
    },
    sentPageTwo() {
      this.currentPage = 2;
      this.prevPage = 1;
    },
    sentPageThree() {
      this.currentPage = 3;
      this.prevPage = 2;
    },
    sentPageOne() {
      this.currentPage = 1;
      this.prevPage = 0;
    },
    handleDataChange(userData) {
      this.user = userData;
      localStorage.setItem("localData", JSON.stringify(userData));
    },
    handleSubmit() {
      this.user = {
        ...this.user,
        totalPrice: this.total,
      };
    },
  },
};
</script>

<style>
#app {
  width: 100%;
}
* {
  margin: 0;
  padding: 0;
}
.main {
  width: 90%;
  margin: 0 auto;
}
.main-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    "left right"
    "left right"
    "left right"
    "left right"
    "btn right";
}
.left-content {
  padding: 0 1.5rem;
  grid-area: left;
}
.right-content {
  padding: 0 1.5rem;
  margin-top: 2.5rem;
  grid-area: right;
}
.main-title {
  font-size: 2rem;
  padding: 1.5rem;
}
.title {
  font-size: 1.5rem;
  padding: 1.5rem 0;
}
.btn-panel {
  margin-top: 20px;
  grid-area: btn;
}
.btn-container {
  padding: 1rem 1.5rem;
  height: 100%;
}
.btn-content {
  position: relative;
  padding-top: 1rem;
  border-top: 1px solid #a7aaaf;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.btn-container button {
  width: 35%;
  border-radius: 5px;
  font-size: 16px;
  padding: 8px;
  height: 40px;
  border: none;
  cursor: pointer;
}
.btn-prev {
  text-align: left;
  background-color: transparent;
}
.btn-prev::before {
  content: "←";
  margin-right: 1rem;
}
.btn-next,
.btn-complete {
  position: absolute;
  right: 0;
  top: 16px;
  bottom: 16px;
  background-color: #f67599;
  color: white;
  border: none;
}
.btn-next::after {
  content: "→";
  margin-left: 1rem;
}

input {
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
  padding: 8px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  /* min-width: 100%;
    max-width: 100%; */
}
input[type="text"] {
  width: 100%;
  background-color: transparent;
}
input[type="text"]::placeholder {
  color: gray;
}
input[type="radio"] {
  cursor: pointer;
  -webkit-appearance: none;
  border-radius: 50%;
}
input[type="radio"]:checked {
  box-shadow: inset 0 0 0 5px #2a2a2a;
}
.select-wrapper {
  position: relative;
}
.select-wrapper::after {
  content: "";
  border-style: solid;
  border-width: 6px 4px 0 4px;
  border-color: gray transparent transparent transparent;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  z-index: -1;
}
select {
  border: 1px solid #808080;
  border-radius: 5px;
  font-size: 16px;
  padding: 8px;
  -webkit-appearance: none;
  background-color: transparent;
  width: 100%;
}
select:invalid {
  color: #808080;
}
.form-row > label {
  height: 21px;
  display: block;
  margin: 3px 0;
  font-weight: 600;
  color: #808080;
  padding-bottom: 0.5rem;
}
.none {
  display: none;
}
</style>
