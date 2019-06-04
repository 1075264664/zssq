<template>
  <div class="mybooks">
      <el-row class='nav'>
       <el-col :span='4' class='left' @click.native='Return'>
       	  <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	  <span>返回</span>
       </el-col>
        <el-col :span='14' class='book'>我的书架</el-col>
         <el-col :span="3" class='sj'><i class="el-icon-s-data"></i></el-col>
        <el-col :span='3' class='icon'><i class="el-icon-s-home"></i></el-col>
    </el-row>
     
     
    <el-row class='title'>
       <el-col :span='12' class='bt' v-for='(item,index) in title' :key='index' ><span :class="{active:item.iscolor}" @click='toggleTab(item)'>{{item.name}}<i :class="{'active-bg':item.iscolor}"></i></span></el-col>
    </el-row>
      
    
    <div>
    	<router-view></router-view>
    </div>
    
    
  </div>
</template>

<script>
	export default{
		name:'bookshelf',
		data(){
			return {
				title:[
				 {name:'我的书架',iscolor:true,path:{name:'mybooks'}},
				 {name:'阅读记录',iscolor:false,path:{name:'bookHistory'}}
				]
			}
		},
		methods:{
			Return(){
				this.$router.go(-1)
			},
			toggleTab(item){
				
				for(var i=0;i<this.title.length;i++){
					
				  if(!this.title[i].iscolor){
				  	  this.title[i].iscolor = true
				  	 }else{
				  	 	this.title[i].iscolor = false
				  	 }
				}
				item.ischeck = false;
				this.$router.push(item.path);
			}
		}
	}
</script>

<style lang="less" scoped>
.mybooks{width: 100%;}
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
	.title{
		font-size: 0.3rem;
		text-align: center;
		line-height: 50px;
		border-bottom: 1px solid #9B9B9B;
		.bt:nth-child(1){
			 border-right: 1px solid #DDDDDD;
		}
	   span{
					position: relative;
					height: .8rem;
					display: inline-block;
					i{
						position: absolute;
						width: 100%;
						left: 0;
						bottom: -3px;
						height: 2px;
						
					}
		}
		.active-bg{
			background-color: #D33A31;
		}
		.active{
			color: red;
		}
	}
</style>