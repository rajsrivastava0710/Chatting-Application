var socket=io.connect('http://localhost:3000');

var welcome  =document.querySelector('#welcome');
var message  =document.querySelector('#message');
var handle   =document.querySelector('#handle');
var btn      =document.querySelector('#send');
var output   =document.querySelector('#output');
var notify   =document.querySelector('#notify');


var name=prompt("ENter name");

if(name.length!=0){
handle.value=name;
}
else{
  handle.value='Anonymous';
}
setInterval(function(){
  if(handle.value=='null'){
    handle.value='Anonymous';
  }
},10);

welcome.innerHTML='Welcome to this world : '+handle.value.toUpperCase();

btn.addEventListener('click',function () {
    if(message.value.length>0)
    {
        socket.emit('chat',{
            message:message.value,
            handle:handle.value
        });
        message.value=''
    }
    else
    {
        alert('Pls enter proper input');
    }


});


var msgoutput=[];
socket.on('chat',function (data) {
    output.innerHTML="";
    notify.innerHTML="";


    msgoutput.push(data);

    for(var i=0;i<msgoutput.length;i++)
    {
        if(msgoutput[i].handle=='rj7ishere')
        {

            output.innerHTML+='<p style="color: yellow; font-size: 140%"><strong>'+" ADMIN "+':</strong><b>'+msgoutput[i].message+'</b></p>';
        }
        else{
            output.innerHTML+='<p><strong style="color: red">'+msgoutput[i].handle.toUpperCase()+':</strong>'+" <i>"+msgoutput[i].message+'</i></p>';
        }

    }



});

message.addEventListener('keyup',function () {
    socket.emit('typing',handle.value);
});

socket.on('typing',function (typist) {

    notify.innerHTML='<p style="color: #00ff00"><em>'+typist[0].toUpperCase()+typist.substring(1)+' is typing !!</em></p>';
    setTimeout(function(){ notify.innerHTML='' }, 4000);
});
