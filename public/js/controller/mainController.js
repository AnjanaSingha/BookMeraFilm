module.exports = function($scope, $http){
  $scope.message = "Hello World";

  var init = function(){
    $http.get('/api/theatres').success(function (response) {
      $scope.theatreData=response;
    });
  };
  init();

  $scope.insertTheatre = function(){
    $http.post('/api/newTheatre', $scope.theatre).success(function (response) {
    });
    alert('Theatre Saved Successfully');
    init();
    $scope.theatre='';
    window.location.reload();
  };

  $scope.deleteTheatre = function(theatre){
    var x=confirm("Are you sure you want to delete ?");
    if(x){
      $http.delete('/api/deleteTheatre/'+theatre._id).success(function (response) {
    });
    alert('Theatre Removed Successfully');
  }
  window.location.reload();
    init();
  };


};
