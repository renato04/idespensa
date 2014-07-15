angular.module('ionicApp.controllers', ['ionicApp.config', 'xc.indexedDB'])
.controller('AppCtrl',function($scope, $ionicSideMenuDelegate, $ionicModal, $indexedDB) {

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

  $scope.add = function(produto) {
    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);

    produto.quantidade += 1;
    myObjectStore.upsert(produto);
  };  

  $scope.remove = function(produto) {
    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);

    produto.quantidade -= 1;
    myObjectStore.upsert(produto);
  };  

  $scope.getAllProdutos = function() {

    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);
    //myObjectStore.clear();

    myObjectStore.getAll().then(function(results) {  
      // Update scope
      $scope.safeApply(function(){
          $scope.produtos = results;    
      });
    }); 

  };

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };  


  $scope.ListaProdutoVazia = function() {

    return  $scope.produtos.length == 0;

  };    

  $ionicModal.fromTemplateUrl('busca.html', {
    scope: $scope,
    animation: 'slide-left-right'
  }).then(function(modal) {

    $scope.modal = modal;
    $scope.modal.searchText = "";
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.searchText = "";
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });  

  var PRODUTO_STORE_NAME = constants.ProdutoStore;
  $scope.produtos = [];
  $scope.showSearch = global.showSearch;
  $scope.showHome = global.showHome;

  $scope.getAllProdutos();
})
.controller('ListaDeComprasController',function($scope, $indexedDB) {
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

  $scope.add = function(produto) {
    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);

    produto.quantidade += 1;
    myObjectStore.upsert(produto);
  };  

  $scope.remove = function(produto) {
    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);

    produto.quantidade -= 1;
    myObjectStore.upsert(produto);
  };  

  $scope.getAllProdutos = function() {

    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);
    //myObjectStore.clear();

    myObjectStore.getAll().then(function(results) {  
      // Update scope
      $scope.safeApply(function(){
          $scope.produtos = results;    
      });
    }); 

  };

    $scope.entraNaLista = function (produto) {
        return produto.lista_automatico &&
               produto.quantidade <= produto.quantidade_lista;
  };  

  $scope.ListaVazia = function() {

    var produtosNaLista = _.filter($scope.produtos, function(produto){
        return produto.lista_automatico &&
               produto.quantidade <= produto.quantidade_lista;
    });

    return produtosNaLista.length == 0;
  };  

  var PRODUTO_STORE_NAME = constants.ProdutoStore;
  $scope.produtos = [];

  $scope.getAllProdutos();  

})
.controller('VencimentoController',function($scope, $indexedDB) {
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

  $scope.getAllProdutos = function() {

    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);
    //myObjectStore.clear();

    myObjectStore.getAll().then(function(results) {  
      // Update scope
      $scope.safeApply(function(){
          $scope.produtos = results;    
      });
    }); 

  };

  $scope.estaVencendo  = function (produto) {

        var diferenca = moment(produto.data_validade, "YYYY-MM-DD").diff(moment(), 'days');

        return diferenca <= 7;
  };   

  $scope.SemItemsVencendo = function() {

    var produtosNaLista = _.filter($scope.produtos, function(produto){
        var diferenca = moment(produto.data_validade, "YYYY-MM-DD").diff(moment(), 'days');

        return diferenca <= 7;
    });

    return produtosNaLista.length == 0;
  };    


  var PRODUTO_STORE_NAME = constants.ProdutoStore;
  $scope.produtos = [];

  $scope.getAllProdutos();  

})
.controller('ProdutoController',function($scope, $ionicPopup, $timeout, $ionicModal, $indexedDB, $window, $ionicModal){

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
  $scope.searchText = "";

  var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

  myObjectStore.getAll().then(function(results) {  
    // Update scope
    $scope.safeApply(function(){
        $scope.items = results;    
    });
  }); 



})
.controller('ProdutoCadastroController',function($scope, $indexedDB, $ionicNavBarDelegate, $ionicPopup, $location){

  var PRODUTO_STORE_NAME = constants.ProdutoStore; 
  var CATEGORIA_STORE_NAME = constants.CategoriaStore; 
  
  $scope.produto = {};
  $scope.categorias = [];
  var query = $location.search();

  if (query) {
    CarregaProduto(query.id);
  }  



  var categoriaObjectStore = $indexedDB.objectStore(CATEGORIA_STORE_NAME);

  categoriaObjectStore.getAll().then(function(results) {  
    // Update scope
    $scope.safeApply(function(){

        //$scope.items = results;
        $scope.categorias = results;    

    });
  });   


  function CarregaProduto(id){
    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);

    myObjectStore.find(id).then(function(results){

      $scope.safeApply(function(){
        $scope.produto = results;
      });      
    });
  }
  
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

  $scope.save = function(produto){
    
    var myObjectStore = $indexedDB.objectStore(PRODUTO_STORE_NAME);

    if (produto.id) {
      myObjectStore.upsert(produto).then(
                          function(){

                             $ionicPopup.alert({
                               title: 'iDespensa',
                               template: 'Produto atualizado com sucesso.'
                             }).then( function(){
                                  $scope.safeApply(function(){
                                      $ionicNavBarDelegate.back();
                                  });
                             });    


                    });
    }
    else{
      myObjectStore.insert({"id": Guid.raw(),
                            "nome": produto.nome,
                            "quantidade": produto.quantidade,
                            "categoria": produto.categoria,
                            "data_validade": produto.data_validade,
                            "quantidade_lista": produto.quantidade_lista,
                            "lista_automatico": produto.lista_automatico}
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
    }


  };
})
.controller('CategoriaController',function($scope, $indexedDB, $ionicModal){

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
    
    $scope.edit = function() {
      var urlSplited = $window.location.href.split("#");
      $window.location.href = urlSplited[0] + "#/categoria-cadastro";
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
          $scope.items = results;
      });
    });

    $ionicModal.fromTemplateUrl('busca.html', {
      scope: $scope,
      animation: 'slide-left-right'
    }).then(function(modal) {

      $scope.modal = modal;
      $scope.modal.searchText = "";
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.searchText = "";
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });    
})
.controller('CadastroCategoriaController',function($scope, $indexedDB, $ionicNavBarDelegate, $ionicPopup, $location){
  
  var OBJECT_STORE_NAME = constants.CategoriaStore;
  $scope.categoria = {};

  var query = $location.search();

  if (query) {
    CarregaCategoria(query.id);
  }

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

  function CarregaCategoria(id){
    var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

    myObjectStore.find(id).then(function(results){

      $scope.safeApply(function(){
        $scope.categoria = results;
      });      
    });
  }

  $scope.save = function(categoria){

    var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);

    if (categoria.id) {
      myObjectStore.upsert(categoria).then(
                          function(){

                             $ionicPopup.alert({
                               title: 'iDespensa',
                               template: 'Categoria atualizada com sucesso.'
                             }).then( function(){
                                  $scope.safeApply(function(){
                                      $ionicNavBarDelegate.back();
                                  });
                             });    


                    });
    }
    else{
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
    }
  };
})
.controller('ConfiguracaoController',function($scope, $ionicPopup, $timeout, $ionicModal, $indexedDB, $window, $ionicModal){

});