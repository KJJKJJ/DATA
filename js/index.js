//柱形图：要有标尺,不同数据段显示不同颜色（可配置）
// 构造函数
onload=function(){

	var para=null;//默认参数
    var context = document.getElementById('mycan').getContext('2d');
function FunA() {
        // this.hallo=''
       var defaultes = {
            xPosition: { startX:140, width:30, distance:60},
            yPosition: { startY:600, distance: 40, max: 400 },
            color: [{ min: 0, max: 100, color: "black" }, { min: 101, max: 200, color: "gray" }, { min: 201, max: 500, color: "green" }]

        }
        para=defaultes;
    
}
FunA.prototype.color = function(compare) {
    var len = para.color.length;
    for (var i = 0; i < len; i++) {
        for (var key in para.color[i]) {
            if (compare >= para.color[i].min && compare <= para.color[i].max) {
            	context.fillStyle=para.color[i].color;
            }
        }
    }
}
//初始化
FunA.prototype.init = function(data,callback) {
	console.log(11111)
    context.clearRect(0, 0, 1000, 800); //每次刷新先清除画布
    var max=para.yPosition.max; //最大值
    var distance=para.yPosition.distance;//间隔值
    var startY=para.yPosition.startY;   //y轴起始坐标
    var num=max/distance;//画线数量
    // console.log(num);
    for (var i = 0; i <= num; i++) {
    	context.save();
        context.beginPath();
        context.moveTo(120, startY - i * distance);//表示从120画到900，则长度
        context.lineTo(900, startY - i * distance);
        context.closePath();
        context.lineWidth = 1;
        context.strokeStyle='#ccc';
        context.stroke();
        context.strokeText(i * distance, 90, startY - i * distance); //参数：文本，x,y
        context.restore();
    }

    for (var j = 0; j < data.length; j++) {
    	var startX=para.xPosition.startX; //柱形图开始X坐标
    	var width=para.xPosition.width; //柱形图宽度
    	var distance=para.xPosition.distance; //柱形图间隔
        context.beginPath();
        callback(data[j]);//给不同数值添加不同颜色
        context.lineWidth = 0;
        context.rect(startX + j * distance, startY, width, -data[j]); //数据高度，取负值，使其方向向上
        context.fill();
        context.closePath();
        context.strokeText((data[j]), 145 + j * distance, 590 - data[j]);//数据值文本坐标
        context.strokeText(j + 1, 150 + j * distance, 620); //月份坐标

    }
}

FunA.prototype.receive = function(){
    // this.name();
    //监听服务器实时发送过来的数据
    //开启socket-io服务
    var data = null;
    var socket = io.connect('ws://127.0.0.1:3721');
    //监听服务器是否返回数据
    socket.on("receive", function(response) {
        // console.log(response);
        // console.log(response.length);
        data = response;
        this.init(data,this.color);
    }.bind(this))//改变this指向

}
	var obj= new FunA();
	obj.receive();

}
