var app = angular.module("main", []);

app.controller('MainCtrl', function ($scope) {
    $scope.allTasks=["Hardcoded Task"];
    $scope.activeTasks = [];
    $scope.doneTasks = [];
    $scope.crtTask = '';
    $scope.numberOfTasks = $scope.allTasks.length;

    $scope.addTask = function () {
        $scope.allTasks.push($scope.crtTask);
        $scope.crtTask = "";
        $scope.numberOfTasks = $scope.allTasks.length;
    };

    //not working
    $scope.remove = function (index) {
        $scope.allTasks.splice(index, 1);
        $scope.numberOfTasks = $scope.allTasks.length;
    };
});