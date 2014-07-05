angular.module('ionicApp.config', ['xc.indexedDB'])
.config(function ($indexedDBProvider) {
    $indexedDBProvider
      .connection('idespensaDB')
      .upgradeDatabase('1.0', function(event, db, tx){
        var objStore = db.createObjectStore('produto', {keyPath: 'id'});
        objStore.createIndex('nome_idx', 'nome', {unique: false});
        objStore.createIndex('quantidade_idx', 'quantidade', {unique: false});
        objStore.createIndex('categoria_idx', 'categora', {unique: false});
        objStore.createIndex('quantidade_lista_idx', 'quantidade_lista', {unique: false});
        objStore.createIndex('data_validade_idx', 'data_validade', {unique: false});

      });
  });