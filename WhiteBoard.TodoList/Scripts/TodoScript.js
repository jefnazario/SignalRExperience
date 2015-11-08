$(function () {
    $.connection.hub.logging = true;
});

(function () {

    'use strict';
    var app = angular.module("TodoApp", []);
    app.value('$', $);

    app.controller('TodoCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$http', '$rootScope', '$'];

    function HomeCtrl($scope, $http, $rootScope, $) {

        $scope.adicionarTarefa = function () {
                $http({
                    url: "http://localhost:53074/todo/nova?tarefa=" + $scope.tarefaModelo.descricao,
                    method: 'POST'
                    //data: {tarefa: descricao}
                }).then(function (response) {
                    $scope.listaDeTarefas = response.data;

                    $.connection.meuTodoHub.server.notificarNovaTarefa($scope.tarefaModelo.descricao, "Jeferson");

                    $scope.tarefaModelo.descricao = '';
                });
        };

        $scope.Task = "Empty";

        $.connection.meuTodoHub.client.atualizarListaDeTarefas = function (task) {
            console.log(task);
            $rootScope.$apply(function () {
                $scope.listaDeTarefas.push(task);
            });
        };

        $.connection.meuTodoHub.client.informarOnline = function(usuario) {
            console.log("Usuario: " + usuario);
            $rootScope.$apply(function() {
                $scope.usuariosOnline.push(usuario);
            });
        }

        $scope.listaDeTarefas = [];
        $scope.usuariosOnline = [];

        $scope.tarefaModelo = {
            descricao: '',
            completa: false
        };

        $scope.listarTarefas = obterTarefas;
        //$scope.adicionarTarefa = novaTarefa;

        ////var hub = $.connection.meuTodo;

        function obterTarefas() {
            $http({
                url: "http://localhost:53074/todo/listar",
                method: 'GET'
            }).then(function (response) {
                $scope.listaDeTarefas = response.data;
            });
        };

        //function novaTarefa() {
        
        //}

        $.connection.hub.start()
                .done(function () {
                    console.log("Connected: " + $.connection.hub.id);
                    obterTarefas();
                })
                .fail(function () { console.log("Fail to connect on server..."); })
        ;
    };
})();