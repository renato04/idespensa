angular.module('ionicApp.config', ['xc.indexedDB'])
.config(function ($indexedDBProvider) {
    $indexedDBProvider
      .connection('appDB')
      .upgradeDatabase('1.0', function(event, db, tx){
        var objStore = db.createObjectStore('people', {keyPath: 'ssn'});
        objStore.createIndex('name_idx', 'name', {unique: false});
        objStore.createIndex('age_idx', 'age', {unique: false});

      });
  });