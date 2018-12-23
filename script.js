var newPerson = '<div class="line"><a href="#" class="add_field">+</a><input type="text"><a href="#" class="del_field">-</a></div>';
var $form = $('#allform #myform')
$form.val("holder") // По дефолту выбранная опция в списке (типо выбери имя)
$("#getAGift").attr('disabled', 'disabled'); // Кнопка по дефолту не активка
$("#myform").change(function() { //После выбора какой-то опции кнопка загорается
	$("#getAGift").removeAttr('disabled', 'disabled');
});

// С этой функцией можно понять, что рандом выдал тебе как цель подарка тебя самого, или твою пару, т.к. вы в одном массиве.
function foobar(inputArray, searchValue) {
	for (var i = 0, L = inputArray.length; i < L; i++) {
		var j = inputArray[i].indexOf(searchValue);
		if (j >= 0) {
			return [i];
		};
	};
	return null;
};


$(document).on('click','.add_field',function(){
	$('.add_field').addClass('hidden');
	$('.del_field').addClass('hidden');
	$('.input_info').append(newPerson);
})

$(document).on('click','.del_field',function(){
	$('.line:last').remove();
	$('.line:last').find("a").removeClass('hidden');
})





$('#sendNames').click(function namesFromInput () {
	var presents = $('.input_info').find('input').map(function () {
    return this.value; // $(this).val()
}).get();
var result = JSON.parse(JSON.stringify(presents))
$('.first_step').addClass('hidden');
$('.second_step').removeClass('hidden');
console.log(presents);
console.log(result);







/* Массив с именами участников. Каждая пара в отдельном массиве, они друг другу дарить не могут
 var namesArray = [
	["Max", "Ann"],
	["Brad", "Vicky"],
	["Alex", "Natalie"],
	["Paul"]
]
// Имена тех, кому дарить. Кол-во должно быть как и в масиве с именами.
var presents = ["Max", "Ann", "Brad", "Vicky", "Alex", "Natalie", "Paul"]
var result = [].concat(...namesArray); // Убрал двойной массив */
// Вывод каждого имени как опцию в html
for (var i = 0; i < result.length; i++) {
	$("#myform").append('<option value="' + i + '">' + result[i] + '</option>');
};










//Все, что происходит по клику на отправить
$("#allform").submit(function onClickSubmit() {
			var selectedPerson = $("#myform option:selected").text(); // Узнает строчкой, что за человек выбран в качестве отправителя подарка.
			var findPerson = foobar(presents, selectedPerson); // Ищет индекс внутреннего массива у этого человека.
			var findPersonString = JSON.stringify(findPerson); // Преобразует в строку (нунжо для функции noGift)
			var rand = Math.floor(Math.random() * presents.length); // Находит рандомный индекс человека, которому дарить подарок
			var randomPresent = presents[rand]; // Выводит человека по индексу в массиве
			var randomPresentNumber = foobar(presents, randomPresent); // Отправляет инфу в функцию по проверке, функция вернет, в каком массиве человек, которому дарят
			var randomPresentNumberString = JSON.stringify(randomPresentNumber); // Преобразует в строку (нунжо для функции noGift)
			console.log("Кто дарит: " + selectedPerson); // + " Номер в цикле: " + findPersonString + " " + typeof(findPersonString));
			console.log("Кому дарит: " + randomPresent); // + " Номер в цикле: " + randomPresentNumberString + " " + typeof(randomPresentNumberString));
      console.log("_____"); // Тупо разделитель)
					// Проверяет, кому ты даришь. Если цель из твоего массива, то выдает ошибку. Если цель другой человек - делает твое имя не активным и перебрасывает на опцию "Выбрать имя"
					function noGift(a, b) {
						if (a == b) {
							onClickSubmit(); // перезапуск функции
							return ("Функция была перезапущена")
						} else if (a != b) {
							$("#myform option:selected").attr('disabled', 'disabled'); // Делает твое имя не активным, ты уже получил цель.
							$("#getAGift").attr('disabled', 'disabled'); // Делает не активной кнопку, ты уже получил цель.
							presents.splice(rand, 1); // Удаляет из массива тех, кому дарить имя этого человека
              alert(selectedPerson + ", твой подарок отправится к " + randomPresent);
							return presents
						}
					}; console.log(noGift(findPersonString, randomPresentNumberString));
					return false
				})

				}) // КОНЕЦ ФУНКЦИИ namesFromInput
