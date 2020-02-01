
import { Meteor } from 'meteor/meteor';

//import { FileDB, LibraryOptionsDB } from '../api/tasks.js';
import { LibraryOptionsJSONDB } from '../api/tasks.js';

//import { LibraryOptionsJSONDB } from '../../server/main.js';



//Globals
const fs = require('fs');
const path = require('path');

const shortid = require('shortid');

Meteor.methods({



    'remove'() {



        Meteor.call('modifyDB', 'FileJSONDB', 'removeAll', (error, result) => { })
        //LibraryOptionsDB.remove({});
        Meteor.call('modifyDB', 'LibraryOptionsJSONDB', 'removeAll', (error, result) => { })



    },


    'consolelog'(message) {


        console.log(message)


    },

    'removelibrary'(DB) {
        Meteor.call('modifyDB', 'FileJSONDB', 'removeByDB', DB, (error, result) => { })
    },



    'addPluginInclude'(DB_id, ele, source, index) {




        // LibraryOptionsDB.update({
        //     '_id': DB_id,


        // }, {
        //     $addToSet: {
        //         "pluginIDs": {
        //             _id: ele,
        //             checked: false,
        //             source:source,
        //             priority:index,
        //         }
        //     }
        // })

        // var temp = {

        //     pluginIDs:[]

        // }

        // Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })


        try {

            var temp = LibraryOptionsJSONDB.value().filter(row => row._id == DB_id)[0]

            temp.pluginIDs.push({
                _id: ele,
                checked: false,
                source: source,
                priority: index,
            })

            Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })

        } catch (err) { }

    },

    'updatePluginInclude'(DB_id, ele, status) {

        // LibraryOptionsDB.update({
        //     "_id": DB_id,
        //     "pluginIDs._id": ele
        // }, {
        //     $set: { "pluginIDs.$.checked": status }
        // },
        //     false,
        //     true

        // );

        try {

            var temp = LibraryOptionsJSONDB.value().filter(row => row._id == DB_id)[0]
            var idx = temp.pluginIDs.findIndex(row => row._id === ele)
            temp.pluginIDs[idx].checked = status
            Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })

        } catch (err) { }



    },
    'removePluginInclude'(DB_id, ele) {

        // LibraryOptionsDB.update(
        //     { "_id": DB_id },
        //     { $pull: { 'pluginIDs': { _id: ele } } }
        // );


        try {

            var temp = LibraryOptionsJSONDB.value().filter(row => row._id == DB_id)[0]
            var idx = temp.pluginIDs.findIndex(row => row._id === ele)
            temp.pluginIDs.splice(idx, 1)
            Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })

        } catch (err) { }

    },








    'addVideoCodecExclude'(DB_id, ele) {

        // var temp = {
        //     decisionMaker: {
        //         video_codec_names_exclude:[]
        //     }
        // }

        // Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })



        // var settings = LibraryOptionsDB.find({}, { sort: { priority: 1 } }).fetch()

        var settings = LibraryOptionsJSONDB.value()

        for (var i = 0; i < settings.length; i++) {

            if (settings[i].decisionMaker.video_codec_names_exclude.filter(row => row.codec === ele).length == 0) {

                // LibraryOptionsDB.update({
                //     '_id': settings[i]._id,


                // }, {
                //     $addToSet: {
                //         "decisionMaker.video_codec_names_exclude": {
                //             _id: shortid.generate(),
                //             codec: ele,
                //             checked: false,
                //         }
                //     }
                // })

                var temp = LibraryOptionsJSONDB.value().filter(row => row._id == settings[i]._id)[0]

                temp.decisionMaker.video_codec_names_exclude.push({
                    _id: shortid.generate(),
                    codec: ele,
                    checked: false,
                })

                Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })

            }
        }
    },

    'updateVideoCodecExclude'(DB_id, ele, status) {




        // LibraryOptionsDB.update({
        //     "_id": DB_id,
        //     "decisionMaker.video_codec_names_exclude.codec": ele
        // }, {
        //     $set: { "decisionMaker.video_codec_names_exclude.$.checked": status }
        // },
        //     false,
        //     true

        // );

        try {

            var temp = LibraryOptionsJSONDB.value().filter(row => row._id == DB_id)[0]
            var idx = temp.decisionMaker.video_codec_names_exclude.findIndex(row => row.codec === ele)
            temp.decisionMaker.video_codec_names_exclude[idx].checked = status
            Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })

        } catch (err) { }



    },
    'removeVideoCodecExclude'(DB_id, ele) {

        // LibraryOptionsDB.update(
        //     { "_id": DB_id },
        //     { $pull: { 'decisionMaker.video_codec_names_exclude': { codec: ele } } }
        // );


        try {

            var temp = LibraryOptionsJSONDB.value().filter(row => row._id == DB_id)[0]
            var idx = temp.decisionMaker.video_codec_names_exclude.findIndex(row => row._id === ele)
            temp.decisionMaker.video_codec_names_exclude.splice(idx, 1)
            Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })

        } catch (err) { }



    },
    'addAudioCodecExclude'(DB_id, ele) {

        var settings = LibraryOptionsJSONDB.value()

        for (var i = 0; i < settings.length; i++) {

            if (settings[i].decisionMaker.audio_codec_names_exclude.filter(row => row.codec === ele).length == 0) {

                // LibraryOptionsDB.update({
                //     '_id': settings[i]._id,


                // }, {
                //     $addToSet: {
                //         "decisionMaker.audio_codec_names_exclude": {
                //             _id: shortid.generate(),
                //             codec: ele,
                //             checked: false,
                //         }
                //     }
                // })

                var temp = LibraryOptionsJSONDB.value().filter(row => row._id == settings[i]._id)[0]

                temp.decisionMaker.audio_codec_names_exclude.push({
                    _id: shortid.generate(),
                    codec: ele,
                    checked: false,
                })

                Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })

            }
        }

    },

    'updateAudioCodecExclude'(DB_id, ele, status) {


        // LibraryOptionsDB.update({
        //     "_id": DB_id,
        //     "decisionMaker.audio_codec_names_exclude.codec": ele
        // }, {
        //     $set: { "decisionMaker.audio_codec_names_exclude.$.checked": status }
        // },
        //     false,
        //     true

        // );

        try {

            var temp = LibraryOptionsJSONDB.value().filter(row => row._id == DB_id)[0]
            var idx = temp.decisionMaker.audio_codec_names_exclude.findIndex(row => row.codec === ele)
            temp.decisionMaker.audio_codec_names_exclude[idx].checked = status
            Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })

        } catch (err) { }



    },
    'removeAudioCodecExclude'(DB_id, ele) {

        // LibraryOptionsDB.update(
        //     { "_id": DB_id },
        //     { $pull: { 'decisionMaker.audio_codec_names_exclude': { codec: ele } } }
        // );

        try {

            var temp = LibraryOptionsJSONDB.value().filter(row => row._id == DB_id)[0]
            var idx = temp.decisionMaker.audio_codec_names_exclude.findIndex(row => row._id === ele)
            temp.decisionMaker.audio_codec_names_exclude.splice(idx, 1)
            Meteor.call('modifyDB', ' LibraryOptionsJSONDB', 'update', DB_id, temp, (error, result) => { })

        } catch (err) { }



    }, 'updateScheduleBlock'(DB_id, ele, status) {


        LibraryOptionsDB.update({
            "_id": DB_id,
            "schedule._id": ele
        }, {
            $set: { "schedule.$.checked": status }
        },
            false,
            true

        );
    }, 'toggleSchedule'(DB_id, status, start, end, type) {


        var chxBoxes = LibraryOptionsDB.find({ _id: DB_id }, {}).fetch()
        chxBoxes = chxBoxes[0].schedule

        var status = true

        if (type == "Hour") {

            for (var i = start; i < chxBoxes.length; i += end) {

                if (chxBoxes[i].checked == true) {
                    status = false
                }
            }


            for (var i = start; i < chxBoxes.length; i += end) {

                LibraryOptionsDB.update({
                    "_id": DB_id,
                    "schedule._id": chxBoxes[i]._id
                }, {
                    $set: { "schedule.$.checked": status }
                },
                    false,
                    true

                );

            }


        } else {

            for (var i = start; i < end; i++) {

                if (chxBoxes[i].checked == true) {
                    status = false
                }

            }

            for (var i = start; i < end; i++) {

                LibraryOptionsDB.update({
                    "_id": DB_id,
                    "schedule._id": chxBoxes[i]._id
                }, {
                    $set: { "schedule.$.checked": status }
                },
                    false,
                    true

                );
            }
        }
    }
});








