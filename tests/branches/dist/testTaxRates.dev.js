"use strict";

var STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';

var config = require('../../config/credentials.json')[STAGE];

var DvaraGold = require('../../cliient/dvaragold');

var extBranchId = "000AB";
var queryParams = {
  bullionId: 'G3',
  rateType: 'buy'
};

function test() {
  var client;
  return regeneratorRuntime.async(function test$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(DvaraGold.Client(config));

        case 2:
          client = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(client.taxRatesBranch(extBranchId, queryParams));

        case 5:
          return _context.abrupt("return", _context.sent);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

test().then(function (result) {
  console.dir(result);
})["catch"](function (err) {
  console.error(err);
})["finally"](function () {
  process.exit(0);
});