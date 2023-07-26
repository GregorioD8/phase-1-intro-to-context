function createEmployeeRecord(employeeArray) {
    let employee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []

    }
    return employee
}

function createEmployeeRecords(arrayOfArrays) {

    let employeeRecords = arrayOfArrays.map(array => createEmployeeRecord(array))
    return employeeRecords
}

function createTimeInEvent(employeeObj, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    let timeInRecord = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    }
    employeeObj.timeInEvents.push(timeInRecord)
    return employeeObj

}

function createTimeOutEvent(employeeObj, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    let timeOutRecord = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    }
    employeeObj.timeOutEvents.push(timeOutRecord)
    return employeeObj

}

function hoursWorkedOnDate(employeeObj, dateWorked) {

    let timeIn = employeeObj.timeInEvents.find(event => event.date === dateWorked)
    let timeOut = employeeObj.timeOutEvents.find(event => event.date === dateWorked)
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employeeObj, dateWorked) {

    let payOwed = (employeeObj.payPerHour) * (hoursWorkedOnDate(employeeObj, dateWorked))

    return payOwed
}

function allWagesFor(employee) {

    let eligibleDates = employee.timeInEvents.map(events => events.date)
    let payable = eligibleDates.reduce((accumulator, currentValue) => accumulator + wagesEarnedOnDate(employee, currentValue), 0)

    return payable
}

function calculatePayroll(employeeRecordsArray) {

    let payroll = employeeRecordsArray.reduce((accumulator, currentValue) => accumulator + allWagesFor(currentValue), 0)

    return payroll
}