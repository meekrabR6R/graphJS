/****************************************
* Tests for Graph.js
*****************************************/
var g = require('./graph.js');
var graph = g.graph;

/**********************************
* Sets up test data.
**********************************/
function makeGraph(){

	var data = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
	var graphResults = { nodeIDs : [], nodeData : [] };

	for(i = 0; i < 10; i++){
		graph.addNode(i, data[i], []);
		graphResults.nodeIDs.push(graph._nodes[i].id);
		graphResults.nodeData.push(graph._nodes[i].data);
	}

	graph.addDirectedEdge(1, 2);
	graph.addUndirectedEdge(3, 4);

	return graphResults;
}

/********************************
* Test One
*********************************/
function testIDs(graphTestData){

	var testList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	if (JSON.stringify(testList) === JSON.stringify(graphTestData.nodeIDs))
		return true;

	return false;
}

/********************************
* Test Two
********************************/
function testData(graphTestData){

	var testList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

	if (JSON.stringify(testList) === JSON.stringify(graphTestData.nodeData))
		return true;

	return false;

}

/*****************************
* Test Three
******************************/
function testNodeCount(){

	if(graph._numVertices === 10)
		return true;

	return false;
}

/********************************
* Test Four
********************************/
function testDirectedEdges(){

	var testNodeOne = graph.getNode(1);
	var testNodeTwo = graph.getNode(2);

	if(JSON.stringify(testNodeOne.edges) === "[2]" && JSON.stringify(testNodeTwo.edges) === "[]")
		return true;

	return false;
}

/*******************************
* Test Five
********************************/
function testUndirectedEdges(){

	var testNodeOne = graph.getNode(3);
	var testNodeTwo = graph.getNode(4);

	if(JSON.stringify(testNodeOne.edges) === "[4]" && JSON.stringify(testNodeTwo.edges) === "[3]")
		return true;

	return false;
}

/*********************************
* Test Six
***********************************/
function testRemoveNode(){

	var testList = [0, 1, 2, 3, 5, 6, 7, 8, 9];
	var newNodeList = [];
	var testCount = 9;

	graph.removeNode(4);

	for(i = 0; i < graph._numVertices; i++)
		newNodeList.push(graph._nodes[i].id);

	if(JSON.stringify(newNodeList) === JSON.stringify(testList) &&
		graph._numVertices === testCount && JSON.stringify(graph.getNode(3).edges) === "[]")
		return true;

	return false;
}

/*********************************
* Runs Tests
*********************************/
function runTests(){

	var graphTestData = makeGraph();
	var failCount = 0;
	//test one
	if( testIDs(graphTestData) === true)
		console.log("Test One Passed.");
	else{
		console.log("Test One Failed");
		failCount++;
	}

	//test two
	if( testData(graphTestData) === true)
		console.log("Test Two Passed.");
	else{
		console.log("Test Two Failed");
		failCount++;
	}

	//test three
	if( testNodeCount() === true)
		console.log("Test Three Passed.");
	else{
		console.log("Test Three Failed");
		failCount++;
	}

	//test four
	if(testDirectedEdges() === true)
		console.log("Test Four Passed.");
	else{
		console.log("Test Four Failed");
		failCount++;
	}

	//test five
	if(testUndirectedEdges() === true)
		console.log("Test Five Passed.");
	else{
		console.log("Test Five Failed");
		failCount++;
	}

	//test six
	if(testRemoveNode() === true)
		console.log("Test Six Passed.");
	else{
		console.log("Test Six Failed");
		failCount++;
	}

	//results
	if(failCount === 0)
		console.log("All tests passed!");
	else
		console.log("%j tests failed.", failCount);
}


runTests();