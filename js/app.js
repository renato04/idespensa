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
    .state('categoria', {
      url: "/categoria",
      views: {
        'main-view': {
          templateUrl: "categoria.html",
          controller: 'CategoriaController'
        }
      }
    })
    .state('categoria-cadastro', {
      url: "/categoria-cadastro",
      views: {
        'main-view': {
          templateUrl: "categoria-cadastro.html",
          controller: 'CategoriaController'
        }
      }
    });

   $urlRouterProvider.otherwise("/");

});