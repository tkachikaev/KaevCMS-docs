import DefaultTheme from 'vitepress/theme'
import ModuleCatalog from './components/ModuleCatalog.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ModuleCatalog', ModuleCatalog)
  }
}
