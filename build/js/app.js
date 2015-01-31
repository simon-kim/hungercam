"use strict";

require('angular/angular');

(function(){
  var client_id = '67b34786e0a2492788dca701c0d5008c';
  //initializes the hungercam app
  var app = angular.module('hungercam', []);
  //creates InstagramAPI factory to return data and use $http property
  app.factory("InstagramAPI", ['$http', function($http) {
    return {
      //method that will make a call to Instagram API and get popular data back. Should return a max of 30 items.
      fetchPopular: function(callback){
        var endpoint = "https://api.instagram.com/v1/tags/foodporn/media/recent";
        endpoint += "?count=30";
        endpoint += "&client_id=" + client_id;
        endpoint += "&callback=JSON_CALLBACK";
        $http.jsonp(endpoint).success(function(response){
          callback(response.data);
        });
      }
    };
  }]);
  //creates a controller that pumps API response into HTML
  app.controller('ShowImages', function($scope, InstagramAPI){
    $scope.data = {};
    InstagramAPI.fetchPopular(function(data){
      $scope.pics = data;
    });
  });
})();
