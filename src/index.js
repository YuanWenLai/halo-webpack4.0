import Vue from 'vue'
import App from './app.vue'

// 引入主页的css
import "./assets/index.css"


// 初始化vue
// new Vue({
//   render: h=> h(App)
// }).$mount("#app")

const init = () => {
  /* eslint-disable no-new */
  new Vue({ el: '#app', render: h => h(App) })
}

init()
