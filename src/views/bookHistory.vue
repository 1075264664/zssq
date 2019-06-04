<template>
  <div class="mybooks">
	 <div class="Hot">
  	    
  		<el-row class='Content clearfix'>
  			 <el-col :span='23' class='sj' @click.native='goState(item,{name: "Page"})' v-for='(item,index) in mate' :key='index'>
  			 	 <div class="img">
  			 	 	 <img :src="'http://statics.zhuishushenqi.com' + item.cover"/>
  			 	 </div>
  			 	 <div class="title">{{item.title}}</div>
  			 	 <div class="nr">最后阅读时间：{{item.time}}</div>
  			 	 <div class="name">阅读到第{{item.index + 1}}章</div>
  			 </el-col>
  		</el-row>
  	</div>
</div>
</template>

<script>
	export default{
		name:'bookHistory',
		data(){
			return {
				mate:[]
			}
		},
		created(){
			 
			    this.mate = JSON.parse(localStorage.getItem('getlist'))
			    console.log(this.mate)
			   
			    
		},
		methods:{
		 goState(item,path){
  		   
  		 localStorage.setItem('nr', JSON.stringify(item))
		   localStorage.setItem('id',JSON.stringify(item._id))
		   localStorage.setItem('index',JSON.stringify(item.index))
		   localStorage.setItem('Chapter',JSON.stringify(item.name))
		   this.$router.push(path)
  		   
  	       }
		}
	}
</script>

<style lang="less" scoped>
	.Hot{
  	background-color: #FFFFFF;
  	margin-top: 10px;
    font-size: 0.2rem;
  	.Content{
  		margin: 5px 15px;
  		.sj{
  			height: 90px;
  			 margin-bottom: 10px;
  			 border-bottom:1px solid #DDDDDD;
  		.img{
  			img{
  				width: 80px;
  				height: 80px;
  				float: left;
  				margin: 0px 5px;
  			}
  		}
  		.title{
  				font-size: 0.2rem;
  				font-weight: bold;
  			}
  		.nr{
  			height: 20px;
  			margin: 5px 0px;
  			font-size: 0.2rem;
  			max-height: 20px;
  			color: #9B9B9B;
  			overflow: hidden;
  			white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
  		}

  	 }	
  	 }
 }
</style>