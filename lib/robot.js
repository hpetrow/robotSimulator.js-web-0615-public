'use strict';

function Robot() {
  // implement your solution here!
}

Robot.prototype.compass = function() {
  return ['north', 'east', 'south', 'west'];
}

Robot.prototype.orient = function(direction) {
  this.compassIndex = this.compass().indexOf(direction);

  if (this.compassIndex === -1) {
    throw new Error("Invalid Robot Bearing");
  }
  else {
    this.bearing = direction;
  }
}

Robot.prototype.turnRight = function() {
  this.compassIndex = (this.compassIndex + 1) % this.compass().length;
  this.bearing = this.compass()[this.compassIndex];
}

Robot.prototype.turnLeft = function() {
  this.compassIndex = this.compassIndex > 0 ? (this.compassIndex - 1) : this.compass().length-1;
  this.bearing = this.compass()[this.compassIndex];
}

Robot.prototype.at = function(c0, c1) {
  this.coordinates = [c0, c1];
}

Robot.prototype.advance = function() {
  var coordinates = this.coordinates;
  var move = {
    'north': function() {
      coordinates[1] += 1;
    },
    'east': function() {
      coordinates[0] += 1;
    },
    'south': function() {
      coordinates[1] -= 1;
    },
    'west': function() {
      coordinates[0] -= 1;
    }
  };
  move[this.bearing]();
  this.coordinates = coordinates;
}

Robot.prototype.instructions = function(instruction) {
  var instr = {
    "L": "turnLeft",
    "R": "turnRight",
    "A": "advance",
  }
  return instruction.split("").map(function(i) {
    return instr[i];
  });
}

Robot.prototype.place = function(data) {
  try {
    this.at(data.x, data.y);
    this.orient(data.direction);
  }
  catch(err) {
    return err.message;
  }
}

Robot.prototype.evaluate = function(instructions) {
  var evals = this.instructions(instructions);

  for (var i = 0; i < evals.length; i++) {
    eval("this." + evals[i] + "()");
  }
}
