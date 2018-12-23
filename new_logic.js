var namesArray = ["petux1", "petux2", "petux3"]
var presentsArray = ["petux1", "petux2", "petux3"]
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

function perebor() {
	for (var i = 0; i < namesArray.length; i++) {
		if (namesArray[i] == presentsArray[i]) {} else {
			myNumb++;
		}
	}
	if (myNumb == namesArray.length) {
		console.log("_____");
		console.log("Е БОООЙ, У ВСЕХ ЭБУЧИЙ РАНДОМ)))");
		console.log("Names : " + namesArray);
		console.log("Presents : " + presentsArray);
	} else {
		console.log("Не варик СУКА");
		console.log("Names : " + namesArray);
		console.log("Presents : " + presentsArray);
		myNumb = 0;
		presentsArray.shuffle();
		perebor();
	}
}
perebor();
