import React from 'react';
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import { render, unmountComponentAtNode } from 'react-dom';
import { loadIndexPatterns, getIndexPatterns } from './util/index_utils';
import 'ui/autoload/styles';
import './less/main.less';
import { Main } from './components/main';
import template from './index.html';
import uiRoutes from 'ui/routes';
import './components/gpdb_doc_table/gpdb_doc_table';
import { addSearchStrategy } from 'ui/courier';
import { defaultSearchStrategy } from 'ui/courier/search_strategy/default_search_strategy';
const app = uiModules.get('apps/gpdbDiscover');

app.config($locationProvider => {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false,
  });
});
app.config(stateManagementConfigProvider =>
  stateManagementConfigProvider.disable()
);

/*function RootController($scope, $element, $http) {
  const domNode = $element[0];

  // render react to DOM
  render(<Main title="gpdb_discover" httpClient={$http} />, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}*/

//chrome.setRootController('gpdbDiscover', RootController);
chrome.setRootTemplate(template);
addSearchStrategy(defaultSearchStrategy);
uiModules
  .get('apps/gpdbDiscover', ['kibana'])
  .controller('discFieldController', ($scope, Private) => {
    $scope.indexPatterns = null;
    $scope.indexPattern = null;
    $scope.selectedVisualization = null;
    loadIndexPatterns(Private).then(list => {
      $scope.indexPatterns = list.map(i => i.attributes && i.attributes.title);
    });
    $scope.$watch('selectIndex', (indexId) => {
      if (!indexId) return;
      $scope.indexPattern = indexId;
    });
  });