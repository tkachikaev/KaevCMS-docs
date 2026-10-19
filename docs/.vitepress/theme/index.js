import DefaultTheme from 'vitepress/theme'
import ModuleCatalog from './components/ModuleCatalog.vue'
import HomeLanding from './components/HomeLanding.vue'
import './custom.css'
import './home.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ModuleCatalog', ModuleCatalog)
    app.component('HomeLanding', HomeLanding)
  }
}
