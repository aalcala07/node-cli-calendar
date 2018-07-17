
const Calendar = require('./calendar');

let year = (typeof process.argv[2] !== 'undefined') ? parseInt(process.argv[2])	: null
var calendar = new Calendar(year)
console.log(calendar.render())
