function genGraph(size)
{
    var graph = [];
    for(var i = 0; i<size;i++)
    {
        graph.push([]);
    }
    for(var i=0;i<size;i++)
    {
        for(var k=i;k<size;k++)
        {

            if(!(k==i))
            {
                var rand = Math.floor(Math.random() * 30);
                graph[i].push([k,rand]);
                graph[k].push([i,rand]);
            }
        }
    } 
    return graph;
}

console.log(genGraph(100));




