module.exports = function($scope, $http){

    $(document).ready(function(){
        $("#myDate").datepicker({ dateFormat: 'dd, M yy' });
        $("#add").click(function () {
          var text=($("#hh").val())+" : "+($("#mm").val())+" "+($("#t").val());
      $('#res').append("<option value='"+text+"'>"+text+"</option>");
     });
    });

  var init = function(){
      $http.get('/myapi/movie').success(function (response) {
        $scope.movieData=response;
      });
      $http.get('/api/theatres').success(function (response) {
        $scope.theatreData=response;
      });
      $http.get('/mapapi/moviemapping').success(function (response) {
        $scope.mappingData=response;
      });
    };
    init();

  $scope.insertMapping = function(){
    var arr=[];
    var length = $('#res').children('option').length;
    for(var i=0;i<length;i++)
    {
      arr[i]=$('#res option').eq(i).val();
    }
    $scope.mapping.ShowTimings=arr;
    $scope.mapping.Date=$('#myDate').val();
    $http.post('/mapapi/newMapping', $scope.mapping).success(function (response) {
    });
    var val='true';
   $http.put('/myapi/updateMovie/' + $scope.mapping.Title+'/'+val).success(function (response) {
        console.log(response);
      });
      alert('Mapping Saved Successfully');
        window.location.reload();
    $scope.mapping='';
  };

  $scope.showMapping=function()
  {
    $http.get('/mapapi/selmovie/'+$scope.mapping1.Theatre).success(function (response) {
      $scope.searchmovieData=response;
    });
      window.location.reload();
  };

  $scope.deleteMapping = function(map){
    var x=confirm("Are you sure you want to delete ?");
    if(x){
      $http.delete('/mapapi/deleteMapping/'+map._id).success(function (response) {
    });
    //$scope.showMapping();
    $http.get('/mapapi/moviemapping').success(function (response) {
      $scope.mappingData=response;
    });
    $http.get('/mapapi/selmoviename/'+map.Title).success(function (response) {
      len=response.length;
      //alert("len "+len);
      if(len==0)
      {
        var val='false';
   $http.put('/myapi/updateMovie/'+map.Title+'/'+val).success(function (response) {
           });
      }
      alert('Mapping removed Successfully');
    });
  }
    window.location.reload();
  };
};
