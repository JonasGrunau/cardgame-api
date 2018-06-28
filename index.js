// CLASSES
function InternalCollection() {
    this.items = [];
}

InternalCollection.prototype.add = function(uid = undefined, data = undefined) {
    if (this.getFromKey("uid", uid)) {
        return;
    }

    this.items.push({
        uid: uid,
        data: data
    });
};

InternalCollection.prototype.remove = function(index) {
    if ((this.items.length - 1) > index) {
        return;
    }
    this.items.splice(index, 1);
};

InternalCollection.prototype.getFromKey = function(key, value) {
    let userIndex = -1;
    this.items.forEach((element, index) => {
        if (element[key] === value) {
            userIndex = index;
        }
    });

    if (userIndex !== -1) {
        return this.items[userIndex];
    }
    return false;
};

InternalCollection.toString = function() { return "InternalCollection"; };

function Collection() {
    InternalCollection.call(this);
}

Collection.prototype = Object.create(InternalCollection.prototype);
Collection.prototype.constructor = Collection;

Collection.toString = function() { return "Collection"; };

// ===============================================================================================


const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// require("./lib/collection");

app.get("/", (request, result) => {
    result.sendFile(__dirname + "/index.html");
});

// SOCKET.IO
let userCollection = new Collection();
let messageCollection = new Collection();

io.on("connection", socket => {
    userCollection.add(socket.id);

    socket.on("message", message => {
        console.log("message: " + userCollection.items.length);
        messageCollection.add(socket.id, JSON.stringify(message));
        // TODO implement
    });

    socket.on("error", error => {
        console.log("error: " + JSON.stringify(error));
        // TODO implement
    });

    socket.on("disconnect", () => {
        userCollection.remove(socket.id);
        // TODO implement
    });

    console.log("connected user: " + userCollection.items.length);
    console.log(JSON.stringify(userCollection.items));
});

// HTTP LISTENER
http.listen(3000, () => {
    console.log("server listening on *:3000");
});