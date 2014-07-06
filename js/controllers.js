angular.module('ionicApp.controllers', ['ionicApp.config', 'xc.indexedDB'])
.controller('AppCtrl',function($scope, $ionicSideMenuDelegate, $indexedDB) {

   $scope.items = [];
    $scope.isEdit = false;


    // $scope.objects = [];

    // var OBJECT_STORE_NAME = 'people';  

    // /**
    //  * @type {ObjectStore}
    //  */
    // var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

    // myObjectStore.insert({"ssn": Math.random(),"name": "John Doe", "age": 57}).then(function(e){ });

    // myObjectStore.getAll().then(function(results) {  
    //   // Update scope
    //   $scope.objects = results;
    // });

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };    
    
       

})
.controller('ProdutoController',function($scope, $ionicPopup, $timeout, $ionicModal, $window){

    $scope.save = function(novoProduto){

        var d = new Date();
        
        var key = null;
        
        if(novoProduto.id)
            key = novoProduto.id;
        else
            key = Guid.raw(); 
        
        alert(key);
        
       var produto = {id: key, descricao: novoProduto.descricao, quantidade: novoProduto.quantidade };
        
        $window.localStorage.setItem(key, JSON.stringify(produto));
          
        $scope.loadItems();

        novoProduto = {};
        $scope.formProduto = {};


        $scope.closeModal();

    };       
})
.controller('CategoriaController',function($scope, $indexedDB, $ionicNavBarDelegate){

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

    var OBJECT_STORE_NAME = 'categoria';  

    var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

    //myObjectStore.insert({"id": Guid.raw(), "nome": "Teste 1"});

    myObjectStore.getAll().then(function(results) {  
      // Update scope
      $scope.safeApply(function(){

          //$scope.items = results;
          $scope.items = _.groupBy(results, function(item) {return item.nome[0]; });    
          //alert(JSON.stringify($scope.items));  

      });
    });


    $scope.save = function(categoria){

        var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

        myObjectStore.insert({"id": Guid.raw(), "nome": categoria.nome});

        myObjectStore.getAll().then(function(results) {  
          // Update scope
          $scope.safeApply(function(){

            $scope.items = results;
            $ionicNavBarDelegate.back();

          });
        });

    };       
});