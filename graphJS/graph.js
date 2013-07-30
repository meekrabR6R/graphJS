/******************************************
 *Graph Module.
 ******************************************/

//graph constructor
function Graph() {
    this._numVertices = 0;
    this._nodes = [];
}

Graph.prototype = {
    /*********************************
    * Adds a node to graph.
    * @param id: id of node,
    * @param data: associated data,
    * @param edges: points to connected nodes
    ***************************************/
    addNode: function(id, data, edges){
        //create new vertex w/ data and pointers
        var vertex = {
            id: id,
            data: data,
            edges: edges
        };

        this._nodes[this._numVertices++] = vertex;
    },

    /*******************************************
    * Establishes a one-way (directed) connection
    * between two nodes.
    * @param id: id of node 1,
    * @param nodeToConnect: node 2
    ********************************************/
    addDirectedEdge: function(id, nodeToConnect){

        var flag1 = 0;
        var flag2 = 0;
        var tmpHldr1 = 0;
        var tmpHldr2 = 0;

        for (i = 0; i < this._nodes.length; i++) {

            if (this._nodes[i].id == id){
               flag1 = 1;
               tmpHldr1 = i;
            }

            if (this._nodes[i].id == nodeToConnect) {
               flag2 = 1;
               tmpHldr2 = i;
            }

        }

        if (flag1 === 1 && flag2 === 1)
            this._nodes[tmpHldr1].edges.push(nodeToConnect);
        else
            console.log("Node not added.");
    },

    /**********************************************
    * Establishes a two-way (undirected) connection
    * between two nodes.
    * @param id: node 1,
    * @param nodeToConnect: node 2
    **********************************************/
    addUndirectedEdge: function(id, nodeToConnect){
        this.addDirectedEdge(id, nodeToConnect);
        this.addDirectedEdge(nodeToConnect, id);
    },

    /********************************************
    * Adds a 'data' object literal to a node.
    * @param id: id of node,
    * @param data: data to be added.
    *******************************************/
    addData: function(id, data){

        this._nodes.forEach(function(node){

            if(node.id == id){
               node.data = data;
            }
        });
    },

    /***********************************************
    * Gets a node based on its id.
    * @param id: id of node
    * @return: node
    ***********************************************/
    getNode: function(id){

        var retNode = null;
        for (i = 0; i < this._nodes.length; i++) {
            if (id === this._nodes[i].id){
                retNode = this._nodes[i];
                break;
            }
        }

        return retNode;
    },

    /**************************
    * Removes a node from graph.
    * @param id: id of node to remove
    *******************************/
    removeNode: function(id){

        var indexOne = this._nodes.indexOf(this.getNode(id));
        this._nodes.splice(indexOne, 1);

        this._nodes.forEach(function(node){

            var indexTwo = node.edges.indexOf(id);
            node.edges.splice(indexTwo, 1);
        });

        this._numVertices--;
    }

};

//Checks if running in Node.js environment
if(typeof module.exports !== 'undefined')
    module.exports.graph = new Graph();