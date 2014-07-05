var app = angular.module('ionicApp', ['ionic' , 'ionicApp.controllers']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('index', {
      url: "/",
      views:{
        'main-view':{
          templateUrl: "home.html",
          controller: "AppCtrl"
        }
      }
    })
    .state('produto', {
      url: "/produto",
      views: {
        'main-view': {
          templateUrl: "produto.html",
          controller: 'ProdutoController'
        }
      }
    })

   $urlRouterProvider.otherwise("/");

});