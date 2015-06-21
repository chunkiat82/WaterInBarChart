//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1}] ;//= 6;
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:4,w:1},{h:3,w:1},{h:4,w:1}] // 7;
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:4,w:1},{h:4,w:1},{h:4,w:1},{h:3,w:1}] // 6;
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:7,w:1}]; // 19
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:4,w:1},{h:3,w:1},{h:4,w:1},{h:7,w:1}] //20
//var bars = [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:3,w:1},{h:3,w:1},{h:4,w:1}] // 8;


function calculateWater(bars){
	
	var previous = -1;
	var stack = new Array();
	var volume = 0;

	var up = false;
	for (var i = 0 ; i<bars.length;i++){

		var bar = bars[i];
		console.log("main bar="+JSON.stringify(bar));
		console.log("previous bar="+JSON.stringify(previous));

		if (i == bars.length-1 && bar.h > previous.h){
			console.log("branch 1");			
			volume += calculatePrevious(stack,bar);			
			console.log("volume="+volume);			
		}
		else if (bar.h < previous.h ){
			console.log("branch 2");
			if (up){
				volume += calculatePrevious(stack,previous);
				//since its previous			
				console.log("volume="+volume);
				up = false;
			}
			stack.push(bar);				
		}else{
			console.log("branch 3");
			up = true;
			stack.push(bar);
		}
		previous = bar; 
	}
	
	console.log("Last Stack="+JSON.stringify(stack));
	return volume;

}

function calculatePrevious(stack, bar){
	console.log("calculatePrevious Stack="+JSON.stringify(stack));
	console.log("calculatePrevious Bar="+JSON.stringify(bar));
	var totalLength = 0;
	var totalArea = 0;

	var brokeEarly = false;

	while((a=stack.pop()) != null){ 
		console.log("calculatePrevious a="+JSON.stringify(a));
		//stop when we find a higher bar
		if (a.h > bar.h){
			stack.push(a);
			brokeEarly = true;
			console.log("broke early");
			break;
		}
		totalArea += (a.h * a.w);
		totalLength += a.w;
		
		
	}
	//inverse area
	if (brokeEarly && totalArea>0){
		console.log("broke early with totalArea="+totalArea);
		stack.push({h:bar.h,w:(totalLength+1), s:'CPE'});		
	}else{
		stack.push({h:bar.h,w:(totalLength), s:'CP'});		
	}

	return (totalLength * bar.h) - totalArea;

}
module.exports = calculateWater;