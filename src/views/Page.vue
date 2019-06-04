<template>
  <div class="Page">
  	
  	<div v-show='hidd'>
 	  <el-row class='nav'>
         <el-col :span='4' class='left' @click.native='Return'>
       	    <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	    <span>返回</span>
         </el-col>
         <el-col :span='16' class='book'>我的天空</el-col>
           <el-col :span='4' class='icon'><i class="fa fa-bars"></i></el-col>
    </el-row>
    
  	<!--<el-row class='drop'>
  		  <div @click="Jump(item)" v-for='(item,index) in drop' :key='index'><i :class="item.icon"></i>{{item.name}}</div>
  	</el-row>-->
  	
  <!--	<el-row class='toBookShelf'>加入书架</el-row>-->

  	<el-row class='but'>
  		 <el-col :span='24'>
  		 	   <div class="inp-top clearfix">
  		 	   	  <span class="fl">Aa-</span>
  		 	   	  <span class="span fl"><span></span></span>
  		 	   	  <span class="fr" @click="fontAdd">Aa+</span>
  		 	   </div>
  		 	   
  		 	   <div class="btn clearfix">
  		 	   	   <span @click="color(item)" :class="{active:item.active}" v-for="(item,index) in btn" :key='index'>{{item.name}}</span>
  		 	   </div>
  		 	   
  		 	   <div class="item">
  		 	   	 <span class="fl" @click="Last">上一章</span>
  		 	   	 <span class="cx" @click="getState({name:'Directory'})">目录</span>
  		 	   	 <span class="fr" @click="Next">下一章</span>
  		 	   </div>
  		 </el-col>
  	</el-row>
   </div>
   
    <div class="Count" @click="hido">
    	<h4>{{Chapter}}</h4>
    	 <p class="nr">{{content}}</p>
    </div>
    
  </div>
</template>

<script>
	
	export default{
		name:'Page',
		data(){
			return{
				btn:[
				 {name:'默认',active:true,back:'#eee6dd'},
				 {name:'夜间',active:false,back:'#0c0c0c'},
				 {name:'护眼',active:false,back:'#b8cd8d'}
				],
				
				drop:[
				 {name:'首页',icon:'el-icon-s-home',path:'hot'},
				 {name:'书架',icon:'el-icon-reading',path:'mybooks'},
				 {name:'详情',icon:'el-icon-notebook-1',path:'book'}
				],
				content:[],
				Chapter:'',
				hidd:false,
				list:[],
				index:0
			}
		},
		created(){
			   this.index = JSON.parse(localStorage.getItem('index'))
				 var id = JSON.parse(localStorage.getItem('id'))
			  this.axios.get('api/mix-atoc/'+ id +'?view=chapters').then(r =>{    
     	     this.list = r.data.mixToc.chapters 
    
     	})
			
			
			
		  	this.axios.get('chapterup/chapter/'+encodeURIComponent(this.$route.params.title)+'?cv=1481275033588').then(r =>{
		  	
		  	 	this.content = r.data.chapter.body
		  })
		  	
		  	
		  	var nr = JSON.parse(localStorage.getItem('nr'))
		  	this.axios.get('chapterup/chapter/'+encodeURIComponent(nr.link)+'?cv=1481275033588').then(r =>{
		  	
		  	 	this.content = r.data.chapter.body
		 
		  })
		  
		  
		  this.Chapter = JSON.parse(localStorage.getItem('Chapter'))
		 
			
		},
		mounted(){
	     
	  
		},
		methods:{
			Return(){
				
				var id = JSON.parse(localStorage.getItem('id'))
				var a = JSON.parse(localStorage.getItem('getlist'))
				
				for(var i=0;i<a.length;i++){
					if(a[i]._id == id){
						
					    a[i].time = this.Time()
					   
					   localStorage.setItem('getlist',JSON.stringify(a))
					}
				}
				
				
				 this.$router.go(-1)
			},
			Jump(item){
					this.$router.push(item.path);
			},
			getState(path){
				 this.$router.push(path)
			},
			Time(parr){
				var dt = new Date()
		 		var y = dt.getFullYear()
		 		var m = (dt.getMonth() + 1).toString().padStart(2,0)
		 		var r = dt.getDate().toString().padStart(2,0)
		 		
		 		
		 			var s = dt.getHours().toString().padStart(2,0)
		 			var f = dt.getMinutes().toString().padStart(2,0)
		 				 			
		 			var mm = dt.getSeconds().toString().padStart(2,0)
		 			
		 			return `${y}-${m}-${r} ${s}:${f}:${mm}`
		 	
			},
	    color(item){
	    	 
	    	 for(var i=0;i<this.btn.length;i++){
	    	 	if(this.btn[i].active){
	    	 		this.btn[i].active = false
	    	 		break;
	    	 	}
	     }
	    	item.active = true
	      var dom = document.querySelector('.Count')
	      dom.style.backgroundColor = item.back
	    },
	    fontAdd(){
	    	var dom = document.querySelector('.Count')
	    	var span = document.querySelector('.span')
	    	var span1 = document.querySelector('.span').children[0]
	    	
	        
	      var a=span1.style.width
	     if(span1.style.width >= 100 +'%'){
	     	 return;
	     }else{
	     	 a + 25 +'%'
	     	 span1.style.backgroundColor='red'
	     } 
	    },
	    hido(){
	    	 if(this.hidd){
	    	 	 this.hidd = false
	    	 	 return
	    	 }
	    	 this.hidd = true
	    },
     Next(){
         this.index++
         document.documentElement.scrollTop = 0
        for(var i=0;i<this.list.length;i++){
        	if(this.index == i){
        		 this.Chapter = this.list[i].title
        			this.axios.get('chapterup/chapter/'+encodeURIComponent(this.list[i].link)+'?cv=1481275033588').then(r =>{
		  	       	this.content = r.data.chapter.body
		      })
        }
       }
       var id = JSON.parse(localStorage.getItem('id'))
       var a = JSON.parse(localStorage.getItem('getlist'))
       for(var i=0;i<a.length;i++){
					if(a[i]._id == id){
						
					    a[i].index = this.index
					    a[i].link =this.list[this.index].link 
					    a[i].name =this.list[this.index].title 
					   
					   localStorage.setItem('getlist',JSON.stringify(a))
					}
				}
     },
     Last(){
     	   this.index--
     	    document.documentElement.scrollTop = 0
        for(var i=0;i<this.list.length;i++){
        	if(this.index == i){
        		 this.Chapter = this.list[i].title
        			this.axios.get('chapterup/chapter/'+encodeURIComponent(this.list[i].link)+'?cv=1481275033588').then(r =>{
		  	       	this.content = r.data.chapter.body
		      })
        }
       }
        var id = JSON.parse(localStorage.getItem('id'))
       var a = JSON.parse(localStorage.getItem('getlist'))
       for(var i=0;i<a.length;i++){
					if(a[i]._id == id){
						
					    a[i].index = this.index
					    a[i].link =this.list[this.index].link 
					    a[i].name =this.list[this.index].title 
					   
					   localStorage.setItem('getlist',JSON.stringify(a))
					}
				}
     }
		}
	}
