var app = angular.module("movies", []);

app.service("ActorsService", function ($http) {
    this.getActors = function () {
        return $http({
            method: "GET",
            url: "/api/Actors"
        })
    },

    this.addActor = function(actorToAdd) {
        return $http({
            method: "POST",
            url: "/api/Actors",
            data: actorToAdd
        })
    },

    this.deleteActor = function (IDToDelete) {
        return $http({
            method: "DELETE",
            url: "/api/Actors/" + IDToDelete
        })
    },

    this.editActor = function (IDToEdit, actorToEdit) {
        return $http({
            method: "PUT",
            url: "/api/Actors/" + IDToEdit,
            data: actorToEdit
        })
    }
});

    app.controller('ActorsCtrl', function ($scope, ActorsService) {
        $scope.actor = {
            Name: "",
            DateOfBirth: "",
            Revenue: "",
        };

    //lsting existing actors
    $scope.actorsList = null;
    ActorsService.getActors().then(function (dataResponse) {
        $scope.actorsList = dataResponse;
    });

    //adding actor
    $scope.addNewActor = function () {
        ActorsService.addActor($scope.actor).then(function () {
            ActorsService.getActors().then(function (dataResponse) {
                $scope.actorsList = dataResponse;
            });
            $scope.actor.Name = "";
            $scope.actor.DateOfBirth = "";
            $scope.actor.Revenue = "";
        });
    };

    //deleting an actor
    $scope.deleteID = "";
    $scope.delAct = function () {
        ActorsService.deleteActor($scope.deleteID).then(function () {
            ActorsService.getActors().then(function (dataResponse) {
                $scope.actorsList = dataResponse;
            });
            $scope.deleteID = "";
        });
    };

    //updating an entry
    //$scope.editID = "";
    $scope.autocomplete = function (id, name, date, revenue) {
        //$scope.editID = id;
        $scope.actor.Name = name;
        $scope.actor.DateOfBirth = date;
        $scope.actor.Revenue = revenue;

        $scope.actorToEdit = {
            Id: id,
            Name: name,
            DateOfBirth: date,
            Revenue: revenue
        };
    };
    $scope.editExistingActor = function () {
        ActorsService.editActor($scope.actorToEdit.id, $scope.actorToEdit).then(function () {
            ActorsService.getActors().then(function (dataResponse) {
                $scope.actorsList = dataResponse;
            });
            $scope.actor.Name = "";
            $scope.actor.DateOfBirth = "";
            $scope.actor.Revenue = "";
        });
    };

});