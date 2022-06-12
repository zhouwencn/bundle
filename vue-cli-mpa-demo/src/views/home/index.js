import index from './index.vue'
// import Vue from 'vue'
import '@/assets/css/reset.css'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'
import {
  Lazyload,
  Checkbox,
  CheckboxGroup,
  Button,
  Image as VanImage,
  Icon,
  Tabbar,
  TabbarItem,
  Toast,
  Form,
  Field,
  Switch,
  RadioGroup,
  Radio,
  Popup,
  Area,
} from 'vant'
// }
Vue.use(Button)
  .use(VanImage)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Lazyload)
  .use(Icon)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Form)
  .use(Field)
  .use(Switch)
  .use(RadioGroup)
  .use(Radio)
  .use(Popup)
  .use(Area)
async function init() {
  // let baseUrl
  // if (process.env.VUE_APP_MODE === 'production') {
  //   const result = await getServerConfig()
  //   baseUrl = result
  // } else {
  //   baseUrl = process.env
  // }
  // const api = _apiGenerator(apiConfig, baseUrl)
  // Vue.prototype.$api = api
  // Vue.prototype.$baseUrl = baseUrl
  // Vue.config.productionTip = false
  new Vue({
    render: (h) => h(index),
  }).$mount('#app')
}
init()
