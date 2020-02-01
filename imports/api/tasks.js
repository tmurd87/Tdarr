import { Mongo } from 'meteor/mongo';
 

export const FileDB = new Mongo.Collection('FileDB');
export const LogDB = new Mongo.Collection('logs');
export const LibraryOptionsDB = new Mongo.Collection('settings');
export const GlobalOptionsDB = new Mongo.Collection('globalsettings');
export const StatisticsDB = new Mongo.Collection('statistics');
export const ClientDB = new Mongo.Collection('clientDB');


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('FileDB', function tasksPublication() {
      return FileDB.find();
    });
    Meteor.publish('LogDB', function tasksPublication() {
        return LogDB.find();
      });
      Meteor.publish('LibraryOptionsDB', function tasksPublication() {
        return LibraryOptionsDB.find();
      });
      Meteor.publish('GlobalOptionsDB', function tasksPublication() {
        return GlobalOptionsDB.find();
      });
      Meteor.publish('StatisticsDB', function tasksPublication() {
        return StatisticsDB.find();
      });
      Meteor.publish('ClientDB', function tasksPublication() {
        return ClientDB.find();
      });



  }


  //lowdb test

const low = require('lowdb')
const lodashId = require('lodash-id')
const FileSync = require('lowdb/adapters/FileSync')

//var homePath = require("os").homedir()
var homePath = 'C:\\Users\\H\\Documents'

//Init databases

const FileJSONAdapter = new FileSync(homePath + '/Tdarr/DB/FileJSON.json')
const FileJSON = low(FileJSONAdapter)
FileJSON._.id = '_id'
FileJSON._.mixin(lodashId)
FileJSON.defaults({ FileJSONDB: [] })
  .write()
export const FileJSONDB = FileJSON
  .defaults({ FileJSONDB: [] })
  .get('FileJSONDB')


const LogJSONAdapter = new FileSync(homePath + '/Tdarr/DB/LogJSON.json')
const LogJSON = low(LogJSONAdapter)
LogJSON._.id = '_id'
LogJSON._.mixin(lodashId)
LogJSON.defaults({ LogJSONDB: [] })
  .write()
  export const LogJSONDB = LogJSON
  .defaults({ LogJSONDB: [] })
  .get('LogJSONDB')




const LibraryOptionsJSONAdapter = new FileSync(homePath + '/Tdarr/DB/LibraryOptionsJSON.json')
const LibraryOptionsJSON = low(LibraryOptionsJSONAdapter)
LibraryOptionsJSON._.id = '_id'
LibraryOptionsJSON._.mixin(lodashId)
LibraryOptionsJSON.defaults({ LibraryOptionsJSONDB: [] })
  .write()
  export const LibraryOptionsJSONDB = LibraryOptionsJSON
  .defaults({ LibraryOptionsJSONDB: [] })
  .get('LibraryOptionsJSONDB')

const GlobalOptionsJSONAdapter = new FileSync(homePath + '/Tdarr/DB/GlobalOptionsJSON.json')
const GlobalOptionsJSON = low(GlobalOptionsJSONAdapter)
GlobalOptionsJSON._.id = '_id'
GlobalOptionsJSON._.mixin(lodashId)
GlobalOptionsJSON.defaults({ GlobalOptionsJSONDB: [] })
  .write()
  export const GlobalOptionsJSONDB = GlobalOptionsJSON
  .defaults({ GlobalOptionsJSONDB: [] })
  .get('GlobalOptionsJSONDB')

const StatisticsJSONAdapter = new FileSync(homePath + '/Tdarr/DB/StatisticsJSON.json')
const StatisticsJSON = low(StatisticsJSONAdapter)
StatisticsJSON._.id = '_id'
StatisticsJSON._.mixin(lodashId)
StatisticsJSON.defaults({ StatisticsJSONDB: [] })
  .write()
  export const StatisticsJSONDB = StatisticsJSON
  .defaults({ StatisticsJSONDB: [] })
  .get('StatisticsJSONDB')

const ClientJSONAdapter = new FileSync(homePath + '/Tdarr/DB/ClientJSON.json')
const ClientJSON = low(ClientJSONAdapter)
ClientJSON._.id = '_id'
ClientJSON._.mixin(lodashId)
ClientJSON.defaults({ ClientJSONDB: [] })
  .write()
  export const ClientJSONDB = ClientJSON
  .defaults({ ClientJSONDB: [] })
  .get('ClientJSONDB')


  if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('GlobalOptionsJSON', function tasksPublication() {
      return GlobalOptionsJSON.value();
    });

  }





