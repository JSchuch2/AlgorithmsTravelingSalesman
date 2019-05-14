// James Schuchardt -  W08687849
// Carlton O. Wilcox - W09216762
// Start Date: April 27th, 2019
// Last Edited: May 3rd, 2019
// Assignment 03

function heldKarp(cities, start, seenNodes, firstRunTester, finishedNodes, finishedDistances)
{
    //FirstRunTester allows us to not always set up seenNodes in the recursion calls as we only want to initalize it in the very beginning
    if (firstRunTester == -1)
    {
        //Checks the case for if we pass it no cities
        if (!cities.length)
        {
            return 70;
            
        }
        
        //Checks the case for if we pass it one city
        if (cities.length == 1)
        {
            return 0;        
        }
        
        //Fills the array with zeros to show we have visited nothing yet
        var seenNodes = Array(cities.length).fill(0)
        //Makes sure we will never go into this if statement again
        firstRunTester = 1;
    }

    //FirstRunTester here allows us to run only this code during the recursion
    if (firstRunTester == 1)
    {
        //We need unkownnNodes to know what nodes we have not visited yet
        var unknownNodes= []
    
        //This for loop iterates through all of our seenNodes (which starts as all zeros)* and if the node is zero pushes that index location to unknownNodse
        //It does this so that later on(during recursion) we know what nodes to visit and which not to visit
        for (var firstIndex = 0; firstIndex < seenNodes.length; firstIndex++)
        {
            if (seenNodes[firstIndex] == 0)
            {
                unknownNodes.push(firstIndex);
            }
        }
    
        //Below here is where our main code functionality comes in for the heldKarp Algorithm


        //Our Base case for when we are at the lowest bound of two cities
        //This is where we are implementing *****memoization****** in order to make sure it doesn't run a test it has already run before
        if (unknownNodes.length == 2)
        {
            

            //Variables to keep track of what the last two nodes we have not visited yet are
            var firstNode = unknownNodes[0];
            var secondNode = unknownNodes[1];

            var firstTester = [firstNode, secondNode];
            var secondTester = [secondNode, firstNode];

            var testConclusion = true;
            var testHolder = 0;

            for (var i = 0; i < finishedNodes.length; i++)
            {
                //Tests have shown that this prevents us from duplicating information and trying to find the distane for the same thing over and
                if (firstTester.toString() === finishedNodes[i].toString())
                {
                    var testConclusion = false;
                    testHolder = i;
                }
                else if (secondTester.toString() === finishedNodes[i].toString())
                {
                    var testConclusion = false;
                    testHolder = i;
                }
            }

            //******memoization: If we have never seen this combination of nodes then find the distance between them
            if (testConclusion == true)
            {
                //The start of our memoization is pushing these into an array that will keep track of if we calculated these node's distance before
                finishedNodes.push(firstTester);
                finishedNodes.push(secondTester);


                //This for loop goes through and looks at our city index of the first unknown number. We then iterate through that city
                for (var secondIndex = 0; secondIndex < cities[firstNode].length; secondIndex++)
                {
                    //SecondIndex is the index of the edge we are looking at right now from our current city: (cities[firstNode])
                    //We check to see if this is equal to the next node in unknown so that we can return the distance between the final two nodes
                    if (cities[firstNode][secondIndex][0] == secondNode)
                    {
                        var distance = cities[firstNode][secondIndex][1];
                        //Second stage of memoization is to ad their distance to another array that corresponds with the points in finishedNodes
                        finishedDistances.push(distance);
                        finishedDistances.push(distance);
                        return distance;
                    }           
                }
            }
            //******memoization: If we have seen this combination of nodes then report back what we have already found
            else
            {
                
                return finishedDistances[testHolder];
            }


        }
        //End of Base Case

        // Our normal case
        else
        {
            //Starts lowestDistance at infinity so that anything becomes lower
            var lowestDistance=Infinity;
            //changes seenNodes to one so that we can show that we are on this node
            seenNodes[start]=1;

            //iterates through the current nodes connections length
            for (var thirdIndex = 0; thirdIndex < cities[start].length; thirdIndex++)
            {
                //Variable holds the current node's and it's destinations weight.
                var lookingAtSelf = seenNodes[cities[start][thirdIndex][0]];

                //Assigns our new start for the recursive call
                var newStart = cities[start][thirdIndex][0];

                //checks to find if we are trying to connect to our current node, as we want to recursively call this function with this as the start
                if (lookingAtSelf == 0)
                {
                    //Makes an array that passes by value instead of reference each time as otherwise we have a large amount of issues
                    var recursiveVisists = []
                    
                    //puts all of seenNodes contents into recursive visits as we want to keep the nodes we have been to, but we need to pass by value not reference
                    for(var j = 0; j < seenNodes.length; j++)
                    {
                        recursiveVisists.push(seenNodes[j]);
                    }

                    //Recursively calls our function until we get to the base case, and adds our connections distance for each call.
                    var recursive = heldKarp(cities, newStart, recursiveVisists, firstRunTester, finishedNodes,finishedDistances) + cities[start][thirdIndex][1];
                    
                    //If the new recursive call is lower than our last distance then make that the new LowestDistance
                    if (recursive < lowestDistance)
                    {
                        lowestDistance = recursive;
                    }
                }           
            } 
            
            return lowestDistance;   
            
        } // End of normal cases
    } // End of firstRunnerTest checker
} //End of Function


/////////////////////////////////////////////////Check Statements///////////////////////////////////////////////////////////////////

function testingHeldKarp()
{
  
  var begin=Date.now();
heldKarp( "ArrayHere", 0, [], -1, [], [] );

var end= Date.now();

var timeSpent = (end-begin)/1000;

console.log(timeSpent)
}

testingHeldKarp();

//node heldKarp.js > log-file.txt