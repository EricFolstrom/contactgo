<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/"><img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="200" height="125" /></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
  import { RouterLink, RouterView } from 'vue-router'

  export default{
    name: "app",
    data(){
      return {
        RouterLink,
        RouterView
      }
    }
  }
</script>

<style scoped>

</style>
