const socket =io('http://localhost:8000');

var a=1;
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var send =new Audio("../send.mp3");
var recieve =new Audio("../recieve.mp3");

form.addEventListener('submit',(e)=>{
    send.play();
    e.preventDefault();
    const m= messageInput.value;
    append(`You:${m}`,'right');
    socket.emit('send',m);
    messageInput.value="";
})
const onlineStatus =(stat)=>{
    if (stat===1){
        a=a+1;
        document.getElementById("status").innerText =(`${a} online`)
    }
    else{
        a=a-1;
        document.getElementById("status").innerText =(`${a} online`)
    }
}
const append = (message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
const name1   =prompt("Enter your name");

socket.emit('new-user-joined', name1 );

socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right')
    recieve.play();
    onlineStatus(1);
});

socket.on('recieve',(data)=>{
    append(`${data.name}: ${data.message}`,'left');
    recieve.play();
});

socket.on('left', name2 =>{
    append(`${name2}: Left the chat`,'left');
    recieve.play();
    onlineStatus(0);
});