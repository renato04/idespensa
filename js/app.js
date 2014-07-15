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
    .state('produto-cadastro', {
      url: "/produto-cadastro",
      views: {
        'main-view': {
          templateUrl: "produto-cadastro.html",
          controller: 'ProdutoCadastroController'
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
          controller: 'CadastroCategoriaController'
        }
      }
    })
    .state('configuracao', {
      url: "/configuracao",
      views: {
        'main-view': {
          templateUrl: "configuracao.html",
          controller: 'ConfiguracaoController'
        }
      }
    })    ;

   $urlRouterProvider.otherwise("/");

});