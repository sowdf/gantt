Date.prototype.format = function() {
	let s = "";
	let mouth =
		this.getMonth() + 1 >= 10
			? this.getMonth() + 1
			: "0" + (this.getMonth() + 1);
	let day = this.getDate() >= 10 ? this.getDate() : "0" + this.getDate();
	s += this.getFullYear() + "-"; // 获取年份。
	s += mouth + "-"; // 获取月份。
	s += day; // 获取日。
	return s; // 返回日期。
};

function getAll(begin, end) {
	let ab = begin.split("-");
	let ae = end.split("-");
	let db = new Date();
	db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
	let de = new Date();
	de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
	let unixDb = db.getTime();
	let unixDe = de.getTime();
	let ary = [];
	for (let k = unixDb; k <= unixDe; ) {
		ary.push(new Date(parseInt(k)).format());
		k = k + 24 * 60 * 60 * 1000;
	}
	return ary;
}

class StackDatePicker {
	isLeapYear(year) {
		if (year % 4 == 0 && year % 100 != 0) {
			return true;
		} else {
			if (year % 400 == 0) {
				return true;
			} else {
				return false;
			}
		}
	}
	/*获取某月的具体天数*/
	monthDayNum(year, month) {
		let dayNum = 30;
		if (
			month == 1 ||
			month == 3 ||
			month == 5 ||
			month == 7 ||
			month == 8 ||
			month == 10 ||
			month == 12
		) {
			dayNum = 31;
		} else if (month == 4 || month == 6 || month == 9 || month == 11) {
			dayNum = 30;
		} else if (month == 2 && this.isLeapYear(year)) {
			dayNum = 29;
		} else {
			dayNum = 28;
		}
		return dayNum;
	}
	/*获取具体的星期*/
	getWeekDay(year, month, day) {
		//dayValue=“2014-01-01”
		let dateStr = `${year}/${month}/${day}`;
		let date = new Date(Date.parse(dateStr)); //将日期值格式化
		let today = new Array("日", "一", "二", "三", "四", "五", "六"); //创建星期数组
		return today[date.getDay()]; //返一个星期中的某一天，其中0为星期日
	}
	getMonthAry(year, month) {
		/*用于存储该月份中每个工作日的时间戳*/
		month = month < 10 ? "0" + month : month;
		let monthAry = [];
		let dayNum = this.monthDayNum(year, month);
		for (let i = 0; i < dayNum; i++) {
			let dayData = { year, month };
			let day = i + 1;
			day = day < 10 ? "0" + day : day;
			dayData.day = day;
			dayData.ActiveAry = [];
			dayData.weekDay = this.getWeekDay(year, month, day);
			dayData.workingDays =
			dayData.weekDay == "六" || dayData.weekDay == "日"
				? false
				: true; //加标识如果是工作日就是true 不是就是false
			//如果是工资日就进入数组
			dayData.dayText = `${year}/${month}/${day}`;
			dayData.dayTimestamp = new Date(dayData.dayText).getTime();
			monthAry.push(dayData);
		}
		return monthAry;
	}
	getTimeQuantum(start, end) {
		let newDateAry = [];
		let dateAry = getAll(start, end);
		console.log(dateAry);
		dateAry.map((item, index) => {
			let ary = item.split("-");
			let year = ary[0];
			let month = ary[1];
			let day = ary[2];
			let dayData = { year, month };
			dayData.day = day;
			dayData.ActiveAry = [];
			dayData.weekDay = this.getWeekDay(year, month, day);
			dayData.workingDays =
				dayData.weekDay === "六" || dayData.weekDay === "日"
					? false
					: true; //加标识如果是工作日就是true 不是就是false
			if (dayData.workingDays) {
				//如果是工资日就进入数组
				dayData.dayText = `${year}-${month}-${day}`;
				dayData.dayTimestamp = new Date(dayData.dayText).getTime();
				newDateAry.push(dayData);
			}
		});
		return newDateAry;
	}
	stackActiveList(dateAry, data) {
		let {
			startTime,
			endTime,
			frontEnd,
			design,
			test,
			serverSide,
			operating
		} = data;
		let activeAry = [];
		dateAry.map((item, index) => {
			let dayData = { year: startTime.year, month: startTime.month };
			let day = item.day;
			dayData.day = item.day;
			dayData.weekDay = item.weekDay;
			dayData.workingDays = item.workingDays; //加标识如果是工作日就是true 不是就是false
			if (startTime.day <= day && day <= endTime.day) {
				if (startTime.month != item.month) {
					dayData.timeStatus = 0;
				} else {
					dayData.timeStatus = 1;
					if (operating.start <= day && day <= operating.end) {
						dayData.timeStatus = 2;
					}
					if (design.start <= day && day <= design.end) {
						dayData.timeStatus = 3;
					}
					if (frontEnd.start <= day && day <= frontEnd.end) {
						dayData.timeStatus = 4;
					}
					if (serverSide.start <= day && day <= serverSide.end) {
						dayData.timeStatus = 5;
					}
					if (test.start <= day && day <= test.end) {
						dayData.timeStatus = 6;
					}
				}
			} else {
				dayData.timeStatus = 0;
			}
			activeAry.push(dayData);
		});
		return activeAry;
	}
}

export default StackDatePicker;
