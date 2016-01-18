'use strict';

// Configuring the Personals module
angular.module('personals').run(['Menus',
  function (Menus) {
    // Add the personals dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Personals',
      state: 'personals.list',
      //type: 'dropdown'
    });
/*
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'personals', {
      title: 'List Personals',
      state: 'personals.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'personals', {
      title: 'Create Personals',
      state: 'personals.create'
    });*/
  }
]);
