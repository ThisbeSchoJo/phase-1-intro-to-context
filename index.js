// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    const employeeRecords = [] // Initialization: create an empty array to store the employee record objects
    
    //Use a for...of loop to iterate over the employees array
    //For each sub-array (employee), call createEmployeeRecord to generate an employee record
    //Push employee record into employeeRecords
    for (const employee of employees) { 
        employeeRecords.push(createEmployeeRecord(employee))
    }

    return employeeRecords
}


function createTimeInEvent(employeeRecord, dateTimeString) {
    //Takes an employee record and a date/time string as arguments
    //Parses the timestamp string to extract the date and hour
    const [date, hour] = dateTimeString.split(" ")
    
    //Create the "timeIn" event object
    const timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    }
    //Add the timeIn event to the employee's timeInEvents array
    employeeRecord.timeInEvents.push(timeInEvent)

    //Return the updated employee record
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    //Takes an employee record and a date/time string
    //Parses the timestamp string to extract the date and hour
    const [date, hour] = dateTimeString.split(" ")

    //Create the "timeOut" event object
    const timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    }
    //Add the timeOut event to the employee's timeOutEvents array
    employeeRecord.timeOutEvents.push(timeOutEvent)

    //Return an updated employee record
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    //Find the timeInEvent for the specified date
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    
    //Find the timeOutEvent for the specified date
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)

    //Ensure both events exist
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)

    const wagesEarned = hoursWorked * employeeRecord.payPerHour
    return wagesEarned
}

function allWagesFor(employeeRecord) {
    //Loop through all the dates the employee worked (based on timeInEvents)
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date)

    //Use wagesEarnedOnDate to calculate the wages for each date
    const totalWages = datesWorked.reduce((total, date) => {
        //Sum up all the wages to return the total
        return total + wagesEarnedOnDate(employeeRecord, date)
    }, 0)
    
    return totalWages
}

function calculatePayroll(employeeRecords) { //accepts an array of employee records
    //Uses .map() to calculate the total wages for all employees by calling allWagesFor on each employee
    const allEmployeeWages = employeeRecords.map(employeeRecord => allWagesFor(employeeRecord))

    //Uses .reduce() to sum up the total wages
    const totalPayroll = allEmployeeWages.reduce((total, wages) => total + wages, 0)

    //Returns the total payroll amount
    return totalPayroll
}



// return testEmployee = [
//     [firstName: "Gray"], 
//     [familyName: "Worm"], 
//     [title: "Security"], 
//     [payPerHour: 1],
//     [timeInEvents: []],
//     [timeOutEvents: []]
// ]
//     [firstName: "Gray"], 
//     [familyName: "Worm"], 
//     [title: "Security"], 
//     payPerHour: 1,
//     timeInEvents: [],
//     timeOutEvents: []
// }

// const createEmployeeRecord = []

// createEmployeeRecord[0] = "firstName : "

// createEmployeeRecord[1] = "familyName : "

// createEmployeeRecord[2] = "title : "
// createEmployeeRecord[3] = "payPerHour : "
// createEmployeeRecord[4] = "timeInEvents : []"
// createEmployeeRecord[5] = "timeOutEvents : []"

