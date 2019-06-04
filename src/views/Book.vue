<template>
 <div class="box">
    <el-row class='nav'>
       <el-col :span='4' class='left' @click.native='Return'>
       	  <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	  <span>返回</span>
       </el-col>
        <el-col :span='14' class='book'>书籍详情</el-col>
         <el-col :span="3" class='sj'><i class="el-icon-s-data"></i></el-col>
        <el-col :span='3' class='icon'><i class="el-icon-s-home"></i></el-col>
    </el-row>
    
    <div class="Hot">
  		<el-row class='Content clearfix'>
  			 <el-col class='sj' :span='23'>
  			 	 <div class="img">
  			 	 	 <img :src="'http://statics.zhuishushenqi.com' + mate.cover"/>
  			 	 </div>
  			 	 <div class="title">{{mate.title}}</div>
  			 	 <div class="name">
  			 	 	 <span class="nr">{{mate.author}}</span>	
  			 	 	 <span class="fle">|</span>
  			 	 	 <span class="bt">{{mate.minorCate}}</span>
  			 	 	 <span class="fle">|</span>
  			 	 	 <span class="rq"><span>{{mate.retentionRatio}}</span>万字</span>
  			 	 </div>
  			 	 <div class="last">{{mate.lastChapter}}</div>
  			 
  			 
  			 <el-row class='an'>
  			 <el-col :span='12' class='bnt'><button  :class="{active:active}" @click="Collection">{{list}}</button></el-col> 
  			 <el-col :span='12' class='bnt1'><button @click="marState({name:'Directory'})">开始阅读</button></el-col>
  		  </el-row>
  		  
  		  <el-row class='reader'>
  		  	 <el-col :span='8'>
  		  	 	<div>追人气</div>
  		  	 	<div>{{mate.chaptersCount}}人</div>
  		  	 </el-col>
  		  	 
  		  	  <el-col :span='8'>
  		  	 	<div>读者存留率</div>
  		  	 	<div>{{mate.retentionRatio}}%</div>
  		  	 </el-col>
  		  	 
  		  	  <el-col :span='8'>
  		  	 	<div>日更新字数</div>
  		  	 	<div>{{mate.latelyFollower}}</div>
  		  	 </el-col>
  		  </el-row>
  		</el-col>
  		</el-row>
  		
  	</div>
  	
  	  	<div class="xq">
  		<el-row>
  			 <el-col :span='1' class='bgcolor'><span></span></el-col>
  			 <el-col :span='23' class='text'>你可能感兴趣</el-col>
  		</el-row>
  		<!--小说-->
  		<el-row class='Content clearfix'>
  			 <el-col :span='23' class='sj' v-for='(item,index) in txt' :key='index' @click.native='shuju(item)'>
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
		name:'Book',
		data(){
			return{
				mate:[],
				txt:[],
				list:'加入收藏',
				a:[],
				active:false,
				getlist:[]
				
			}
		},
		created(){
			 
			var id = JSON.parse(localStorage.getItem('id'))
			this.axios.get('api/book/'+ id +'').then(r =>{
  	   	     
  	   	      this.mate = r.data
  	   	      
  	      })
			
			var cls = JSON.parse(localStorage.getItem('class'))
			var sex = JSON.parse(localStorage.getItem('Sex'))
		   this.axios.get('api/book/by-categories?gender='+ sex +'&type=hot&major='+ cls +'&minor=&start=0&limit=20').then(r =>{
  	   	   
  	   	    this.txt = r.data.books
  	   	    this.txt = this.txt.splice(10,4)
  	   	    
  	     })
		   
		   var num = localStorage.getItem('b')
           this.a = num == undefined?[]:JSON.parse(num)
           
           var num = localStorage.getItem('getlist')
           this.getlist = num == undefined?[]:JSON.parse(num)
           
           var b = JSON.parse(localStorage.getItem('b'))
           for(var i=0;i<b.length;i++){
           	 if(b[i]._id == id ){
           	 	this.active = true
           	 	this.list = '不追了'
           	 }
           }
		},
		methods:{
		  Return(){
		  	var a = 'mael'
  			localStorage.setItem('Sex',JSON.stringify(a))
			this.$router.go(-1)
		 },
		 marState(path){
		 	this.$router.push(path)
		 	 for(var i = 0;i<this.getlist.length;i++){
              		if(this.getlist[i]._id == this.mate._id){
					return;
				}
           }
            var b = {
                _id:this.mate._id,
            	index:0,
            	time:0,
            	title:this.mate.title,
            	cover:this.mate.cover,
            	link:0,
            	name:0,
            }
           this.getlist.unshift(b)
           localStorage.setItem('getlist', JSON.stringify(this.getlist))
		 },
		 shuju(item){
		 this.mate = item
		  var b = JSON.parse(localStorage.getItem('b'))
           for(var i=0;i<b.length;i++){
           	 if(item._id == b[i]._id){	
           	 	this.active = true
           	 	this.list = '不追了'
           	 }else{
           	 	this.active = false
           	 	this.list = '加入收藏'
           	 }
           }
		 	
		 },
		 Collection(){
		 	
		 	if(this.active){
		 		var arr = JSON.parse(localStorage.getItem('b'))
		 		for(var i=0;i<arr.length;i++){
		 			if(arr[i]._id == this.mate._id){
		 				console.log('1111111111111')
		 				this.active = false
		 		        this.list = '加入收藏'
		 				arr.splice(i,1)
		 				localStorage.setItem('b', JSON.stringify(arr))
		 				return;
		 			}
		 		}
		 	}else{
		 	  this.active = true
              this.list = '不追了'
              console.log('22222222222222222222')
		 	}
		 	
		 	
		 	   
		    for(var i = 0;i<this.a.length;i++){
              		if(this.a[i]._id == this.mate._id){
					return;
				}
           }
            var b = {
                _id:this.mate._id,
            	title:this.mate.title,
            	longIntro:this.mate.longIntro,
            	shortIntro:this.mate.shortIntro,
            	author:this.mate.author,
            	minorCate:this.mate.minorCate,
            	latelyFollower:this.mate.latelyFollower,
            	majorCate:this.mate.majorCate,
            	cover:this.mate.cover
            }
           this.a.unshift(b)
           localStorage.setItem('b', JSON.stringify(this.a))
		 	
		 	
		 	
		 }
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
	
	.Hot{
  	  background-color: #FFFFFF;
      margin-top: 20px;
      font-size: 0.2rem;
  	.Content{
  		margin: 5px 15px;
  		.sj{
  			 margin-bottom: 10px;
  		.img{
  			img{
  				width: 120px;
  			    height: 120px;
  				float: left;
  				margin: 0px 10px 0px 5px;
  				border: 1px  solid #DDDDDD;
  			}
  		}
  		.title{
  				font-size: 0.3rem;
  				font-weight: bold;
  			}
  		.name{
  			 margin-top: 10px;
  			.nr{
  				font-size: 0.2rem;
  				float: left;
  				}
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
  		.last{
  				margin: 50px 0px;
  			}
  	 }	
  	}
  	.an{
  	   border-bottom:1px solid #DDDDDD;
  	.bnt{
  		height: 50px;
  		margin-bottom: 10px;
  		 button{
  		  width: 150px;
  		  height: 50px;
  		  margin-left: 5px;
  		  background: #FFFFFF;
  		  border: 1px solid red;
  		}
  		.active{
  			background: #999999;
  			border:1px solid #999999 ;
  		}
  	}
  	.bnt1{
  	  height: 50px;
  	  text-align: center;
  	  button{
  	  	width: 150px;
  		height: 50px;
  		margin-left: 21px;
  		background: rgb(184,51,34);
  		border: 1px solid red;
  	  }
  	}
  }
  .reader{
  	 border-bottom:1px solid #DDDDDD;
  	 >div{
  	 	text-align: center;
  	 	margin: 20px 0px;
  	 }
  }
 }
 .xq{
  	background-color: #FFFFFF;
  	margin-top: 5px;
    ffont-size: 0.2rem;
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