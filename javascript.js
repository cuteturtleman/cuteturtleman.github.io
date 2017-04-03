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

			var mgCardName = new Array();	// 벖
			var mgCardId = new Array();
			var mgIdx = 0;

			var wrCardName = new Array();	// 치킨
			var wrCardId = new Array();
			var wrIdx = 0;

			var wlCardName = new Array();	// 흑마
			var wlCardId = new Array();
			var wlIdx = 0;

			var shCardName = new Array();	// 쓰랄
			var shCardId = new Array();
			var shIdx = 0;

			var prCardName = new Array();	// 사제
			var prCardId = new Array();
			var prIdx = 0;

			var pdCardName = new Array();	// **사
			var pdCardId = new Array();
			var pdIdx = 0;

			var htCardName = new Array();	// M.O
			var htCardId = new Array();
			var htIdx = 0;

			var drCardName = new Array();	// 노루
			var drCardId = new Array();
			var drIdx = 0;

			var rgCardName = new Array();	// ㅎㅂㅈ
			var rgCardId = new Array();
			var rgIdx = 0;

	var select1Val;
	var select2Val;

	var selectedSpellName;
	var selectedSpellId;

	var duplicatedName;

	var rndNumber;

	var rndIdx;

	var rndTarget;

	var selectedClass = -1;

	var type = new Array(-1, -1, -1);

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

					switch(data[index].playerClass) {
								case "MAGE":
								mgCardName[mgIdx] = data[index].name;
								mgCardId[mgIdx] = data[index].id;
								mgIdx++;
								break;

								case "WARLOCK":
								wlCardName[wlIdx] = data[index].name;
								wlCardId[wlIdx] = data[index].id;
								wlIdx++;
								break;

								case "SHAMAN":
								shCardName[shIdx] = data[index].name;
								shCardId[shIdx] = data[index].id;
								shIdx++;
								break;

								case "WARRIOR":
								wrCardName[wrIdx] = data[index].name;
								wrCardId[wrIdx] = data[index].id;
								wrIdx++;
								break;

								case "PRIEST":
								prCardName[prIdx] = data[index].name;
								prCardId[prIdx] = data[index].id;
								prIdx++;
								break;

								case "PALADIN":
								pdCardName[pdIdx] = data[index].name;
								pdCardId[pdIdx] = data[index].id;
								pdIdx++;
								break;

								case "HUNTER":
								htCardName[htIdx] = data[index].name;
								htCardId[htIdx] = data[index].id;
								htIdx++;
								break;

								case "ROGUE":
								rgCardName[rgIdx] = data[index].name;
								rgCardId[rgIdx] = data[index].id;
								rgIdx++;
								break;

								case "DRUID":
								drCardName[drIdx] = data[index].name;
								drCardId[drIdx] = data[index].id;
								drIdx++;
								break;
					}
				}
			});
		}
	});

	$.when(ajaxRequest).done(function() {
		var classCardName = new Array(mgCardName, shCardName, wlCardName, prCardName, pdCardName, htCardName, wrCardName, drCardName, rgCardName);
		var classCardId = new Array(mgCardId, shCardId, wlCardId, prCardId, pdCardId, htCardId, wrCardId, drCardId, rgCardId);
		var classCardIdx = new Array(mgIdx, shIdx, wlIdx, prIdx, pdIdx, htIdx, wrIdx, drIdx, rgIdx);

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

		$(".selectBtn").click(function() {
			if(isPlaying == false) {
				selectedClass = ($("p").index(this));

				$(".selectBtn").css("background-color", "#fff");
				$(".selectBtn").css("color", "#3668a7");

				$(".selectBtn:nth-child(" + ($("p").index(this) + 1) + ")").css("background-color", "#3668a7");
				$(".selectBtn:nth-child(" + ($("p").index(this) + 1) + ")").css("color", "#fff");
			}
		});

		$("#gameBtn1").click(function() {
			if(selectedClass >= 0) {
				isPlaying = true;

				$("#cardDiv div").css("display", "inline-block");
				$("label").css("display", "inline-block");

				var select1Value = (Number)($("#select1").val());
				var select2Value = (Number)($("#select2").val());

				var isDuplicated = false;
				var dIdx = 0;

				type = new Array(-1, -1, -1);

				duplicatedName = new Array();
				////alert(simpleIdx + "@" + targetIdx + "@" + chooseIdx);
				for(var i=1; i<=3; i++) {
					//////alert("#card" + i);
					$("#card" + i).css("opacity", "100");
					$("#label" + i).css("opacity", "100");
					$("#field1 img, #field2 img").css("filter", "grayscale(100%)");

					rndIdx = Math.floor(Math.random() * classCardIdx[selectedClass]) + 1;
					//////alert(rnd);

					for(var j in duplicatedName) {
						if(duplicatedName[j] == rndIdx) {
							isDuplicated = true;
						}
					}

					if(isDuplicated) {
						i--;
						isDuplicated = false;
						continue;
					}

					duplicatedName[dIdx] = rndIdx;
					dIdx++;

					for(var j in simpleSpellId) {
						if(simpleSpellId[j] == classCardId[selectedClass][rndIdx-1]) {
							type[i-1] = 0;
						}
					}

					if(type[i-1] == -1) {
						for(var j in targetSpellId) {
							if(targetSpellId[j] == classCardId[selectedClass][rndIdx-1]) {
								type[i-1] = 1;
							}
						}
					}

					if(type[i-1] == -1) {
						type[i-1] = 2;
					}

					$("#card" + i).css("background-image", "url(\"http://media.services.zam.com/v1/media/byName/hs/cards/enus/" + classCardId[selectedClass][rndIdx-1] + ".png\"");
					$("#label" + i).text(classCardName[selectedClass][rndIdx-1]);
				}
			}
		});

		$("#cardDiv div").click(function() {
			//alert(duplicatedName[(($("div").index(this)) - 5)]);
			if(isPlaying) {
				isPlaying = false;
				$("#cardDiv div:not(:nth-child(" + (($("div").index(this)) - 4) + ")").css("display", "none");
				$(".cardname:not(#label" + (($("div").index(this)) - 4) + ")").css("display", "none");

				if((type[(($("div").index(this)) - 5)]) > 0) {
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