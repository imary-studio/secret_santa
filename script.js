var newPerson = '<div class="line"><a href="#" class="add_field"><i class="fas fa-plus"></i></a><input type="text"><a href="#" class="del_field"><i class="fas fa-minus"></i></a></div>';
var $form = $('#allform #myform')
$form.val("holder") // По дефолту выбранная опция в списке (типо выбери имя)
$("#getAGift").attr('disabled', 'disabled'); // Кнопка по дефолту не активка
$("#myform").change(function() { //После выбора какой-то опции кнопка загорается
	$("#getAGift").removeAttr('disabled', 'disabled');
});
Array.prototype.shuffle = function(b) { // функция рандома
	var i = this.length,
		j, t;
	while (i) {
		j = Math.floor((i--) * Math.random());
		t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
};
var myNumb = 0;

function capitalize(string) { // функция, которая делает первую букву в строчке большой (для алерта)
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
$(document).on('click', '.add_field', function() { // жмешь на плюс - появляется новое поле
	$('.add_field').addClass('hidden');
	$('.del_field').addClass('hidden');
	$('.input_info').append(newPerson);
})
$(document).on('click', '.del_field', function() { // на минус - минус поле
	$('.line:last').remove();
	$('.line:last').find("a").removeClass('hidden');
})
$('#sendNames').click(function namesFromInput() { // выводит введенные имена в массив
	var presentsArray = $('.input_info').find('input').map(function() {
		return this.value; // $(this).val()
	}).get();
	var namesArray = JSON.parse(JSON.stringify(presentsArray)) // копирует значение одного массива в другой, чтобы перемешать второй
	$('.first_step').addClass('hidden');
	$('.second_step').removeClass('hidden');
	for (var i = 0; i < namesArray.length; i++) { // добавляет имена в список
		$("#myform").append('<option value="' + i + '">' + namesArray[i] + '</option>');
	};
	perebor();

	function perebor() {
		for (var i = 0; i < namesArray.length; i++) {
			if (namesArray[i] == presentsArray[i]) {} else {
				myNumb++;
			}
		}
		if (myNumb == namesArray.length) {
			// если номер равен длине массива, значит рандом правильно перемешал имена и никому он же
		} else { // если нет - перемешать еще раз и проверить
			myNumb = 0;
			presentsArray.shuffle();
			perebor();
		}
	}
	//Все, что происходит по клику на отправить
	$("#allform").submit(function onClickSubmit() {
		var selectedPerson = $("#myform option:selected").text(); // Узнает строчкой, что за человек выбран в качестве отправителя подарка.
		var selectedPersonNumber = $("#myform option:selected").val(); // Узнает индекс в массиве
		var selectedPersonCap = capitalize(selectedPerson) // Имя с большой буквы
		var getsGift = capitalize(presentsArray[selectedPersonNumber]) // Имя с большой буквы
		alert(selectedPersonCap + ", твой подарок получит " + getsGift + " ;)") // Алерт :)
		$("#myform option:selected").attr('disabled', 'disabled'); // Делает твое имя не активным, ты уже получил цель.
		$("#getAGift").attr('disabled', 'disabled'); // Делает не активной кнопку, ты уже получил цель.
	})
}) // КОНЕЦ ФУНКЦИИ namesFromInput
