<template>
  <div class="val">
  	 <el-row class='nav'>
       <el-col :span='4' class='left' @click.native='Return'>
       	  <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	  <span>返回</span>
       </el-col>
        <el-col :span='14' class='book'>跟"{{title}}"有关的书籍</el-col>
         <el-col :span="3" class='sj'><i class="el-icon-s-data"></i></el-col>
        <el-col :span='3' class='icon'><i class="el-icon-s-home"></i></el-col>
    </el-row>
    
    <el-row class='Content clearfix'>
  	   <el-col :span='23'  @click.native='gomy(item,{name:"book"})' class='sj' v-for='(item,index) in box' :key='index'>
  		  <div class="img">
  			 <img :src="'http://statics.zhuishushenqi.com' + item.cover"/>
  		  </div>
  		  <div class="title">{{item.title}}</div>
  		  <div class="name clearfix">
  			<span class="bt">{{item.author}}</span>
  			<span class="fle">|</span>
  			<span class="rq">{{item.cat}}</span>
  		  </div>
  		  
  		  <div class="nr">{{item.shortIntro}}</div>
  		  
  		   <div class="name clearfix">
  			<span class="bt"><span>{{item.wordCount}}</span>人气</span>
  			<span class="fle">|</span>
  			<span class="rq"><span>{{item.retentionRatio}}</span>%读者留存</span>
  		  </div>
  	  </el-col>
    </el-row>
    
    
  </div>
</template>

<script>
	export default{
		 name:'val',
		 data(){
		 	return {
		 		title:null,
		 		box:[]
		 	}
		 },
		 created(){
		 	 
		 	 this.title = JSON.parse(localStorage.getItem('title'))
		 	 
		 	 this.axios.get('api/book/fuzzy-search?query='+ this.title+'').then(r =>{
		 	 	console.log(r)
		 	 	 this.box = r.data.books
		 	 })
		 	 
		 	 
		 },
		 methods:{
		 	Return(){
		 		this.$router.go(-1)
		 	},
		 	gomy(item,path){
		 		 localStorage.setItem('class',JSON.stringify(item.cat))
  		   localStorage.setItem('id',JSON.stringify(item._id))
  		   console.log('item',item)
  		 this.$router.push(path)
		 	}
		 }
	}
</script>

<style lang="less" scoped>
   .nav{
		width: 100%;
		background-color:#b93321;
		.left{
			height: 50px;
			text-align:right ;
			i{
				font-size: 0.6rem;
				float: left;
				line-height: 50px;
			   margin-left: 8px;
			   color: #FFFFFF;
			}
			span{
				font-size: 0.25rem;
				float: left;
				line-height: 50px;
				margin-left: 3px;
				color: #FFFFFF;
			}
		}
		.book{
			font-size: 0.25rem;
			font-weight: bold;
			text-align: center;
			line-height: 50px;
			color: #FFFFFF;
		}
		.sj{
			font-size: 0.3rem;
			text-align: center;
			line-height: 50px;
			i{
				color: #FFFFFF;
			}
		}
		.icon{
			font-size: 0.3rem;
			text-align: center;
			line-height: 50px;
			i{
				color: #FFFFFF;
			}
		}
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
  		.name{
  			.bt{
  				float: left;
  				font-size: 0.2rem;
  				span{
  					color: #FF0000;
  				}
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
  		}
  		.nr{
  			font-size: 0.2rem;
  			color: #9B9B9B;
  			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			margin: 5px 0px;
  		}
  	 }		
  }
</style>