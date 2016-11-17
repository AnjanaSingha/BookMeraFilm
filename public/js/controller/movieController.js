module.exports = function($scope, $http,$rootScope,$location,$q,AuthService){
  $scope.movieData="";

var init = function(){
    $http.get('/myapi/movie').success(function (response) {
      $scope.movieData1=response;
    });
  };
  init();

  $scope.deleteMovie = function(movie){
    var x=confirm("Are you sure you want to delete ?");
    if(x){
      $http.get('/mapapi/selmoviename/'+movie.Title).success(function (response) {
        $scope.data=response;
        console.log($scope.data);
    if($scope.data.length>=1)
    {console.log('Delete movie section for if.');
      alert('ERROR : Mapping exists for the movie,cannot delete.');}
    else
    {
      console.log('Delete movie section for else.');
      $http.delete('/myapi/deleteMovie/'+movie._id).success(function (response) {  });
      alert('Movie deleted Successfully');
    }
    });
//   $http.delete('/myapi/deleteRating/'+movie.Title).success(function (response) {
// });
      window.location.reload();
  }
    init();
  };

  $scope.searchMovie = function(){
    $http.get('http://www.omdbapi.com/?t='+$scope.name+'&y='+$scope.year+'&plot=short&r=json').success(function (response) {
      $scope.movieData=response;
  if(!$scope.movieData.Title)
  alert('ERROR : No movie found .');
});
init();
  };
  init();

$scope.setMovie=function(m)
{
  //$rootScope.movieName=m;
  sessionStorage.setItem('movieName',m);
$location.path("/booking");
};

  $scope.addMovie = function(){

$http.get('/myapi/movieExist/'+ $scope.movieData.imdbID).success(function (response) {

  var currCount = response.length;
  // console.log(response);
  // console.log(currCount);
  if( currCount == 0 )
  {
     $http.post('/myapi/newMovie', $scope.movieData).success(function (response) {
     });
     alert('Movie Saved Successfully');
    window.location.reload();
    init();
   $scope.movieData='';
  }
  else
  {
    alert('Movie Already Exists');
    window.location.reload();
    init();
   $scope.movieData='';
  }

});
};
};
