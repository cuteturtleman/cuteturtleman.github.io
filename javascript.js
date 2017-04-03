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

	var selectedSpellName;
	var selectedSpellId;

	var duplicatedName;

	var rndNumber;

	var rndIdx;

	var rndTarget;

	var isPlaying = false;

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
					} else if((data[index].playRequirements == undefined) || (data[index].name == "자연의 군대") ||
						(data[index].name == "개들을 풀어라") || (data[index].name == "심리 조작") || (data[index].name == "난투") ||
						(data[index].name == "심리 조작") || (data[index].name == "카라 카잠!") || (data[index].name == "치명적인 사격") ||
						 (data[index].name == "왕을 지켜라!") || (data[index].name == "비취꽃") || (data[index].name == "갈래 번개") || (data[index].name == "야수 정령") || (data[index].name == "퇴화") || (data[index].name == "엉겅퀴 차") ||
						 (data[index].name == "폭풍의 칼날") || (data[index].name == "전투 격노") || (data[index].name == "멀록단 출동")) {
						simpleSpellName[simpleIdx] = data[index].name;
						simpleSpellId[simpleIdx] = data[index].id;
						simpleIdx++;
					} else if(data[index].playRequirements != undefined)  {
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
			select1Val = Number($("#select1").val());
			$("#field1 img").css("display", "none");
			while(select1Val) {
				temp++;
				$("#field1 img:nth-child(" + temp + ")").css("display", "inline-block");
				select1Val--;
			}
		});

		$("#select2").change(function() {
			var temp = 0;
			select2Val = Number($("#select2").val());
			$("#field2 img").css("display", "none");
			while(select2Val) {
				temp++;
				$("#field2 img:nth-child(" + temp + ")").css("display", "inline-block");
				select2Val--;
			}
		});

		$("#gameBtn1").click(function() {
			isPlaying = true;

			$("#cardDiv div").css("display", "inline-block");
			$("label").css("display", "inline-block");

			var select1Value = (Number)($("#select1").val());
			var select2Value = (Number)($("#select2").val());

			var isDuplicated = false;
			var dIdx = 0;
			var sum = simpleIdx + targetIdx + chooseIdx;
			duplicatedName = new Array();
			////alert(simpleIdx + "@" + targetIdx + "@" + chooseIdx);
			for(var i=1; i<=3; i++) {
				//////alert("#card" + i);
				$("#card" + i).css("opacity", "100");
				$("#label" + i).css("opacity", "100");
				$("#field1 img, #field2 img").css("filter", "grayscale(100%)");

				rnd = Math.floor(Math.random() * sum) + 1;
				//////alert(rnd);

				for(var j in duplicatedName) {
					if(duplicatedName[j] == rnd) {
						isDuplicated = true;
					}
				}

				if(isDuplicated) {
					i--;
					isDuplicated = false;
					continue;
				}

				duplicatedName[dIdx] = rnd;
				dIdx++;

				console.log(rnd);

				if(rnd <= simpleIdx) {
					rndIdx = rnd;
					$("#card" + i).css("background-image", "url(\"http://media.services.zam.com/v1/media/byName/hs/cards/enus/" + simpleSpellId[rndIdx-1] + ".png\"");
					$("#label" + i).text(simpleSpellName[rndIdx-1]);
				} else if(rnd <= simpleIdx + targetIdx) {
					rndIdx = rnd - simpleIdx;
					$("#card" + i).css("background-image", "url(\"http://media.services.zam.com/v1/media/byName/hs/cards/enus/" + targetSpellId[rndIdx-1] + ".png\"");
					$("#label" + i).text(targetSpellName[rndIdx-1]);

					rndTarget = Math.floor(Math.random() * (select1Value + select2Value)) + 1;

					console.log(rndTarget);
				} else {
					rndIdx = rnd - simpleIdx - targetIdx;
					$("#card" + i).css("background-image", "url(\"http://media.services.zam.com/v1/media/byName/hs/cards/enus/" + chooseSpellId[rndIdx-1] + ".png\"");

					$("#label" + i).text(chooseSpellName[rndIdx-1]);

					rndTarget = Math.floor(Math.random() * (select1Value + select2Value)) + 1;

					console.log(rndTarget);
				}
				////alert(duplicatedName);
			}
		});

		$("#cardDiv div").click(function() {
			//alert(duplicatedName[(($("div").index(this)) - 5)]);
			if(isPlaying) {
				isPlaying = false;
				$("#cardDiv div:not(:nth-child(" + (($("div").index(this)) - 4) + ")").css("display", "none");
				$(".cardname:not(#label" + (($("div").index(this)) - 4) + ")").css("display", "none");

				if((duplicatedName[(($("div").index(this)) - 5)]) > simpleIdx) {
					console.log((duplicatedName[(($("div").index(this)) - 5)]) + "@");
					var select1Value = (Number)($("#select1").val());
					var select2Value = (Number)($("#select2").val());

					rndTarget = Math.floor(Math.random() * (select1Value + select2Value)) + 1;

					if(rndTarget > select1Value) {
						$("#field2 img:nth-child(" + (rndTarget - select1Value) + ")").css("filter", "grayscale(0%)");
					} else {
						$("#field1 img:nth-child(" + rndTarget + ")").css("filter", "grayscale(0%)");
					}
				}

				if((duplicatedName[(($("div").index(this)) - 5)]) >= (targetIdx + simpleIdx)) {
					var rndChoose = Math.floor(Math.random() * 2) + 1;
					$("#label" + [(($("div").index(this)) - 4)]).append(" 선택 : " + rndChoose);
				}
			}
		});
	});
});