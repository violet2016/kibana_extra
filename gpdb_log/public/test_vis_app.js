require('ui/autoload/all');
// import the uiExports that we want to "use"
import 'uiExports/visTypes';
import 'uiExports/visResponseHandlers';
import 'uiExports/visRequestHandlers';
import 'uiExports/visEditorTypes';
import 'uiExports/savedObjectTypes';
import 'uiExports/spyModes';
import 'uiExports/fieldFormats';

import './test_vis_app.less';
import './test_vis_app_controller.js';

import chrome from 'ui/chrome';
import { addSearchStrategy } from 'ui/courier';
import { defaultSearchStrategy } from 'ui/courier/search_strategy/default_search_strategy';
import template from './test_vis_app.html';

chrome.setRootTemplate(template);
/*
* Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
* or more contributor license agreements. Licensed under the Elastic License;
* you may not use this file except in compliance with the Elastic License.
*/
addSearchStrategy(defaultSearchStrategy);