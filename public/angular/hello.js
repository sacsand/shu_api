var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope.$http) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});
/*
var RESOURCES.API_URL=""
function Hello($scope, $http) {
  $scope.lastpage = 1;
  $scope.limit = 40;
  $http({
    url:RESOURCES.API_URL+'api/wanted',
    method: "GET",
    params: {
      page: $scope.lastpage,
      limit: $scope.limit
    }
  }).success(function(wanteds, status, headers, config) {
    $scope.wanteds = wanteds.docs;
    console.log($scope.wanteds);
    $scope.currentpage = wanteds.page;
    $scope.totalRecord = wanteds.total;
    $scope.totalPages = wanteds.pages;
  });
};
}
*/