</script>

<style lang="less" scoped>
  .Page{
	  position: absolute;
	  left: 0;
	  top: 0;
	  right: 0;
	  bottom: 0;
  }
  .nav{
 	  position: fixed;
 	  width: 100%;
    background-color:#444545;
    overflow: hidden;
    z-index: 1;
    top: 0;
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
	.item-left{
		 position: absolute;
		 width: 80%;
		 height: 736px;
		 background: #42B983;
		 z-index: 1;
	}
	
	.page-item{
		width: 80%;
		height: 736px;
		background: #FFFFFF;
		position: absolute;
		z-index: 5;
		overflow: hidden;
		>div{
		  height: 30px;
		p{
			width: 100%;
			height:30px;
			font-size: 0.25rem;
			}
		}
	}
	
	.drop{
		width: 100px;
		height: 100px;
		position: fixed;
		background: #444545;
		right: 0;
		top: 50px;
		 z-index: 1;
		>div{
			height: 33px;
			line-height: 33px;
			font-size: 0.25rem;
			text-align: center;
			color: #ffffff;
			i{
				margin-right:3px;
			}
		}
	}
  .toBookShelf{
  	position: fixed;
  	width: 100px;
  	height: 30px;
  	line-height: 30px;
  	text-align: center;
  	font-size: 0.25rem;
  	border: 1px solid #DDDDDD;
  	background: #444545;
  	border-radius: 15px 0 0 15px;
  	color: #FFFFFF;
  	bottom: 230px;
  	right: 0;
  	 z-index: 1;
  	
  }
	.but{
		width: 100%;
		position: fixed;
		background-color: #444545;
		bottom: 0;
		z-index: 1;
		overflow: hidden;
		.inp-top{
			width: 90%;
			font-size: 0.4rem;
			color: #e0e1e0;
			margin: 20px;
		}
		.span{
			display: block;
			width: 65%;
			height: 4px;
			border: 1px solid #9B9B9B;
			margin: 16px 15px 0px 15px ;
			span{
				display: block;
				height: 4px;
				width: 0px;
			}
		}
		.btn{
			 width: 90%;
			 font-size: 0.2rem;
			 margin: 30px;
			 span{
			 	display: block;
			 	width: 26%;
			 	height: 30px;
			 	line-height: 30px;
			 	float: left;
			 	text-align: center;
			 	color: #ebebeb;
			 	border: 1px solid #ebebeb;
			 	border-radius: 10px;
			 	margin-right: 20px;
			 }
			 .active{
			 	color: #B93321;
			 	border: 1px solid #D33A31;
			 }
		}
		
	 .item{
	 	 width: 90%;
	 	 font-size: 0.3rem;
	 	 margin: 20px;
	 	 color: #ffffff;
	 	 text-align: center;
	 	 .cx{
	 	 	color:#9a9a99;
	 	 }
	 }	
	}
	.Count{
		width: 100%;
		position: absolute;
		font-size: 0.3rem;
		top: 0;
		background-color: #eee6dd;
		>p{
			text-indent: 2em;
		  margin-bottom: 40px;
		  color: #5c5d58;
		  font-size: 0.25rem;
		  line-height: 30px;
		}
		.nr{
			 white-space: pre-wrap;
			 text-indent: 2em;
		}
	}
</style>