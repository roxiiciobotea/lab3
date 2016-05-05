var app = angular.module("movies", []);

app.service("ActorsService", function ($http) {
    this.getActors = function () {
        return $http({
            method: "GET",
            url: "/api/Actors"
        })
    },

    this.getOneActor = function (actorID) {
        return $http({
            method: "GET",
            url: "/api/Actors/" + actorID
        })
    },

    this.addActor = function (actorToAdd) {
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

    //actors count
    $scope.actorsCount = 0;
    var countActors = function () {
        var cnt = 0;
        for (actor in $scope.actorsList.data)
            cnt++;
        return cnt;
    };

    //listing existing actors
    $scope.actorsList = null;
    ActorsService.getActors().then(function (dataResponse) {
        $scope.actorsList = dataResponse;
        $scope.actorsCount = countActors();
    });

    //adding an actor
    $scope.actor = {
        Name: "",
        DateOfBirth: "",
        Revenue: ""
    };
    $scope.addNewActor = function () {
        ActorsService.addActor($scope.actor).then(function () {
            ActorsService.getActors().then(function (dataResponse) {
                $scope.actorsList = dataResponse;
                $scope.actorsCount = countActors();
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
                $scope.actorsCount = countActors();
            });
            $scope.deleteID = "";
        });
    };

    //updating an entry - not working, it says bad request
    $scope.editID;
    $scope.autocomplete = function (id, name, date, revenue) {
        $scope.editID = id;
        $scope.actor.Name = name;
        $scope.actor.DateOfBirth = date;
        $scope.actor.Revenue = revenue;
    };

    $scope.editExistingActor = function () {
        var actorToEdit = {
            Id: $scope.editID,
            Name: $scope.actor.Name,
            DateOfBirth: $scope.actor.DateOfBirth,
            Revenue: $scope.actor.Revenue
        };
        ActorsService.editActor($scope.editID, actorToEdit).then(function () {
            ActorsService.getActors().then(function (dataResponse) {
                $scope.actorsList = dataResponse;
            });
            $scope.actor.Name = "";
            $scope.actor.DateOfBirth = "";
            $scope.actor.Revenue = "";
        });
    };

    //search by name - not working!
    /*$scope.searchName = "";
    $scope.searchResults = "";
    $scope.searchAct = function () {
        var found = false;
        for (actor in $scope.actorsList.data) {
            if(actor.Name === $scope.searchName)
            {
                found = true;
                $scope.foundActor = actor;
                $scope.searchResults = "Search results:";
                break;
            }
        }
        if (found === false)
            $scope.searchResults = "Search results: none";
    }*/

    //search by id
    $scope.foundActor = null;
    $scope.searchID = "";
    $scope.searchAct = function () {
        ActorsService.getOneActor($scope.searchID).then(function (dataResponse) {
            $scope.foundActor = dataResponse;
        });
        $scope.searchID = "";
    }
});