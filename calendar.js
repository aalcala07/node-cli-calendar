
const monthNames = [
  'January', 
  'February', 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
]

const weekDaysDouble = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]


class Calendar {

  constructor(year) {
    let date = new Date()
    this.year = year ? year : date.getFullYear()
    this.setCalendar()
  }

  setCalendar() {
    var months = {}
    for (let i = 1; i <= 12; i++) {  
      months[i] = [];
    }

    var year = this.year
    var month = 1
    var day = 1

    var date = new Date(year + "-01-01 12:00")
    var weekNumber = 0
    var currentMonth = month
    var currentYear = year

    while (currentYear === year) {

      let weekDays = new Array(7).fill("")

      do {
        weekDays[date.getDay()] = date.getDate()
        date.setDate(date.getDate() + 1)
        if (date.getMonth() !== (currentMonth - 1)) break
      } while (date.getDay() !== 0)


      months[currentMonth][weekNumber] = weekDays  
      weekNumber = (date.getMonth() !== currentMonth - 1) ? 0 : weekNumber + 1
      currentMonth = date.getMonth() + 1
      currentYear = date.getFullYear()
    }

    this.calendar = months
  }

  render() {
    let output = this.centerPad(this.year.toString(), 64, " ") + "\n\n"

    for (let monthRow = 0; monthRow < 4; monthRow++) {

      let weekNumber = 0
      let firstMonthInRow = (monthRow*3) + 1

      let monthNamesFormatted = new Array(3)
      let weekDaysFormatted = new Array(3)
      for (let m = 0; m < 3; m++) {
        monthNamesFormatted[m] = this.centerPad(monthNames[firstMonthInRow-1+m], 20, " ")
        weekDaysFormatted[m] = weekDaysDouble.join(" ")
      }
      output += monthNamesFormatted.join("  ") + "\n"
      output += weekDaysFormatted.join("  ") + "\n"

      while (weekNumber < 6) {

        let rowSegments = new Array(3).fill(" ".repeat(20))

        for (let segment = 0; segment < 3; segment++) {

          let currentMonth = firstMonthInRow + segment
          let columns = new Array(7).fill("  ")

          for (let column = 0; column < 7; column++) {
            if (typeof this.calendar[currentMonth][weekNumber] === 'undefined') continue
            columns[column] = this.calendar[currentMonth][weekNumber][column].toString().padStart(2, " ")
          }

          rowSegments[segment] = columns.join(" ")
        }

        output += rowSegments.join("  ") + "\n"
        weekNumber++
      }
    }

    return output
  }

  centerPad(str, length, value) {
    let leftPad = Math.round((length - str.length) / 2)
    let rightPad = length - str.length - leftPad
    return value.repeat(leftPad) + str + value.repeat(rightPad)
  }
}

module.exports = Calendar