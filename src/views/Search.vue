<template>
 <div class="Search">
    <el-row class='nav'>
       <el-col :span='4' class='left' @click.native='Return'>
       	  <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	  <span>返回</span>
       </el-col>
        <el-col :span='14' class='book'>搜索</el-col>
         <el-col :span="3" class='sj'><i class="el-icon-s-data"></i></el-col>
        <el-col :span='3' class='icon'><i class="el-icon-s-home"></i></el-col>
    </el-row>
    
    <el-row class='but-inp clearfix'>
    	<el-col :span='24'>
    		<div class="inp fl">
    			<el-input placeholder="请输入内容" v-model="value" clearable  @input='handleQuery'></el-input>
    		</div>
    		<div class="qd fr" @click="Search({name:'val'})">确定</div>
    	</el-col>
    </el-row>
    
    <el-row>
    	 <el-col :span='24' class='s-list'>
    	 	 <p  @click='mataSearch(item,({name:"val"}))' v-for="(item,index) in list" :key='index'>{{item.title}}</p>
    	 </el-col>
    </el-row>
    
    <el-row class='Search-list clearfix'>
    	<el-col class='font' :span='24'>搜索历史</el-col>
    	<el-col class='list fl' :span='24'>
    		<p  @click="methkeyWords(item,({name:'val'}))" v-for="(item,index) in keyWords" :key='index'>{{item.name}}</p>
    	</el-col>
    </el-row>
 </div>   
</template>

<script>
	export default{
		name:'Search',
		data(){
			return{
				value:null,
				list:[],
				keyWords:[]
				
			}
		},
		created(){
			var num = localStorage.getItem('ss')
         	this.keyWords = num == undefined?[]:JSON.parse(num)
		},
		methods:{
		  Return(path){
		  	this.$router.go(-1)
		  },
		  Search(path){
  		     localStorage.setItem('title',JSON.stringify(this.value))
  		     
  		      if(this.value == null || this.value == undefined){
  		      	return;
  		      }else{
  		      this.$router.push(path) 
		  	  var c = {
		  	  	name:this.value
		  	  }
		  	   this.keyWords.unshift(c)
		  	   localStorage.setItem('ss',JSON.stringify(this.keyWords)) 
  		      }
		  },
		  clearTime(){
		  	 if(this.timer){
		  	 	clearTimeout(this.timer)
		  	 }
		  },
		  handleQuery(event){
		  	 this.clearTime()
		  	 this.timer = setTimeout(() => {
		  	 	 this.axios.get('api/book/fuzzy-search?query='+ this.value +'').then(r =>{
		  	 	 	 this.changeColor(r.data.books)
		  	 	 })
		  	 })
		  },
		  changeColor(resultsList){
		  	 resultsList.map((item,index) =>{
		  	 	if(this.value && this.value.length >0){
		  	 		 let replaceReg = new RegExp(this.value, 'g')          
		  	 		 let replaceString =  this.value
		  	 		 resultsList[index].title = item.title.replace(     
		  	 		 	replaceReg,         
		  	 		 	replaceString       
		  	 		 )
		  	 	}
		  	 })
		  	 this.list = []
		  	 this.list = resultsList
		  },
		 mataSearch(item,path){
		 	this.value = item.title
		 	this.Search(path)
		 },
		 methkeyWords(item,path){
		 	 this.value = item.name
		 	 this.Search(path)
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
	.but-inp{
	  >div{
	  	height: 40px;
	  	margin: 10px 10px;
	  	line-height: 30px;
	  	.inp{
	  		width: 80%;
	  		font-size: 0.2rem;
	  		background: #ebebf0;
	  		border: 1px solid #ebebf0;
	         input{
	         	margin-left: 10px;
	         }
	  	}
	  }
	 .qd{
	 	font-size: 0.3rem;
	 	line-height: 40px;
	 	margin-right: 25px;
	 }
	}
	.Search-list{
		margin-left: 10px;
		font-size: 0.3rem;
		margin-top: 10px;
	}
	
	
	.s-list{
		 p{
		font-size: 0.3rem;
		line-height: 30px;
		color: #42B983;
		margin: 10px;
		border-bottom: 1px solid #DDDDDD;
	 }
  }
	
	
</style>