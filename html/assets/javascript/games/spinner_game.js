// canvas =================================================================================

function drawLine(ctx, startX, startY, endX, endY){
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

function default_spinner(data_block, myVinyls, myColors) {

    var myCanvas = data_block;
    myCanvas.width = 150;
    myCanvas.height = 150;
    var _ctx = myCanvas.getContext("2d");

    var Piechart = function(options){
        this.options = options;
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.colors = options.colors;
     
        this.draw = function(){
            var total_value = 0;
            var color_index = 0;
            for (var categ in this.options.data){
                var val = this.options.data[categ];
                total_value += val;
            }
     
            var start_angle = 0;
            for (categ in this.options.data){
                val = this.options.data[categ];
                var slice_angle = 2 * Math.PI * val / total_value;
     
                drawPieSlice(
                    this.ctx,
                    this.canvas.width/2,
                    this.canvas.height/2,
                    Math.min(this.canvas.width/2,this.canvas.height/2),
                    start_angle,
                    start_angle+slice_angle,
                    this.colors[color_index%this.colors.length]
                );
     
                start_angle += slice_angle;
                color_index++;
            }

            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                this.options.doughnutHoleSize * Math.min(this.canvas.width - 10,this.canvas.height - 10),
                0,
                2 * Math.PI,
                "#141D5F"
            );

            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                this.options.doughnutHoleSize * Math.min(this.canvas.width - 30,this.canvas.height - 30),
                0,
                2 * Math.PI,
                "#0D164E"
            );
     
        }
    }

    var myDougnutChart = new Piechart(
        {
            canvas:myCanvas,
            data: myVinyls,
            colors: myColors,
            doughnutHoleSize:0.5
        }
    );

    myDougnutChart.draw();
}