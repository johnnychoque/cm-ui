(function() {
    'use strict';

    angular.module('app.components')
        .factory('invitationSrv', ['invitationAPI', invitationSrv]);


    function invitationSrv(invitationAPI) {

        var invitations = null;

        var service = {
            flush: flush,
            sendInvitations: sendInvitations,
            loadInvitations: loadInvitations,
            getInvitations: getInvitations
            //loadParInvitations: loadParInvitations,
            //updateInvitations: updateInvitations
        };

        return service;

        function flush() 
        {
            invitations = null;
        }

		/*
			exp = {
				experimentId: 'experiment Id',
				description: 'description of experiment',
				name: 'name of experiment'
			};
			emails: Emails de los usuarios a quienes se envia las invitaciones.
			String de emails separados por ',' ';' o espacios
			usernames: Username de los usuarios a quienes se envia las invitaciones.
		*/
        function sendInvitations (exp, emails, usernames, success_, fail_) 
        {
            invitationAPI.sendInvitations(exp, emails, usernames, success_, fail_);   
        }

		/* 
		Obtener las invitaciones enviadas para un experimento y guardarlos en la variable "invitations"
		id: experimentId
		*/
        function loadInvitations (id, success_, fail_) 
        {
			console.log('id '+id);
            invitationAPI.getInvitations(id, 
            function (res){
                invitations = res.invitations;
                return success_();

            }, function (){
                return fail_();
            });   
        }
        
		/*
		Devuelve las invitaciones guardadas en la variable "invitations"
		*/
        function getInvitations ()
        {
            return (invitations !== null ? invitations : []);
        }

		/*
        function loadParInvitations (success_, fail_) {
            invitationAPI.getParInvitations(function (ret) {
                invitations = ret;
                success_();
            }, fail_);
        }

        function updateInvitations (invs, success_, fail_) {
            invitationAPI.updateInvitations(invs, function() {
                invitations = invs;
                success_();
            }, fail_);
        }
		*/

    }
})();