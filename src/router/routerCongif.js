
import routerComponent from './routerComponent.js'

export default[

   {
   	path:'/',
   	name:'home',
   	component:routerComponent.home,
   	children:[
   	 {
   	  path:'/male',
   	  name:'male',
   	  component:routerComponent.male
   	 },
   	  {
   	  path:'/female',
   	  name:'female',
   	  component:routerComponent.female
   	 },
   	 {
		path: '*',
	    redirect: {name:'male'}
	  }
   	]
   },
   {
   	path:'/ranking',
   	name:'ranking',
   	component:routerComponent.ranking
   },
    {
   	path:'/thelist/:count',
   	name:'thelist',
   	component:routerComponent.thelist
   },
   {
   	path:'/category',
   	name:'category',
   	component:routerComponent.category
   },
    {
   	path:'/book',
   	name:'book',
   	component:routerComponent.book
   },
   {
   	path:'/bookshelf',
   	name:'Bookshelf',
   	component:routerComponent.bookshelf,
   	children:[
   	  {
   		path:'/mybooks',
   		name:'mybooks',
   		component:routerComponent.mybooks
      },
      {
   		path:'/bookHistory',
   		name:'bookHistory',
   		component:routerComponent.bookHistory
      },
   	  {
		path: '*',
	    redirect: {name:'mybooks'}
	  }
	
   	 ]
   },
    {
   	path:'/search',
   	name:'search',
   	component:routerComponent.search
   },
   {
   	path:'/val',
   	name:'val',
   	component:routerComponent.val
   },
   {
   	path:'/page/:title',
   	name:'Page',
   	component:routerComponent.page
   },
   {
   	path:'/directory',
   	name:'Directory',
   	component:routerComponent.directory
   },
   {
   	path:'/recommend/:cla',
   	name:'recommend',
   	component:routerComponent.recommend
   },
   {
   	path:'/cla',
   	name:'cla',
   	component:routerComponent.cla
   }
]
