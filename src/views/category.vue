<template>
    <div class="category">
	  <el-row class='nav'>
         <el-col :span='4' class='left' @click.native='Return'>
       	    <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	    <span>返回</span>
         </el-col>
         <el-col :span='14' class='book'>{{title}}</el-col>
           <el-col :span="3" class='sj'><i class="el-icon-s-data"></i></el-col>
         <el-col :span='3' class='icon'><i class="el-icon-s-home"></i></el-col>
    </el-row>
    
    <el-row class='inner'>
    	<el-col :span='24'>
    		<span :class='{active:item.active}' @click='getcolor(item)' v-for="(item,index) in hot" :key='index'>{{item.name}}</span>
    	</el-col>
    </el-row>
    
    <el-row class='minor'>
    	<el-col :span='24'>
    		<span  class="red" @click="Changecolor(item,index)" v-for="(item,index) in nav" :key='index'>{{item}}</span>
    	</el-col>
    </el-row>
    

    <el-row class='Content clearfix'>
  	   <el-col :span='23' @click.native='gomy(item,{name:"book"})'  class='sj' v-for='(item,index) in minorCate' :key='index'>
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
  		  </div>
  	  </el-col>
    </el-row>
    
    <el-row v-show='isnav'>
    	<el-col class='gx' :span='24'>暂未更新</el-col>
    </el-row>
</div>
</template>

<script>
	export default{
	  name:'category',
	  data(){
	  	return{
	  	  title:null,
	  	  hot:[
	  	  {name:'热门',active:true,type:'hot'},
	  	  {name:'新书',active:false,type:'new'},
	  	  {name:'好评',active:false,type:'repulation'},
	  	  {name:'完结',active:false,type:'over'},
	  	  {name:'包月',active:false,type:'month'}
	  	  ],
	  	  nav:[],
	  	  type:null,
	  	  fun:'hot',
	  	  major:'都市生活',
	  	  minorCate:[],
	  	  isnav:false
	  	}
	  	
	  	
	  },
	  created(){
	  	var a = JSON.parse(localStorage.getItem('Sex'))
	  	this.title = JSON.parse(localStorage.getItem('Label'))
	  	this.axios.get('api/cats/lv2').then(r =>{
	  	     for(var i=0;i<r.data.male.length;i++){
	  	     	if(r.data.male[i].major == this.title){
	  	     		this.nav = r.data.male[i].mins
	  	     		this.major = this.nav[0]
	  	     	}
	  	     }
	  	      for(var i=0;i<r.data.female.length;i++){
	  	     	if(r.data.female[i].major == this.title){
	  	     		this.nav = r.data.female[i].mins
	  	     		 this.major = this.nav[0]
	  	     	}
	  	     } 
	  	})  
	  	
	     localStorage.setItem('type',JSON.stringify(this.fun))
	  	
	    this.Changeapi()
	 },
	  methods:{
	  	Return(){
	  		this.$router.go(-1)
	  	},
	  	gomy(item,path){
	  		localStorage.setItem('class',JSON.stringify(item.majorCate))
  		    localStorage.setItem('id',JSON.stringify(item._id))
  		    this.$router.push(path)
	  	},
	  	getcolor(item){
	  		
	  		for(var i=0;i<this.hot.length;i++){
	  			if(this.hot[i].active){
	  				this.hot[i].active = false
	  			}
	  		}
	  		  this.minorCate = []
	  		localStorage.setItem('type',JSON.stringify(item.type))
	  		item.active = true
	  		this.Changeapi()
	  	},
	  	Changecolor(item,index){
	  		var dom = document.querySelectorAll('.red')
	  		  for(var i =0;i<dom.length;i++){
	  		  	 if(i == index){
	  		  	 	dom[i].style.color = 'red'
	  		  	 }else{
	  		  	 	dom[i].style.color = '#9B9B9B'
	  		  	 }
	  		}
	  		  this.major = item
	  		  this.minorCate = []
	  		  this.Changeapi()
	  	},
	  	Changeapi(){
	  		var num = JSON.parse(localStorage.getItem('type'))
	  		var a = JSON.parse(localStorage.getItem('Sex'))
	  		this.axios.get('api/book/by-categories?gender='+ a +'&type=' + num + '&major='+this.title+'').then(r =>{
	  			var arr = r.data.books
	  			for(var i=0;i<arr.length;i++){
	  				if(arr[i].minorCate ==  this.major){
	  					this.minorCate.unshift(arr[i])
	  				}
	  			}
	  			if(this.minorCate == 0){
	  				this.isnav = true
	  			}else{
	  				this.isnav = false
	  			}
	  		})
	  	}
	  }
	}
</script>

<style lang="less" scoped>
.category{
	width: 100%;
	overflow: hidden;
}
 .nav{
 	width: 100%;
 	height: 50px;
   background-color:#FF0000;
   overflow: hidden;
   position: fixed;
   top: 0;
   z-index: 1;
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
			i{
				color: #FFFFFF;
				line-height: 50px;
			}
		}
	}
	.inner{
	  >div{
	  	width: 1000px;
	  	height: 50px;
	  	text-align: center;
	  	float: left;
	  	font-size: 0.2rem;
	  	border-bottom: 1px solid #DDDDDD;
	  	background: #F3F3F3;
	  	position: fixed;
	  	top: 50px;
	  	z-index: 1;
	     span{
	     	display:block;
	     	width: 50px;
	     	float: left;
	     	line-height: 50px;
	     }
	       .active{
	     	color: red;
	     }
	  }
	}
	.minor{
		background: #F3F3F3;
		height: 50px;
		position: fixed;
	  	top: 100px;
	  	z-index: 1;
		overflow: hidden;
	  >div{
	  	width: 100%;
	  	height: 50px;
	  	text-align: center;
	  	font-size: 0.2rem;
	    border-bottom: 1px solid #ddd;
	    white-space: inherit;
	    span{
	    	display: block;
	    	width: 80px;
	    	float: left;
	    	line-height: 50px;
	    }
	    .red:nth-child(1){
	    	color: red;
	    }
	  }
	}
	

  	.Content{
  		margin: 160px 15px 5px 15px;
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
  		}
  	 }		
  }
  .gx{
  	font-size: 0.5rem;
  	color: #9B9B9B;
  }
</style>