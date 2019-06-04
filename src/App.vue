<template>
  <div id="app">
 
    <router-view />
  </div>
</template>

<script>
	import rem from './utils/rem.js';
	
	export default {
		name: 'app',

		mounted() {
			rem();
		}
	}
</script>

<style lang="less">
body{
		margin: 0 auto;
	}

	ul{
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.auto-img{
		width: 100%;
		display: block;
	}

	input{
		padding: 0;
		margin: 0;
		border: none;
		outline: none;
		background-color: transparent;
	}

	.fl{
		float: left;
	}

	.fr{
		float: right;
	}

	.clearfix{
		overflow: hidden;
	}

	.one-text{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
