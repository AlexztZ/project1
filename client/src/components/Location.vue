<template>
  <div class="header">
      <div class="address_map" @click="$router.push('/address')">
          <i class="iconfont iconicon-dibiao"></i>
          <span>{{$store.state.location.formattedAddress}}</span>
          <i class="iconfont iconsanjiaojiantou1"></i>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Location',
  props:{},
  data() {
  	return {
	}
  },
  components: {},
  mounted() {
	this.$store.dispatch("getformattedAddress");
  },
  updated() {},
  methods: {}
}
</script>

<style scoped>
.header,
        .search_wrap {
            background-color: #009eef;
            padding: 10px 16px;
        }
        .header .address_map {
            color: #fff;
            font-weight: bold;
        }
</style>
