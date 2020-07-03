"use strict";

// Returns TRUE if the current speech phrase is a full emote (all between parentheses)
function SpeechFullEmote(D) {
	return ((D.indexOf("(") == 0) && (D.indexOf(")") == D.length - 1));
}

// Returns the level of the gag for a given group of asset
function SpeechGetGagLevel(C, AssetGroup) {
	function GetGagLevel(Effect) {
		if (Effect == "GagTotal4") return 20;
		else if (Effect == "GagTotal3") return 16;
		else if (Effect == "GagTotal2") return 12;
		else if (Effect == "GagTotal") return 8;
		else if (Effect == "GagVeryHeavy") return 7;
		else if (Effect == "GagHeavy") return 6;
		else if (Effect == "GagMedium") return 5;
		else if (Effect == "GagNormal") return 4;
		else if (Effect == "GagEasy") return 3;
		else if (Effect == "GagLight") return 2;
		else if (Effect == "GagVeryLight") return 1;
		else return 0;
	}

	var GagEffect = 0;
	for (var A = 0; A < C.Appearance.length; A++) {
		if (C.Appearance[A].Asset.Group.Name == AssetGroup) {
			if (C.Appearance[A].Property && C.Appearance[A].Property.Effect)
				for (var E = 0; E < C.Appearance[A].Property.Effect.length; E++)
					GagEffect += GetGagLevel(C.Appearance[A].Property.Effect[E]);
			if (C.Appearance[A].Asset.Effect)
				for (var E = 0; E < C.Appearance[A].Asset.Effect.length; E++)
					GagEffect += GetGagLevel(C.Appearance[A].Asset.Effect[E]);
			else if (C.Appearance[A].Asset.Group.Effect)
				for (var E = 0; E < C.Appearance[A].Asset.Group.Effect.length; E++)
					GagEffect += GetGagLevel(C.Appearance[A].Asset.Group.Effect[E]);
		}
	}
	return GagEffect;
}

