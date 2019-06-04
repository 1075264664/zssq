<template>
<div class="cla">
  <el-row class='nav'>
       <el-col :span='4' class='left' @click.native='Return'>
       	  <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
       	  <span>返回</span>
       </el-col>
        <el-col :span='14' class='book'>分类</el-col>
         <el-col :span="3" class='sj'><i class="el-icon-s-data"></i></el-col>
        <el-col :span='3' class='icon'><i class="el-icon-s-home"></i></el-col>
   </el-row>
   
      <el-row class='nan'>
      <el-col :span='24'>
         <div>男生</div>
          <div class="box" v-for="(item,index) in male" :key='index'>
          	  <span>{{item.major}}</span>
          	  <span></span>
          </div>
      </el-col>
    </el-row>
    
       <!--<el-row class='nan'>
      <el-col :span='24'>
         <div>女生</div>
      </el-col>
    </el-row>
    
       <el-row class='nan'>
      <el-col :span='24'>
         <div>漫画</div>
      </el-col>
    </el-row>
    
    
      <el-row class='nan'>
         <el-col :span='24'>
           <div>出版</div>
         </el-col>
    </el-row>-->
  </div>
   
</template>

<script>
	export default{
		name:'cla',
		data(){
			return{
			  male:[],
			  female:[],
			  picture:[],
			  press:[]
			}
		},
		created(){
			this.axios.get('api/cats/lv2').then(r => {
			    this.male = r.data.male
			    this.male = r.data.male
			    this.picture = r.data.picture
			    this.press = r.data.press
			})
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
</style>