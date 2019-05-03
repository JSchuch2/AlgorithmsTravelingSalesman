//Original pastIteration should be [[0,0],[0,0]]
  //Our Main Driver Function, it is called by generateRandomPath
  function twoOpt(graph, route, pastIteration, timesLooped, lowestDistance) //needs to take in a second param. called route.
  {
    
   var iteration = generateIK(graph); 
 
   route = generateRandomPath(graph, route, pastIteration, timesLooped, lowestDistance, iteration);
 
   //console.log(graph);
   pastIteration = iteration;
 
   var newWeight = calcRouteWeight(graph,route);
   
   if (newWeight < lowestDistance)
   {
     lowestDistance = newWeight;
   }
 
   if (lowestDistance <= 1)
   {
     return lowestDistance;
   }
   if (timesLooped < 99)
   {   
       timesLooped++;
       //console.log(lowestDistance);
       lowestDistance = twoOpt(graph, route, iteration, timesLooped, lowestDistance); 
   }  
       return lowestDistance;
     
   }
 
   
 
 
 
   
  //End of twoOpt function
 
 
  //Our Swap Function
 function swap(route,i,k)
 {
   
 var newRoute = [];
 
 for(var test = 0; test < i; test++)
 {
 newRoute.push( route[test] );
 }
 for (var tester = k; tester >= i; tester--)
 {
   newRoute.push(route[tester]);
 }
 for (var testing = k + 1; testing < route.length; testing++)
 {
   newRoute.push(route[testing]);
 }

 
 
 console.log("newRoute:");
 console.log(newRoute);
 for(var a = 0; a < newRoute.length; a++)
 {
     if (newRoute[a] == undefined)
     {
         newRoute.splice(a, 1);
         a = -1;
     }
     
 }
 console.log("afterRun");
 console.log(newRoute);
   return newRoute;
  
 }
 //End of Swap Function
 
 function generateIK(graph)
 {
   var i= Math.floor(Math.random() * (graph.length/2)-1) + 1;
   var k= Math.floor(Math.random() * ((graph.length)-2)) + (i+1);
 
 
   var firstTest = [i,k];
   var secondTest = [k,i]
   return [firstTest, secondTest];
 }
 
 // Generates a random path for us to follow
 function generateRandomPath(graph, indexSwapped, pastIteration, timesLooped, lowestDistance, iteration)
 { 
 
 var firstTest = iteration[0];
 var secondTest = iteration[1];
 
   var graphIndexes = [];
 
   for(var j = 0; j < graph.length; j++)
   {
    graphIndexes[j] = j; 
   }
 
 
   if ( ((firstTest.toString() === pastIteration[0].toString()) || (firstTest.toString() === pastIteration[1].toString() ) ) && ( (secondTest.toString() === pastIteration[1].toString()) || (secondTest.toString() === pastIteration[0].toString()) ) )
 {
   iteration = generateIK(graph); 
   generateRandomPath(graph, indexSwapped, pastIteration, timesLooped, lowestDistance, iteration);
 }

 
 console.log("index:");
 console.log(indexSwapped);

   indexSwapped = swap(graphIndexes,iteration[0][0],iteration[0][1]);
   console.log("Afterindex:");
   console.log(indexSwapped);
   
   return indexSwapped;
 
   
 
   var nike = twoOpt(graph, indexSwapped[0], pastIteration, timesLooped, lowestDistance);
   return nike;
 }
 //End of generateRandomPath
 
 
 // the calculateweight is so that 
 // after we have chosen a random path
 // and switched the two inputs
 // the calculatewieght looks at the shortest path for that iteration
 // then we do the same for another iteration and compare them
 
 //calcRouteWeight is working 
 function calcRouteWeight(graph,route)
 {
    console.log(route);
    console.log(graph);
   var totalDist=0;
   for(var i=0; i< route.length - 1; i++)
   {
     //get the weight from node to node and add the weights together to find the total weight of the route
     for(var j=0; j < route.length - 1; j++)
     {
       if (graph[route[i]][j][0] == route[i+1])
       {
         totalDist = totalDist + (graph[route[i]][j][1]);
       }
     }
   }
 
   return totalDist;
 }
 //End of calcRouteWeight
 
/////////////////////////////////////////////////Check Statements///////////////////////////////////////////////////////////////////


 function twoOptTester()
{
    var begin=Date.now();
    twoOpt( "ArrayHere", [], [[0,0],[0,0]], 0, Infinity );
        var end= Date.now();

        var timeSpent = (end-begin)/1000;
        
        console.log(timeSpent)
}

twoOptTester();