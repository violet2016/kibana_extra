/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import _ from 'lodash';
import html from './gpdb_doc_table.html';

import { getRequestInspectorStats, getResponseInspectorStats } from 'ui/courier/utils/courier_inspector_utils';

import { uiModules } from 'ui/modules';

uiModules.get('apps/gpdbDiscover', ['kibana'])
//uiModules.get('kibana')
  .directive('gpdbDocTable', function () {
    return {
      restrict: 'E',
      template: html,
      scope: {
        hits: '=?',
        indexPattern: '=?',
        searchSource: '=?',
      },
      link: function ($scope)
      {
        $scope.$watch('searchSource', function () {
          if (!$scope.searchSource) return;

          $scope.indexPattern = $scope.searchSource.getField('index');

          $scope.searchSource.setField('size', 100);

          $scope.$on('$destroy', function () {
            if ($scope.searchSource) $scope.searchSource.destroy();
          });

          function onResults(resp) {
          // Reset infinite scroll limit
            $scope.hits = resp.hits.hits;
            return $scope.searchSource.onResults().then(onResults);
          }

          function startSearching() {
            let inspectorRequest = undefined;
            if (_.has($scope, 'inspectorAdapters.requests')) {
              $scope.inspectorAdapters.requests.reset();
              inspectorRequest = $scope.inspectorAdapters.requests.start('Data', {
                description: `This request queries Elasticsearch to fetch the data for the search.`,
              });
              inspectorRequest.stats(getRequestInspectorStats($scope.searchSource));
              $scope.searchSource.getSearchRequestBody().then(body => {
                inspectorRequest.json(body);
              });
            }
            $scope.searchSource.onResults()
              .then(resp => {
                if (inspectorRequest) {
                  inspectorRequest
                    .stats(getResponseInspectorStats($scope.searchSource, resp))
                    .ok({ json: resp });
                }
                return resp;
              })
              .then(onResults)
              .catch(error => {
                console.log(error);
                startSearching();
              });
          }
          startSearching();
        });
      }
    };
  });
