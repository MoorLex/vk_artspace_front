import ObserveVisibility from './utils/visibility'
import PullToRefresh from './utils/pullToRefresh'
import Bridge from '@vkontakte/vk-bridge'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import profile from './store/profile'
import config from './store/config'
import './utils/localeMoment'
import './index.css'

const schemeAttribute = document.createAttribute('scheme')
document.body.attributes.setNamedItem(schemeAttribute)

Bridge.send("VKWebAppInit").then(() => {})
Bridge.subscribe(({ detail: { type, data }}) => {
  if (type === 'VKWebAppUpdateConfig') {
    config.theme = data.scheme ? data.scheme : 'client_light'

    schemeAttribute.value = config.theme
    document.body.attributes.setNamedItem(schemeAttribute);
  }

  if (type === 'VKWebAppViewRestore') {
    schemeAttribute.value = config.theme

    profile.login()
  }
})

schemeAttribute.value = config.theme

const app = createApp(App)

app.use(ObserveVisibility)
app.use(PullToRefresh)

app.use(router)
app.mount('#app')
