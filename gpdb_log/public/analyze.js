// This part add a panel to a singe docview component
import defaultTemplate from './no_template.html';

import { DocViewsRegistryProvider } from 'ui/registry/doc_views';

DocViewsRegistryProvider.register(function () {
  return {
    title: 'Analyze',
    order: 30,
    directive: {
      scope: {
        hit: '=',
        indexPattern: '=',
        filter: '=',
        columns: '='
      },
      template: defaultTemplate
    }
  };
});