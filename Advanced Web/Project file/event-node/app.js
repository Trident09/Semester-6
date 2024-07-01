const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Event listener
myEmitter.on("event", () => {
	console.log("An event occurred!");
});

// Emit the event
myEmitter.emit("event");

// Event with arguments
myEmitter.on("eventWithArgs", (arg1, arg2) => {
	console.log(`Event with args: ${arg1}, ${arg2}`);
});

// Emit event with arguments
myEmitter.emit("eventWithArgs", "Hello", "World");
