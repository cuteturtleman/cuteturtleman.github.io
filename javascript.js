$(function() {
	var simpleSpellName = new Array();
	var simpleSpellId = new Array();
	var simpleIdx = 0;

	var targetSpellName = new Array();
	var targetSpellId = new Array();
	var targetIdx = 0;

	var chooseSpellName = new Array();
	var chooseSpellId = new Array();
	var chooseIdx = 0;

	var select1Val;
	var select2Val;

	var ajaxRequest = $.ajax({
		url: 'https://api.hearthstonejson.com/v1/17994/koKR/cards.collectible.json',
		dataType: 'json',
		success: function(data) {
			var len = data.length;

			$.each(data, function(index, item) {
				if((data[index].type == "SPELL") &&
					(data[index].set == "EXPERT1" || data[index].set == "OG" || data[index].set == "GANGS" || data[index].set == "KARA")) {
					if(data[index].mechanics == "CHOOSE_ONE") {
						chooseSpellName[chooseIdx] = data[index].name;
						chooseSpellId[chooseIdx] = data[index].id;
						chooseIdx++;
					} else if(data[index].playRequirements == undefined) {
						simpleSpellName[simpleIdx] = data[index].name;
						simpleSpellId[simpleIdx] = data[index].id;
						simpleIdx++;
					} else if(data[index].playRequirements != undefined) {
						targetSpellName[targetIdx] = data[index].name;
						targetSpellId[targetIdx] = data[index].id;
						targetIdx++;
					}
				}
			});
		}
	});

	$.when(ajaxRequest).done(function() {
		$("#select1").change(function() {
			var temp = 0;
			select1Val = $("#select1").val();
			$("#field1 img").css("display", "none");
			while(select1Val) {
				temp++;
				$("#field1 img:nth-child(" + temp + ")").css("display", "inline-block");
				select1Val--;
			}
		});

		$("#select2").change(function() {
			var temp = 0;
			select2Val = $("#select2").val();
			$("#field2 img").css("display", "none");
			while(select2Val) {
				temp++;
				$("#field2 img:nth-child(" + temp + ")").css("display", "inline-block");
				select2Val--;
			}
		});
	});
});