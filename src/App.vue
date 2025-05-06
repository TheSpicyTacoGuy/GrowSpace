<script setup>
import NavTitleBar from "./components/NavTitleBar.vue";
import MainFooter from "./components/MainFooter.vue";
import MoveToTopBtn from "./components/MoveToTopBtn.vue";
</script>

<template>
  <header class="header-wrapper w-100">
    <NavTitleBar />
  </header>
  <main>
    <div id="page-content" class="container-fluid px-3 mx-auto">
      <div style="min-height: 70vh" class="py-4">
        <router-view v-slot="component">
          <transition appear name="fade" mode="out-in">
            <component :is="component.Component" class="w-100" />
          </transition>
        </router-view>
      </div>
      <MainFooter />
      <MoveToTopBtn />
    </div>
  </main>
</template>
