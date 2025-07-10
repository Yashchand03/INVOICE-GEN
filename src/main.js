import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import components
import LandingPage from './components/LandingPage.vue'
import CreateInvoice from './components/CreateInvoice.vue'
import EditInvoice from './components/EditInvoice.vue'
import HistoryPage from './components/HistoryPage.vue'

// Define routes
const routes = [
  { path: '/', component: LandingPage },
  { path: '/create', component: CreateInvoice },
  { path: '/edit/:id', component: EditInvoice },
  { path: '/history', component: HistoryPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app') 