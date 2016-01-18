'use strict';

var eventsApp = angular.module('events');

eventsApp.controller('EventsCreateController', ['$scope', '$googleCalendar','$location', '$log',
						function($scope , $googleCalendar, $location, $log) {

	$scope.events = [];
	
	$scope.durations = [
        {label:'One Hours (1 hours)', hours:1},
        {label:'Two Hours (2 hours)', hours:2},
		{label:'Half Day (4 hours)', hours:4},
		{label:'Full Day (8 hours)', hours:8}
	];	
	
	this.addEvent = function() {

		console.log('Start Date:', $scope.event.startDate);

		//format end date/time object in to google format
		var endDate = new Date($scope.event.startDate);
		//endDate.setHours(endDate.getHours() + $scope.event.duration.hours);
		console.log('End Date:', endDate);
        
        $scope.patientInfo = {
					patientName: $scope.patient.patientName,
					contact: $scope.patient.contactNumber,
					emailId: $scope.patient.emailId
				};
                
        /*$scope.patientInfo = [
          {patientName: $scope.patient.patientName} ,
          {contact: $scope.patient.contactNumber },
          {emailId: $scope.patient.emailId}
        ];*/
console.log($scope.patientInfo);
		$googleCalendar.addEvent($scope.event.startDate, endDate, $scope.contactInfo, $scope.patientInfo).then(function(result) {
			console.log('Add Event Result:', result);
			//addEventModal.hide();
		});
 
	};
	
	this.update = function(selectedDropdownItems) {
		
		$scope.contactInfo = selectedDropdownItems;
		console.log($scope.contactInfo);
	};

}]);
/*
eventsApp.controller('EventsCreateController', ['$scope', 'Patients', 'Notify',
  function ($scope, Patients, Notify) {
   
   // Find a list of Patients
    this.patients = Patients.query();
    
   
    // Create new Patient
    this.CreatePatient = function () {

      // Create new Patient object
      var patient = new Patients({
        patientName: this.patientName,
        contactNumber: this.contactNumber,
        emailId: this.emailId,
        
      });


      // Redirect after save
      patient.$save(function (response) {

        // Clear form fields
        $scope.patientName = '';
        $scope.contactNumber = '';
        $scope.emailId = '';
        
        Notify.sendMsg('NewPatient', {'id': response._id});
        
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
*/
eventsApp.controller('PatientsUpdateController', ['$scope', 'Patients',
  function ($scope, Patients) {
    
    // Update existing Patient
    this.UpdatePtnt = function (updtpatient) {

      var patient = updtpatient;
      
      patient.$update(function () {
        console.log(patient);
        //$location.path('patients');
      }, function (errorResponse) {
        
        $scope.error = errorResponse.data.message;
        console.log(errorResponse.data.message);
      });
    };
  }
]);
  
eventsApp.directive('listPatient', ['Patients', 'Notify', 
  function(Patients, Notify) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/events/client/views/create-events.client.view.html',
      link: function($scope, element, attrs){
        //when a new patient is added, update the patients list
        
        Notify.getMsg('NewPatient', function (event, data) {
          $scope.eventsCtrl.patients = Patients.query();
        });
      }
    };
}]);

eventsApp.controller('EventsController', ['$scope', '$googleCalendar', '$uibModal', '$log',
						function($scope , $googleCalendar, $uibModal, $log) {


	//================================================================================
	// Variables
	//================================================================================

	$scope.events = [];
	
    $scope.calEvents = [];
	$scope.eventSources = []; // Edited
    
	$scope.calOptions = {
        editable: true,
		header: {
			left: 'prev,today,next',
			center: 'title',
			right: 'month, agendaWeek, agendaDay',
             
		}	
	};

	//================================================================================
	// Scope Functions
	//================================================================================
	
	$scope.getEvents = function() {
		$googleCalendar.getEvents().then(function(events) {
			console.log(events);
			$scope.events = events;
            
            for(var index = 0; index < events.length; index++) {
                var event = events[index];
                
                $scope.calEvents[index] = {
                    'title': event.summary,
                    'start': event.start.dateTime,
                    'end': event.end.dateTime,
                    color: '#D2691E'
                };
            }
            console.log($scope.calEvents);
		});
	};
	$scope.getEvents();
    
    $scope.eventSources = [$scope.calEvents];

	$scope.setCurrentEvent = function(event) {
		$scope.currentEvent = event;
	};
	
	// Open a modal window to create a single event
    this.modelCreate = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modules/events/views/create-events.client.view.html',
      controller: function ($scope, $uibModalInstance) {
    
        $scope.ok = function () {
          $uibModalInstance.close($scope.event);
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

}]);