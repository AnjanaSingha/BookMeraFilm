module.exports = function($scope, $http,$rootScope,$location){
  var init1 = function(){
          $http.get('/api/theatres').success(function (response) {
            $scope.theatreData=response;
          });
      };
        init1();

var init=function()
{
  var b=sessionStorage.getItem('movieName');

$http.get('/myapi/getRating/'+b).success(function(response){
$scope.ratecount=0;
     var count=0;
    var i;
   try
   {
for(i=0;i<=response.length;i++)
{count+=parseInt(response[i].Rating);}
}
 catch(e){}
 if(count>0)
 {$scope.ratecount=Math.round(count*100/(i*5));}
 // alert('rating : '+$scope.ratecount);
 document.getElementById("rate").innerHTML=$scope.ratecount;
});
};
  init();

  $scope.rate=function(r)
{
var m_name=sessionStorage.getItem('movieName');
  $http.post('/myapi/rating/'+m_name+'/'+r).success(function(response){

  });
};

  var bookingShow=function(){
var data=sessionStorage.getItem('movieName');
  //var data=$rootScope.movieName;
  $http.get('/mapapi/selmoviename/'+data).success(function(response){
    $scope.booking=response;
  });
  $http.get('/myapi/moviePoster/'+data).success(function(response){
   $rootScope.moviedata=response;
   sessionStorage.setItem('moviedata',$rootScope.moviedata);
   });

};
bookingShow();

$scope.movDates=[];
var showDates=function() {
for(i=0;i<6;i++)
{
  var date=new Date();
  date.setDate(date.getDate()+i);
  $scope.movDates[i]=date;
  // $scope.movDates[i].toString();
}
};
showDates();

$scope.setShow=function(a,b,c,d)
{
  $rootScope.movieShow=a;
  sessionStorage.setItem('movieShow',$rootScope.movieShow);
  sessionStorage.setItem('movieTheatre',b);
  sessionStorage.setItem('movieDate',c);
  sessionStorage.setItem('movieCity',d);
$location.path("/seats");
};
};
