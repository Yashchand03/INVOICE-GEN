<template>
  <div v-if="visible" class="drawer-overlay" @click.self="closeDrawer">
    <nav class="drawer">
      <button class="drawer-close" @click="closeDrawer" aria-label="Close menu">×</button>
      <router-link to="/" class="drawer-link" @click="closeDrawer">Home</router-link>
      <router-link to="/create" class="drawer-link" @click="closeDrawer">Create Invoice</router-link>
      <router-link to="/history" class="drawer-link" @click="closeDrawer">History</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SideMenuDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDrawer() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 2000;
  display: flex;
}
.drawer {
  width: 260px;
  max-width: 80vw;
  background: #fff;
  height: 100%;
  box-shadow: 2px 0 16px rgba(0,0,0,0.08);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  animation: slideIn 0.25s cubic-bezier(.4,0,.2,1);
}
.drawer-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #374151;
  cursor: pointer;
}
.drawer-link {
  text-decoration: none;
  color: #2563eb;
  font-size: 1.15rem;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.2s;
}
.drawer-link:hover {
  color: #1e40af;
}
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
</style> 