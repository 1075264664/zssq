<template>
  <div class="mybooks">
	 <div class="Hot">
  	    
  		<el-row class='Content clearfix'>
  			 <el-col :span='23' class='sj' @click.native='goState(item,{name: "book"})' v-for='(item,index) in mate' :key='index'>
  			 	 <div class="img">
  			 	 	 <img :src="'http://statics.zhuishushenqi.com' + item.cover"/>
  			 	 </div>
  			 	 <div class="title">{{item.title}}</div>
  			 	 <div class="nr">{{item.shortIntro}}{{item.longIntro}}</div>
  			 	 <div class="nr">{{item.author}}</div>
  			 	 <div class="name">
  			 	 </div>
  			 </el-col>
  		</el-row>
  	</div>
	</div>
</template>

<script>
	export default{
		name:'mybooks',
		data(){
			return {
				mate:[]
			}
		},
		created(){
			 
			    this.mate = JSON.parse(localStorage.getItem('b'))
			    console.log(this.mate)
			    
			    
			    
		},
		methods:{
			  	goState(item,path){
  		   localStorage.setItem('class',JSON.stringify(item.majorCate))
  		   localStorage.setItem('id',JSON.stringify(item._id))
  		   this.$router.push(path)
  		   
  	}
		}
	}
</script>

<style lang="less" scoped>
.Hot{
  	background-color: #FFFFFF;
  	margin-top: 20px;
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
  			font-size: 0.2rem;
  			max-height: 20px;
  			color: #9B9B9B;
  			overflow: hidden;
  			white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
  		}
  		.name{
  			.bt{
  				float: left;
  				font-size: 0.2rem;
  			}
  			.fle{
  				float: left;
  				font-size: 0.2rem;
  				margin: 0px 8px;
  			}
  			.rq{
  				float: left;
  				font-size: 0.2rem;
  				span{
  					color: red;
  				}
  			}
  			.ds{
  				font-size: 0.2rem;
  				float: right;
  				color: orange;
  				border: 1px solid orange;
  			}
  		}
  	 }	
  	 }
 }
</style>