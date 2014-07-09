angular.module('ionicApp.controllers', ['ionicApp.config', 'xc.indexedDB'])
.controller('AppCtrl',function($scope, $ionicSideMenuDelegate, $indexedDB) {

   $scope.items = [];
    $scope.isEdit = false;

    var OBJECT_STORE_NAME = constants.CategoriaStore;  


  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };    
    
       

})
.controller('ProdutoController',function($scope, $ionicPopup, $timeout, $ionicModal, $indexedDB, $window){

  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  var OBJECT_STORE_NAME = constants.ProdutoStore; 
  $scope.items = [];
  $scope.produto = {}; 
  $scope.predicate = "nome";

  var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

  myObjectStore.getAll().then(function(results) {  
    // Update scope
    $scope.safeApply(function(){

        //$scope.items = results;
        $scope.items = _.groupBy(results, function(item) {return item.nome[0]; });    

    });
  }); 
   
})
.controller('ProdutoCadastroController',function($scope, $ionicPopup, $timeout, $ionicModal, $window){

  var OBJECT_STORE_NAME = constants.ProdutoStore; 
  $scope.produto = {};

  $scope.save = function(produto){

    alert(JSON.stringify(produto));
  };

})
.controller('CategoriaController',function($scope, $indexedDB, $ionicNavBarDelegate, $ionicPopup){

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
    
    $scope.items = [];
    $scope.categoria = {}; 
    $scope.predicate = "nome";

    var OBJECT_STORE_NAME = constants.CategoriaStore;  

    var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

    myObjectStore.getAll().then(function(results) {  
      // Update scope
      $scope.safeApply(function(){

          if (results.length == 0) {
             var alertPopup = $ionicPopup.alert({
               title: 'iDespensa',
               template: 'Nâo há categoria cadastradas.'
             });
          }

          //$scope.items = results;
          $scope.items = _.groupBy(results, function(item) {return item.nome[0]; });    

      });
    });    
})
.controller('CadastroCategoriaController',function($scope, $indexedDB, $ionicNavBarDelegate, $ionicPopup){

    var OBJECT_STORE_NAME = constants.CategoriaStore;
    $scope.categoria = {};

   

    $scope.save = function(categoria){

        var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

        myObjectStore.insert({"id": Guid.raw(), "nome": categoria.nome}).then(
              function(){
                  $ionicNavBarDelegate.back();
              }  
          );

    };       
});