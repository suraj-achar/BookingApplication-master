'use strict';

// Setting up route
angular.module('events').config(['$stateProvider',
  function ($stateProvider) {
    // Events state routing
    $stateProvider
      .state('events', {
        abstract: true,
        url: '/events',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('events.list', {
        url: '',
        templateUrl: 'modules/events/views/list-events.client.view.html'
      });
  }
]);
