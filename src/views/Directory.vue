<template>
 <div class="list">
   	<div>
  		 <p @click='getState(item,{name:"Page",params:{title: item.link }},index)' v-for="(item,index) in list" :key='index'>{{item.title}}</p>
  	</div>
  
 </div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name:'Directory',
		data(){
			return{
				list:[]
			}
		},
		created(){
			
			var id = JSON.parse(localStorage.getItem('id'))
			
		  this.axios.get('api/mix-atoc/'+ id +'?view=chapters').then(r =>{
		  	console.log('r',r)
		  	
		  	 this.list = r.data.mixToc.chapters
		  })
		},
		mounted(){
	        
		},
		methods:{
			getState(item,path,index){
			
				localStorage.setItem('index',JSON.stringify(index))
				localStorage.setItem('Chapter',JSON.stringify(item.title))
				
				var id = JSON.parse(localStorage.getItem('id'))
				var a = JSON.parse(localStorage.getItem('getlist'))
				
				for(var i=0;i<a.length;i++){
					if(a[i]._id == id){
						
					    a[i].index = index
					    a[i].link =this.list[index].link 
					     a[i].name =this.list[index].title 
					   
					   localStorage.setItem('getlist',JSON.stringify(a))
					}
				}
				
				
				this.$router.push(path)
			},
			add(item,path){
				
				localStorage.setItem('link',JSON.stringify(item.link))
				
				
				this.$router.push(path)
			}
	
		}
	}
</script>

<style lang="less" scoped>
  div{
		width: 80%;
		height: 736px;
		background: #FFFFFF;
		p{
			width: 100%;
			height:30px;
			line-height: 30px;
			margin: 3px;
			font-size: 0.25rem;
			
		}
	}
</style>