<template>
  <div class="home">
  	<!--头部-->
  	<div class="nav">
  		<el-row>
			  <el-col :span="8"><div class="grid-content bg-purple-dark title">{{title}}</div></el-col>
			  <el-col :span="10" class='sex'>
			  	<div class="el">
			  	   <span :class="item.active?'active':'0'" v-for="(item,index) in sex" :key='index' @click="getsex(item)">{{item.name}}</span>
			  	</div>
			  </el-col>
			  <el-col :span="3"><div class="grid-content bg-purple-dark title "><i class="el-icon-s-data"></i><span class="icon-name"></span></div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple-dark title"><i class="fa fa-user-o" aria-hidden="true"></i></div></el-col>
		 	</el-row>
  	</div>
  	
  	<!--搜索-->
  	<div class="Search">
  		 <el-row>
  		 	 <el-col :span='24' class='box' @click.native='go({name:"search"})'>
  		 	 	<div>
  		 	 	<div class="titlew" v-for="(item,index) in inp" :key='index' >{{item.name}}</div>
  		 	 	<div class="search"><i class="fa fa-search" aria-hidden="true"></i></div>
  		 	 	</div>
  		 	 </el-col>
  		 </el-row>
  	</div>
  	
  	<!--轮播图-->
    <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="(item,index) in img" :key="index">
        	 <img :src="item.url" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  	
  	<!--图标-->
  	<div class="count">
  		  <el-row>
  		  	 <el-col :span='22' class='Content'>
  		  	 	 <el-col :span='6'   v-for='(item,index) in Content' :key='index' @click.native='gomy(item)'>
  		  	 	 	<div class="icon" :style="{background:item.back}">
  		  	 	 		 <i :class="item.icon" :style="{color:item.color}"></i>
  		  	 	 	</div>
  		  	 	 	<div class="title">{{item.name}}</div>
  		  	 	 </el-col>
  		  	 
  		  	 </el-col>
  		  </el-row>
  	</div>
  	<!--最近阅读-->
  	<div class="Read">
  		  <el-row>
  		     <el-col :span='24'>
  		     	  <el-col :span='22' class='box'  v-for="(item,index) in getlist" :key='index'  @click.native='goState(item,{name: "Page"})'>
  		     	  	<span>最近阅读</span>
  		     	  	<span class="margin">|</span>
  		     	     	 <span class="title">{{item.title}}</span>
  		     	     	 <span class="title">第{{item.index + 1}}章</span>
  		     	  </el-col>
  		     </el-col>
  		  </el-row>
  	</div>
  	
     
      <div>
      	 <router-view></router-view>
      </div> 
     
  </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
  name: "home",
  data(){
  	return{
  		 mate:[],
  		 issex:true,
  		 count:[],
  		 txt:[],
  		 Okami:[],
  		 sex:[
  		   {name:'男生',active:true,path:{name:'male'},type:'male'},
  		   {name:'女生',	active:false,path:{name:'female'},type:'female'}
  		 ],
  		  inp:[
  		  {name:'元尊'},
  		  {name:'圣墟'},
  		  {name:'百练成神'},
  		  {name:'神魂丹帝'}
  		 ],
  		 Content:[
  	 	 	{name:'书架',back:'rgb(230,239,253)',icon:'fa fa-book',color:'#7badf2',path: {name:'mybooks'}},
  	 	 	{name:'排行',back:'rgb(222,240,218)',icon:'fa fa-line-chart',color:'#71cf63',path:{name:'ranking'}},
  	 	 	{name:'MVP',back:'rgb(255,240,217)',icon:'fa fa-university',color:'#fec224',path:{name:'mybooks'}},
  	 	 	{name:'充值',back:'rgb(246,235,241)',icon:'fa fa-credit-card',color:'#ffb8ba',path:{name:'mybooks'}}
  	 	 ],
  	 	 a:[],
  	 	 getlist:[]
  	}
  },
  created(){
  	  
  	   this.axios.get('api/book/by-categories?gender=male&type=hot&major=玄幻&minor=&start=0&limit=20').then(r =>{
  	   	
  	   	console.log(r)
  	   	  
  	   	    this.mate = r.data.books
  	   	    this.mate = this.mate.splice(0,4)
  	   	    
  	   	    this.count = r.data.books.splice(7,1)
  	   })
  	   
  	   this.axios.get('api/book/by-categories?gender=male&type=hot&major=都市&minor=&start=0&limit=20').then(r =>{
  	   	   
  	   	    this.txt = r.data.books
  	   	    this.txt = this.txt.splice(0,3)
  	   	    
  	   	    this.Okami = r.data.books
  	   	    this.Okami = this.Okami.splice(3,4)
  	   })
  	   
  	   
  	   this.getlist = JSON.parse(localStorage.getItem('getlist'))
	     this.getlist = this.getlist.splice(0,1)
	     
  	   
  	  
  	   
  	   
  	   var num = localStorage.getItem('Sex')
       this.a = num == undefined?[]:JSON.parse(num)
       
        var a = 'male'
        localStorage.setItem('Sex',JSON.stringify(a))
  },
  computed:{
  	...mapState({
  		title:'title',
  		 getend:'getend',
  		 img:'img'
  	})
  },
  
  mounted(){
  },
  methods:{
  	go(path){
  		 this.$router.push(path)
  	},
  	goState(item,path){
  		
		 localStorage.setItem('nr', JSON.stringify(item))
		   localStorage.setItem('id',JSON.stringify(item._id))
		   localStorage.setItem('index',JSON.stringify(item.index))
		   localStorage.setItem('Chapter',JSON.stringify(item.name))
  		 this.$router.push(path)
  	},
  	gomy(item){
  		this.$router.push(item.path);
  	},
  	
   getsex(item){
     
     for(var i=0;i<this.sex.length;i++){
     	 if(this.sex[i].active){
     	 	 this.sex[i].active = false
     	 	 break;
     	 }
     }
     item.active = true;
     this.$router.push(item.path)
     
     this.a = item.type
     
     console.log(this.a)
     
      var num = JSON.parse(localStorage.getItem('Sex'))
  		 
  		 localStorage.setItem('Sex',JSON.stringify(this.a))
  	},
  	
  }
};
</script>

