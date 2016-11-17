module.exports = function($scope, $http,$rootScope,$location)
{
  var init=function(){

var x = document.getElementById("cid");
//var x1 = document.getElementById("cid1");
      //var cd=$rootScope.currentDate;
      $scope.movieName=sessionStorage.getItem('movieName');
      var m=sessionStorage.getItem('movieName');
      $scope.movieCity=sessionStorage.getItem('movieCity');
      $scope.movieTheatre=sessionStorage.getItem('movieTheatre');
      $scope.movieShow=sessionStorage.getItem('movieShow');
      $scope.cess=sessionStorage.getItem('cess');
        $scope.res=sessionStorage.getItem('res');
      $scope.customerName=sessionStorage.getItem('customerName');
      var n=$scope.customerName;
      //$rootScope.currentDate=sessionStorage.getItem('currentDate');
      $scope.movieDate=sessionStorage.getItem('movieDate');
        $scope.movieAmount=sessionStorage.getItem('movieAmount');
      $scope.movieSeats1=sessionStorage.getItem('movieSeats1');
      $scope.movieSeatsNo=sessionStorage.getItem('movieSeatsNo');
    //$rootScope.moviedata=sessionStorage.getItem('moviedata');
  $http.get('/conapi/bookedid/'+n+'/'+m).success(function (response){
      //  $scope.data=response;
    //    $rootScope.ide=response[0]._id;
    console.log(response);
    x.innerHTML=response[0]._id;
    //  x1.innerHTML=response[0]._id;
  });
   x.innerHTML=Math.floor((Math.random() * 1000000000) + 1);
  // x1.innerHTML=Math.floor((Math.random() * 1000000000) + 1);
  };
  init();

  $scope.feedback=function()
  {
    var n=document.getElementById("namee").value;
    var s=document.getElementById("subject").value;
    var e=document.getElementById("emailid").value;
    var c=document.getElementById("feedback").value;
    $http.post('/conapi/newFeedback/'+n+'/'+s+'/'+e+'/'+c).success(function (response) {
    });
    alert('Thank you for the feedback .');
    document.getElementById("namee").innerHTML="";
    document.getElementById("emailid").innerHTML="";
    document.getElementById("subject").innerHTML="";
    document.getElementById("feedback").innerHTML="";
  };
};
