<template>
<div class="ranking">
    <el-row class='nav'>
       <el-col :span='4' class='left' @click.native='Return'>
       	  <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	  <span>返回</span>
       </el-col>
        <el-col :span='14' class='book'>排行榜</el-col>
         <el-col :span="3" class='sj'><i class="el-icon-s-data"></i></el-col>
        <el-col :span='3' class='icon'><i class="el-icon-s-home"></i></el-col>
    </el-row>
    
    <el-row class='nan'>
      <el-col :span='24'>
         <div>男生</div>
      </el-col>
    </el-row>
    
     <div class="list">
       <el-row>
         <el-col :span='24' @click.native='getState(item,{name:"thelist",params:{count:item}})' class='sub-list' v-for='(item,index) in male' :key='index'>
             <img :src="'http://statics.zhuishushenqi.com' + item.cover" alt="" />
             <span class="bt">{{item.title}}</span>
         </el-col>
       </el-row>
     </div>
    
    
     <el-row class='nan'>
      <el-col :span='24'>
         <div>女生</div>
      </el-col>
    </el-row>
    
    <div class="list">
       <el-row>
         <el-col  :span='24' @click.native='go(item,{name:"thelist",params:{count:item}})' class='sub-list' v-for='(item,index) in female' :key='index'>
             <img :src="'http://statics.zhuishushenqi.com' + item.cover" alt="" />
             <span class="bt">{{item.title}}</span>
         </el-col>
       </el-row>
     </div>
    
</div>
</template>

<script>
	export default{
		name:'ranking',
		
		data(){
		 return{ 
			 male:[],
			 female:[]
			 
			}
		},
		created(){
			this.axios.get('api/ranking/gender').then(r =>{
				this.male = r.data.male
				this.male = this.male.splice(0,7)
				
				this.female = r.data.female
				this.female = this.female.splice(0,7)
			})
			
		},
		methods:{
			Return(){
				this.$router.go(-1)
			},
			getState(item,path){
				var a = 'male'
				localStorage.setItem('Sex',JSON.stringify(a))
               
				this.$router.push(path)
			},
			go(item,path){
				var a = 'female'
				localStorage.setItem('Sex',JSON.stringify(a))
               
				this.$router.push(path)
			}
			
		}
	}
</script>

<style lang="less" scoped>
.ranking{
	width: 100%;
	overflow: hidden;
}
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
			font-size: 0.6rem;
			text-align: center;
			i{
				color: #FFFFFF;
			}
		}
		.icon{
			font-size: 0.6rem;
			text-align: center;
			i{
				color: #FFFFFF;
			}
		}
	}
	.nan{
		background-color: #e6e6e6;
		width: 100%;
	  >div{
		 font-size: 0.2rem;
		 height: 50px;
		 line-height: 50px;
		 margin-left: 10px;
		 color: #aeaeae;
		 box-sizing: border-box;
		}
	}
	.list{
	  .sub-list{
	  	font-size: 0.2rem;
	  	height: 60px;
	  	border-bottom: 2px solid #f3f3f3;
	  	 img{
	  	 	width: 40px;
	  	 	height: 40px;
	  	 	float: left;
	  	 	margin: 10px 10px;
	  	 }
	  	.bt{
	  		display: block;
	  		float: left;
	  		font-size: 0.20rem;
	  		line-height: 60px;
	  		color: #333333;
	  	}
	  }
	}
</style>