<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">
          💳 Система Платежі
        </router-link>

        <div class="navbar-nav flex-row flex-wrap gap-3">
          <router-link class="nav-link" to="/">
            Головна
          </router-link>
          <router-link class="nav-link" to="/accounts">
            Мої рахунки
          </router-link>
          <router-link class="nav-link" to="/payments">
            Платежі
          </router-link>
          <router-link class="nav-link" to="/admin">
            Адміністрування
          </router-link>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #f5f7fb;
  font-family: Arial, sans-serif;
}

.navbar .nav-link {
  color: rgba(255, 255, 255, 0.85);
}

.navbar .nav-link:hover,
.navbar .router-link-active {
  color: white;
}
</style>

