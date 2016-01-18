'use strict';

// Personals controller

var personalsApp = angular.module('personals');

personalsApp.controller('PersonalsController', ['$scope', '$stateParams', 'Personals', '$uibModal', '$log', '$q',
  function ($scope, $stateParams, Personals, $uibModal, $log, $q) {
    
    // Find a list of Personals
    this.personals = Personals.query();

    this.selectedDropdownItems = null;
    
    // Open a modal window to create a single personal record
    this.modelCreate = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modules/personals/views/create-personal.client.view.html',
      controller: function ($scope, $uibModalInstance) {
    
        $scope.ok = function () {
          $uibModalInstance.close($scope.personal);
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
        
      },
      size: size
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
    
    // Open a modal window to update a single personal record
    this.modelUpdate = function (size, selectedPersonal) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modules/personals/views/edit-personal.client.view.html',
      controller: function ($scope, $uibModalInstance, personal) {
        $scope.personal = personal;
        
        $scope.ok = function () {
          $uibModalInstance.close($scope.personal);
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
        
      },
      size: size,
      resolve: {
        personal: function () {
          return selectedPersonal;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  
    // Remove existing Personal
    this.remove = function (personal) {
      if (personal) {
        personal.$remove();

        for (var i in this.personals) {
          if (this.personals[i] === personal) {
            this.personals.splice(i, 1);
          }
        }
      } else {
        this.personal.$remove(function () {
        });
      }
    };

    
  }
]);
  
personalsApp.controller('PersonalsCreateController', ['$scope', 'Personals', 'Notify',
  function ($scope, Personals, Notify) {
    // Create new Personal
    this.CreatePrsnl = function () {

      // Create new Personal object
      var personal = new Personals({
        fName: this.fName,
        lName: this.lName,
        qualification: this.qualification,
        experience: this.experience,
        emailId: this.emailId,
        contact: this.contact,
        isConsultant: this.isConsultant,
        speciality: this.speciality,
        treatment: this.treatment,
        duration: this.duration
        
      });


      // Redirect after save
      personal.$save(function (response) {

        // Clear form fields
        $scope.fName = '';
        $scope.lName = '';
        $scope.qualification = '';
        $scope.experience = '';
        $scope.emailId = '';
        $scope.contact = '';
        $scope.isConsultant = '';
        $scope.speciality = '';
        $scope.treatment = '';
        $scope.duration = '';
        
        Notify.sendMsg('NewPersonal', {'id': response._id});
        
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);

personalsApp.controller('PersonalsUpdateController', ['$scope', 'Personals',
  function ($scope, Personals) {
    
    // Update existing Personal
    this.UpdatePrsnl = function (updtpersonal) {

      var personal = updtpersonal;
      
      personal.$update(function () {
        console.log(personal);
        //$location.path('personals');
      }, function (errorResponse) {
        
        $scope.error = errorResponse.data.message;
        console.log(errorResponse.data.message);
      });
    };
  }
]);
  
personalsApp.directive('listPersonal', ['Personals', 'Notify', 
  function(Personals, Notify) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/personals/views/view-personal.client.view.html',
      link: function($scope, element, attrs){
        //when a new personal is added, update the personal list
        
        Notify.getMsg('NewPersonal', function (event, data) {
          $scope.personalsCtrl.personals = Personals.query();
        });
      }
    };
}]);