// Garbles the speech if the character is gagged, anything between parentheses isn't touched
function SpeechGarble(C, CD) {

	// Variables to build the new string and check if we are in a parentheses
	var NS = "";
	var Par = false;
	if (CD == null) CD = "";
	var GagEffect = 0;
	GagEffect += SpeechGetGagLevel(C, "ItemMouth");
	GagEffect += SpeechGetGagLevel(C, "ItemMouth2");
	GagEffect += SpeechGetGagLevel(C, "ItemMouth3");
	GagEffect += SpeechGetGagLevel(C, "ItemHead");
	GagEffect += SpeechGetGagLevel(C, "ItemNeck");
	GagEffect += SpeechGetGagLevel(C, "ItemDevices");
	GagEffect += SpeechGetGagLevel(C, "ItemAddon");

	// GagTotal4 always returns mmmmm and muffles some frequent letters entirely, 75% least frequent letters
	if (GagEffect >= 20) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (Par) NS = NS + CD.charAt(L);
			else {
				if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;
				else if (H == "z" || H == "q" || H == "j" || H == "x" || H == "k" || H == "v" || H == "b" || H == "y" || H == "w" || H == "g" || H == "p" || H == "f" || H == "u" || H == "c" || H == "d" || H == "l" || H == "h" || H == "r") NS = NS + " ";
				else NS = NS + "m";
			}

			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}

	// GagTotal3 always returns mmmmm and muffles some relatively frequent letters entirely, 50% least frequent letters
	if (GagEffect >= 16) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (Par) NS = NS + CD.charAt(L);
			else {
				if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;
				else if (H == "z" || H == "q" || H == "j" || H == "x" || H == "k" || H == "v" || H == "b" || H == "y" || H == "w" || H == "g" || H == "p" || H == "f") NS = NS + " ";
				else NS = NS + "m";
			}

			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}

	// GagTotal2 always returns mmmmm and muffles some less frequent letters entirely; 25% least frequent letters
	if (GagEffect >= 12) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (Par) NS = NS + CD.charAt(L);
			else {
				if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;
				else if (H == "z" || H == "q" || H == "j" || H == "x" || H == "k" || H == "v") NS = NS + " ";
				else NS = NS + "m";
			}

			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}	

	// Total gags always returns mmmmm
	if ((GagEffect >= 8) || ((C.ID != 0) && (Player.GetDeafLevel() >= 4))) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (Par) NS = NS + CD.charAt(L);
			else {
				if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;
				else NS = NS + "m";
			}

			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}

	// VeryHeavy garble - Close to no letter stays the same
	if (GagEffect >= 7) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (!Par) {

				// Regular characters
				if (H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "y") NS = NS + "e";
				if (H == "j" || H == "k" || H == "l" || H == "r") NS = NS + "a";
				if (H == "s" || H == "z" || H == "h") NS = NS + "h";
				if (H == "d" || H == "f" || H == "g" || H == "n" || H == "m" || H == "w" || H == "t" || H == "c" || H == "q" || H == "x" || H == "p" || H == "v") NS = NS + "m";
				if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-" || H == "b") NS = NS + H;

				// Accents/Latin characters
				if (H == "á" || H == "â" || H == "à" || H == "é" || H == "ê" || H == "è" || H == "ë" || H == "í" || H == "î" || H == "ì" || H == "ï" || H == "ó" || H == "ô" || H == "ò" || H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "e";
				if (H == "ç") NS = NS + "h";
				if (H == "ñ") NS = NS + "m";

				// Cyrillic characters
				if (H == "а" || H == "е" || H == "и" || H == "о" || H == "у" || H == "ю" || H == "л"|| H == "я") NS = NS + "е";
				if (H == "с" || H == "й" || H == "х") NS = NS + "к";
				if (H == "ж" || H == "к" || H == "л" || H == "р" || H == "у") NS = NS + "а";
				if (H == "з" || H == "с" || H == "г" || H == "й") NS = NS + "г";
				if (H == "б" || H == "р" || H == "в" || H == "ы") NS = NS + "ф";
				if (H == "д" || H == "ф" || H == "г" || H == "н" || H == "м") NS = NS + "м";

			} else NS = NS + CD.charAt(L);
			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}
	
	// Heavy garble - Almost no letter stays the same
	if ((GagEffect >= 6) || ((C.ID != 0) && (Player.GetDeafLevel() >= 3))) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (!Par) {

				// Regular characters
				if (H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "y" || H == "t") NS = NS + "e";
				if (H == "c" || H == "q" || H == "x") NS = NS + "k";
				if (H == "j" || H == "k" || H == "l" || H == "r" || H == "w") NS = NS + "a";
				if (H == "s" || H == "z" || H == "h") NS = NS + "h";
				if (H == "b" || H == "p" || H == "v") NS = NS + "f";
				if (H == "d" || H == "f" || H == "g" || H == "n" || H == "m") NS = NS + "m";
				if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-") NS = NS + H;

				// Accents/Latin characters
				if (H == "á" || H == "â" || H == "à" || H == "é" || H == "ê" || H == "è" || H == "ë" || H == "í" || H == "î" || H == "ì" || H == "ï" || H == "ó" || H == "ô" || H == "ò" || H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "e";
				if (H == "ç") NS = NS + "h";
				if (H == "ñ") NS = NS + "m";

				// Cyrillic characters
				if (H == "а" || H == "е" || H == "и" || H == "о" || H == "у" || H == "ю" || H == "л"|| H == "я") NS = NS + "е";
				if (H == "с" || H == "й" || H == "х") NS = NS + "к";
				if (H == "ж" || H == "к" || H == "л" || H == "р" || H == "у") NS = NS + "а";
				if (H == "з" || H == "с" || H == "г" || H == "й") NS = NS + "г";
				if (H == "б" || H == "р" || H == "в" || H == "ы") NS = NS + "ф";
				if (H == "д" || H == "ф" || H == "г" || H == "н" || H == "м") NS = NS + "м";

			} else NS = NS + CD.charAt(L);
			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}

	// Medium garble - Some letters stays the same
	if (GagEffect >= 5) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (!Par) {

				// Regular characters
				if (H == "e" || H == "i" || H == "o" || H == "u" || H == "y" || H == "t") NS = NS + "e";
				if (H == "c" || H == "q" || H == "x" || H == "k" ) NS = NS + "k";
				if (H == "j" || H == "l" || H == "r" || H == "w" || H == "a") NS = NS + "a";
				if (H == "s" || H == "z" || H == "h") NS = NS + "h";
				if (H == "b" || H == "p" || H == "v") NS = NS + "f";
				if (H == "d" || H == "f" || H == "g" || H == "m") NS = NS + "m";
				if (H == " " || H == "." || H == "?" || H == "!" || H == "~" || H == "-" || H == "n") NS = NS + H;

				// Accents/Latin characters
				if (H == "á" || H == "â" || H == "à" || H == "é" || H == "ê" || H == "è" || H == "ë" || H == "í" || H == "î" || H == "ì" || H == "ï" || H == "ó" || H == "ô" || H == "ò" || H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "e";
				if (H == "ç") NS = NS + "h";
				if (H == "ñ") NS = NS + "m";

				// Cyrillic characters
				if (H == "а" || H == "е" || H == "и" || H == "о" || H == "у" || H == "ю" || H == "л"|| H == "я") NS = NS + "е";
				if (H == "с" || H == "й" || H == "х") NS = NS + "к";
				if (H == "ж" || H == "к" || H == "л" || H == "р" || H == "у") NS = NS + "а";
				if (H == "з" || H == "с" || H == "г" || H == "й") NS = NS + "г";
				if (H == "б" || H == "р" || H == "в" || H == "ы") NS = NS + "ф";
				if (H == "д" || H == "ф" || H == "г" || H == "н" || H == "м") NS = NS + "м";

			} else NS = NS + CD.charAt(L);
			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}
	
	// Normal garble, keep vowels and a few letters the same
	if ((GagEffect >= 4) || ((C.ID != 0) && (Player.GetDeafLevel() >= 2))) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (!Par) {

				// Regular characters
				if (H == "v" || H == "b" || H == "c" || H == "t") NS = NS + "e";
				if (H == "q" || H == "k" || H == "x") NS = NS + "k";
				if (H == "w" || H == "y" || H == "j" || H == "l" || H == "r") NS = NS + "a";
				if (H == "s" || H == "z") NS = NS + "h";
				if (H == "d" || H == "f") NS = NS + "m";
				if (H == "p") NS = NS + "f";
				if (H == "g") NS = NS + "n";
				if (H == " " || H == "!" || H == "?" || H == "." || H == "~" || H == "-" || H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "m" || H == "n" || H == "h") NS = NS + H;

				// Accents/Latin characters
				if (H == "á" || H == "â" || H == "à") NS = NS + "a";
				if (H == "é" || H == "ê" || H == "è" || H == "ë") NS = NS + "e";
				if (H == "í" || H == "î" || H == "ì" || H == "ï") NS = NS + "i";
				if (H == "ó" || H == "ô" || H == "ò") NS = NS + "o";
				if (H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "u";
				if (H == "ç") NS = NS + "s";
				if (H == "ñ") NS = NS + "n";

				// Cyrillic characters
				if (H == "в" || H == "ф" || H == "б" || H == "п") NS = NS + "фы";
				if (H == "г" || H == "к" || H == "х") NS = NS + "к";
				if (H == "в" || H == "у" || H == "ж" || H == "л" || H == "р") NS = NS + "а";
				if (H == "с" || H == "я") NS = NS + "х";
				if (H == "д" || H == "ф") NS = NS + "м";
				if (H == "р") NS = NS + "ф";
				if (H == "г") NS = NS + "н";

			} else NS = NS + CD.charAt(L);
			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}

	// Easy garble, keep vowels and a some letters the same
	if (GagEffect >= 3) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (!Par) {

				// Regular characters
				if (H == "v" || H == "b" || H == "c" || H == "t") NS = NS + "e";
				if (H == "q" || H == "k" || H == "x") NS = NS + "k";
				if (H == "w" || H == "y" || H == "j" || H == "l" || H == "r") NS = NS + "a";
				if (H == "s" || H == "z") NS = NS + "s";
				if (H == "d") NS = NS + "m";
				if (H == "p") NS = NS + "f";
				if (H == "g") NS = NS + "h";
				if (H == " " || H == "!" || H == "?" || H == "." || H == "~" || H == "-" || H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "m" || H == "n" || H == "h" || H == "f") NS = NS + H;

				// Accents/Latin characters
				if (H == "á" || H == "â" || H == "à") NS = NS + "a";
				if (H == "é" || H == "ê" || H == "è" || H == "ë") NS = NS + "e";
				if (H == "í" || H == "î" || H == "ì" || H == "ï") NS = NS + "i";
				if (H == "ó" || H == "ô" || H == "ò") NS = NS + "o";
				if (H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "u";
				if (H == "ç") NS = NS + "s";
				if (H == "ñ") NS = NS + "n";

				// Cyrillic characters
				if (H == "в" || H == "ф" || H == "б" || H == "п") NS = NS + "фы";
				if (H == "г" || H == "к" || H == "х") NS = NS + "к";
				if (H == "в" || H == "у" || H == "ж" || H == "л" || H == "р") NS = NS + "а";
				if (H == "с" || H == "я") NS = NS + "х";
				if (H == "д" || H == "ф") NS = NS + "м";
				if (H == "р") NS = NS + "ф";
				if (H == "г") NS = NS + "н";

			} else NS = NS + CD.charAt(L);
			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}
	
	// Light garble, half of the letters stay the same
	if ((GagEffect >= 2) || ((C.ID != 0) && (Player.GetDeafLevel() >= 1))) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (!Par) {

				// Regular characters
				if (H == "c" || H == "t") NS = NS + "e";
				if (H == "q" || H == "k" || H == "x") NS = NS + "k";
				if (H == "j" || H == "l" || H == "r") NS = NS + "a";
				if (H == "s") NS = NS + "z";
				if (H == "z") NS = NS + "s";
				if (H == "f") NS = NS + "h";
				if (H == "d" || H == "m" || H == "g") NS = NS + "m";
				if (H == "b" || H == "h" || H == "n" || H == "v" || H == "w" || H == "p" || H == " " || H == "'" || H == "?" || H == "!" || H == "." || H == "," || H == "~" || H == "-" || H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "y") NS = NS + H;

				// Accents/Latin characters
				if (H == "á" || H == "â" || H == "à") NS = NS + "a";
				if (H == "é" || H == "ê" || H == "è" || H == "ë") NS = NS + "e";
				if (H == "í" || H == "î" || H == "ì" || H == "ï") NS = NS + "i";
				if (H == "ó" || H == "ô" || H == "ò") NS = NS + "o";
				if (H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "u";
				if (H == "ç") NS = NS + "s";
				if (H == "ñ") NS = NS + "n";

				// Cyrillic characters
				if (H == "ч" || H == "ц") NS = NS + "е";
				if (H == "й" || H == "ф" || H == "в") NS = NS + "к";
				if (H == "д" || H == "л" || H == "щ"|| H == "я") NS = NS + "а";
				if (H == "з") NS = NS + "с";
				if (H == "с") NS = NS + "з";
				if (H == "д" || H == "ф" || H == "м" || H == "г") NS = NS + "м";
				if (H == "а" || H == "п" || H == "р" || H == "о" || H == "к" || H == "е"  || H == "н" || H == "м" || H == "и" || H == "т" ) NS = NS + H;

			} else NS = NS + CD.charAt(L);
			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}
	
	// Very Light garble, most of the letters stay the same
	if (GagEffect >= 1) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (!Par) {

				// Regular characters
				if (H == "t") NS = NS + "e";
				if (H == "c" || H == "q" || H == "k" || H == "x") NS = NS + "k";
				if (H == "j" || H == "l" || H == "r") NS = NS + "a";
				if (H == "d" || H == "m" || H == "g") NS = NS + "m";
				if (H == "b" || H == "h" || H == "n" || H == "v" || H == "w" || H == "p" || H == " " || H == "'" || H == "?" || H == "!" || H == "." || H == "," || H == "~" || H == "-" || H == "a" || H == "e" || H == "i" || H == "o" || H == "u" || H == "y" || H == "f" || H == "s" || H == "z") NS = NS + H;

				// Accents/Latin characters
				if (H == "á" || H == "â" || H == "à") NS = NS + "a";
				if (H == "é" || H == "ê" || H == "è" || H == "ë") NS = NS + "e";
				if (H == "í" || H == "î" || H == "ì" || H == "ï") NS = NS + "i";
				if (H == "ó" || H == "ô" || H == "ò") NS = NS + "o";
				if (H == "ú" || H == "û" || H == "ù" || H == "ü") NS = NS + "u";
				if (H == "ç") NS = NS + "s";
				if (H == "ñ") NS = NS + "n";

				// Cyrillic characters
				if (H == "ч" || H == "ц") NS = NS + "е";
				if (H == "й" || H == "ф" || H == "в") NS = NS + "к";
				if (H == "д" || H == "л" || H == "щ"|| H == "я") NS = NS + "а";
				if (H == "з") NS = NS + "с";
				if (H == "с") NS = NS + "з";
				if (H == "д" || H == "ф" || H == "м" || H == "г") NS = NS + "м";
				if (H == "а" || H == "п" || H == "р" || H == "о" || H == "к" || H == "е"  || H == "н" || H == "м" || H == "и" || H == "т" ) NS = NS + H;

			} else NS = NS + CD.charAt(L);
			if (H == ")") Par = false;
		}
		NS = SpeechStutter(C, NS);
		NS = SpeechBabyTalk(C, NS);
		return NS;
	}

	// No gag effect, we return the regular text
	CD = SpeechStutter(C, CD);
	CD = SpeechBabyTalk(C, CD);
	return CD;

}

