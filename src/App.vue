<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<style lang="scss">
body {
  background-color: $color-brand-background;
}

#app {
  font-family: "Ubuntu", "Helvetica Neue", Helvetica, Arial, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text;
  padding: 1em 1em;
  max-width: 1100px;
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    padding: 2em 4em;
  }
}
</style>
