<template>
  <div id="editor--app">
    <div>Foo</div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
  #editor--app {
    width: 100%;
    height: 100%;
    background: red;

    display: flex;
    flex-direction: column;

    div {
      background: purple;
    }
  }
</style>