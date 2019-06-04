<template>
	<div class="Thelist">
    <el-row class='nav'>
       <el-col :span='4' class='left' @click.native='Return'>
       	  <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	  <span>返回</span>
       </el-col>
        <el-col :span='14' class='book'>{{title}}</el-col>
         <el-col :span="3" class='sj'><i class="el-icon-s-data"></i></el-col>
        <el-col :span='3' class='icon'><i class="el-icon-s-home"></i></el-col>
    </el-row>
    
    <el-row class='sub-list'>
    	 <el-col :span='8' @click.native='getqh(item,index)' class='nav-list' v-for='(item,index) in list' :key='index'>
    	 	<span class="title">{{item.name}}</span>
    	 	<i :class="{active:item.active}"></i>
    	 </el-col>
    </el-row>
    
    
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
</template>

<script>
  export default{
  	name:'Thelist',
  	data(){
  		return {
  			title:null,
  			 list:[
  			 {name:'周榜',active:true},
  			 {name:'月榜',active:false},
  			 {name:'总榜',active:false}
  			 ],
  			 mate:[]
  		}
  	},
  	created(){
  	  
  	  console.log(this.$route.params.count)
  	     this.title = this.$route.params.count.title
		 this.axios.get('api/ranking/'+ this.$route.params.count._id+'').then(r => {
		 	this.mate = r.data.ranking.books
		 })
  	},
  	methods:{
  		Return(){
  			this.$router.go(-1)
  		},
  		getqh(item,index){
  			for(var i=0;i<this.list.length;i++){
  				if(this.list[i].active){
  					this.list[i].active = false
  					break
  				}
  			}
  			item.active = true
  			
  			if(index == 0){
  				 this.axios.get('api/ranking/'+ this.$route.params.count._id+'').then(r => {
		 	        this.mate = r.data.ranking.books
		       })
  			}else if(index == 1){
  				 this.axios.get('api/ranking/'+ this.$route.params.count.monthRank+'').then(r => {
		 	        this.mate = r.data.ranking.books
		      })
  			}else if(index == 2){
  				this.axios.get('api/ranking/'+ this.$route.params.count.totalRank+'').then(r => {
		 	        this.mate = r.data.ranking.books
		      })
  			}
  		},
  		goState(item,path){
  		
		   localStorage.setItem('class',JSON.stringify(item.majorCate))
		   localStorage.setItem('id',JSON.stringify(item._id))

  		   this.$router.push(path)
  		   
  	},
  	}
  }
</script>

<style lang="less" scoped>
.nav{
   width: 100%;
   background-color:#FF0000;
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
			font-size: 0.25rem;
			line-height: 50px;
			text-align: center;
			i{
				color: #FFFFFF;
			}
		}
		.icon{
			font-size: 0.25rem;
			line-height: 50px;
			text-align: center;
			i{
				color: #FFFFFF;
			}
		}
	}
	.sub-list{
		border-bottom: 1px solid #DDDDDD;
		.nav-list{
		 	 height: 50px;
		 	 font-size: 0.25rem;
		 	 text-align: center;
		 	 line-height: 50px;
		 	 position: relative;
		   span{
		   	 color:#a2a2a2;
		   }
		   .active{
		   	position: absolute;
		   	display: block;
		   	width: 100%;
		   	height: 2px;
		   	background-color: #b93321;
		   	bottom: -1px;
		   	
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
</style>