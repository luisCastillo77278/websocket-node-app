
const socketController = (socket) => { 
  console.log(`Cliente conectado: ${ socket.id }`);

  socket.on('disconnect', ()=>{
    console.log(`Cliente desconectado ${socket.id}`);
  });


  socket.on('msgEnviar', (payload, callback)=>{

    console.log(msg);

    // esto envia un dato si todo salio correcto o que se
    // haya guardado en la base de dato y obtener un valor en la DB
    const id = 123456789;
    callback({id});

    // esto emite un mensaje personalizado a todos
    // excepto al mismo que lo envío.
    // muy diferente a io.emit()
    socket.broadcast.emit('enviarMsg', payload);

  });


};

module.exports = socketController;