<style lang="less" scoped>
 .home{
 	height: 100%;
 	background-color: #DDD;
 }
.nav{
	height: 50px;
	line-height: 50px;
	font-size: 0.30rem;
	background-color: rgb(184,51,34);
	.title{
		color: #fff;
		margin-left: 8px;
		}
		.sex{
			.el{
				width: 100px;
				height: 30px;
				border: 1px solid #fff;
				border-radius: 10px;
				margin-top: 10px;
				overflow: hidden;
				span{
					width: 50%;
					height: 100%;
					float: left;
					font-size: 0.30rem;
					line-height: 30px;
					text-align: center;
          border: 1px solid #ddd;
          box-sizing: border-box;
          
				}
				.active{
					background-color:#fff;
				}
			}
			
		}
		
}
.block{
	img{
		width: 100%;
		height: 100%;
	}
}
.Search{
	background-color: #FFFFFF;
	>div{
		 height: 40px !important;
		 font-size: 0.3rem;
		 >div{
		 	width: 95%;
		 	height: 30px;
		 	border: 1px solid #DDDDDD;
		 	border-radius: 10px;
		 	margin-left: 8px;
		 	margin-top: 5px;
		 	margin-bottom: 3px;
		 	background-color: rgb(233,233,233);
		 	position: absolute;
		 	overflow:hidden;
		 }
		 .titlew{
		 	width: 80%;
		 	color: rgb(153,153,153);
		 	height: 30px;
		 	margin-left: 8px;
		 	margin-top: 1px;
		 	box-sizing: border-box;
		 }
		 .search{
		 		position: absolute;
		 		top: 0;
		 		right: 10px;
		 	 i{
		 	 color: #ddd;
		 	 }
		 }
	}
}

  
  .count{
  	height: 100px;
  	background-color: #FFFFFF;
  	border-bottom:2px solid #f3f3f3;
  	.Content{
  		margin-left: 8px;
  		.icon{
  			 width: 50px;
  			 height: 50px;
  			 border: 1px solid #DDDDDD;
  			 border-radius: 100%;
  			 margin: 10px auto;
  			 position: relative;
  			 i{
  			 	position: absolute;
  			 	display: block;
  			 	width: 100%;
  			 	font-size: 0.4rem;
  			 	left: 25%;
  			 	top: 25%;
  			 	
  			 }
  		}
  		.title{
  			 font-size: 0.12rem;
  			 text-align: center;
  			 margin-left: 2px;
  		}
  	}
  }
  
  .Read{
  	background-color: #FFFFFF;
  	font-size: 0.24rem;
  	height: 30px;
  	padding: 10px 0px;
  	border-bottom:2px solid #f3f3f3;
  	.box{
  		margin-left: 15px;
  		span{
  			display: block;
  			float: left;
  			line-height: 30px;
  			margin: 0px 5px;
  		}
  		.margin{
  			margin: 0px 10px;
  			color: #9b9b9b;
  		}
  		.title{
  			font-size: 0.2rem;
  			margin: 0px 5px;
  			color:#da6161;
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
  
  .end{
  	.tag-list{
  		 height: 50px;
  		
  		.tag-but{
  			height: 50px;
  			margin: 5px 20px;
  			span{
  				display: block;
  				width: 55px;
  				line-height:40px;
  				font-size: 0.3rem;
  				color:#FFFFFF;
  				float: left;
  				text-align: center;
  				margin-left: 20px;
  			}
  		}
  	}
  	.sub-list{
  		border-bottom: 1px solid #D3DCE6;
  			.list{
  				font-size: 0.2rem;
  				margin: 0px 20px 10px 20px;
  				line-height: 15px;
  				
  				.bq{
  					width: 20px;
  					color: orange;
  					border: 1px solid orange;
  				}
  				.title{
  					margin:0px 10px;
  					font-weight: 100;
  				}
  				.nr{
  					width: 100%;
  					margin-top: 7px;
  					color: #9B9B9B;
  					white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
  				}
  			}
  		}
  		.sub-ck{
  			 .ck{
  			 	 line-height:40px;
  	 				font-size: 0.3rem;
  	 				text-align: center;
  	 				color: #FF0000;
  	 				border-bottom:1px solid #DDDDDD ;
  			 }
  		}
  }
  
	
</style>