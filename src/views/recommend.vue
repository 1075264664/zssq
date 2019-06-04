<template>
	<div class="recommend">
	    <el-row class='nav'>
         <el-col :span='4' class='left' @click.native='Return'>
       	    <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	    <span>返回</span>
         </el-col>
         <el-col :span='16' class='book'>{{name}}</el-col>
           <el-col :span='4' class='icon'><i class="fa fa-bars"></i></el-col>
    </el-row>
    
  	<div class="Hot">
  		<el-row class='Content clearfix'>
  			 <el-col :span='23' class='sj' @click.native='goState(item,{name:"book"})' v-for='(item,index) in mate' :key='index'>
  			 	 <div class="img">
  			 	 	 <img :src="'http://statics.zhuishushenqi.com' + item.cover"/>
  			 	 </div>
  			 	 <div class="title">{{item.title}}</div>
  			 	 <div class="nr">{{item.shortIntro}}</div>
  			 	 <div class="nr">{{item.author}}</div>
  			 	 <div class="name">
  			 	 	 <span class="bt">{{item.minorCate}}</span>
  			 	 	 <span class="fle">|</span>
  			 	 	 <span class="rq"><span>{{item.latelyFollower}}</span>人气</span>
  			 	 	 <span class="ds">{{item.majorCate}}</span>
  			 	 </div>
  			 </el-col>
  		</el-row>
  	</div>
  </div>	
</template>

<script>
	export default{
		name:'recommend',
		data(){
			return{
				mate:[],
				name:null
			}
		},
		created(){
			this.name = this.$route.params.cla.name
			
			var sex = JSON.parse(localStorage.getItem('Sex'))
			
			this.axios.get('api/book/by-categories?gender='+ sex +'&type='+ this.$route.params.cla.type +'&major='+this.$route.params.cla.title+'&minor=&start=0&limit=20').then(r =>{
				 this.mate = r.data.books
			})
			
		},
		methods:{
			goState(item,path){
  		
  		   localStorage.setItem('class',JSON.stringify(item.majorCate))
  		   localStorage.setItem('id',JSON.stringify(item._id))

  		   this.$router.push(path)
  		   
  	       },
  	       Return(){
  	       	 this.$router.go(-1)
  	       }
		}
	}
</script>

<style lang="less" scoped>
.nav{
 	width: 100%;
    background-color:red;
    overflow: hidden;
	 .left{
		 height: 50px;
		 text-align:right ;
		   i{
	  		font-size: 0.6rem;
			  float: left;
		  	line-height: 50px;
  			margin-left: 8px;
			  color: #ecf0f1;
			}
			 span{
				font-size: 0.25rem;
				float: left;
				line-height: 50px;
				margin-left: 3px;
				color: #ecf0f1;
			}
		}
		.book{
			font-size: 0.2rem;
			font-weight: bold;
			text-align: center;
			line-height: 50px;
			color: #ecf0f1;
		}
		.icon{
			font-size: 0.3rem;
			text-align: center;
			i{
				color: #ecf0f1;
				line-height: 50px;
			}
		}
	}
	.Hot{
  	background-color: #FFFFFF;
  	margin-top: 5px;
    font-size: 0.2rem;
  	.bgcolor{
  		height:20px;
  		line-height: 20px;
  		 margin-top: 3px;
  		span{
  			 display: block;
  			 width: 5px;
  			 height: 15px;
  			 background:#DA6161;
  		}
  	}
  	.text{
  		font-size: 0.26rem;
  		font-weight: bold;
  	}
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
  	 .ck{
  	 	height: 40px;
  	 	font-size: 0.3rem;
  	 	text-align: center;
  	 	color: #FF0000;
  	 	border-bottom:1px solid #DDDDDD ;
  	 }
  	}
  }
</style>