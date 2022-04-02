const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const msg = document.querySelector('#msg');
const btn = document.querySelector('#btn');

const socketClient = io();

socketClient.on('connect', ()=>{
  console.log('conectado al server');

  lblOnline.style.display = '';
  lblOffline.style.display = 'none';

});

socketClient.on('disconnect', ()=>{

  console.log('desconectado del server');
  
  lblOnline.style.display = 'none';
  lblOffline.style.display = '';

});

socketClient.on('enviarMsg', payload =>{
  console.log('server !!! ', payload);
});

btn.addEventListener('click', ()=>{
  const mensaje = msg.value;

  if(!mensaje) return;

  const payload = {
    mensaje,
    fecha: new Date().getTime(),
    uuid: 'AsdasdA123'
  }

  socketClient.emit('msgEnviar', payload, (data)=>{
    console.log('enviado desde el server', data);
  });


});
