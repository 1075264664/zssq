class routerComponent{
	
	home(r){
		return require(['../views/Home'],r)
	}
	
	book(r){
		return require(['../views/Book'],r)
	}
	
	bookshelf(r){
		return require(['../views/Bookshelf'],r)
	}
	
	mybooks(r){
		return require(['../views/mybooks'],r)
	}
	
	bookHistory(r){
		return require(['../views/bookHistory'],r)
	}
	
	ranking(r){
		return require(['../views/ranking'],r)
	}
	
	male(r){
		return require(['../views/male'],r)
	}
	
	female(r){
		return require(['../views/female'],r)
	}
	
	thelist(r){
		return require(['../views/Thelist'],r)
	}
	
	category(r){
		return require(['../views/category'],r)
	}
	
	search(r){
		return require(['../views/Search'],r)
	}
	
	val(r){
		return require(['../views/val'],r)
	}
	
	page(r){
		return require(['../views/Page'],r)
	}
	
	directory(r){
		return require(['../views/Directory'],r)
	}
	
	recommend(r){
		return require(['../views/recommend'],r)
	}
	
	cla(r){
		return require(['../views/cla'],r)
	}
	
	
	
}

 export default new routerComponent()
