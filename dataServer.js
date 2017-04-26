var express = require('express');
var app = express();
var http = require('http').Server(app); //开启服务
var io = require('socket.io')(http);
http.listen(3721);

//开启服务
io.on("connection",function(client){
	console.log("客户端已经连接");

	//定时生成模拟数据，并返回
		var timer=setInterval(function(){
			var dataArr=[];
			for(var i=0;i<12;i++){
				dataArr.push( parseInt(Math.random()*301)+50 );
			}
			client.emit("receive",dataArr);//每个客户端对应定时器不会跑快
			// io.emit("receive",dataArr);   
			// console.log(1111);
			
		},2000)
	//监听是否断开
	client.on('disconnect', function() {
	    console.log('客户端主动断开链接');
	    // io.sockets.emit('onelose', '客户端主动断开链接');
	    clearInterval(timer);
	})

})
