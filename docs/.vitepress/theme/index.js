import DefaultTheme from 'vitepress/theme'
import ModuleCatalog from './components/ModuleCatalog.vue'
import HomeLanding from './components/HomeLanding.vue'
import ThemeLayout from './ThemeLayout.vue'
import './custom.css'
import './home.css'

export default {
  extends: DefaultTheme,
  Layout: ThemeLayout,
  enhanceApp({ app }) {
    app.component('ModuleCatalog', ModuleCatalog)
    app.component('HomeLanding', HomeLanding)
  }
}
