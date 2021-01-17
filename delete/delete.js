// svgNode
//   .selectAll("rect")
//   .data(data)
//   .join(
//     (enter) => enter.append("rect"),
//     (update) => update,
//     (exit) => exit.transition().attr("width", 0).attr("height", 0).remove()
//   )
//   .attr("x", (_, i) => 55 * i)
//   .attr("y", 50)
//   .attr("width", 50)
//   .attr("height", (d) => d)
//   .attr("fill", "gray");

//join
// var my_group = svg.selectAll('.chart_group')
// .data(data, d => d.id)
// .join(function(group){
//  var enter = group.append("g").attr("class","chart_group");
//          enter.append("rect").attr("class","group_rect");
//          enter.append("text").attr("class","group_text");
//          enter.append("image").attr("class","group_image");
//          return enter;
//  });

// -------------------------------

// function textSize(text) {
//   if (!d3) return;
//   var container = d3.select('body').append('svg');
//   container.append('text').attr({ x: -99999, y: -99999 }).text(text);
//   var size = container.node().getBBox();
//   container.remove();
//   return { width: size.width, height: size.height };
// }

// Usage: textSize("This is a very long text");
// => Return: Object {width: 140, height: 15.453125}

// -------------------------------------------------

// var textNode = node.filter(function(d) {return (!d.image)})

// textNode.append("text")
//     .attr("class", "text")
//     .attr("text-anchor", "middle")
//     .attr("dx", 0)
//     .attr("dy", ".35em")
//     .text(function(d) {
//         return d.name;
//     }).call(getBB);
// textNode.insert("rect","text")
//     .attr("width", function(d){return d.bbox.width})
//     .attr("height", function(d){return d.bbox.height})
//     .style("fill", "yellow");

// function getBB(selection) {
//     selection.each(function(d){d.bbox = this.getBBox();})
// }
