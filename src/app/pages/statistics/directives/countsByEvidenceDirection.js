(function() {
  'use strict';
  angular.module('civic.pages')
    .directive('countsByEvidenceDirection', countsByEvidenceDirection)
    .controller('countsByEvidenceDirectionController', countsByEvidenceDirectionController);

  // @ngInject
  function countsByEvidenceDirection() {
    var directive = {
      restrict: 'E',
      scope: {
        options: '=',
        palette: '='
      },
      template: '<div class="chart-pie"></div>',
      controller: countsByEvidenceDirectionController
    };
    return directive;
  }

  // @ngInject
  function countsByEvidenceDirectionController($scope,
                                          $rootScope,
                                          $element,
                                          d3,
                                          dimple,
                                          _) {
    console.log('countsByEvidenceDirection loaded.');
    var options = $scope.options;

    var svg = d3.select($element[0])
        .append('svg')
      .attr('width', options.width)
      .attr('height', options.height)
      .attr('id', options.id)
      .style('overflow', 'visible');

    // title
    svg.append('text')
      .attr('x', options.margin.left)
      .attr('y', options.margin.top - 10)
      .style('text-anchor', 'left')
      .style('font-family', 'sans-serif')
      .style('font-weight', 'bold')
      .text(options.title);

    var chart = new dimple.chart(svg);

    // chart.setBounds(20, 20, 460, 360);
    var p = chart.addMeasureAxis("p", "Count");
    p.tickFormat = d3.format(",.0f");
    chart.addSeries("Direction", dimple.plot.pie);
    chart.addLegend(240, 20, 90, 300, "left");

    chart.data = _.map(options.data, function(key, value) {
      return {
        Direction: _.capitalize(value),
        Count: key
      };
    });
    chart.draw();

    $scope.chart = chart;
  }
})();
