(function() {
    'use strict';

    angular.module('app.components')
        .factory('participantSrv', ['participantAPI', participantSrv]);


    function participantSrv(participantAPI) {

        var participants = null;

        var service = {
            loadParticipants: loadParticipants,
            getParticipants: getParticipants
        };

        return service;

		/******* 
		Obtener las invitaciones enviadas para un experimento y guardarlos en la variable "participants"
		id: experimentId
		********/
        function loadParticipants (id, success_, fail_) 
        {
            participantAPI.getParticipants(id, 
            function (res){
                console.log('res ', res);
                participants = res.participants;
				console.log(participants);
                console.log('type of participants ',typeof participants, ' len ', participants.lenght);
                return success_();

            }, function (){
				console.log('loadParticipants ERROR');
                return fail_();
            });   
        }
        
		/*
		Devuelve las invitaciones guardadas en la variable "participants"
		*/
        function getParticipants ()
        {
            return (participants !== null ? participants : []);
        }

		/*
        function loadParparticipants (success_, fail_) {
            participantAPI.getParparticipants(function (ret) {
                participants = ret;
                success_();
            }, fail_);
        }

        function updateparticipants (invs, success_, fail_) {
            participantAPI.updateparticipants(invs, function() {
                participants = invs;
                success_();
            }, fail_);
        }
		*/

    }
})();