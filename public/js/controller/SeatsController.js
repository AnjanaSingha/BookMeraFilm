module.exports = function($scope, $http,$rootScope,$location)
{
$rootScope.movieAmount=0;
// var countdiv=[];

var init=function()
{
  var m=sessionStorage.getItem('movieName');
  $scope.movieName=m;
  var t=sessionStorage.getItem('movieTheatre');
  $scope.movieTheatre=t;
  var s=sessionStorage.getItem('movieShow');
  $scope.movieShow=s;
  var d=sessionStorage.getItem('movieDate');
  $scope.movieDate=d;
  $http.get('/conapi/bookedseats/'+m+'/'+t+'/'+s+'/'+d).success(function (response) {

    for(i=0;i<response.length;i++)
    {
      for(j=0;j<response[i].SeatNo.length;j++)
      {
          $('#'+response[i].SeatNo[j]).addClass('red');
      }
    }
  });
};
init();
$(document).ready(function(){

  $('#Seatclass').change(function()
  {
    var sel=$('#Seatclass').find(":selected").text();
    if(sel=="GOLD")
    {
      $('#silver tr>td>div').addClass('grey');
      $('#gold tr>td>div').removeClass('grey');
    }

    if(sel=="SILVER")
    {
      $('#gold tr>td>div').addClass('grey');
      $('#silver tr>td>div').removeClass('grey');
    }

    $('#noofseats').change(function()
    {
      var no = $('#noofseats').find(":selected").text();
      document.getElementById("sno").innerHTML= no;
      //alert(no);
      var countdiv=[];

      $('.green').click(function(){
          $(this).toggleClass("style1");
    });

    $('.style1').click(function(){

      if(!($(this).hasClass('grey')||$(this).hasClass('red')))
  {
//alert($(this).hasClass('grey'));
    console.log(no);
    console.log(countdiv.length);

    if(countdiv.length < no)
    {

      $(this).toggleClass("green");
      var id=$(this).attr('id');
      var cn=$(this).hasClass('green');

      if(cn)
          {

              countdiv.push(id);

              console.log(countdiv);

              $rootScope.movieSeats=JSON.stringify(countdiv);
                sessionStorage.setItem('movieSeats',$rootScope.movieSeats);
              document.getElementById("seatno").innerHTML=countdiv;
            }

      else{
            var ind=countdiv.indexOf(id);

            //alert(ind)

            countdiv.splice(ind,1);
            console.log(countdiv);
            $rootScope.movieSeats=JSON.stringify(countdiv);
              sessionStorage.setItem('movieSeats',$rootScope.movieSeats);
              document.getElementById("seatno").innerHTML=countdiv;
          }
if(sel== "SILVER")
{
  document.getElementById("amount").innerHTML=countdiv.length*200;
}
else
{
  document.getElementById("amount").innerHTML=countdiv.length*280;
}
}
else {

      var id=$(this).attr('id');

      if( countdiv.indexOf(id) == -1 )
        alert("Request you to  book only " + no +" seats");
      else {
        countdiv.splice(countdiv.indexOf(id),1);
        console.log( countdiv );
        $rootScope.movieSeats=JSON.stringify(countdiv);
          sessionStorage.setItem('movieSeats',$rootScope.movieSeats);
          document.getElementById("seatno").innerHTML=countdiv;
        $(this).removeClass("green");
        $(this).addClass("style1");
      }
  }
}
});

});
});

});
$scope.setPrice=function(a)
{
  $rootScope.movieAmount=document.getElementById("amount").innerHTML;
  sessionStorage.setItem('movieAmount',$rootScope.movieAmount);
  $rootScope.movieSeats1=document.getElementById("seatno").innerHTML;
  sessionStorage.setItem('movieSeats1',$rootScope.movieSeats1);
  $rootScope.movieSeatsNo=document.getElementById("sno").innerHTML;
  sessionStorage.setItem('movieSeatsNo',$rootScope.movieSeatsNo);
//var s_no=
var s_no=parseInt(document.getElementById("sno").innerHTML);
var count=0;
$(".green").each(function(){
  count++;
});
if(count==s_no)
$location.path("/payment");
else
  alert('ERROR : Incorrect number of seats selected .');
};
};
