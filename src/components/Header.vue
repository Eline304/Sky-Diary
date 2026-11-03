<script lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/trips">Trips</RouterLink>
    </header>
</template>

<style scoped>
header a {
  color: white;
  text-decoration: none;
}

header {
  background-color: #00A1E4;
  display: flex;
  justify-content: center;
  gap: 40px;
  font-size: 2em;
  padding: 1em 0em;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 4px 16px 16px #9ab0b9;

}

a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
    header {
      font-size: 1em;
      padding: 1em 0em;
    }
}

</style>
