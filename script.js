const MONTHS_ENUM = {
    JANUARY: 0,
    FEBRUARY: 1,
    MARCH: 2,
    APRIL: 3,

    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUGUST: 7,

    SEPTEMBER: 8,
    OCTOBER: 9,
    NOVEMBER: 10,
    DECEMBER: 11
};

const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",

    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",

    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
];

const totalDaysInMonth = [
    31,
    28,
    31,
    30,

    31,
    30,
    31,
    31,

    30,
    31,
    30,
    31
];

const noWorkDays = [
    [2, 16],
    [20],
    [],
    [],

    [29],
    [19],
    [4],
    [],

    [4],
    [9],
    [10,23],
    [25]
];

const DAYS_ENUM = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
};

const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
];

const daysShort = [
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S"
];

const monthsValuesArray = Object.values(MONTHS_ENUM);
const daysValuesArray = Object.values(MONTHS_ENUM);

const domYearCalanderTBody = document.querySelectorAll('table .content-tbody');
const domMonthCalanderTBody = document.querySelectorAll('table .month-calendar tbody');

const domMonthCalanderRows = domYearCalanderTBody[0].querySelectorAll('.month-rows');

setMonthNames();
setDayShortNames();
setDays();

function setDays()
{
    let currentMonth = 0;
    let baba= 0;

    domMonthCalanderRows.forEach((element, index) => {

        if (!monthsValuesArray.includes(index)) 
        {
            return;
        }

        const domMonthCalanderColumns = domMonthCalanderRows[index].querySelectorAll('.month-columns');

        domMonthCalanderColumns.forEach((child, key) => {

            if (!monthsValuesArray.includes(key)) 
            {
                return;
            }

            fillDaysForMonth(currentMonth, domMonthCalanderColumns[key]);

            currentMonth++;
        });
    });
}

function fillDaysForMonth(month, dom)
{
    const domCurrentMonthDays = dom.querySelectorAll('.month-calendar tbody tr td');

    let offset = calculateMonthsDaysStartingPoint(month);
    const offsetWithMaxDays = totalDaysInMonth[month] + offset;
    let currentDay = 1;

    domCurrentMonthDays.forEach((element, index) => {
        //console.log(totalDaysInMonth[month], offset, currentDay);
        if(offset > 0 )
        {
            offset--;
            element.textContent = "";
            return;
        }

        if(currentDay > totalDaysInMonth[month])
        {
            element.textContent = "";
            return;
        }

        checkIfWorkDay(month, currentDay, element);

        element.textContent = currentDay;
        currentDay++;
    });
}

function checkIfWorkDay(month, day, element)
{
    if(noWorkDays[month].length === 0)
        return;

    noWorkDays[month].forEach((noWorkDayChecking, index) => {

        if(noWorkDayChecking != day)
            return;
        
        element.classList.add('no-work-days');
    });
}

function setMonthNames()
{
    const domMonthClass = document.querySelectorAll('.month');

    domMonthClass.forEach((element, index) => {
        if (MONTHS_ENUM[months[index]] !== undefined) 
        {
            element.textContent = months[index];
        }
    });
}

function setDayShortNames()
{
    const domWeekdaysShortClass = document.querySelectorAll('.weekdays-short-row');

    domWeekdaysShortClass.forEach((element, index) => {

        if (!monthsValuesArray.includes(index)) 
        {
            return;
        }

        Array.from(element.children).forEach((child, key) => {

            if (!monthsValuesArray.includes(key)) 
            {
                return;
            }

            child.textContent = daysShort[key];
        });
    });
}

//kiek yra dienu blokeliu menesi 6 * 7
const MAX_DAYS = 42;
function calculateMonthsDaysStartingPoint(month)
{
    if (!monthsValuesArray.includes(month)) 
    {
        return 0;
    }

    let daysOffset = 0
    let divider = 0;
    let totalWeekdays = daysShort.length;
    let daysCountWithOffset = 0;

    for(let monthValue in monthsValuesArray)
    {
        if(monthValue >= month)
            break;

        daysCountWithOffset = totalDaysInMonth[monthValue] + daysOffset;

        //(dienu skaicius + atitraukimas) / savaites dienu skaicius 
        divider = Math.floor(daysCountWithOffset / totalWeekdays);
        daysOffset = daysCountWithOffset - divider * totalWeekdays;
    }

    return daysOffset;
}

//tbody.content-tbody>tr.month-rows*3>td.month-columns*4>table.month-calendar>(thead>(tr.month-header-row>th[colspan=7].month{January})+(tr.weekdays-short-row>th.weekdays-short*7{T}))+(tbody>tr*6>(td.sundays{1})+(td*6{5}))