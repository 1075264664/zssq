import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	   title:'追书神器',
  		img:[
  		 {url:'http://statics.zhuishushenqi.com/recommendPage/155748193646431'},
  		 {url:'http://statics.zhuishushenqi.com/recommendPage/155748184324412'},
  		 {url:'http://statics.zhuishushenqi.com/recommendPage/155748187913097'},
  		 {url:'http://statics.zhuishushenqi.com/recommendPage/155748190351976'},
  		],
  		id:''
  },
  
mutations:{
	 count(s,value){
	 	   
	 	   for(var i =0;i<s.sex.length;i++){
	 	   	 if(!s.sex[i].active){
	 	   	 	 s.sex[i].active = true
	 	   	 }else{
	 	   	 	 s.sex[i].active = false
	 	   	 }
	 	   }
	 },
	 txt(s,value){
	 	 for(var i=0;i<s.inp.length;i++){
	 	 	 console.log(value)
	 	 }
	 },
	 setId(s,id){
	 	   console.log(id)
	 	 s.id = id
	 }
}

});
