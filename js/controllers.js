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

       alert(JSON.stringify(results));
       alert(JSON.stringify(results[0]));
        //$scope.items = results;
        $scope.items = results;    

    });
  }); 
   
})
.controller('ProdutoCadastroController',function($scope, $indexedDB, $ionicNavBarDelegate, $ionicPopup){

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

  var PRODUTO_STORE_NAME = constants.ProdutoStore; 
  var CATEGORIA_STORE_NAME = constants.CategoriaStore; 
  
  $scope.produto = {};
  $scope.categorias = [];

  var categoriaObjectStore = $indexedDB.objectStore(CATEGORIA_STORE_NAME);

  categoriaObjectStore.getAll().then(function(results) {  
    // Update scope
    $scope.safeApply(function(){

        //$scope.items = results;
        $scope.categorias = results;    

    });
  });   

  $scope.save = function(produto){
    
    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);

    myObjectStore.insert({"id": Guid.raw(),
                          "nome": produto.nome,
                          "quantidade": produto.quantidade,
                          "categoria": produto.categoria,
                          "data_validade": produto.data_validade,
                          "quantidade_lista": produto.quantidade_lista}
                        )
                        .then(
                              function(){

                                 $ionicPopup.alert({
                                   title: 'iDespensa',
                                   template: 'Produto cadastrado com sucesso.'
                                 }).then( function(){
                                      $scope.safeApply(function(){
                                        $ionicNavBarDelegate.back();
                                      });
                                 });    


                        });
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

                                 $ionicPopup.alert({
                                   title: 'iDespensa',
                                   template: 'Categoria cadastrada com sucesso.'
                                 }).then( function(){
                                      $scope.safeApply(function(){
                                          $ionicNavBarDelegate.back();
                                      });
                                 });    


                        });

    };       
});