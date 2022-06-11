<template>
  <div>
    <div class="msg">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'home~~~~',
    }
  },
}
</script>

<style lang="scss" scoped>
.msg {
  color: $color;
  font-size: $font-size;
}
</style>
