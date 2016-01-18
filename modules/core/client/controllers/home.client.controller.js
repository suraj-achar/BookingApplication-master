'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    
    $scope.alerts = [
      {
        icon: 'glyphicon-user',
        colour: 'btn-success',
        total: '20,408',
        description: 'TOTAL BOOKINGS'
      },
      {
        icon: 'glyphicon-calendar',
        colour: 'btn-primary',
        total: '8,342',
        description: 'UPCOMING EVENTS'
      },
      {
        icon: 'glyphicon-edit',
        colour: 'btn-success',
        total: '229',
        description: 'NEW BOOKINGS IN 24HRS'
      },
      {
        icon: 'glyphicon-record',
        colour: 'btn-info',
        total: '65,922',
        description: 'EMAILS SENT'
      },
      {
        icon: 'glyphicon-eye-open',
        colour: 'btn-warning',
        total: '205',
        description: 'FOLLOW UPS REQUIRED'
      },
      {
        icon: 'glyphicon-flag',
        colour: 'btn-danger',
        total: '329',
        description: 'REFERRALS TO MODERATE'
      }
    ];
    
  }
]);
