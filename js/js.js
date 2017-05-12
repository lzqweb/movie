$(".nav li").on("click",function(){
	$(this).find("a").addClass("on");
	$(this).siblings().find("a").removeClass("on")
});
$.ajax({
	url:"json/data1.json",
	type:"get",
	dataType:"json",
	success:function(data){
		var today = data.today;
		var lastest = data.lastest;
		$("#today").empty();
		$("#lastest").empty();
		$("#today").html('<div class="hot_title"><h5>Todays movies</h5></div>');
		$("#lastest").html('<div class="hot_title"><h5>Lastest Updates</h5></div>');
		$.each(today, function(i,v) {
			$('<div class="today">'+
					'<a href="#/detail"><img src="'+today[i].img+'" class="today_img"/></a>'+
					'<span class="movie_in">'+
						'<a href="#/detail">'+today[i].name+'</a>'+
						'<p>'+today[i].time+'</p>'+
						'<a href="##"><img src="'+today[i].img1+'"/></a>'+
					'</span>'+
				'</div>').appendTo($("#today"));
		});
		$.each(lastest, function(i,v) {
			$('<div class="today">'+
					'<a href="#/detail"><img src="'+lastest[i].img+'" class="today_img"/></a>'+
					'<span class="movie_in">'+
						'<a href="#/detail">'+lastest[i].name+'</a>'+
						'<p>'+lastest[i].time+'</p>'+
						'<a href="##"><img src="'+lastest[i].img1+'"/></a>'+
					'</span>'+
				'</div>').appendTo($("#lastest"));
		});
		var moive1 = $("#content_movie1");
		var fy1 = $("#content_ul1");
		fnLi(data.home,moive1,fy1);
		var moive2 = $("#content_movie2");
		var fy2 = $("#content_ul2");
		fnLi(data.greatest,moive2,fy2);
		var moive3 = $("#content_movie3");
		var fy3 = $("#content_ul3");
		fnLi(data.best,moive3,fy3);
		var moive4 = $("#content_movie4");
		var fy4 = $("#content_ul4");
		fnLi(data.oscar,moive4,fy4);
	}
});



var app = angular.module("myApp",["ngRoute"]);
app.config(['$routeProvider',function($routeProvider){ 
	$routeProvider
	.when('/home', {templateUrl: 'template/home.html'})
	.when('/greatest', {templateUrl: 'template/greatest.html'})
	.when('/best', {templateUrl: 'template/best.html'})
	.when('/oscar', {templateUrl: 'template/oscar.html'})
	.when('/contact', {templateUrl: 'template/contact.html'})
	.when('/detail', {templateUrl: 'template/detail.html'})
	.otherwise({redirectTo:'/home'})
}]);

function fenye(data,numb,parent){
	parent.html('');
	var a = 'H_info_page'+numb;
	var liSrc=data[a];
	var movieHtml="";
	for(var i=0;i<liSrc.length;i++){
		movieHtml+='<div class="H_movie">'
						+'<div class="imgBox">'
							+'<img class="H_movieImg" src="'+liSrc[i].img+'"/>'				
							+'<div class="mask">'
								+'<a class="H_moviePlay" href="#/detail"><img src="images/play_button_64.png" /></a>'
							+'</div>'				
						+'</div>'
						+'<a class="H_movieA" href="#/detail">'+liSrc[i].a+'</a>'
						+'<p>'+liSrc[i].p+'</p>'
					+'</div>';
	}
	movieHtml+='<div class="clear"></div>';
	parent.append(movieHtml);		
}
function fnLi(data,parent,ul){
	fenye(data,1,parent);
	var x = 0;
	var num=1;
	var ulHtml="";
	for(var a in data){
		x++;
		ulHtml+='<li ind='+x+'>'+x+'</li>';
	}			
	ul.html(ulHtml);
	ul.find("li").eq(0).addClass("on");
	ul.css("width",ul.find("li").length*32+'px');			
	ul.find("li").click(function(){
		parent.html('');
		num=$(this).attr('ind');
		$(this).addClass("on").siblings().removeClass("on");
		fenye(data,num,parent);
	})
}


