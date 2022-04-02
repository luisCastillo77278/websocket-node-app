
const socketController = (socket) => { 
  console.log(`Cliente conectado: ${ socket.id }`);

  socket.on('disconnect', ()=>{
    console.log(`Cliente desconectado ${socket.id}`);
  });


  socket.on('msgEnviar', (msg, callback)=>{

    console.log(msg);

    // esto envia un dato si todo salio correcto o que se
    // haya guardado en la base de dato y obtener un valor en la DB
    const id = Date.now();
    callback({ id, fecha: new Date().getTime() });

    // esto emite un mensaje personalizado a todos
    // excepto al mismo que lo envío.
    // muy diferente a io.emit()
    socket.broadcast.emit('enviarMsg', msg);

  });


};

module.exports = socketController;