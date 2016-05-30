var app = angular.module("football", []);

app.service("FootballService", function ($http) {
    //football players
    this.getFootballPlayers = function () {
        return $http({
            method: "GET",
            url: "/api/FootballPlayers"
        })
    },

    this.getFootballPlayer = function (footballPlayerID) {
        return $http({
            method: "GET",
            url: "/api/FootballPlayers/" + footballPlayerID
        })
    },

    this.addFootballPlayer = function (footballPlayerToAdd) {
        return $http({
            method: "POST",
            url: "/api/FootballPlayers",
            data: footballPlayerToAdd
        })
    },

    this.deleteFootballPlayer = function (IDToDelete) {
        return $http({
            method: "DELETE",
            url: "/api/FootballPlayer/" + IDToDelete
        })
    },

    this.editFootballPlayer = function (IDToEdit, footballPlayerToEdit) {
        return $http({
            method: "PUT",
            url: "/api/FootballPlayers/" + IDToEdit,
            data: footballPlayerToEdit
        })
    }

    //football clubs
    this.getFootballClubs = function () {
        return $http({
            method: "GET",
            url: "/api/FootballClubs"
        })
    },

    this.getFootballClub = function (footballClubID) {
        return $http({
            method: "GET",
            url: "/api/FootballClubs/" + footballClubID
        })
    },

    this.addFootballClub = function (footballClubToAdd) {
        return $http({
            method: "POST",
            url: "/api/FootballClub",
            data: footballClubToAdd
        })
    },

    this.deleteFootballClub = function (IDToDelete) {
        return $http({
            method: "DELETE",
            url: "/api/FootballClub/" + IDToDelete
        })
    },

    this.editFootballClub = function (IDToEdit, footballClubToEdit) {
        return $http({
            method: "PUT",
            url: "/api/FootballClubs/" + IDToEdit,
            data: footballClubToEdit
        })
    }
});

app.controller("FootballCtrl", function ($scope, FootballService) {


    //listing existing football players
    $scope.footballPlayersList = null;
    FootballService.getFootballPlayers().then(function (dataResponse) {
        $scope.footballPlayersList = dataResponse;
    });

    //listing existing football clubs
    $scope.footballClubsList = null;
    FootballService.getFootballClubs().then(function (dataResponse) {
        $scope.footballClubsList = dataResponse;
    });

    //adding a football player
    $scope.footballPlayer = {
        Age: "",
        GoalsScoared: "",
        Name: ""
    };
    $scope.addNewFootballPlayer = function () {
        FootballService.addFootballPlayer($scope.footballPlayer).then(function () {
            FootballService.getFootballPlayers().then(function (dataResponse) {
                $scope.footballPlayersList = dataResponse;
            });
            $scope.footballPlayer.Age = "";
            $scope.footballPlayer.GoalsScoared = "";
            $scope.footballPlayer.Name = "";
        });
    };

    //adding a football club
    $scope.footballClub = {
        Name: "",
        Country: ""
    };
    $scope.addNewFootballClub = function () {
        FootballService.addFootballClub($scope.footballClub).then(function () {
            FootballService.getFootballClubs().then(function (dataResponse) {
                $scope.footballClubsList = dataResponse;
            });
            $cope.footballClub.Name = "";
            $scope.footballClub.Country = "";
        });
    };

    //deleting a football player
    $scope.deleteFPID = "";
    $scope.delFP = function () {
        FootballService.deleteFootballPlayer($scope.deleteFPID).then(function () {
            FootballService.getFootballPlayers().then(function (dataResponse) {
                $scope.footballPlayersList = dataResponse;
            });
            $scope.deleteFPID = "";
        });
    };

    //deleting a football club
    $scope.deleteFCID = "";
    $scope.delFC = function () {
        FootballService.deleteFootballClub($scope.deleteFCID).then(function () {
            FootballService.getFootballClubs().then(function (dataResponse) {
                $scope.footballClubsList = dataResponse;
            });
            $scope.deleteFCID = "";
        });
    };

    //updating a football player
    $scope.editFPID;
    $scope.autocompleteFP = function (age, goalsScored, name) {
        $scope.editFPID = id;
        $scope.footballPlayer.Age = age;
        $cope.footballPlayer.GoalsScoared = goalsScored;
        $scope.footballPlayer.Name = name;
    };

    $scope.editExistingFootballPlayer = function () {
        var footballPlayerToEdit = {
            Id: $scope.editFPID,
            Age: $scope.footballPlayer.Age,
            GoalsScored: $scope.footballPlayer.GoalsScoared,
            Name: $scope.footballPlayer.Name
        };
        FootballService.editfootballPlayer($scope.editFPID, footballPlayerToEdit).then(function () {
            FootballService.getfootballPlayers().then(function (dataResponse) {
                $scope.footballPlayersList = dataResponse;
            });
            $scope.footballPlayer.Age = "";
            $scope.footballPlayer.GoalsScoared = "";
            $scope.footballPlayer.Name = "";
        });
    };

    //updating a football club
    $scope.editFCID;
    $scope.autocompleteFC = function (name, country) {
        $scope.editFCID = id;
        $scope.footballClub.Name = name;
        $cope.footballClub.Country = country;
    };

    $scope.editExistingFootballClub = function () {
        var footballClubToEdit = {
            Id: $scope.editFCID,
            Name: $cope.footballClub.Name,
            Country: $cope.footballClub.Country
        };
        FootballService.editfootballClub($scope.editFCID, footballClubToEdit).then(function () {
            FootballService.getfootballClubs().then(function (dataResponse) {
                $scope.footballClubsList = dataResponse;
            });
            $cope.footballClub.Name = "";
            $scope.footballClub.Country = "";
        });
    };
});