/*
日历函数放回一个div，内部包含了5个p标签，每个标签表示一个星期
p标签内有7个span标签，表示一天，标签的time属性，指向了该天的时间
*/
function craeteCalendar(time) {
    let fistDay,thisMonthDays,lastMonthDays;
    thisMonthDays = getMonthDays(time.getMonth() + 1, time.getFullYear());
    if (time.getMonth() === 0) {
        lastMonthDays = getMonthDays(12);
    }
    else {
        lastMonthDays = getMonthDays(time.getMonth(), time.getFullYear());
    }
    fistDay = lastMonthDays - ((time.getDay() === 0 ? 7 : time.getDay()) - ((time.getDate() - 1) % 7)) + 2;
    //实验代码
    /*
    日历是从星期一开始的，所以先得到这个月的第一天是星期几，
    然后就可以知道星期一的那天需要在这个月第一天的基础上减去多少天
    应为Date()实例化的时候会自动根据天数来增减月份和年份，来达到正常的时间
    所以只需要在这个月第一天的基础上减去日历第一天需要的天数，就可以得到日历第一天的时间
    后续只要根据这个时间，通过加减天数就可以直接得到后续日期的时间
     */
    let fistDayDate = 1 - ((time.getDay() === 0 ? 7 : time.getDay()) - ((time.getDate() - 1) % 7) - 1);
    let fistDayTime = new Date(time.getFullYear(),time.getMonth(),fistDayDate);
    console.log(fistDayTime);
    //结束
    let monthDiv = document.createElement('div');

    for(let i = 0; i < 35; i++) {
        if(i % 7 === 0) {
            monthDiv.appendChild(document.createElement('p'));
            p = monthDiv.lastChild;
        }
        if(fistDay > thisMonthDays || fistDay > lastMonthDays) {
            fistDay = 1
        }
        monthDiv.lastElementChild.appendChild(document.createElement('span'));
        monthDiv.lastElementChild.lastElementChild.innerText = fistDay;
        monthDiv.lastElementChild.lastElementChild.setAttribute('time', fistDayTime);
        fistDayTime.setDate(fistDayTime.getDate() + 1);
        fistDay++;
    }
    return monthDiv;
}

function getMonthDays(month, year) {
    if(month === 2) {
        if((year % 100 === 0 && year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0)) {
            return 29
        }
        else {return 28}
    }
    else if((month <= 7 && month % 2 === 0) || (month >= 8 && month % 2 !== 0)) {
        return 30
    }
    else {return 31}
}
console.log(craeteCalendar(new Date()));