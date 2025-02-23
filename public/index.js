var connectionStatus = document.querySelector('#connection-status');
var button = document.querySelector('#btn-record');
var channelChip = document.querySelector("#channel-chip");
var channelName = document.querySelector("#channel-name");
var subscribe = document.querySelector("#btn-subscribe");
var channelInput = document.querySelector("#input-channel");

var channel = "test";

updateConnectionStatus(false, "Conectando");

ptt.connect().then((connection)=>{
    updateConnectionStatus(true, "Conectado");

    connection.bind(button);

    function handleSubscribeSuccess(response){        
        channelChip.classList.remove('hidden');
        channelName.textContent = channel;
    }

    function handleError(){
        showMessage("¡No se pudo suscribir!");
        showMessage(JSON.stringify(err));
    }

    // automatically connects to channel 'test'
    connection.subscribe(channel).then(handleSubscribeSuccess).catch(handleError);

    subscribe.onclick = (e)=>{
        if(channelInput.value.trim().length > 0){
            channel = channelInput.value.trim();
            connection.subscribe(channel).then(handleSubscribeSuccess).catch(handleError);
            channelInput.value = "";
        }
    };
    
}).catch(err=>{
    updateConnectionStatus(false, "Disconnected");
    console.error(err);
});

function updateConnectionStatus(isConnected, text) {
    connectionStatus.className = `status-chip ${isConnected ? 'connected' : 'disconnected'}`;
    connectionStatus.innerHTML = `<i class="fas fa-wifi"></i><span>${text}</span>`;
}
