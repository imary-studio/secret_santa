var newPerson = '<div class="line"><a href="#" class="add_field">+</a><input type="text"><a href="#" class="del_field">-</a></div>';
var $form = $('#allform #myform')
$form.val("holder") // По дефолту выбранная опция в списке (типо выбери имя)
$("#getAGift").attr('disabled', 'disabled'); // Кнопка по дефолту не активка
$("#myform").change(function() { //После выбора какой-то опции кнопка загорается
	$("#getAGift").removeAttr('disabled', 'disabled');
});
Array.prototype.shuffle = function(b) {
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

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
$(document).on('click', '.add_field', function() {
	$('.add_field').addClass('hidden');
	$('.del_field').addClass('hidden');
	$('.input_info').append(newPerson);
})
$(document).on('click', '.del_field', function() {
	$('.line:last').remove();
	$('.line:last').find("a").removeClass('hidden');
})
$('#sendNames').click(function namesFromInput() {
	var presentsArray = $('.input_info').find('input').map(function() {
		return this.value; // $(this).val()
	}).get();
	var namesArray = JSON.parse(JSON.stringify(presentsArray))
	$('.first_step').addClass('hidden');
	$('.second_step').removeClass('hidden');
	// console.log(presentsArray);
	// console.log(namesArray);
	for (var i = 0; i < namesArray.length; i++) {
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
			// console.log("_____");
			// console.log("Е БОООЙ, У ВСЕХ РАНДОМ)))");
			// console.log("Names : " + namesArray);
			// console.log("Presents : " + presentsArray);
		} else {
			// console.log("Не варик ");
			// console.log("Names : " + namesArray);
			// console.log("Presents : " + presentsArray);
			myNumb = 0;
			presentsArray.shuffle();
			perebor();
		}
	}
	//Все, что происходит по клику на отправить
	$("#allform").submit(function onClickSubmit() {
		var selectedPerson = $("#myform option:selected").text(); // Узнает строчкой, что за человек выбран в качестве отправителя подарка.
		var selectedPersonNumber = $("#myform option:selected").val();
		var selectedPersonCap = capitalize(selectedPerson)
		var getsGift = capitalize(presentsArray[selectedPersonNumber])
		alert(selectedPersonCap + ", твой подарок получит " + getsGift + " ;)")
		$("#myform option:selected").attr('disabled', 'disabled'); // Делает твое имя не активным, ты уже получил цель.
		$("#getAGift").attr('disabled', 'disabled'); // Делает не активной кнопку, ты уже получил цель.
	})
}) // КОНЕЦ ФУНКЦИИ namesFromInput
