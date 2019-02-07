document.addEventListener('DOMContentLoaded', function() {
	// document.querySelector('#timeline').initTimeline();
	var timeline = document.querySelector('#timeline');
	var daysCount = 5;

	var timelineCursor = document.querySelector('#timeline_cursor');
	document.querySelector('.timeline_wrapper').addEventListener('mousemove', function (ev) {
		timelineCursor.style.left = ev.pageX + this.scrollLeft + 'px';
	});

	// Генерация столбцов дней
	var dateWrapper = document.querySelector('.timeline_date-area');
	for(var i = 0; i < daysCount; i++) {
		var newElement = document.createElement('div');
		newElement.classList.add('timeline_date');
		var date = new Date();
		date.setDate(date.getDate()+i);
		newElement.innerHTML = date.getDate() + ' ' + getMonthName(date.getMonth()) + ' ' + date.getFullYear();
		dateWrapper.appendChild(newElement)
	}

	// Генерация столбцов часов
	var timeWrapper = document.querySelector('.timeline_time-area');
	for(var i = 0; i < 24 * daysCount; i++) {
		var newElement = document.createElement('div');
		newElement.classList.add('timeline_time');
		var hr = i - Math.floor(i/24)*24;
		newElement.innerText = ('0'+hr).slice(-2);
		timeWrapper.appendChild(newElement);
	}

	// Генерация строк машин
	var hourWidth = 15;
	document.documentElement.style.setProperty('--hour-width', hourWidth+'px');
	var vehicles = ['Х856ТА','Х554ХР','Р732НХ','Е279ЕС','У828МУ','Р675ХО','Т142СМ','Е683ХХ','Е124ХХ','Е137ХХ','Е586ХХ','Е299ХХ','Е682ХХ','Е196ХУ','Е437ХХ','Е263ХУ','Е156ХУ'];
	for(var i = 0; i < vehicles.length; i++) {
		var newElement = document.createElement('div');
		newElement.classList.add('timeline_veh');
		newElement.innerHTML = '<div class="timeline_veh-name">'+ vehicles[i]+'</div><div class="timeline_veh-area"></div>';
		var vehArea = timeline.appendChild(newElement);
		vehArea.querySelector('.timeline_veh-area').innerHTML = '<div class="timeline_route" style="background-color: #fff; width: '+(hourWidth*randomInteger(5,30))+'px; margin-left: '+(hourWidth*randomInteger(1,24))+'px"><span>Москва<br>01.01.2001 11:11</span><span>Елабуга<br>02.02.2002 22:22</span></div><div class="timeline_route" style="background-color: #ff0; width: '+(hourWidth*randomInteger(1,8))+'px; margin-left:'+(hourWidth*randomInteger(1,24))+'px">Ремонт</div>'
	}

	function updateNow() {
		var date = new Date();
		var minutes = date.getHours() * 60 + date.getMinutes();
		document.querySelector('#timeline_now').style.left = Math.round(hourWidth/60*minutes) + 'px';
	}
	updateNow();
	setInterval(updateNow, 60/hourWidth*60000);
});

function randomInteger(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

function getMonthName(monthNumber) {
	return ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'][monthNumber];
}

