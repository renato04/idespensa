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
});