import 'ui/visualize';
import { VisProvider } from 'ui/vis';
import { getVisualizeLoader } from 'ui/visualize/loader';

const app = require('ui/modules').get('apps/gpdb_log', ['kibana']);

app.controller('TestVisApp', function ($scope, Private) {
  // showing saved kibana visualizations
  $scope.visualizationList = null;
  $scope.selectedVisualization = null;
  //$scope.searchSource.setPreferredSearchStrategyId('default');
  let visualizeLoader = null;
  // using kibana visualizations
  getVisualizeLoader().then(loader => {
    visualizeLoader = loader;
    loader.getVisualizationList().then(list => {
      $scope.visualizationList = list;
    });
  });
  const visContainer = $('.test-vis-app-visualize');

  $scope.$watch('selectedVisualization', (visualizationId) => {
    if (!visualizationId) return;
    visualizeLoader.embedVisualizationWithId(visContainer[0], visualizationId, {});
  });
});
