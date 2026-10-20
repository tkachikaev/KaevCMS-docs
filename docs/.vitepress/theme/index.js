import DefaultTheme from 'vitepress/theme'
import ModuleCatalog from './components/ModuleCatalog.vue'
import ReleaseCatalog from './components/ReleaseCatalog.vue'
import AssetGallery from './components/AssetGallery.vue'
import HomeLanding from './components/HomeLanding.vue'
import ThemeLayout from './ThemeLayout.vue'
import './custom.css'
import './releases.css'
import './gallery.css'
import './home.css'

export default {
  extends: DefaultTheme,
  Layout: ThemeLayout,
  enhanceApp({ app }) {
    app.component('ModuleCatalog', ModuleCatalog)
    app.component('ReleaseCatalog', ReleaseCatalog)
    app.component('AssetGallery', AssetGallery)
    app.component('HomeLanding', HomeLanding)
  }
}
