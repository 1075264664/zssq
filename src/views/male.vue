<template>
  <div class="male">
  	<div class="Hot">
  		<el-row>
  			 <el-col :span='1' class='bgcolor'><span></span></el-col>
  			 <el-col :span='23' class='text'>男生热门</el-col>
  		</el-row>
  		<!--小说-->
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
  			 <el-col :span='24' class='ck' @click.native='go({name:"recommend",params:{cla:clahot}})'>查看更多></el-col>
  		</el-row>
  	</div>
     
    <!--完结-->
    <div class="Hot end">
    	<el-row>
  			 <el-col :span='1' class='bgcolor'><span></span></el-col>
  			 <el-col :span='23' class='text'>男生完本</el-col>
  		</el-row>
  		
  		<el-row class='tag-list'>
  			 <el-col :span='20' class='tag-but' @click.native='gomy({name:"category"})'>
  			 	 <span :style="{background:item.back}" @click="add(index)" v-for="(item,index) in getend" :key='index'>{{item.name}}</span>
  			 </el-col>
  		</el-row>
  		 
  		<el-row class='Content'>
          <el-col :span='23' @click.native='goState(item,{name:"book"})' class='sj' v-for='(item,index) in count' :key='index'>
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
  		
  		<el-row class='sub-list'>
  			 	<el-col :span='23' @click.native='goState(item,{name:"book"})' v-for='(item,index) in txt' :key='index'>
  			 	  <div class="list">
  			 	  	 <span class='bq'>{{item.majorCate}}</span>
  			 	  	 <span class="title">{{item.author}}</span>
  			 	  	 <span class="name">{{item.title}}</span>
  			 	  	 <p class="nr">{{item.shortIntro}}</p>
  			 	  </div>
  			 </el-col>
  		</el-row>
  		
  		<el-row class='sub-ck'>
  			 <el-col :span='24' class='ck' @click.native='go({name:"recommend",params:{cla:claover}})'>查看更多></el-col>
  		</el-row>
  		
    </div>
    
    <!--大神-->
    <div class="Hot">
  		<el-row>
  			 <el-col :span='1' class='bgcolor'><span></span></el-col>
  			 <el-col :span='23' class='text'>男生大神区</el-col>
  		</el-row>
  		<!--小说-->
  		<el-row class='Content clearfix'>
  			 <el-col  @click.native='goState(item,{name:"book"})' :span='23' class='sj' v-for='(item,index) in Okami' :key='index'>
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
  			 <el-col :span='24' class='ck' @click.native='go({name:"recommend",params:{cla:clanew}})'>查看更多></el-col>
  		</el-row>
  	</div>
 </div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:'male',
		 data(){
  	return{
  		 mate:[],
  		 count:[],
  		 txt:[],
  		 Okami:[],
  		 getend:[
  		   {name:'都市',back:'#90c5f0'},
  		   {name:'仙侠',back:'#f6bc7e'},
  		   {name:'玄幻',back:'#67ccb7'},
  		   {name:'科幻',back:'#f6d3d3'}
  		 ],
  		 
  		 a:[],
  		 clahot:{name:'男生热门',type:'hot',title:'玄幻'},
  		 claover:{name:'男生完本',type:'over',title:'都市'},
  		 clanew:{name:'男生大神区',type:'new',title:'玄幻'}

  	}
  },
  created(){
  		  
  	   this.axios.get('api/book/by-categories?gender=male&type=hot&major=玄幻&minor=&start=0&limit=20').then(r =>{
  	   	  
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
  	   
  	   var num = localStorage.getItem('Label')
       this.a = num == undefined?[]:JSON.parse(num)
  	
  },
  computed:{
  	...mapState({
  		 title:'title',
  		 img:'img'
  	})
  },
  
  mounted(){
  	this.txtCount()
  },
  methods:{
  	  go(path,){
				
				this.$router.push(path)
			},
  	goState(item,path){
  		
  		   localStorage.setItem('class',JSON.stringify(item.majorCate))
  		   localStorage.setItem('id',JSON.stringify(item._id))

  		   this.$router.push(path)
  		   
  	},
  	gomy(path){
  		this.$router.push(path);
  	},
  	add(index){
  		 
  		  this.a = this.getend[index].name
  		  
  		 
  		 var num = JSON.parse(localStorage.getItem('Label'))
  		 
  		 localStorage.setItem('Label',JSON.stringify(this.a))
  	},
    txtCount(){
    	
    	 var dom = document.querySelectorAll('.text')
    	 
    	 var ck = document.querySelectorAll('.ck')
    	 
    	 for(var i=0;i<dom.length;i++){
    	 	   for(var k=0;k<ck.length;k++){
    	 		  if(i == k){}
    	 	 }
    	 }
    	
    }
  }
};
</script>

<style lang="less" scoped>
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
  			height: 55px;
  			margin: 10px 20px 5px 20px;
  			text-align: center;
  			
  			span{
  				display: block;
  				font-size: 0.3rem;
  				color:#FFFFFF;
  				float: left;
  			  padding: 5px 5px;
  				margin-left: 30px;
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