//This will open the connection*
let ws = new WebSocket("ws://localhost:8000/ws/rides/1");

// Then you can send a message
ws.onopen = function () {
    connection.send("Ping");
};

//Log the messages that are returned from the server
ws.onmessage = function (e) {
    console.log("From Server:"+ e.data)
};

//Sending a simple string message
ws.send("HelloHelloIsThereAnyoneThere");


//Close the connection
ws.close();