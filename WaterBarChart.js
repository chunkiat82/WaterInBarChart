//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1}] ;//= 6;
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:4,w:1},{h:3,w:1},{h:4,w:1}] // 7;
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:4,w:1},{h:4,w:1},{h:4,w:1},{h:3,w:1}] // 6;
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:7,w:1}]; // 19
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:4,w:1},{h:3,w:1},{h:4,w:1},{h:7,w:1}] //20
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:3,w:1},{h:3,w:1},{h:4,w:1}] // 8;

function WaterBarChart(bars){	
	return {	
		'bars':bars,
		'context':{'stack':[],'up':false},
		'calculateWater':function(){return calculateWater(this.bars,{},this.context)}
	}
}
function calculateWater(bars, previous, context){
	
	var volume = 0;

	if (bars.length == 1){
		var bar = bars.shift();
		if (bar.h > previous.h){			
			volume += calculatePrevious(context.stack,bar);
		}
		return volume;
	}

	var bar = bars.shift();
	if (bar.h < previous.h ){		
		if (context.up){
			volume += calculatePrevious(context.stack,previous);
			context.up = false;
		}
		context.stack.push(bar);				
	}else{
		context.up = true;
		context.stack.push(bar);
	}

	return volume + calculateWater(bars,bar,context);
}

function calculatePrevious(stack, bar){
	var totalLength = 0, totalArea = 0;
	
	while((popped=stack.pop()) != null){ 		
		//stop when we find a higher bar
		if (popped.h > bar.h){
			stack.push(popped);
			if (totalArea>0){				
				stack.push({h:bar.h,w:(totalLength+1), s:'CPE'});
			}
			return (totalLength * bar.h) - totalArea;
		}
		totalArea += (popped.h * popped.w);
		totalLength += popped.w;		
	}

	stack.push({h:bar.h,w:(totalLength), s:'CP'});	
	return (totalLength * bar.h) - totalArea;
}

module.exports = WaterBarChart;