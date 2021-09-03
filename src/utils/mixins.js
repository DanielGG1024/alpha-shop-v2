export const saveData = {
  methods: {
    saveDataToLocal() {
      console.log('mixins')
      localStorage.setItem("cartData", JSON.stringify(this.cart));
      localStorage.setItem("localData", JSON.stringify(this.user));
    }
  }
}