// Makes the character stutter if she has a vibrating egg set to high intensity
function SpeechStutter(C, CD) {

	// Validate nulls
	if (CD == null) CD = "";

	// Validates that the preferences allow stuttering
	if ((C.ArousalSettings == null) || (C.ArousalSettings.AffectStutter == null) || (C.ArousalSettings.AffectStutter != "None")) {

		// Gets the factor from current arousal
		var Factor = 0;
		if ((C.ArousalSettings == null) || (C.ArousalSettings.AffectStutter == null) || (C.ArousalSettings.AffectStutter == "Arousal") || (C.ArousalSettings.AffectStutter == "All"))
			if ((C.ArousalSettings != null) && (C.ArousalSettings.Progress != null) && (typeof C.ArousalSettings.Progress === "number") && !isNaN(C.ArousalSettings.Progress))
				Factor = Math.floor(C.ArousalSettings.Progress / 20);

		// Checks all items that "eggs" with an intensity, and replaces the factor if it's higher
		if (C.IsEgged() && ((C.ArousalSettings == null) || (C.ArousalSettings.AffectStutter == null) || (C.ArousalSettings.AffectStutter == "Vibration") || (C.ArousalSettings.AffectStutter == "All")))
			for (var A = 0; A < C.Appearance.length; A++) {
				var Item = C.Appearance[A];
				if (InventoryItemHasEffect(Item, "Egged", true) && Item.Property && Item.Property.Intensity && (typeof Item.Property.Intensity === "number") && !isNaN(Item.Property.Intensity) && (Item.Property.Intensity > Factor))
					Factor = Item.Property.Intensity;
			}

		// If the intensity factor is lower than 1, no stuttering occurs and we return the regular text
		if (Factor <= 0) return CD;

		// Loops in all letters to create a stuttering effect
		var Par = false;
		var CS = 1;
		var Seed = CD.length;
		for (var L = 0; L < CD.length; L++) {

			// Do not stutter the letters between parentheses
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;

			// If we are not between brackets and at the start of a word, there's a chance to stutter that word
			if (!Par && CS >= 0 && (H.match(/[[a-zа-яё]/i))) {

				// Generate a pseudo-random number using a seed, so that the same text always stutters the same way
				var R = Math.sin(Seed++) * 10000;
				R = R - Math.floor(R);
				R = Math.floor(R * 10) + Factor;
				if (CS == 1 || R >= 10) {
					CD = CD.substring(0, L) + CD.charAt(L) + "-" + CD.substring(L, CD.length);
					L += 2;
				}
				CS = -1;
			}
			if (H == ")") Par = false;
			if (H == " ") CS = 0;
		}
		return CD;

	}

	// No stutter effect, we return the regular text
	return CD;

}

// Makes Character talk like a Baby if the have drunk regression milk
function SpeechBabyTalk(C, CD) {
	if (CD == null) CD = "";

	var Par = false;
	var NS = "";

	if (C == Player && NurseryRegressedTalk) {
		for (var L = 0; L < CD.length; L++) {
			var H = CD.charAt(L).toLowerCase();
			if (H == "(") Par = true;
			if (!Par) {
				if (H == "k" || H == "l") NS = NS + "w";
				if (H == "s") NS = NS + "sh";
				if (H == "t") NS = NS + "st";
				if (H == "a" || H == "b" || H == "c" || H == "d" || H == "e" || H == "f" || H == "g" || H == "h" || H == "i" || H == "j" || H == "m" || H == "n" || H == "o" || H == "p" || H == "q" || H == "r" || H == "u" || H == "v" || H == "w" || H == "x" || H == "y" || H == "z" || H == " " || H == "'" || H == "?" || H == "!" || H == "." || H == ",") NS = NS + H;
			} else NS = NS + CD.charAt(L);
			if (H == ")") Par = false;
		}
		return NS;
	}

	// Not drunk the milk, we return the regular text
	return CD;
}