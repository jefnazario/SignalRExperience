$(function () {
    ///////////////////////////////////////////////////////////////
    // Standard drawing board functionalities
    ///////////////////////////////////////////////////////////////
    var buttonPressed = false;

    var canvas = $("#canvas");
    canvas
        .mousedown(function () {
            buttonPressed = true;
        })
        .mouseup(function () {
            buttonPressed = false;
        })
        .mousemove(function (e) {
            if (buttonPressed) {
                setPoint(e.offsetX, e.offsetY, $("#color").val());
            }
        });

    var ctx = canvas[0].getContext("2d");

    function setPoint(x, y, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    function clearPoints() {
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
    }

    $("#clear").click(function () {
        clearPoints();
    });



    ///////////////////////////////////////////////////////////////
    // SignalR specific code
    ///////////////////////////////////////////////////////////////

    var hub = $.connection.drawingBoard;
    hub.state.color = $("#color").val(); // Accessible from server

    var connected = false;

    // UI events
    $("#color").change(function () {
        hub.state.color = $(this).val();
    });

    canvas.mousemove(function (e) {
        if (buttonPressed && connected) {
            hub.server.broadcastPoint(e.offsetX, e.offsetY);
        }
    });

    $("#clear").click(function () {
        if (connected) {
            hub.server.broadcastClear();
        }
    });
    var inputText = $("input[name=txtword]");
    inputText.keyup(function () {
        var texto = $(this).val();
        hub.server.sendText(texto);
    });

    $("#btnsalvar").click(function () {
        hub.server.saveText(inputText.val());
        inputText.val('');
    });

    function atualizarTexto(texto) {
        inputText.val(texto);
    }

    // Event handlers
    hub.client.clear = function () {
        clearPoints();
    };

    hub.client.drawPoint = function (x, y, color) {
        setPoint(x, y, color);
    };

    hub.client.writeText = function (text) {
        atualizarTexto(text);   //Ou pode ser atualizado diretamente por aqui assim:
                                //inputText.val(texto);
    }

    hub.client.showTextSaved = function (text) {
        if ($("#textoSalvo").children("li").size() === 0) {
            $("<li class='list-group-item active'>Textos já digitados</li>").appendTo("#textoSalvo");
        }
        $("<li class='list-group-item'>" + text + "</li>").appendTo("#textoSalvo");
    }
    // Voila!
    $.connection.hub.start()
    .done(function () {
        connected = true;
    });
});