// *** Item Value Guidelines ***
// First, check if there's a similar item and use that price.  If there isn't, use the real price in US dollars
// If it's an item that can only used once in real life (duct tape), raise the price a lot (you buy a great quantity of it)
// If it's an item with extended capabilities, raise the price
// If it's an item with multiple image layers, raise the price a little
// If it's a restraint that's impossible to remove, raise the price a little
// If the item doesn't have any image (butt plug), lower the price
// Bondage items should not go over 250$ - The love belt is that item right now
// Regular clothes should not go over 100$ - Dress2 is that item right now
// Empty value is a free item that everyone has from the start
// -1 value items cannot be bought, they must be acquired in-game in some other ways

// Sort order of asset properties:
// Name, Priority, Value, Difficulty, SelfBondage, Time, RemoveTime, Enable, Visible, Random, Wear, IsRestraint, AllowLock, OwnerOnly, LoverOnly, Left, Top, DefaultColor, BuyGroup, Prerequisite, Hide, HideItem, everything else

// Sort order of asset group properties:
// Group, ParentGroup, ParentSize, ParentColor, Category, Priority, Default, Clothing, Underwear, Random, IsRestraint, Blink, Left, Top, Color, FullAlpha, AllowNone, AllowColorize, AllowCustomize, AllowPose, SetPose, Effect, Zone, Activity

// Spanking Toys Asset
var AssetSpankingToys = {
	Name: "SpankingToys", Wear: false, Activity: "SpankItem", Random: false, BuyGroup: "SpankingToys", IgnoreParentGroup: true,
	DynamicDescription: C => InventorySpankingToysGetDescription(C),
	DynamicPreviewIcon: C => InventorySpankingToysGetType(C),
	DynamicAllowInventoryAdd: () => InventoryIsWorn(Player, "SpankingToys", "ItemHands"),
	DynamicExpressionTrigger: C => SpankingInventory.find(x => x.Name == InventorySpankingToysGetType(C)).ExpressionTrigger
};

// 3D Custom Girl based assets
var AssetFemale3DCG = [

	// Appearance specific
	{
		Group: "Cloth",
		Priority: 30,
		ParentGroup: "BodyUpper",
		Clothing: true,
		AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Bolero", "Yoked", "Hogtied", "AllFours"],
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Asset: [
			{ Name: "CollegeOutfit1", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Hide: ["ItemNeck"], Value: -1 },
			{ Name: "MaidOutfit1", BuyGroup: "Maid", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Value: -1 },
			{ Name: "MaidOutfit2", BuyGroup: "Maid", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Value: -1, Expose: ["ItemNipples", "ItemNipplesPiercings", "ItemBreast"] },
			{ Name: "StudentOutfit1", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Hide: ["ItemNeck", "ItemHidden"] },
			{ Name: "StudentOutfit2", HideItem: ["ItemArmsLeatherCuffs", "ItemArmsOrnateCuffs", "ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemHiddenLeatherArmbinderStrap", "ItemHiddenLeatherArmbinderWrapStrap", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{
			    Name: "StudentOutfit3", Require: ["ClothLower", "ClothAccessory"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemHiddenLeatherArmbinderStrap", "ItemHiddenLeatherArmbinderWrapStrap"],
				Layer: [
					{ Name: "White", AllowColorize: false },
					{ Name: "Color", AllowColorize: true }
				]
			},
			{ Name: "BabydollDress1", HideItem: ["ClothLowerLatexSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "TeacherOutfit1", Hide: ["ItemNeck", "ItemHidden"], HideItem: ["ItemArmsLeatherCuffs", "ItemArmsOrnateCuffs", "ClothLowerLatexSkirt1", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], ParentGroup: ["BodyLower"], AllowPose: ["Horse", "KneelingSpread", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Bolero"] },
			{ Name: "ChineseDress1", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "ChineseDress2", Value: 60, HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "TShirt1", Require: ["ClothLower"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"] },
			{ Name: "TennisShirt1", Require: ["ClothLower"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"], Hide: ["ItemHidden"] },
			{ Name: "Sweater1", Require: ["ClothLower"], HideItem: ["ItemArmsLeatherCuffs", "ItemArmsOrnateCuffs", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"] },
			{ Name: "MistressTop", Require: ["ClothLower"], Hide: ["Bra"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"], Value: -1 },
			{ Name: "AdultBabyDress1", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Hide: ["ItemHidden"], Value: 60 },
			{ Name: "AdultBabyDress2", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Value: 80 },
			{ Name: "AdultBabyDress3", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Value: 40 },
			{ Name: "AdultBabyDress4", Left: 100, Top: 190, HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Value: 80 },
			{ Name: "NurseUniform", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Value: -1 },
			{ Name: "Robe1", Value: 30, HideItem: ["ClothLowerLatexSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemArmsLeatherCuffs", "ItemArmsOrnateCuffs", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Hide: ["ItemHidden"] },
			{ Name: "SuspenderTop1", Priority: 25, Value: 50, Expose: ["ItemNipples","ItemNipplesPiercings", "ItemBreast"], Hide: ["Panties", "ItemVulva", "ItemVulvaPiercings"] },
			{ Name: "LeatherCorsetTop1", Priority: 25, Value: 60, HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"] },
			{
				Name: "FlowerDress", Value: 50, HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"],
				AllowPose: ["Suspension"],
				Layer: [
					{ Name: "Dress", AllowColorize: true },
					{ Name: "Flower", AllowColorize: false }
				]
			},
			{ Name: "Dress2", Value: 100, HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "LaceBabydoll", Value: 40, HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"] },
			{ Name: "SleevelessTop", Value: 20, HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"] },
			{
				Name: "DressFur", Value: 70, HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"],
				Layer: [
					{ Name: "Fabric", AllowColorize: true },
					{ Name: "Fur", AllowColorize: false }
				]
			},
			{ Name: "BodyTowel1", Value: 30, HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"] },
			{ Name: "Yukata1", Value: 50, HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemArmsLeatherCuffs", "ItemArmsOrnateCuffs", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "SteampunkCorsetTop1", Priority: 25, Value: 70, HideItem: ["ClothLowerTennisSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"], Hide: ["ItemHidden"] },
			{ Name: "BondageDress1", Value: 90, Hide: ["ClothLower"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "BondageDress2", Value: 90, Hide: ["ClothLower"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "ShoulderlessTop", Value: 40, HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"] },
			{ Name: "Dress3", Value: 80, Hide: ["ClothLower"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "ComfyTop", Value: 60, Hide: ["ItemNipples", "ItemNipplesPiercings"], Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"] },
			{ Name: "WeddingDress1", Priority: 22, Value: 150, Hide: ["ClothLower", "BodyLower", "Panties", "Shoes", "ItemBoots"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds", "ItemFeetLeatherAnkleCuffs", "ItemLegsLeatherLegCuffs", "ItemLegsWoodenHorse", "ItemLegsSpreaderMetal", "ItemLegsOrnateLegCuffs", "ItemFeetOrnateAnkleCuffs", "ItemDevicesSaddleStand", "ItemVulvaWandBelt"], AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Bolero", "Yoked", "Hogtied", "LegsClosed", "Kneel", "KneelingSpread"] },
			{ Name: "WeddingDress2", Priority: 22, Value: 150, Hide: ["ClothLower", "BodyLower", "Panties", "Shoes", "ItemBoots"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds", "ItemFeetLeatherAnkleCuffs", "ItemLegsLeatherLegCuffs", "ItemLegsWoodenHorse", "ItemLegsSpreaderMetal", "ItemLegsOrnateLegCuffs", "ItemFeetOrnateAnkleCuffs", "ItemDevicesSaddleStand", "ItemVulvaWandBelt"], AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Bolero", "Yoked", "Hogtied", "LegsClosed", "Kneel", "KneelingSpread"] },
			{ Name: "BridesmaidDress1", Value: 100, Hide: ["ClothLower"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "Gown1", Value: 70, Random: false, HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "Gown2Top", Value: 90, Random: false, BuyGroup: "Gown2", Left: 125, Top: 220, Require: ["ClothLower"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "Gown3", Value: 70, Random: false, Left: 99, Top: 194, HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "MaidApron1", Priority: 32, Value: -1, BuyGroup: "Maid", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "MaidApron2", Priority: 32, Value: -1, BuyGroup: "Maid", HideItem: ["ClothLowerLatexSkirt1", "ClothLowerLatexSkirt2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], Expose: ["ItemNipples", "ItemNipplesPiercings", "ItemBreast"] },
			{ Name: "AdmiralTop", Value: 30, Hide: ["ItemNeck", "ItemHidden"], HideItem: ["ItemArmsLeatherCuffs", "ItemArmsOrnateCuffs", "ClothLowerLatexSkirt1", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerClothSkirt1", "ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing", "ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"], ParentGroup: ["BodyLower"], AllowPose: ["Horse", "KneelingSpread", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Bolero"] },
			{ Name: "VirginKiller1", Value: 40, HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"] },
			{ Name: "ReverseBunnySuit", Value: 100, BuyGroup: "ReverseBunnySuit"}
		]
	},

	{
		Group: "ClothAccessory",
		Priority: 32,
		ParentGroup: "BodyUpper",
		Default: false,
		Random: false,
		Clothing: true,
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Asset: [
			{ Name: "StudentOutfit3Scarf", Left: 200, Top: 250, IgnoreParentGroup: true },
			{ Name: "StudentOutfit3Bow1", Left: 200, Top: 250, IgnoreParentGroup: true },
			{ Name: "StudentOutfit3Bow2", Left: 200, Top: 250, IgnoreParentGroup: true },
			{ Name: "StudentOutfit3Bow3", Left: 200, Top: 250, IgnoreParentGroup: true },
			{ 
				Name: "Bouquet", Value: 40, Left: 175, Top: 350, IgnoreParentGroup: true, Priority: 41, AllowPose: ["BackBoxTie", "BackCuffs", "BackElbowTouch", "Bolero", "Yoked", "Hogtied"], BuyGroup: "Bouquet",
				Layer: [
					{ Name: "Base", AllowColorize: false },
					{ Name: "Flowers", AllowColorize: true }
				]
			},
			{ Name: "FrillyApron", Value: -1, BuyGroup: "Maid", Left: 135, Top: 179, AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Bolero", "Yoked", "Hogtied"] },
			{ Name: "BunnyCollarCuffs", Value: 10, Expose: ["ItemNipples", "ItemNipplesPiercings", "ItemBreast", "ItemTorso"] }
		]
	},
	{
		Group: "Necklace",
		Priority: 31,
		ParentGroup: "BodyUpper",
		Default: false,
		Random: false,
		Clothing: true,
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Asset: [
			 { Name: "Necklace1", Value: 40, Left: 148, Top: 70, IgnoreParentGroup: true},
			 { Name: "Necklace2", Left: 147, Top: 90, IgnoreParentGroup: true},
			 { Name: "Necklace3", Left: 147, Top: 110, IgnoreParentGroup: true},
			 { Name: "Necklace4", Value: 30, Left: 147, Top: 110, IgnoreParentGroup: true},
			 { Name: "IDCard", Value: 10, Left: 145, Top: 180, IgnoreParentGroup: true,
			   Layer: [
				{ Name: "String", AllowColorize: true},
				{ Name: "Card", AllowColorize: false}
			   ]
		
			},


		]
	},



	{
	    Group: "Suit",
		Priority: 14,
		ParentGroup: "BodyUpper",
		Clothing: true,
		AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Bolero", "Yoked", "Hogtied"],
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Asset: [
		    {
			    Name: "Catsuit", Value: 100, BuyGroup: "Catsuit", Hide: ["ItemNipplesPiercings"], HideItem: ["ItemNipplesChopStickNippleClamps"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"],
				Layer: [
					{ Name: "Base", AllowColorize: true },
					{ Name: "Zip", AllowColorize: false }
				]
			},
			{ Name: "SeamlessCatsuit", Value: -1, BuyGroup: "Catsuit", Hide: ["ItemNipplesPiercings"], HideItem: ["ItemNipplesChopStickNippleClamps"] },
			{ Name: "SeethroughSuit", Value: 100, BuyGroup: "SeethroughSuit", HideItem: ["ItemNipplesChopStickNippleClamps"] },
			{ Name: "SeethroughSuitZip", Value: -1, BuyGroup: "SeethroughSuit", HideItem: ["ItemNipplesChopStickNippleClamps"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"],
				Layer: [
					{ Name: "Base", AllowColorize: true },
					{ Name: "Zip", AllowColorize: false }
				]
			},
			{ Name: "ReverseBunnySuit", Value: 100, BuyGroup: "ReverseBunnySuit"}
		]
	},

	{
		Group: "ClothLower",
		Priority: 26,
		Default: false,
		ParentGroup: "BodyLower",
		ParentColor: "Cloth",
		Clothing: true,
		AllowPose: ["LegsClosed", "Kneel", "StraitDressOpen", "Horse", "KneelingSpread"],
		Color: ["Default", "#bbbbbb", "#808080", "#202020", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 105,
		Top: 380,
		Asset: [
			{ Name: "Skirt1", Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ 
				Name: "Skirt2", ParentItem: "StudentOutfit3", Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"],
				Layer: [
					{ Name: "Color", AllowColorize: true },
					{ Name: "Stripe", AllowColorize: false }
				]
			},
			{ 
				Name: "Skirt3", ParentItem: "StudentOutfit3", Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"],
				Layer: [
					{ Name: "Color", AllowColorize: true },
					{ Name: "Stripe", AllowColorize: false }
				]
			},
			{ Name: "TennisSkirt1", ParentItem: "TennisShirt1", Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "Jeans1", Priority: 22, Hide: ["ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "SocksSocksFur", "SocksSocks6", "VibratingLatexPanties", "VibratingDildo", "InflatableVibeDildo", "ClitSuctionCup", "TapeStrips", "BenWaBalls", "HeavyWeightClamp", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Shorts1", Hide: ["ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "VibratingLatexPanties", "VibratingDildo", "InflatableVibeDildo", "ClitSuctionCup", "TapeStrips", "BenWaBalls", "HeavyWeightClamp", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Pajama1", Random: false, Priority: 25, HideItem: ["ItemButtAnalBeads2"] },
			{ Name: "MistressBottom", Hide: ["Panties"], HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaPiercingsVibeHeartClitPiercing"], Value: -1 },
			{ Name: "Waspie1", Priority: 26, Value: 60, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "Waspie2", Priority: 26, Value: 80, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "Waspie3", Priority: 26, Value: 40, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "LatexPants1", Priority: 21, Value: 60, Hide: ["ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "SocksSocksFur", "SocksSocks1", "SocksSocks2", "SocksSocks3", "SocksSocks4", "SocksSocks5", "SocksSocks6", "SocksStockings2", "SocksStockings3", "VibratingLatexPanties", "VibratingDildo", "InflatableVibeDildo", "ClitSuctionCup", "TapeStrips", "BenWaBalls", "HeavyWeightClamp", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "LatexSkirt1", Priority: 26, Value: 40, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "LatexSkirt2", Priority: 26, Value: 60, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "ClothSkirt1", Priority: 26, Value: 40, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "Jeans2", Priority: 22, Hide: ["ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "SocksSocksFur", "SocksSocks6", "VibratingLatexPanties", "WandBelt", "VibratingDildo", "InflatableVibeDildo", "ClitSuctionCup", "TapeStrips", "BenWaBalls", "HeavyWeightClamp", "ItemVulvaPiercingsVibeHeartClitPiercing"], Value: 20 },
			{ Name: "ChineseSkirt1", Priority: 26, Value: 40, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] },
			{ Name: "Gown2Skirt", Priority: 26, Value: -1, Random: false, BuyGroup: "Gown2", Left: 50, Top: 462, ParentItem: "Gown2Top", SetPose: ["LegsClosed"], Hide: ["ItemFeet"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds", "ItemLegsNylonRope", "ItemLegsHempRope", "ItemLegsLeatherBelt", "ItemLegsSturdyLeatherBelts", "ItemLegsDuctTape", "ItemLegsLeatherLegCuffs", "ItemLegsOrnateLegCuffs", "ItemLegsZipties", "ItemLegsChains", "ItemBootsThighHighLatexHeels"] },
			{ Name: "AdmiralSkirt", Priority: 26, Value: 30, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemDevicesStrapOnSmooth", "ItemDevicesStrapOnStuds"] }
		]
	},

	{
		Group: "SuitLower",
		Priority: 14,
		Default: false,
		ParentGroup: "BodyLower",
		Clothing: true,
		AllowPose: ["LegsClosed", "Kneel", "StraitDressOpen", "Horse","KneelingSpread"],
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 95,
		Top: 380,
		Asset: [
		{
			    Name: "Catsuit", Value: -1, BuyGroup: "Catsuit", Hide: ["ItemVulvaPiercings", "BodyLower"], HideItem: ["SocksPantyhose1"], Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
				Layer: [
					{ Name: "Base", AllowColorize: true },
					{ Name: "Zip", AllowColorize: false }
				]
			},
		{ Name: "SeamlessCatsuit", Value: -1, BuyGroup: "Catsuit", Hide: ["ItemVulvaPiercings", "BodyLower"], HideItem: ["SocksPantyhose1"] },
		{ Name: "SeethroughSuit", Value: -1, BuyGroup: "SeethroughSuit", HideItem: ["SocksPantyhose1"] },
		{ Name: "SeethroughSuitZip", Value: -1, BuyGroup: "SeethroughSuit", HideItem: ["SocksPantyhose1"], Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
				Layer: [
					{ Name: "Base", AllowColorize: true },
					{ Name: "Zip", AllowColorize: false }
				]
			},
		{ Name: "ReverseBunnySuit", Value: -1, BuyGroup: "ReverseBunnySuit", Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"]}
		]
	},

	{
		Group: "Bra",
		Priority: 21,
		ParentGroup: "BodyUpper",
		Clothing: true,
		Underwear: true,
		AllowPose: ["Yoked", "Hogtied"],
		Color: ["Default", "#cccccc", "#aaaaaa", "#888888", "#666666", "#444444", "#222222", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 150,
		Top: 200,
		Asset: [
			{ Name: "Bra1", Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Bra2", Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Bra7", Priority: 20, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Bra8", Value: 15, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Bra9", Value: 10, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Bandeau1", Priority: 20, Value: 25, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Bustier1", Value: 30, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Corset1", Value: 35, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Corset2", Value: 30, BuyGroup: ["Corset2"], Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Corset3", Value: 25, BuyGroup: ["Corset3"], Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Corset4", Value: 15, BuyGroup: ["Corset4"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "Corset5", Value: 20, BuyGroup: ["Corset5"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "Bikini1", Value: 25, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "SexyBikini1", Value: 50, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "SexyBikini2", Value: 40, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "SexyBikini3", Value: 45, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "Swimsuit1", Value: 15, Hide: ["Panties", "ItemNipples", "ItemNipplesPiercings", "ItemVulvaPiercings"], HideItem: ["VibratingLatexPanties", "VibratingDildo", "InflatableVibeDildo", "ClitSuctionCup", "TapeStrips", "BenWaBalls", "HeavyWeightClamp"] },
			{ Name: "Swimsuit2", Value: 25, Hide: ["Panties", "ItemNipples", "ItemNipplesPiercings", "ItemVulvaPiercings"], HideItem: ["VibratingLatexPanties", "VibratingDildo", "InflatableVibeDildo", "ClitSuctionCup", "TapeStrips", "BenWaBalls", "HeavyWeightClamp"] },
			{ Name: "BunnySuit", Value: 30, Hide: ["Panties", "ItemNipples", "ItemNipplesPiercings", "ItemVulvaPiercings"], HideItem: ["VibratingLatexPanties", "VibratingDildo", "InflatableVibeDildo", "ClitSuctionCup", "TapeStrips", "BenWaBalls", "HeavyWeightClamp"] },
			{ Name: "FrameBra1", Value: 20, Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "FrameBra2", Value: 15, Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "BondageBra1", Priority: 20, Value: 40, Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "LatexBra1", Value: 30, Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "HarnessBra1", Priority: 20, Value: 30, BuyGroup: ["HarnessBra1"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "HarnessBra2", Priority: 20, Value: 40, BuyGroup: ["HarnessBra2"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "CuteBikini1", Priority: 20, Value: 40, Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "CorsetBikini1", Priority: 20, Value: 40, Hide: ["Panties", "ItemNipples", "ItemNipplesPiercings", "ItemVulvaPiercings"], HideItem: ["VibratingLatexPanties", "VibratingDildo", "InflatableVibeDildo", "ClitSuctionCup", "TapeStrips", "BenWaBalls", "HeavyWeightClamp"] },
			{ Name: "OuvertPerl1", Priority: 20, Value: 40, Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"], HideItem: ["ItemNipplesPiercingsRoundPiercing", "ItemNipplesPiercingsWeightedPiercing"] },
			{ Name: "Sarashi1", Value: 25, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "KittyBra1", Value: 30, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "FishnetBikini1", Priority: 20, Value: 45, Hide: ["Panties", "ItemNipples", "ItemNipplesPiercings", "ItemVulvaPiercings"], HideItem: ["VibratingLatexPanties", "VibratingDildo", "InflatableVibeDildo", "ClitSuctionCup", "TapeStrips", "BenWaBalls", "HeavyWeightClamp"] },
			{ Name: "SexyBeachBra1", Value: 25, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "SexyBikiniBra1", Value: 25, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "StarHarnessBra", Priority: 20, Value: 40, Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "HeartTop", Priority: 20, Value: 35, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "ChineseBra1", Value: 35, Hide: ["ItemNipples", "ItemNipplesPiercings"] },
			{ Name: "LatexCorset1", Priority: 20, Value: 40, BuyGroup: ["LatexCorset1"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"] },
			{ Name: "LeatherStrapBra1", Value: 15, Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"], BuyGroup: ["LeatherStrapBra1"] }
		]
	},

	{
		Group: "Panties",
		Priority: 19,
		ParentGroup: "BodyLower",
		ParentColor: "Bra",
		Clothing: true,
		Underwear: true,
		Color: ["Default", "#cccccc", "#aaaaaa", "#888888", "#666666", "#444444", "#222222", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 150,
		Top: 395,
		Asset: [
			{ Name: "Panties1", HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Panties7", HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Panties8", HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Panties11", HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Panties12", Value: 10, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Panties13", Value: 10, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Panties14", Value: 10, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Panties15", Value: 10, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Bikini1", Value: 25, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Diapers1", Value: 20, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ 
				Name: "Diapers2", Value: 30, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"],
				Layer: [
					{ Name: "Diaper", AllowColorize: false },
					{ Name: "Cover", AllowColorize: true }
				]
			},
			{ Name: "Diapers3", Value: 30, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "Panties16", Value: 20, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "MaidPanties1", Value: 25, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "LatexPanties1", Value: 30, Expose: ["ItemVulva", "ItemVulvaPiercings"] },
			{ Name: "WrapPanties1", Value: 25, Expose: ["ItemVulva", "ItemVulvaPiercings"] },
			{ Name: "CrotchPanties1", Value: 30, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"] },
			{ Name: "StringPanties1", Value: 15, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "StringPasty1", Value: 10, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "ZipPanties1", Value: 15, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "HarnessPanties1", Value: 35, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], AllowPose: ["LegsClosed", "Kneel"], BuyGroup: ["HarnessPanties1"] },
			{ Name: "HarnessPanties2", Left: 85, Top: 395, Value: 40, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], AllowPose: ["LegsClosed", "Kneel", "Horse", "KneelingSpread"], BuyGroup: ["HarnessPanties2"] },
			{ Name: "KittyPanties1", Value: 20, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "PearlPanties1", Value: 20, Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"] },
			{ Name: "SunstripePanties1", Value: 20, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "SexyBeachPanties1", Value: 20, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "ChinesePanties1", Value: 25, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"] },
			{ Name: "LeatherStrapPanties1", Value: 20, HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup", "ItemVulvaPiercingsVibeHeartClitPiercing"], BuyGroup: ["LeatherStrapPanties1"] }
			
		]
	},

	{
		Group: "Socks",
		Priority: 20,
		ParentGroup: "BodyLower",
		ParentColor: "Bra",
		Clothing: true,
		Underwear: true,
		AllowPose: ["LegsClosed", "Kneel", "StraitDressOpen", "Hogtied"],
		Color: ["Default", "#cccccc", "#aaaaaa", "#888888", "#666666", "#444444", "#222222", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 125,
		Top: 400,
		Asset: [
			"Socks0", "Socks1", "Socks2", "Socks3", "Socks4", "Socks5", "Stockings1", "Stockings2",
			{ Name: "Stockings3", Value: 10 },
			{ Name: "Stockings4", Value: 10 },
			{ Name: "Pantyhose1", Value: 10, Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo"] },
			{
			    Name: "Socks6", Value: 25,
				Layer: [
					{ Name: "Sock", AllowColorize: true },
					{ Name: "Frill", AllowColorize: false }
				]
			},
			{
				Name: "SocksFur", Value: 40,
				Layer: [
					{ Name: "Fabric", AllowColorize: true },
					{ Name: "Fur", AllowColorize: false }
				]
			},
			{ Name: "SocksStriped1", Value: 10 },
			{ Name: "LatexSocks1", Value: 30 },
			{ Name: "FootlessSocks1", Value: 15 },
			{ Name: "ReverseBunnySuit", Value: 100, BuyGroup: "ReverseBunnySuit"}
		]
	},

	{
		Group: "Shoes",
		Priority: 23,
		ParentGroup: "BodyLower",
		Clothing: true,
		AllowPose: ["LegsClosed", "Kneel", "Hogtied"],
		Color: ["Default", "#bbbbbb", "#808080", "#202020", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 125,
		Top: 500,
		Asset: [
			{ Name: "Shoes1", Height: 6 },
			{ Name: "Shoes2", Height: 6 },
			{ Name: "Shoes4", Height: 6 },
			{ Name: "Sneakers1", Height: 3 },
			{ Name: "Sneakers2", Height: 3 },
			{ Name: "Heels1", Height: 15 },
			{ Name: "Heels2", Height: 15 },
			{ Name: "Boots1", Height: 9 },
			{ Name: "MistressBoots", Height: 35, Value: -1, HideItem: ["SocksSocks4", "SocksSocks5"], Alpha: [[75, 875, 140, 200],[290, 875, 140, 200]] },
			{ Name: "PonyBoots", Height: 35, Value: -1, Alpha: [[75, 875, 140, 200],[290, 875, 140, 200]] },
			{ Name: "Sandals", Priority: 22, Height: 3, Value: 30, HideItem: ["SocksSocks0", "SocksSocks1", "SocksSocks2", "SocksSocks3", "SocksSocks4", "SocksSocks5", "SocksSocks6", "SocksSocksFur"] },
			{ Name: "PawBoots", Height: 3, Value: 45 },
			{ Name: "WoollyBootsTall", Height: 9, Value: 60 },
			{ Name: "ThighHighLatexHeels", Height: 30, BuyGroup: "ThighHighLatexHeels", Value: 80, Alpha: [[75, 850, 140, 200], [290, 850, 140, 200]]}
		]
	},

	{
		Group: "Hat",
		Priority: 46,
		Default: false,
		Clothing: true,
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		AllowPose: ["Suspension"],
		Left: 125,
		Top: 0,
		Asset: [
			"Band1", "Band2", "Beret1",
			{ Name: "MaidHairband1", Value: -1 },
			{ Name: "NurseCap", Value: -1 },
			{
				Name: "Santa1", Value: 20,
				Layer: [
					{ Name: "Fabric", AllowColorize: true },
					{ Name: "Fur", AllowColorize: false }
				]
			},
			{ Name: "CaptainHat1", Value: 25 },
			{ Name: "BunnySuccubus2", Value: 35 },
			{ Name: "WitchHat1", Value: 40 },
			{ Name: "PirateBandana1", Value: 15 },
			{ Name: "PoliceWomanHat", Value: 40 },
			{ Name: "HeadTowel1", Value: 15, Hide: ["HairFront", "HairBack"] },
			{ Name: "CollegeDunce", Value: -1 },
			{ Name: "Tiara1", Value: 40 },
			{ 
				Name: "Bonnet1", Value: 20,
				Layer: [
					{ Name: "Base", AllowColorize: true },
					{ Name: "Lace", AllowColorize: false }
				]
			},
			{ Name: "Bonnet2", Value: 20 },
			{ Name: "Crown1", Value: 20 },
			{ Name: "Crown2", Value: 20 },
			{ Name: "Crown3", Value: 20 },
			{ Name: "Crown4", Value: 20 },
			{ Name: "Crown5", Value: 20 }
		]
	},

	{
		Group: "HairAccessory1",
		Priority: 45,
		Default: false,
		Clothing: true,
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		AllowPose: ["Suspension"],
		Left: 90,
		Top: 0,
		Asset: [
			"Ears1", "Ears2", "PonyEars1",
			{ Name: "Ribbons1", Priority: 4, BuyGroup: "Ribbons1" },
			{ Name: "Ribbons2", Priority: 4, Value: -1, BuyGroup: "Ribbons2" },
			{ Name: "Ribbons3", BuyGroup: "Ribbons3" },
			{ Name: "Ribbons4", BuyGroup: "Ribbons4" },
			{ Name: "GiantBow1", Priority: 4, BuyGroup: "GiantBow1" },
			{ Name: "BunnyEars1", Value: 10, BuyGroup: "BunnyEars1" },
			{ Name: "BunnyEars2", Value: 20, BuyGroup: "BunnyEars2" },
			{ Name: "PuppyEars1", Value: 20, Priority: 6, BuyGroup: "PuppyEars1" },
			{ Name: "SuccubusHorns", Value: 15, BuyGroup: "SuccubusHorns" },
			{ Name: "Horns", Value: 20, BuyGroup: "Horns" },
			{ Name: "Horns2", Value: 15, BuyGroup: "Horns2"},
			{ Name: "Horns3", Value: 15, BuyGroup: "Horns3" },
			{ Name: "HairFlower1", Value: 10, BuyGroup: "HairFlower1"},
			{ Name: "FoxEars1", Value: 15, BuyGroup: "FoxEars1" },
			{ Name: "BatWings", Value: 20, BuyGroup: "BatWings" },
			{ Name: "KittyMask1", Hide: ["HairFront", "Glasses", "HairAccessory2"], Value: 25, BuyGroup: "BatWings" },
			{ Name: "KittenEars1", Value: 20, BuyGroup: "KittenEars1" },
			{ Name: "KittenEars2", Value: 20, BuyGroup: "KittenEars2" },
			{ Name: "WolfEars1", Value: 20, BuyGroup: "WolfEars1" },
			{ Name: "WolfEars2", Value: 20, BuyGroup: "WolfEars2" },
			{ Name: "FoxEars2", Value: 20, BuyGroup: "FoxEars2" },
			{ Name: "FoxEars3", Value: 20, BuyGroup: "FoxEars3" },
			{ Name: "PuppyEars2", Value: 20, BuyGroup: "PuppyEars2"},
			{ Name: "RaccoonEars1", Value: 15, BuyGroup: "RaccoonEars1"},
			{ Name: "WeddingVeil1", Priority: 4, Value: 30, BuyGroup: "WeddingVeil1"},
			{ Name: "HairFeathers1", Value: 10, BuyGroup: "HairFeathers1"},
			{ Name: "MouseEars1", Value: 20, BuyGroup: "MouseEars1"},
			{ Name: "MouseEars2", Value: 20, BuyGroup: "MouseEars2"}
		]
	},
	
	{
		Group: "HairAccessory2",
		Priority: 47,
		Default: false,
		Clothing: true,
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		AllowPose: ["Suspension"],
		Left: 90,
		Top: 0,
		Asset: [
			"Ears1", "Ears2", "PonyEars1",
			{ Name: "Ribbons1", Priority: 4, BuyGroup: "Ribbons1" },
			{ Name: "Ribbons2", Priority: 4, Value: -1, BuyGroup: "Ribbons2" },
			{ Name: "Ribbons3", BuyGroup: "Ribbons3" },
			{ Name: "Ribbons4", BuyGroup: "Ribbons4" },
			{ Name: "GiantBow1", Priority: 4, BuyGroup: "GiantBow1" },
			{ Name: "BunnyEars1", Value: -1, BuyGroup: "BunnyEars1" },
			{ Name: "BunnyEars2", Value: -1, BuyGroup: "BunnyEars2" },
			{ Name: "PuppyEars1", Value: -1, Priority: 29, BuyGroup: "PuppyEars1" },
			{ Name: "SuccubusHorns", Value: -1, BuyGroup: "SuccubusHorns" },
			{ Name: "Horns", Value: -1, BuyGroup: "Horns" },
			{ Name: "Horns2", Value: -1, BuyGroup: "Horns2"},
			{ Name: "Horns3", Value: -1, BuyGroup: "Horns3" },
			{ Name: "HairFlower1", Value: -1, BuyGroup: "HairFlower1"},
			{ Name: "FoxEars1", Value: -1, BuyGroup: "FoxEars1" },
			{ Name: "BatWings", Value: -1, BuyGroup: "BatWings" },
			{ Name: "KittyMask1", Hide: ["HairFront", "Glasses", "HairAccessory1"], Value: -1, BuyGroup: "BatWings" },
			{ Name: "KittenEars1", Value: -1, BuyGroup: "KittenEars1" },
			{ Name: "KittenEars2", Value: -1, BuyGroup: "KittenEars2" },
			{ Name: "WolfEars1", Value: -1, BuyGroup: "WolfEars1" },
			{ Name: "WolfEars2", Value: -1, BuyGroup: "WolfEars2" },
			{ Name: "FoxEars2", Value: -1, BuyGroup: "FoxEars2" },
			{ Name: "FoxEars3", Value: -1, BuyGroup: "FoxEars3" },
			{ Name: "PuppyEars2", Value: -1, BuyGroup: "PuppyEars2"},
			{ Name: "RaccoonEars1", Value: -1, BuyGroup: "RaccoonEars1"},
			{ Name: "WeddingVeil1", Priority: 4, Value: -1, BuyGroup: "WeddingVeil1"},
			{ Name: "HairFeathers1", Value: -1, BuyGroup: "HairFeathers1"},
			{ Name: "MouseEars1", Value: 20, BuyGroup: "MouseEars1"},
			{ Name: "MouseEars2", Value: 20, BuyGroup: "MouseEars2"}
		]
	},

	{
		Group: "Gloves",
		Priority: 28,
		ParentGroup: "BodyUpper",
		ParentColor: "Bra",
		Clothing: true,
		Underwear: true,
		Default: false,
		AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Yoked", "AllFours"],
		Color: ["Default", "#cccccc", "#aaaaaa", "#888888", "#666666", "#444444", "#222222", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Asset: [
			"Gloves1", "Gloves2",
			{ Name: "Gloves3", Value: 15, Left: 60, Top: 109 },
			{ Name: "MistressGloves", Value: -1 },
			{ Name: "FingerlessGloves", Value: 20 },
			{ 
				Name: "GlovesFur", Value: 30,
				Layer: [
					{ Name: "Fabric", AllowColorize: true },
					{ Name: "Fur", AllowColorize: false }
				]
			},
			{ Name: "Catsuit", Value: -1, BuyGroup: "Catsuit" },
			{ Name: "SeethroughSuit", Value: -1, BuyGroup: "SeethroughSuit" }
		]
	},

	{
		Group: "Glasses",
		Priority: 27,
		Default: false,
		Clothing: true,
		Underwear: true,
		Color: ["#303030", "#808080", "#e0e0e0", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 180,
		Top: 125,
		Asset: [
			"Glasses1", "Glasses2", "Glasses3", "Glasses4", "Glasses5", "Glasses6",
			{ Name: "SunGlasses1", Value: 15 },
			{ Name: "SunGlasses2", Value: 15 },
			{ Name: "Mask1", Value: 20 },
			{ Name: "Mask2", Value: 20 },
			{ Name: "ButterflyMask1", Value: 30 },
			{ Name: "EyePatch1", Value: 10 },
			{ Name: "ShinobiMask", Left: 199, Top: 88, Value: 30 },
			{ Name: "FoxMask", Left: 150, Top: 20, Value: 30 }],
	},

	{
		Group: "TailStraps",
		Priority: 4,
		Default: false,
		Clothing: true,
		Underwear: true,
		AllowPose: ["AllFours"],
		Color: ["Default", "#cccccc", "#aaaaaa", "#888888", "#666666", "#444444", "#222222", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 0,
		Top: 150,
		Asset: [
			{ Name: "TailStrap", Value: 30 },
			{ Name: "HorseTailStrap", Value: 20 },
			{ Name: "HorseTailStrap1", Value: 30 },
			{ Name: "FoxTailsStrap", Priority: 2, Value: 50 },
			{ Name: "PuppyTailStrap", Value: 15 },
			{ Name: "SuccubusStrap", Value: 15 },
			{ Name: "SuccubusTailStrap", Value: 10 },
			{ Name: "RaccoonStrap", Value: 25 },
			{ Name: "RaccoonTailStrap", Priority: 2, Value: 35 },
			{ Name: "PuppyTailStrap1", Value: 20 },
			{ Name: "KittenTailStrap1", Value: 20 },
			{ Name: "KittenTailStrap2", Value: 20 },
			{ Name: "FoxTailStrap1", Value: 20 },
			{ Name: "FoxTailStrap2", Value: 20 },
			{ Name: "WolfTailStrap1", Value: 20 },
			{ Name: "WolfTailStrap2", Value: 20 },
			{ Name: "WolfTailStrap3", Value: 20 },
			{ Name: "DemonPlug", Value: 30 },
			{ Name: "MouseTailStrap1", Value: 20 },
			{ Name: "MouseTailStrap2", Value: 20 }
		]
	},

	{
		Group: "Wings",
		Priority: 3,
		ParentColor: "Bra",
		Default: false,
		Clothing: true,
		Underwear: true,
		Color: ["Default"],
		Asset: [
			{ Name: "SuccubusFeather", Value: 35 },
			{ Name: "SuccubusWings", Value: 35 },
			{ Name: "AngelFeather", Value: 50 },
			{ Name: "DevilWings", Value: 25 },
			{ Name: "FallenAngelWings", Value: 50 },
			{ Name: "AngelWings", Value: 50 },
			{ Name: "BatWings", Value: 20 }
		]
	},

	{
		Group: "Height",
		AllowNone: false,
		AllowColorize: false,
		Asset: [
			{ Name: "H0950", Zoom: 0.950, Visible: false },
			{ Name: "H0960", Zoom: 0.960, Visible: false },
			{ Name: "H0970", Zoom: 0.970, Visible: false },
			{ Name: "H0980", Zoom: 0.980, Visible: false },
			{ Name: "H0990", Zoom: 0.990, Visible: false },
			{ Name: "H1000", Zoom: 1.000, Visible: false },
			{ Name: "H0900", Zoom: 0.900, Visible: false },
			{ Name: "H0910", Zoom: 0.910, Visible: false },
			{ Name: "H0920", Zoom: 0.920, Visible: false },
			{ Name: "H0930", Zoom: 0.930, Visible: false },
			{ Name: "H0940", Zoom: 0.940, Visible: false }
		]
	},
	
	{
		Group: "BodyUpper",
		Priority: 7,
		AllowNone: false,
		AllowColorize: false,
		AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "StraitDressOpen", "Yoked", "Hogtied", "AllFours"],
		Color: ["White", "Asian", "Black"],
		Asset: ["Small", "Normal", "Large", "XLarge"]
	},

	{
		Group: "BodyLower",
		Priority: 9,
		AllowNone: false,
		AllowColorize: false,
		ParentSize: "BodyUpper",
		ParentColor: "BodyUpper",
		AllowPose: ["LegsClosed", "Kneel", "Horse", "KneelingSpread"],
		Color: ["White", "Asian", "Black"],
		Top: 462,
		Asset: ["Small", "Normal", "Large", "XLarge"]
	},

	{
		Group: "Hands",
		Priority: 27,
		AllowNone: false,
		AllowColorize: false,
		ParentColor: "BodyUpper",
		AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "AllFours"],
		Color: ["White", "Asian", "Black"],
		Asset: ["Default"]
	},

	{
		Group: "HairBack",
		Priority: 5,
		AllowNone: false,
		Color: ["#6a3628", "#202020", "#dcc787", "#6c2132", "#999999", "#dddddd", "#e781b1", "#81e7b1", "#81b1e7", "#eeee99", "#ee9999", "#ee99ee"],
		AllowPose: ["Suspension", "Hogtied", "AllFours"],
		Left: 50,
		Top: 0,
		Asset: ["HairNone", "HairBack1", "HairBack2", "HairBack4", "HairBack10", "HairBack14", "HairBack15", "HairBack16", "HairBack17", "HairBack18", "HairBack19", "HairBack20", "HairBack5", "HairBack8", "HairBack11", "HairBack6", "HairBack21", "HairBack22",
		    { Name: "HairBack23", Priority: 39},
		    { Name: "HairBack24", Priority: 39}
		]
	},

	{
		Group: "HairFront",
		Priority: 44,
		AllowNone: false,
		ParentColor: "HairBack",
		Color: ["#6a3628", "#202020", "#dcc787", "#6c2132", "#999999", "#dddddd", "#e781b1", "#81e7b1", "#81b1e7", "#eeee99", "#ee9999", "#ee99ee"],
		Left: 150,
		Top: 50,
		Asset: ["HairFront1", "HairFront2", "HairFront3", "HairFront4", "HairFront5", "HairFront6", "HairFront7", "HairFront8", "HairFront9", "HairFront10", "HairFront11", "HairFront12", "HairFront13", "HairFront14"]
	},

	{
		Group: "Eyes",
		Priority: 9,
		AllowNone: false,
		Color: ["#6a3628", "#5e481e", "#666666", "#555588", "#558855", "#885555", "#202020", "#aa3333", "#33aa33", "#3333aa", "#aaaa33", "#33aaaa", "#aa33aa"],
		AllowExpression: ["Closed", "Dazed", "Shy", "Sad", "Horny", "Lewd", "VeryLewd", "Heart", "LewdHeart", "Dizzy", "Daydream", "WinkL", "WinkR", "Angry", "Surprised", "Scared"],
		Left: 200,
		Top: 145,
		FullAlpha: false,
		Blink: true,
		Asset: ["Eyes1", "Eyes2", "Eyes3", "Eyes4", "Eyes5", "Eyes6", "Eyes7", "Eyes8", "Eyes9", "Eyes10", "Eyes11"]
	},

	{
		Group: "Mouth",
		Priority: 10,
		AllowNone: false,
		Color: ["Default", "#803d26", "#aa5555", "#cc3333", "#55aa55", "#5555aa", "#55aaaa", "#aa55aa", "#aaaa55"],
		AllowExpression: ["Frown", "Sad", "Pained", "Angry", "HalfOpen", "Open", "Ahegao", "Moan", "TonguePinch", "LipBite", "Happy", "Devious", "Laughing", "Grin", "Smirk"],
		Left: 235,
		Top: 180,
		Asset: [
			{ Name: "Regular", 
			Layer: [
					{ Name: "Lips", AllowColorize: true },
					{ Name: "Inner", AllowColorize: false }
				]
			},
			{ Name: "Discreet" }
		]
	},

	{
		Group: "Nipples",
		Priority: 11,
		AllowNone: false,
		ParentGroup: "BodyUpper",
		Default: false,
		Color: ["Default", "#a6665b", "#803d26", "#d68777", "#9b4a2e", "#bb6655"],
		Left: 175,
		Top: 285,
		Asset: ["Nipples1", "Nipples2", "Nipples3"]
	},

	{
		Group: "Pussy",
		Priority: 12,
		AllowNone: false,
		Color: ["Default", "#6a3628", "#443330", "#222222"],
		Left: 225,
		Top: 500,
		FullAlpha: false,
		Asset: ["PussyLight1", "PussyLight2", "PussyLight3", "PussyDark1", "PussyDark2", "PussyDark3"]
	},

	// Facial Expression specific
	{
		Group: "Eyebrows",
		Priority: 9,
		AllowNone: false,
		AllowColorize: false,
		AllowCustomize: false,
		AllowExpression: ["Raised", "Lowered", "OneRaised", "Harsh", "Angry", "Soft"],
		Left: 200,
		Top: 120,
		Asset: ["Eyebrows1"]
	},

	{
		Group: "Blush",
		Priority: 8,
		AllowNone: false,
		AllowColorize: false,
		AllowCustomize: false,
		AllowExpression: ["Low", "Medium", "High", "VeryHigh", "Extreme", "ShortBreath"],
		Left: 190,
		Top: 100,
		Asset: ["Blush"]
	},

	{
		Group: "Fluids",
		Priority: 11,
		AllowNone: false,
		AllowColorize: false,
		AllowCustomize: false,
		AllowExpression: ["DroolLow", "DroolMedium", "DroolHigh", "DroolSides", "DroolMessy", "DroolTearsLow", "DroolTearsMedium", "DroolTearsHigh", "DroolTearsMessy", "DroolTearsSides", "TearsHigh", "TearsMedium", "TearsLow"],
		Left: 200,
		Top: 145,
		Asset: ["Fluids"]
	},

	{
		Group: "Emoticon",
		Priority: 49,
		AllowNone: false,
		AllowColorize: false,
		AllowCustomize: false,
		AllowExpression: ["Afk", "Sleep", "Hearts", "Tear", "Hearing", "Confusion", "Exclamation", "Annoyed", "Read"],
		Left: 250,
		Top: 0,
		Asset: ["Emoticon"]
	},

	// Item specific
	{
		Group: "ItemFeet",
		Category: "Item",
		Activity: ["Kiss", "Lick", "Nibble", "Tickle", "Spank", "Caress", "MassageHands", "Grope"],
		Priority: 27,
		ParentGroup: "BodyLower",
		Default: false,
		IsRestraint: true,
		Effect: ["Freeze", "Prone"],
		Color: ["Default"],
		Left: 125,
		Top: 725,
		Zone: [[100, 750, 300, 120]],
		Asset: [
			{ Name: "NylonRope", DefaultColor: "#909090", Value: 30, BuyGroup: ["NylonRope"], Time: 15, SetPose: ["LegsClosed"], Audio: "RopeLong" },
			{ Name: "HempRope", DefaultColor: "#956B1C", Value: 60, Time: 15, Difficulty: 3, BuyGroup: ["HempRope"], SetPose: ["LegsClosed"], Extended: true, AllowType: ["Mermaid", "Suspension"], Audio: "RopeLong", HideItem: ["ItemDevicesTeddyBear"] },
			{ Name: "LeatherBelt", Value: 25, Time: 10, RemoveTime: 5, AllowLock: true, SetPose: ["LegsClosed"] },
			{ Name: "SturdyLeatherBelts", Value: 50, Time: 10, RemoveTime: 5, AllowLock: true, SetPose: ["LegsClosed"], BuyGroup: "SturdyLeatherBelts", Extended: true, AllowType: ["One", "Two", "Three", "Four"] },
			{ Name: "Irish8Cuffs", Value: 25, Time: 10, RemoveTime: 5, AllowLock: true, SetPose: ["LegsClosed"] },
			{ Name: "DuctTape", Extended: true, Value: 50, Time: 15, RemoveTime: 10, BuyGroup: "DuctTape", HideItem: ["ItemBootsThighHighLatexHeels"], SetPose: ["LegsClosed"], AllowType: ["HalfFeet", "MostFeet", "CompleteFeet"] },
			{ Name: "LeatherAnkleCuffs", Random: false, Value: 30, Time: 10, Difficulty: 2, Effect: [], Priority: 24, AllowPose: ["LegsClosed"], Extended: true, AllowLock: true, AllowEffect: ["Freeze", "Prone"] },
			{ Name: "OrnateAnkleCuffs", Random: false, Value: 90, Time: 10, Difficulty: 3, Effect: [], Priority: 24, AllowPose: ["LegsClosed"], Extended: true, AllowLock: true, AllowEffect: ["Freeze", "Prone"],
			Layer: [
					{ Name: "Cuffs", AllowColorize: true },
					{ Name: "Gems", AllowColorize: false }
				]
			},
			{ Name: "SpreaderMetal", Value: 50, Time: 10, Difficulty: 3, Random: false, AllowLock: true, Effect: ["Freeze", "Prone"], SetPose: ["LegsOpen"], Block: ["ItemLegs"], Prerequisite: ["LegsOpen", "NotKneeling"], RemoveAtLogin: true },
			{ Name: "BallChain", Value: 40, Time: 10, Difficulty: 5, Effect: [], RemoveTime: 10, Random: false, AllowLock: true, AllowPose: ["LegsOpen", "LegsClosed"] },
			{ Name: "AnkleShackles", Value: 30, Time: 10, Difficulty: 6, RemoveTime: 5, Effect: ["Prone"], Random: false, AllowLock: true, AllowPose: ["LegsOpen", "LegsClosed"] },
			{ Name: "Zipties", Value: 20, Time: 5, Difficulty: 6, RemoveTime: 6, SetPose: ["LegsClosed"], BuyGroup: "Zipties" },
			{ Name: "Chains", Value: 90, Time: 20, Difficulty: 5, AllowLock: true, BuyGroup: "Chains", SetPose: ["LegsClosed"], Extended: true, AllowType: ["Strict", "Suspension"] },
			{ Name: "SpreaderDildoBar", Value: 60, Time: 10, Difficulty: 5, Random: false, Top: 400, AllowLock: true, Effect: ["Freeze", "Prone"], SetPose: ["LegsOpen"], Prerequisite: ["AccessVulva", "LegsOpen", "NotSuspended", "NotHogtied", "NotHorse", "NotKneeling", "NotChaste"], Block: ["ItemPelvis", "ItemLegs", "ItemVulva"],
			Layer: [
				{ Name: "DildoBar", AllowColorize: true },
				{ Name: "Pussy", AllowColorize: false }
			], RemoveAtLogin: true },
			{ Name: "SpreaderVibratingDildoBar", Value: 70, Time: 10, Difficulty: 5, Random: false, Top: 400, AllowLock: true, Effect: ["Egged", "Freeze", "Prone"], SetPose: ["LegsOpen"], Prerequisite: ["AccessVulva", "LegsOpen", "NotSuspended", "NotHogtied", "NotHorse", "NotKneeling", "NotChaste"], Block: ["ItemPelvis", "ItemLegs", "ItemVulva"], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"],
			Layer: [
				{ Name: "DildoBar", AllowColorize: true },
				{ Name: "Pussy", AllowColorize: false }
			], RemoveAtLogin: true },
			AssetSpankingToys
		]
	},

	{
		Group: "ItemLegs",
		Category: "Item",
		Activity: ["Kiss", "Lick", "Nibble", "Tickle", "Spank", "Caress", "MassageHands", "Grope"],
		Priority: 25,
		ParentGroup: "BodyLower",
		Default: false,
		IsRestraint: true,
		Effect: ["Prone", "KneelFreeze"],
		Color: ["Default"],
		AllowPose: ["Kneel"],
		Left: 125,
		Top: 400,
		Zone: [[100, 580, 300, 170]],
		Asset: [
			{ Name: "NylonRope", DefaultColor: "#909090", Value: 30, Time: 10, BuyGroup: ["NylonRope"], SetPose: ["LegsClosed"], Audio: "RopeLong" },
			{ Name: "HempRope", DefaultColor: "#956B1C", Value: 60, Time: 10, RemoveTime: 15, Difficulty: 3, BuyGroup: ["HempRope"], SetPose: ["LegsClosed"], Extended: true, AllowType: ["Mermaid"], Audio: "RopeLong" },
			{ Name: "LeatherBelt", Value: 25, Time: 5, AllowLock: true, SetPose: ["LegsClosed"] },
			{ Name: "SturdyLeatherBelts", Value: 50, Time: 5, AllowLock: true, SetPose: ["LegsClosed"], BuyGroup: "SturdyLeatherBelts", Extended: true, AllowType: ["One", "Two", "Three", "Four"] },
			{ Name: "DuctTape", Extended: true, Value: 50, Time: 15, RemoveTime: 10, BuyGroup: "DuctTape", HideItem: ["ItemBootsThighHighLatexHeels", "ShoesThighHighLatexHeels"], SetPose: ["LegsClosed"], AllowType: ["HalfLegs", "MostLegs", "CompleteLegs"] },
			{ Name: "LeatherLegCuffs", Random: false, Value: 30, Time: 10, Difficulty: 2, Priority: 24, AllowPose: ["LegsClosed"], Extended: true, AllowLock: true, Effect: [], AllowEffect: ["Prone", "KneelFreeze"], AllowType: ["Closed"] },
			{ Name: "OrnateLegCuffs", Random: false, Value: 90, Time: 10, Difficulty: 3, Priority: 24, AllowPose: ["LegsClosed"], Extended: true, AllowLock: true, Effect: [], AllowEffect: ["Prone", "KneelFreeze"], AllowType: ["Closed"],
			Layer: [
					{ Name: "Cuffs", AllowColorize: true },
					{ Name: "Gems", AllowColorize: false }
				]
			},
			{
				Name: "LegBinder", DefaultColor: "#222222", Value: 80, Block: ["ItemFeet"], SetPose: ["LegsClosed"], Hide: ["Shoes", "Socks", "ClothLower"], HideItem: ["OrnateAnkleCuffs", "ItemFeetNylonRope", "ItemFeetHempRope", "ItemFeetLeatherBelt", "ItemFeetLeatherAnkleCuffs", "ItemFeetMermaidRopeTie","ItemBootsThighHighLatexHeels"], Effect: ["Prone"], Time: 30, RemoveTime: 20, Difficulty: 15, AllowLock: true, Prerequisite: ["NotSuspended", "NotHogtied"],
				Layer: [
					{ Name: "Latex", AllowColorize: true },
					{ Name: "Belts", AllowColorize: false },
				]
			},
			{
				Name: "HobbleSkirt", DefaultColor: "#222222", Value: 125, Block: ["ItemPelvis", "ItemFeet", "ItemVulva", "ItemVulvaPiercings", "ItemButt"], SetPose: ["LegsClosed"], Hide: ["Shoes","Socks", "ClothLower"], HideItem: ["OrnateAnkleCuffs", "ItemFeetNylonRope", "ItemFeetHempRope", "ItemFeetLeatherBelt", "ItemFeetLeatherAnkleCuffs", "ItemFeetMermaidRopeTie", "ItemBootsThighHighLatexHeels"], Effect: ["Prone"], Time: 30, RemoveTime: 20, Difficulty: 15, AllowLock: true, Prerequisite: ["NotKneeling", "NotSuspended", "NotHogtied"],
				Layer: [
					{ Name: "Latex", AllowColorize: true },
					{ Name: "Belts", AllowColorize: false }
				]
			},
			{
				Name: "WoodenHorse", Random: false, Alpha: [[160, 720, 200, 240]], Priority: 34, Value: 200, Time: 10, Difficulty: 2, SetPose: ["Horse"], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], Effect: ["Prone", "Freeze", "Mounted"], Block: ["ItemFeet", "ItemBoots"], Hide: ["Shoes", "Socks", "ItemBoots"], HideItem: ["ClothLowerPajama1", "ClothLowerShorts1", "ClothLowerJeans1", "ClothLowerJeans2", "ClothLowerWaspie1", "ClothLowerWaspie2", "ClothLowerWaspie3", "ClothLowerGown2Skirt", "ClothLowerLatexPants1", "ItemDevicesTeddyBear", "SuitLowerReverseBunnySuit"], Prerequisite: ["NotKneeling", "LegsOpen", "NotSuspended", "NotHogtied", "NotShackled"],
				Layer: [
					{ Name: "Frame", AllowColorize: true },
					{ Name: "Wood", AllowColorize: false }
				]
			},
			{ Name: "Zipties", Value: 20, Time: 5, Difficulty: 6, RemoveTime: 6, SetPose: ["LegsClosed"], BuyGroup: "Zipties" },	
			{ Name: "Chains", Value: 90, Time: 20, RemoveTime: 15, Difficulty: 5, AllowLock: true, BuyGroup: "Chains", SetPose: ["LegsClosed"], Extended: true, AllowType: ["Strict"] },
			{ Name: "FrogtieStraps", Value: 25, Time: 5, Random: false, AllowLock: true, SetPose: ["Kneel"] },
			AssetSpankingToys
		]
	},

	{
		Group: "ItemVulva",
		Category: "Item",
		Activity: ["MasturbateHand", "MasturbateFist", "MasturbateFoot", "MasturbateTongue", "Caress", "Slap", "Kiss", "Nibble"],
		Priority: 15,
		Default: false,
		Color: ["Default"],
		AllowPose: ["Kneel"],
		Left: 125,
		Top: 400,
		Zone: [[100, 500, 100, 80]],
		Asset: [
			{ Name: "VibratingEgg", Effect: ["Egged"], Value: 25, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 5, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"], Visible: false },
			{ Name: "VibratingWand", Wear: false, Activity: "MasturbateItem", Value: 60, Bonus: [{ Type: "KidnapManipulation", Factor: 3 }], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], Visible: false },
			{ Name: "VibratorRemote", Effect: ["Remote"], Wear: false, Value: 50, BuyGroup: "VibratorRemote", Visible: false },
			{ Name: "VibratingLatexPanties", DefaultColor: "#60A0AF", Effect: ["Egged", "Chaste"], Block: ["ItemButt"], Value: 50, Prerequisite: ["AccessVulva", "CannotHaveWand"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }], AllowLock: true, AllowEffect: ["Egged", "Vibrating"] },
			{
				Name: "WandBelt", DefaultColor: "#BBAAAA", Priority: 24, Effect: ["Egged"], Block: ["ItemPelvis"], Value: 80, Prerequisite: ["CannotHaveWand"], Time: 15, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], AllowLock: true, AllowEffect: ["Egged", "Vibrating"], HideItem: ["ClothLowerPajama1", "ClothLowerMistressBottom"],
				Layer: [
					{ Name: "Belt", AllowColorize: true },
					{ Name: "Wand", AllowColorize: false }
				]
			},
			{ Name: "PenisDildo", Priority: 11, Value: 20, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], BuyGroup: "PenisDildo",
			Layer: [
					{ Name: "Dildo", AllowColorize: true },
					{ Name: "Pussy", AllowColorize: false }
				]
			},
			{ Name: "VibratingDildo", Priority: 11, Effect: ["Egged"], Value: 60, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"],
			Layer: [
					{ Name: "Dildo", AllowColorize: true },
					{ Name: "Pussy", AllowColorize: false }
				]
			},
			{
				Name: "InflatableVibeDildo", Priority: 11, Effect: ["Egged"], Value: 100, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"],
				Layer: [
					{ Name: "Dildo", AllowColorize: true },
					{ Name: "Pussy", AllowColorize: false }
				]
			},
			{
				Name: "ClitoralStimulator", DefaultColor: "#8a00d1", Priority: 11, Effect: ["Egged"], Value: 70, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"],
				Layer: [
					{ Name: "Stimulator", AllowColorize: true },
					{ Name: "Pussy", AllowColorize: false }
				]
			},
			{ Name: "ClitSuctionCup", Priority: 11, Effect: [], Value: 25, Extended: true, Prerequisite: "AccessVulva", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }] },
			{ Name: "TapeStrips", Value: 10, Prerequisite: "AccessVulva", Time: 5, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "BenWaBalls", Value: 30, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 5, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 5 }], Visible: false },
			{ Name: "HeavyWeightClamp", Value: 30, Prerequisite: "AccessVulva", Time: 5, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "FullLatexSuitWand", Priority: 34, IsRestraint: true, Block: ["ItemVulvaPiercings"], AllowLock: true, Value: -1, Effect: ["Egged", "Block", "Prone"], AllowEffect: ["Egged", "Vibrating"], Time: 5, Difficulty: 12 },
			{ Name: "ClitAndDildoVibratorbelt", Priority: 11, Effect: ["Egged"], Hide: ["Panties"], Block: ["ItemPelvis"], AllowLock: true, Value: 100, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"],
			Layer: [
					{ Name: "Belt", AllowColorize: true },
					{ Name: "Crotch", AllowColorize: false }
				]
			},
			{
				Name: "HempRopeBelt", BuyGroup: ["HempRope"], Effect: ["Egged"], DefaultColor: "#956B1C", Block: ["ItemPelvis"], Value: 60, Prerequisite: ["CannotHaveWand"], Time: 15, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }] , AllowEffect: ["Egged", "Vibrating"], HideItem: ["ClothLowerPajama1", "ClothLowerMistressBottom"],
				Layer: [
					{ Name: "Rope", AllowColorize: true },
					{ Name: "Wand", AllowColorize: false }
				]
			},
			AssetSpankingToys
		]
	},
	
	{
		Group: "ItemVulvaPiercings",
		Category: "Item",
		Priority: 13,
		Default: false,
		Color: ["Default"],
		AllowPose: ["Kneel"],
		Left: 125,
		Top: 400,
		Zone: [[200, 500, 100, 80]],
		Asset: [
			{ Name: "StraightClitPiercing", Value: 15, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "RoundClitPiercing", Value: 15, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "WeightedClitPiercing", Value: 30, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "BarbellClitPiercing", Value: 20, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "ChastityClitPiercing", Effect: ["Chaste"], Block: ["ItemVulva"], Value: 50, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 50, Time: 20, RemoveTime: 20, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }], HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo"] },
			{ Name: "ChastityClitShield", Effect: ["Chaste"], Block: ["ItemVulva"], Value: 70, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 50, Time: 30, RemoveTime: 30, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }], HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo"] },
			{ Name: "HighSecurityVulvaShield", Effect: ["Chaste"], Block: ["ItemVulva"], Value: 100, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 99, Time: 60, RemoveTime: 200, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }], HideItem: ["ItemButtAnalBeads2","ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo"] },
			{ Name: "JewelClitPiercing", Value: 20, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "AdornedClitPiercing", Value: 20, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ 	
				Name: "VibeHeartClitPiercing", Effect: ["Egged"], Value: 35, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"], BuyGroup: ["VibeHeart"], AllowLock: true,
				Layer: [
					{ Name: "Heart", AllowColorize: true },
					{ Name: "Ring", AllowColorize: false }
				]
			},
			{ Name: "BellClitPiercing", Value: 30, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "TapedClitEgg", Effect: ["Egged"], Value: 25, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 5, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"] },
			AssetSpankingToys
		]
	},

	{
		Group: "ItemButt",
		Category: "Item",
		Activity: ["Kiss", "MasturbateHand", "MasturbateFist", "MasturbateTongue", "Spank", "Caress", "Grope"],
		Priority: 4,
		Default: false,
		Color: ["Default"],
		AllowPose: ["AllFours"],
		Left: 0,
		Top: 0,
		Zone: [[300, 500, 100, 80]],
		Asset: [
			{ Name: "BlackButtPlug", Value: 15, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }], Visible: false },
			{ Name: "PenisPlug", Value: 20, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }], Visible: false, BuyGroup: "PenisDildo" },
			{ Name: "TailButtPlug", Value: 40, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "HorsetailPlug", Value: 30, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "HorsetailPlug1", Value: 40, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "PuppyTailPlug", Value: 25, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "PuppyTailPlug1", Value: 30, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "SuccubusButtPlug", Value: 25, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "SuccubusButtPlug2", Value: 25, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "FoxTails", Priority: 2, Value: 60, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "RaccoonButtPlug", Value: 40, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "RaccoonTailPlug", Priority: 2, Value: 50, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "AnalBeads", Value: 20, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }], Visible: false },
			{ Name: "AnalBeads2", Value: 70, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 14, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }], AllowType: ["Base", "_2in", "_3in", "_4in", "_5in"], Extended: true },
			{ Name: "ButtPump", Effect: [], Value: 35, Extended: true, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }], Visible: false },
			{ Name: "VibratingButtplug", Effect: ["Egged"], Value: 60, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"], Visible: false },
			{ Name: "InflVibeButtPlug", Effect: ["Egged"], Value: 90, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], AllowEffect: ["Egged", "Vibrating"], Visible: false },
			{ Name: "AnalHook", IsRestraint: true, Value: 20, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }], AllowEffect: ["Freeze", "Egged"], Extended: true, AllowType: ["Base", "Chain", "Hair"] },
			{ Name: "ButtPlugLock", IsRestraint: true, Effect: ["Chaste"], Value: 75, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], AllowLock: true, Difficulty: 50, Time: 30, RemoveTime: 50, ExpressionTrigger: [{ Group: "Blush", Name: "High", Timer: 10}, { Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }], AllowEffect: ["Chaste", "Tethered", "Freeze", "ForceKneel"], Extended: true, AllowType: ["Base", "ChainShort", "ChainLong"] },
			{ Name: "KittenTail1", Value: 30, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10}] },
			{ Name: "KittenTail2", Value: 30, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "FoxTail1", Value: 50, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "FoxTail2", Value: 50, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "WolfTail1", Value: 35, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "WolfTail2", Value: 35, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "WolfTail3", Value: 35, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "DemonPlug", Value: 35, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "MouseTail1", Value: 35, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "MouseTail2", Value: 35, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "VibratingDildoPlug", Value: 60, Time: 10, Prerequisite: ["AccessVulva", "AccessVulvaSuitZip"], BuyGroup: "VibratingDildo", Effect: ["Egged"] },
  		{ Name: "BunnyTailPlug1", Value: 1, Prerequisite: "AccessVulva", Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10}] },
			{ Name: "BunnyTailPlug2", Value: 1, Prerequisite: "AccessVulva", Time: 10, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10}] },
			AssetSpankingToys
		]
	},
	
	{
		Group: "ItemPelvis",
		Category: "Item",
		Activity: ["Kiss", "Lick", "Nibble", "Tickle", "Spank", "Caress", "Pinch", "MassageHands", "Grope"],
		Priority: 16,
		ParentGroup: "BodyLower",
		Default: false,
		Color: ["Default"],
		Left: 125,
		Top: 375,
		Zone: [[100, 420, 300, 80]],
		Asset: [
			{ Name: "StraponPanties", DefaultColor: "#505050", Effect: ["Chaste"], Block: ["ItemVulva", "ItemButt", "ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaHeavyWeightClamp", "ItemVulvaPenisDildo", "ItemVulvaPiercingsVibeHeartClitPiercing"], Value: -1, Prerequisite: "AccessVulva", Time: 15 },
			{ Name: "LeatherChastityBelt", Effect: ["Chaste"], Block: ["ItemVulva", "ItemButt", "ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaHeavyWeightClamp", "ItemVulvaPenisDildo"], Value: 30, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 8, Time: 20, RemoveTime: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ Name: "SleekLeatherChastityBelt", Effect: ["Chaste"], Block: ["ItemVulva", "ItemButt", "ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaHeavyWeightClamp", "ItemVulvaPenisDildo", "ItemVulvaPiercingsVibeHeartClitPiercing"], Value: 45, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 11, Time: 20, RemoveTime: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ Name: "StuddedChastityBelt", Effect: ["Chaste"], Block: ["ItemVulva", "ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaHeavyWeightClamp", "ItemVulvaPenisDildo", "ItemVulvaPiercingsVibeHeartClitPiercing"], Value: 60, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 14, Time: 20, RemoveTime: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }], Extended: true, AllowType: ["ClosedBack"], AllowBlock: ["ItemButt"] },
			{ Name: "MetalChastityBelt", Effect: ["Chaste"], Block: ["ItemVulva", "ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaHeavyWeightClamp", "ItemVulvaPenisDildo", "ItemVulvaPiercingsVibeHeartClitPiercing"], Value: 100, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 20, Time: 20, RemoveTime: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }], Extended: true, AllowType: ["ClosedBack"], AllowBlock: ["ItemButt"] },
			{ Name: "PolishedChastityBelt", Effect: ["Chaste"], Block: ["ItemVulva", "ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaHeavyWeightClamp", "ItemVulvaPenisDildo", "ItemVulvaPiercingsVibeHeartClitPiercing"], Value: 150, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 30, Time: 20, RemoveTime: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }], Extended: true, AllowType: ["ClosedBack"], AllowBlock: ["ItemButt"] },
			{
				Name: "OrnateChastityBelt", Effect: ["Chaste"], Block: ["ItemVulva", "ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaHeavyWeightClamp", "ItemVulvaPenisDildo", "ItemVulvaPiercingsVibeHeartClitPiercing"], Value: 200, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 50, Time: 20, RemoveTime: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }], Extended: true, AllowType: ["ClosedBack"], AllowBlock: ["ItemButt"],
			Layer: [
					{ Name: "Belt", AllowColorize: true },
					{ Name: "Gems", AllowColorize: false }
				]
			},
			{ Name: "SteelChastityPanties", Effect: ["Chaste"], Block: ["ItemVulva", "ItemButt", "ItemVulvaPiercings"], Hide: ["ItemVulva", "ItemVulvaPiercings"], Value: 150, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 50, Time: 50, RemoveTime: 60, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ Name: "HarnessPanties1", Priority: 19, Value: 35, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 8, Time: 10, RemoveTime: 15, BuyGroup: ["HarnessPanties1"], Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], AllowPose: ["LegsClosed", "Kneel"] },
			{ Name: "HarnessPanties2", Left: 85, Top: 395, Priority: 19, Value: 40, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 9, Time: 10, RemoveTime: 15, BuyGroup: ["HarnessPanties2"], Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], AllowPose: ["LegsClosed", "Kneel", "Horse", "KneelingSpread"] },
			{ Name: "LeatherStrapPanties1", Left: 150, Top: 395, Effect: ["Chaste"], Block: ["ItemVulva", "ItemButt", "ItemVulvaPiercings"], HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaHeavyWeightClamp", "ItemVulvaPenisDildo", "ItemVulvaPiercingsVibeHeartClitPiercing"], Value: 20, Prerequisite: "AccessVulva", AllowLock: true, Difficulty: 5, Time: 20, RemoveTime: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }], BuyGroup: ["LeatherStrapPanties1"] },
			{
				Name: "LoveChastityBelt", HideItem: ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup", "ItemVulvaInflatableVibeDildo", "ItemVulvaHeavyWeightClamp", "ItemVulvaPenisDildo"], Value: 250, Prerequisite: "AccessVulva", Difficulty: 50, Time: 20, RemoveTime: 10, Extended: true,
				Effect: ["Lock"], OwnerOnly: true,
				AllowEffect: ["Chaste", "Egged", "Vibrating"],
				AllowBlock: ["ItemVulva", "ItemButt", "ItemVulvaPiercings"],
				AllowType: ["Open", "Closed", "Vibe", "Shock"],
				DynamicExpressionTrigger: C => {
					if (InventoryItemPelvisLoveChastityBeltLastAction == "Open") {
						return [{ Group: "Blush", Name: "Low", Timer: 10 }];
					} else if (InventoryItemPelvisLoveChastityBeltLastAction == "Closed") {
						return [{ Group: "Blush", Name: "Medium", Timer: 10 }];
					} else if (InventoryItemPelvisLoveChastityBeltLastAction == "Vibe") {
						return [{ Group: "Blush", Name: "Medium", Timer: 10 }];
					} else if (InventoryItemPelvisLoveChastityBeltLastAction == "Shock") {
						return [{ Group: "Blush", Name: "Medium", Timer: 10 }];
					} else if (InventoryItemPelvisLoveChastityBeltLastAction == "ShockTriggered") {
						var belt = InventoryGet(CharacterGetCurrent(), "ItemPelvis");
						var intensity = belt && belt.Property && belt.Property.Intensity;
						if (intensity == 0) {
							return [{ Group: "Blush", Name: "Low", Timer: 10 }];
						} else if (intensity == 1) {
							return [{ Group: "Blush", Name: "Medium", Timer: 10 }];
						} else if (intensity == 2) {
							return [{ Group: "Blush", Name: "High", Timer: 10 }];
						} else {
							return null;
						}
					} else {
						return null;
					}
				},
				Layer: [
					{ Name: "Open", AllowColorize: true, AllowTypes: ["", "Open"], HasType: false },
					{ Name: "Closed", AllowColorize: true, AllowTypes: ["Closed", "Vibe", "Shock"], HasType: false },
					{ Name: "Vibe", AllowColorize: false, AllowTypes: ["Vibe"], HasType: false, OverrideAllowPose: [] },
					{ Name: "Shock", AllowColorize: false, AllowTypes: ["Shock"], HasType: false, OverrideAllowPose: [] },
					{ Name: "Lock", AllowColorize: false, AllowTypes: ["", "Open", "Closed", "Vibe", "Shock"], HasType: false, OverrideAllowPose: [] },
					{ Name: "ShieldLock", AllowColorize: false, AllowTypes: ["Closed", "Vibe", "Shock"], HasType: false, OverrideAllowPose: [] },
				]
			},
			{ Name: "LeatherCrop", Value: 20, Wear: false, Activity: "SpankItem", BuyGroup: "LeatherCrop", Bonus: [{ Type: "KidnapDomination", Factor: 3 }], ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }, { Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ Name: "LeatherWhip", Value: 40, Wear: false, Activity: "SpankItem", BuyGroup: "LeatherWhip", Bonus: [{ Type: "KidnapBruteForce", Factor: 3 }], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }, { Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			AssetSpankingToys
		]
	},

	{
		Group: "ItemTorso",
		ParentGroup: "BodyUpper",
		Activity: ["Kiss", "Lick", "Nibble", "Tickle", "Spank", "Caress", "MassageHands", "MassageFeet", "Rub"],
		Category: "Item",
		Priority: 17,
		Default: false,
		AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Yoked", "Hogtied", "AllFours"],
		Color: ["Default"],
		Left: 125,
		Top: 200,
		Zone: [[100, 340, 300, 80]],
		Asset: [
			{ Name: "NylonRopeHarness", DefaultColor: "#909090", Value: 30, BuyGroup: ["NylonRope"], Prerequisite: "AccessTorso", Time: 20, Extended: true, AllowType: ["Harness", "Diamond", "Star", "Waist"], Audio: "RopeLong" },
			{ Name: "HempRopeHarness", DefaultColor: "#956B1C", Value: 60, Extended: true, Prerequisite: "AccessTorso", Time: 20, RemoveTime: 25, Difficulty: 3, BuyGroup: ["HempRope"], AllowType: ["Harness", "Diamond", "Star", "Waist"], Audio: "RopeLong" },
			{ Name: "LeatherHarness", Value: 60, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 50, AllowLock: true },
			{ Name: "AdultBabyHarness", DefaultColor: "#aaaaaa", Value: 50, Priority: 34, Time: 15, RemoveTime: 10, Difficulty: 3, AllowLock: true, ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }] },
			{ Name: "HarnessBra1", Priority: 20, Value: 30, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 8, BuyGroup: ["HarnessBra1"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"], AllowLock: true },
			{ Name: "HarnessBra2", Priority: 20, Value: 40, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 8, BuyGroup: ["HarnessBra2"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"], AllowLock: true },
			{ Name: "Corset2", Priority: 21, Value: 30, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 8, BuyGroup: ["Corset2"], Hide: ["ItemNipples", "ItemNipplesPiercings"], AllowLock: true },
			{ Name: "Corset3", Priority: 21, Value: 25, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 8, BuyGroup: ["Corset3"], Hide: ["ItemNipples", "ItemNipplesPiercings"], AllowLock: true },
			{ Name: "Corset4", Priority: 21, Value: 15, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 8, BuyGroup: ["Corset4"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"], AllowLock: true },
			{ Name: "Corset5", Priority: 21, Value: 20, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 8, BuyGroup: ["Corset5"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"], AllowLock: true },
			{ Name: "LeatherBreastBinder", Value: 30, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 50, AllowLock: true },
			{ Name: "LatexCorset1", Priority: 20, Value: 40, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 8, BuyGroup: ["LatexCorset1"], Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"], AllowLock: true },
			{ Name: "LeatherStrapBra1", Left: 150, Top: 200, Value: 15, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 5, AllowLock: true, BuyGroup: ["LeatherStrapBra1"] },
			{ Name: "CrotchChain", Value: 40, Prerequisite: "AccessTorso", Time: 15, RemoveTime: 10, Difficulty: 50, AllowLock: true },
			AssetSpankingToys
		]
	},

	{
		Group: "ItemNipples",
		ParentGroup: "BodyUpper",
		Activity: ["Kiss", "Lick", "Suck", "Nibble", "Pinch", "Caress"],
		Category: "Item",
		Priority: 22,
		Default: false,
		Color: ["Default"],
		AllowPose: ["AllFours"],
		Left: 150,
		Top: 200,
		Zone: [[100, 270, 100, 70]],
		Asset: [
			{ Name: "NippleClamp", Value: 25, Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }] },
			{ Name: "VibeNippleClamp", Value: 40, Effect: ["Egged"], Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }], AllowEffect: ["Egged", "Vibrating"] },
			{ Name: "VibratorRemote", Value: 50, Effect: ["Remote"], Wear: false, BuyGroup: "VibratorRemote" },
			{ Name: "ChainClamp", Value: 25, Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "ScrewClamps", Value: 35, Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "ChainTassles", Value: 45, Hide: ["ItemNipplesPiercings"], Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "HeartPasties", DefaultColor: "#800000", Value: 20, Hide: ["ItemNipplesPiercings"],  Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "TapedVibeEggs", Value: 30, Effect: ["Egged"], Prerequisite: "AccessBreast", Time: 5, AllowEffect: ["Egged", "Vibrating"] },
			{ Name: "NippleSuctionCups", Effect: [], Value: 25, Hide: ["ItemNipplesPiercings"],  Extended: true, Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }] },
			{ Name: "NippleTape" ,Value: 10, Hide: ["ItemNipplesPiercings"], Prerequisite: "AccessBreast", Time: 5, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "ChopStickNippleClamps", Value: 25, Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "KittyPasties", DefaultColor: "#444444", Value: 20, Hide: ["ItemNipplesPiercings"], Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "Clothespins", Value: 15, Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }] },
			{ Name: "NippleWeightClamps", Value: 35, Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 10 }] },
			{ Name: "BellClamps", Value: 20, Prerequisite: "AccessBreast", Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 10 }] },
			AssetSpankingToys
		]
	},
	
	{
		Group: "ItemNipplesPiercings",
		ParentGroup: "BodyUpper",
		Category: "Item",
		Priority: 13,
		Default: false,
		Color: ["Default"],
		AllowPose: ["AllFours"],
		Left: 150,
		Top: 200,
		Zone: [[200, 270, 100, 70]],
		Asset: [
			{ Name: "StraightPiercing", Value: 10, Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Difficulty: 10, Time: 15, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }] },
			{ Name: "RoundPiercing", Value: 30, Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Difficulty: 10, Time: 15, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }], Extended: true, AllowType: ["Base", "Chain"] },
			{ Name: "WeightedPiercing", Value: 40, Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Difficulty: 10, Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }], Extended: true, AllowType: ["Base", "Chain"] },
			{ Name: "NippleAccessory1", Value: 15, Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, },
			{ Name: "NippleAccessory2", Value: 15, Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, },
			{ Name: "NippleAccessory3", Value: 15, Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Difficulty: 10, Time: 5, },
			{ Name: "BarbellPiercing", Value: 20, Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Difficulty: 10, Time: 15, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }] },
			{ Name: "NippleChastityPiercing1", Value: 50, Effect: ["BreastChaste"], Block: ["ItemNipples"], Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Time: 30, RemoveTime: 30, Difficulty: 50, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ Name: "NippleChastityPiercing2", Value: 50, Effect: ["BreastChaste"], Block: ["ItemNipples"], Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Time: 30, RemoveTime: 30, Difficulty: 50, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ 
				Name: "VibeHeartPiercings", Value: 40, Effect: ["Egged"], Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Difficulty: 10, Time: 10, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }], AllowEffect: ["Egged", "Vibrating"], BuyGroup: ["VibeHeart"], AllowLock: true,
				Layer: [
					{ Name: "Heart", AllowColorize: true },
					{ Name: "Ring", AllowColorize: false }
				]
			},
			{Name: "BellPiercing", Value: 30, AllowLock: true, Prerequisite: ["AccessBreast", "AccessBreastSuitZip"], AllowLock: true, Difficulty: 10, Time: 15, ExpressionTrigger: [{ Group: "Eyes", Name: "Closed", Timer: 5 }, { Group: "Eyebrows", Name: "Angry", Timer: 5 }] },
			AssetSpankingToys
		]
	},

	{
		Group: "ItemBreast",
		ParentGroup: "BodyUpper",
		Activity: ["Kiss", "Lick", "Tickle", "Slap", "Caress", "MasturbateHand", "Grope"],
		Category: "Item",
		Priority: 16,
		Default: false,
		Color: ["Default"],
		AllowPose: ["AllFours"],
		Left: 150,
		Top: 200,
		Zone: [[300, 270, 100, 70]],
		Asset: [
			{ Name: "MetalChastityBra", Value: 60, Effect: ["BreastChaste"], Block: ["ItemNipples", "ItemNipplesPiercings"], Hide: ["ItemNipples", "ItemNipplesPiercings"], Prerequisite: "AccessBreast", AllowLock: true, Time: 15, Difficulty: 50, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ Name: "PolishedChastityBra", Value: 100, Effect: ["BreastChaste"], Block: ["ItemNipples", "ItemNipplesPiercings"], Hide: ["ItemNipples", "ItemNipplesPiercings"], Prerequisite: "AccessBreast", AllowLock: true, Time: 15, Difficulty: 50, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ Name: "OrnateChastityBra", Value: 150, Effect: ["BreastChaste"], Block: ["ItemNipples", "ItemNipplesPiercings"], Hide: ["ItemNipples", "ItemNipplesPiercings"], Prerequisite: "AccessBreast", AllowLock: true, Time: 15, Difficulty: 50, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }],
			Layer: [
					{ Name: "Bra", AllowColorize: true },
					{ Name: "Gems", AllowColorize: false }
				]
			},
			{ Name: "LeatherCrop", Value: 20, Wear: false, Activity: "SpankItem", BuyGroup: "LeatherCrop", Bonus: [{ Type: "KidnapDomination", Factor: 3 }], ExpressionTrigger: [{ Group: "Blush", Name: "Low", Timer: 10 }, { Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ Name: "LeatherWhip", Value: 40, Wear: false, Activity: "SpankItem", BuyGroup: "LeatherWhip", Bonus: [{ Type: "KidnapBruteForce", Factor: 3 }], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 10 }, { Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			AssetSpankingToys
		]
	},

	{
		Group: "ItemArms",
		ParentGroup: "BodyUpper",
		Activity: ["Kiss", "Lick", "Nibble", "Tickle", "Spank", "Pinch", "Caress", "MassageHands", "Grope", "Cuddle"],
		Category: "Item",
		Priority: 31,
		Default: false,
		IsRestraint: true,
		Color: ["Default"],
		Left: 50,
		Top: 200,
		Zone: [[10, 200, 90, 200], [400, 200, 90, 200]],
		Asset: [
			{ Name: "NylonRope", DefaultColor: "#909090", SelfBondage: 2, Value: 30, BuyGroup: ["NylonRope"], SetPose: ["BackBoxTie"], Effect: ["Block", "Prone"], Time: 15, Audio: "RopeLong" },
			{ Name: "HempRope", DefaultColor: "#956B1C", Extended: true, SelfBondage: 2, Value: 60, SetPose: ["BackBoxTie"], AllowType: ["Hogtied", "SuspensionHogtied", "AllFours", "WristTie", "WristElbowTie", "RopeCuffs", "WristElbowHarnessTie"], BuyGroup: ["HempRope"], Effect: ["Block", "Prone"], AllowEffect: ["Freeze", "Block", "Prone", "ForceKneel"], AllowBlock: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"], HideItem: ["ItemDevicesTeddyBear"], Time: 20, Difficulty: 3, RemoveItemOnRemove: [{ Name: "SuspensionHempRope", Group: "ItemHidden" }], Audio: "RopeLong" },
			{ Name: "MetalCuffs", Priority: 29, Value: 40, SetPose: ["BackCuffs"], Effect: ["Block", "Prone", "Lock"], Difficulty: 5, Time: 5 },
			{ Name: "SturdyLeatherBelts", SelfBondage: 4, AllowLock: true, Value: 50, SetPose: ["BackElbowTouch"], Effect: ["Block", "Prone"], Time: 20, Difficulty: 5, BuyGroup: "SturdyLeatherBelts", Extended: true, AllowType: ["One", "Two", "Three", "Four"] },
			{ Name: "LeatherArmbinder", DefaultColor: "#404040", Extended: true, SelfBondage: 7, SelfUnlock: false, Priority: 6, Value: 80, SetPose: ["BackElbowTouch"], Effect: ["Block", "Prone"], Block: ["ItemHands"], Time: 25, RemoveTime: 10, Difficulty: 10, AllowLock: true, RemoveItemOnRemove: [{ Name: "LeatherArmbinderStrap", Group: "ItemHidden" },{ Name: "LeatherArmbinderWrapStrap", Group: "ItemHidden"}] },
			{ Name: "ArmbinderJacket", Priority: 33, SelfBondage: 8, SelfUnlock: false, Value: 100, SetPose: ["BackElbowTouch", "Bolero"], Hide: ["Cloth"], Effect: ["Block", "Prone"], Block: ["ItemHands"], Time: 35, RemoveTime: 25, Difficulty: 12, AllowLock: true },
			{ Name: "LeatherCuffs", DefaultColor: "#404040", Priority: 29, Random: false, Value: 100, AllowPose: ["BackBoxTie", "BackElbowTouch"], Time: 20, Difficulty: 3, Extended: true, AllowLock: true, AllowEffect: ["Block", "Prone"], AllowType: ["Wrist", "Elbow", "Both"] },
			{ Name: "OrnateCuffs", Priority: 29, Random: false, Value: 200, AllowPose: ["BackBoxTie", "BackElbowTouch"], Time: 20, Difficulty: 4, Extended: true, AllowLock: true, AllowEffect: ["Block", "Prone"], AllowType: ["Wrist", "Elbow", "Both"],
			Layer: [
					{ Name: "Cuffs", AllowColorize: true },
					{ Name: "Gems", AllowColorize: false }
				]
			},
			{ Name: "MittenChain1", Random: false, SelfBondage: 5, Value: -1, Block: ["ItemHands", "ItemTorso"], Time: 15, Difficulty: 5, AllowLock: true },
			{ Name: "FourLimbsShackles", Enable: false, Value: -1, SetPose: ["BackBoxTie"], Effect: ["Block", "Prone", "Lock"], Time: 30 },
			{ Name: "Manacles", Random: false, Value: 120, AllowLock: true, SelfBondage: 1, Difficulty: 16, SetPose: ["BackBoxTie", "Kneel"], Effect: ["Block", "Freeze", "Prone", "ForceKneel"], Time: 30, Prerequisite: ["NoItemFeet", "NotMounted", "NotSuspended", "NotHogtied", "NotKneelingSpread"], Block: ["ItemFeet"] },
			{ Name: "FullBodyShackles", Random: false, Value: 150, AllowLock: true, Difficulty: 18, AllowPose: ["LegsClosed", "Kneel"], Effect: ["Prone", "Shackled"], Prerequisite: ["NoItemFeet", "NotMounted", "NotSuspended", "NotHogtied", "NotKneelingSpread"], Block: ["ItemFeet"]},
			{ Name: "WristShackles", Random: false, Value: 80, AllowPose: ["BackCuffs"], Time: 20, Difficulty: 6, Extended: true, AllowLock: true, AllowEffect: ["Block", "Prone"], Effect: ["Prone"], AllowType: ["Behind"] },
			{ Name: "StraitLeotard", DefaultColor: "#70C0C0", SelfBondage: 7, SelfUnlock: false, Value: 120, SetPose: ["BackElbowTouch"], Hide: ["Cloth", "ItemNipplesPiercings"], HideItem: ["ItemButtAnalBeads2", "ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerGown2Skirt", "ItemVulvaVibratingDildo", "ItemVulvaInflatableVibeDildo", "ItemVulvaClitSuctionCup"], Block: ["ItemNipples", "ItemNipplesPiercings", "ItemVulva", "ItemVulvaPiercings", "ItemButt", "ItemPelvis", "ItemTorso", "ItemBreast", "ItemHands"], Effect: ["Block", "Prone"], Time: 35, RemoveTime: 20, Difficulty: 13, AllowLock: true },
			{ Name: "StraitJacket", DefaultColor: "#A0A0A0", SelfBondage: 8, SelfUnlock: false, Extended: true, Value: 150, SetPose: ["BackElbowTouch"], Hide: ["Cloth", "ItemNipplesPiercings"], HideItem: ["ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerGown2Skirt"], Block: ["ItemNipples", "ItemNipplesPiercings", "ItemTorso", "ItemBreast", "ItemHands"], Effect: ["Block", "Prone"], Time: 35, RemoveTime: 20, Difficulty: 6, AllowLock: true },	
			{ Name: "CollarCuffs", SelfBondage: 3, SelfUnlock: false, Extended: true, Value: 60, Prerequisite: "Collared", SetPose: ["BackBoxTie"], Block: ["ItemHands", "ItemNeck"], Effect: ["Block", "Prone"], Time: 35, RemoveTime: 20, Difficulty: 9, AllowLock: true, Visible: false },
			{ Name: "LeatherStraitJacket", SelfBondage: 8, SelfUnlock: false, Extended: true, Value: 200, SetPose: ["BackElbowTouch"], Hide: ["Cloth", "ItemNipplesPiercings"], HideItem: ["ClothLowerSkirt1", "ClothLowerSkirt2", "ClothLowerSkirt3", "ClothLowerTennisSkirt1", "ClothLowerGown2Skirt"], Block: ["ItemNipples", "ItemNipplesPiercings", "ItemTorso", "ItemBreast", "ItemHands"], Effect: ["Block", "Prone"], Time: 45, RemoveTime: 30, Difficulty: 7, AllowLock: true, AllowType: ["Normal", "Snug", "Tight"] },
			{ 
				Name: "Bolero", Priority: 33, DefaultColor: "#E080A0", SelfBondage: 7, SelfUnlock: false, Value: 100, SetPose: ["BackElbowTouch", "Bolero"], Block: ["ItemHands"], Effect: ["Block", "Prone"], Time: 35, RemoveTime: 20, Difficulty: 11, AllowLock: true,
				Layer: [
					{ Name: "Leather", AllowColorize: true },
					{ Name: "Belts", AllowColorize: false }
				]
			},
			{ Name: "DuctTape", SelfBondage: 4, Extended: true, Value: 50, SetPose: ["BackElbowTouch"], Hide: ["ItemNipplesPiercings"], Effect: ["Block", "Prone"], Time: 20, RemoveTime: 10, Difficulty: 5, BuyGroup: "DuctTape", AllowBlock: ["ItemVulva", "ItemVulvaPiercings", "ItemButt", "ItemPelvis", "ItemTorso", "ItemBreast", "ItemNipples", "ItemNipplesPiercings"], AllowType: ["Bottom", "Top", "Full", "Complete"], ParentGroup: ["BodyLower"], AllowPose: ["Horse", "KneelingSpread"] },
			{ 
				Name: "BitchSuit", DefaultColor: "#888888", Random: false, Extended: true, SelfBondage: 8, SelfUnlock: false, Value: 200, Time: 40, RemoveTime: 30, Difficulty: 15, AllowLock: true,
				SetPose: ["BackElbowTouch", "Kneel", "StraitDressOpen"],
				Hide: ["Cloth", "ClothLower", "Bra", "Panties", "BodyLower", "Shoes", "Socks", "ItemBoots", "ItemNipplesPiercings", "ItemLegs", "ItemFeet"],
				Block: ["ItemPelvis", "ItemTorso", "ItemBreast", "ItemHands"],
				Effect: ["Block", "Prone", "ForceKneel"],
				Prerequisite: ["NotSuspended", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader"],
				AllowBlock: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings", "ItemVulvaPiercings", "ItemButt"],
				AllowType: ["", "UnZip", "Latex"],
				Layer: [
				    { Name: "Latex", AllowColorize: true, AllowTypes: [""], HasType: false },
					{ Name: "UnZip", AllowColorize: true, AllowTypes: ["UnZip"], HasType: false }
				]
			},
			{ 
				Name: "BitchSuitExposed", DefaultColor: "#888888", Random: false, SelfBondage: 8, SelfUnlock: false, Value: 175, Time: 40, RemoveTime: 30, Difficulty: 15, AllowLock: true,
				SetPose: ["BackElbowTouch", "Kneel", "StraitDressOpen"],
				Hide: ["Cloth", "ClothLower", "BodyLower", "Shoes", "Socks", "ItemBoots", "ItemLegs", "ItemFeet"],
				Block: ["ItemPelvis", "ItemTorso", "ItemBreast", "ItemHands"],
				Effect: ["Block", "Prone", "ForceKneel"],
				Prerequisite: ["NotSuspended", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader"]
			},
			{ Name: "CollarLeashHolding", Random: false, Priority: 36, Value: -1, Time: 3, RemoveTime: 3, Difficulty: 1, Prerequisite: ["NotSuspended", "NotHogtied"] },
			{
			    Name: "StraitDress", DefaultColor: "#4040C0", AllowPose: ["Kneel"], Random: false, SelfBondage: 8, SelfUnlock: false, Value: 200, SetPose: ["BackElbowTouch", "LegsClosed"], Hide: ["Socks", "BodyLower", "Cloth", "ClothLower", "Bra", "Shoes", "ItemBoots", "ItemNipplesPiercings", "ItemLegs", "Suit", "SuitLower"], Block: ["ItemPelvis", "ItemTorso", "ItemBreast", "ItemHands", "ItemFeet", "ItemNipples", "ItemNipplesPiercings", "ItemVulva", "ItemVulvaPiercings", "ItemLegs", "ItemButt"], Effect: ["Block", "Prone"], HideItem: ["ItemFeetNylonRope", "ItemFeetHempRope", "ItemFeetLeatherBelt", "ItemFeetIrish8Cuffs", "ItemFeetDuctTape", "ItemFeetMermaidRopeTie", "ItemFeetLeatherAnkleCuffs"], Time: 40, RemoveTime: 30, Difficulty: 15, AllowLock: true, Prerequisite: ["NotSuspended", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader"],
				Layer: [
					{ Name: "Latex", AllowColorize: true },
					{ Name: "Belts", AllowColorize: false }
				]
			},
			{
			    Name: "StraitDressOpen", DefaultColor: "#400000", AllowPose: ["Kneel"], Random: false, SelfBondage: 8, SelfUnlock: false, Value: 200, SetPose: ["BackElbowTouch", "StraitDressOpen"], Hide: ["Cloth", "BodyLower", "Shoes", "ItemBoots", "ItemNipplesPiercings", "ItemLegs", "Suit"], Block: ["ItemPelvis", "ItemTorso", "ItemBreast", "ItemHands", "ItemFeet", "ItemNipples", "ItemNipplesPiercings", "ItemLegs"], Effect: ["Block", "Prone"], HideItem: ["ItemFeetNylonRope", "ItemFeetHempRope", "ItemFeetLeatherBelt", "ItemFeetIrish8Cuffs", "ItemFeetDuctTape", "ItemFeetMermaidRopeTie", "ItemFeetLeatherAnkleCuffs"], Time: 40, RemoveTime: 30, Difficulty: 15, AllowLock: true, Prerequisite: ["NotSuspended", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader"],
				Layer: [
					{ Name: "Latex", AllowColorize: true },
					{ Name: "Belts", AllowColorize: false }
				]
			},
			{ Name: "Yoke", Value: 80, SetPose: ["Yoked"], SelfBondage: 6, Priority: 39, Effect: ["Block", "Prone"], Time: 20, Difficulty: 10, AllowLock: true },
			{ Name: "Pillory", Random: false, Value: -1, SetPose: ["Yoked"], SelfBondage: 5, Priority: 44, Effect: ["Block", "Prone"], Time: 20, Difficulty: 12, AllowLock: true },
			{
				Name: "FullLatexSuit", DefaultColor: "#888888", Random: false, SelfBondage: 8, Value: 200, Time: 40, RemoveTime: 30, Difficulty: 15, AllowLock: true, Extended: true,
				SetPose: ["BackElbowTouch", "StraitDressOpen"],
				Hide: ["Socks", "BodyLower", "Cloth", "ClothLower", "Bra", "Shoes", "ItemBoots", "ItemLegs", "ItemFeet", "Suit", "SuitLower"],
				Block: ["ItemBoots", "ItemPelvis", "ItemTorso", "ItemHands", "ItemLegs", "ItemFeet"],
				Effect: ["Block", "Prone", "Freeze", "BlockKneel"],
				Prerequisite: ["NotSuspended", "NotKneeling", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader", "NotKneelingSpread", "NoFeetSpreader", "NotShackled", "CannotBeSuited"],
				AllowEffect: ["Egged", "Vibrating"],
				AllowBlock: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings", "ItemVulvaPiercings", "ItemButt"],
				AllowType: ["", "Base", "UnZip", "Latex"],
				RemoveItemOnRemove: [ { Name: "FullLatexSuitWand", Group: "ItemVulva" } ],
				Layer: [
				    { Name: "Latex", AllowColorize: true, AllowTypes: ["", "Base"], HasType: false },
					{ Name: "UnZip", AllowColorize: true, AllowTypes: ["UnZip", "Base"], HasType: false },
					{ Name: "Base", AllowColorize: false, AllowTypes: ["", "Base", "UnZip", "Latex"], HasType: false }
				]
			},
			{ Name: "Zipties", SelfBondage: 1, Value: 20, SetPose: ["BackElbowTouch"], Effect: ["Block", "Prone"], Difficulty: 6, BuyGroup: "Zipties", RemoveTime: 6 },
			{ Name: "BoxTieArmbinder", SelfBondage: 7, SelfUnlock: false, Value: 140, SetPose: ["BackElbowTouch", "Bolero"], Block: ["ItemHands"], Effect: ["Block", "Prone"], Time: 40, RemoveTime: 30, Difficulty: 11, AllowLock: true },
			{ 
				Name: "BondageBouquet", Value: 40, Priority: 41, Difficulty: 3, Effect: ["Prone"], Time: 15, AllowLock: true, Random: false, BuyGroup: "Bouquet",
				Layer: [
					{ Name: "Base", AllowColorize: false },
					{ Name: "Flowers", AllowColorize: true }
				]
			},
			{ Name: "Chains", Extended: true, SelfBondage: 3, Value: 90, AllowLock: true, SetPose: ["BackBoxTie"], AllowType: ["Hogtied", "SuspensionHogtied", "AllFours", "WristTie", "WristElbowTie", "ChainCuffs"], BuyGroup: "Chains", Effect: ["Block", "Prone"], AllowEffect: ["Freeze", "Block", "Prone", "ForceKneel"], AllowBlock: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"], Time: 30, Difficulty: 5, RemoveItemOnRemove: [{ Name: "SuspensionChains", Group: "ItemHidden" }] },
			{ Name: "ChainLeashHolding", Random: false, Priority: 36, Value: -1, Time: 3, RemoveTime: 3, Difficulty: 1, Prerequisite: ["NotSuspended", "NotHogtied"] },
			{
			    Name: "PetCrawler", Random: false, Value: 80, SetPose: ["AllFours"], SelfBondage: 7, Priority: 39, Effect: ["Block", "Prone", "ForceKneel"], Time: 20, Difficulty: 10, AllowLock: true,
	            Hide: ["ItemBoots", "Suit", "Panties", "Bra"], 
				HideItem: ["ItemButtRaccoonTailPlug", "TailStrapsRaccoonTailStrap", "ItemButtKittenTail1", "TailStrapsKittenTail1", "ItemNipplesPiercingsNippleChastityPiercing2", "ItemTorsoAdultBabyHarness", "ItemTorsoCorset2", "ItemTorsoCorset3", "ItemNipplesPiercingsNippleChastityPiercing1", "ItemNipplesChainTassles", "ItemNipplesHeartPasties", "ItemNipplesNippleTape", "ItemNipplesKittyPasties"],
				Block: ["ItemLegs", "ItemFeet"],
				Prerequisite: ["NoItemFeet", "NoItemLegs", "LegsOpen", "NotMounted", "NotHorse", "NotSuspended", "NotYoked", "NotKneelingSpread", "NoFeetSpreader", "StraitDressOpen" ] },
				{
					Name: "MermaidSuit", DefaultColor: "#400000", Random: false, SelfBondage: 6, Value: 200, Time: 40, RemoveTime: 30, Difficulty: 15, AllowLock: true, Extended: true,
					SetPose: ["BackElbowTouch", "StraitDressOpen"],
					Hide: ["Socks", "BodyLower", "Cloth", "ClothLower", "Bra", "Shoes", "ItemBoots", "ItemLegs", "Suit", "SuitLower", "ItemPelvis", "ItemFeet", "Panties"],
					Block: ["ItemBoots", "ItemPelvis", "ItemTorso", "ItemHands", "ItemLegs", "ItemFeet"],
					Effect: ["Block", "Prone", "Freeze", "BlockKneel"],
					HideItem: ["ItemFeetNylonRope", "ItemFeetHempRope", "ItemFeetLeatherBelt", "ItemFeetIrish8Cuffs", "ItemFeetDuctTape", "ItemFeetMermaidRopeTie", "ItemFeetLeatherAnkleCuffs"],
					Prerequisite: ["NotSuspended", "NotKneeling", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader", "NotKneelingSpread", "NoFeetSpreader", "NotShackled", "CannotBeSuited"],
					AllowEffect: ["Egged", "Vibrating"],
					AllowBlock: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings", "ItemVulvaPiercings", "ItemButt"],
					AllowType: ["", "UnZip", "Latex"],
					Layer: [
						{ Name: "Latex", AllowColorize: true, AllowTypes: [""], HasType: false },
						{ Name: "UnZip", AllowColorize: true, AllowTypes: ["UnZip"], HasType: false }
					]
				},	
			AssetSpankingToys
		]
	},

	{
		Group: "ItemHands",
		ParentGroup: "BodyUpper",
		Activity: ["Kiss", "PoliteKiss", "Lick", "Suck", "Nibble", "Spank", "Caress", "TakeCare"],
		Category: "Item",
		Priority: 35,
		Default: false,
		IsRestraint: true,
		Color: ["Default"],
		Zone: [[10, 400, 90, 200], [400, 400, 90, 200]],
		Asset: [
			{ Name: "PaddedMittens", SelfBondage: 2, DefaultColor: "#bbbbbb", Value: 40, AllowPose: ["BackBoxTie", "BackElbowTouch", "BackCuffs", "Yoked", "AllFours"], Effect: ["Block", "Prone"], Extended: true, Time: 15, Difficulty: 4, AllowLock: true },
			{ Name: "PawMittens", SelfBondage: 1, DefaultColor: "#bbbbbb", Value: 50, AllowPose: ["BackBoxTie", "BackElbowTouch", "BackCuffs", "Yoked", "AllFours"], Effect: ["Block", "Prone"], Extended: true, Time: 15, Difficulty: 4, AllowLock: true },
			{ Name: "LeatherMittens", SelfBondage: 4, Value: 60, SetPose: ["TapedHands"], AllowPose: ["BackBoxTie", "BackElbowTouch", "BackCuffs", "Yoked", "AllFours"], Effect: ["Block", "Prone"], Time: 15, RemoveTime: 5, Difficulty: 5, AllowLock: true },
			{ Name: "PaddedLeatherMittens", SelfBondage: 5, Value: 70, SetPose: ["TapedHands"], AllowPose: ["BackBoxTie", "BackElbowTouch", "BackCuffs", "Yoked", "AllFours"], Effect: ["Block", "Prone"], Time: 15, RemoveTime: 5, Difficulty: 6, AllowLock: true },
			{ Name: "PolishedMittens", SelfBondage: 6, Value: 80, AllowPose: ["BackBoxTie", "BackElbowTouch", "BackCuffs", "Yoked", "AllFours"], Effect: ["Block", "Prone"], Time: 20, RemoveTime: 10, Difficulty: 8, AllowLock: true  },
			{ Name: "DuctTape", SelfBondage: 3, Value: 50, SetPose: ["TapedHands"], AllowPose: ["BackBoxTie", "BackElbowTouch", "BackCuffs", "Yoked", "AllFours"], Hide: ["Gloves"], Effect: ["Block", "Prone"], Time: 20, RemoveTime: 10, Difficulty: 5, BuyGroup: "DuctTape" },
			{
				Name: "SpankingToys", Priority: 46, Wear: true,  IsRestraint: false, Extended: true, Random: false, BuyGroup: "SpankingToys", AllowType: ["Crop", "Flogger", "Cane", "HeartCrop", "Paddle", "WhipPaddle", "Whip", "CattleProd", "TennisRacket"], IgnoreParentGroup: true, AllowPose: ["BackBoxTie", "BackElbowTouch", "BackCuffs", "Yoked", "AllFours"],
				DynamicDescription: C => { return ((InventoryIsWorn(C, "SpankingToys", "ItemHands")) && (InventoryGet(C, "ItemHands").Property != null)) ? InventoryGet(C, "ItemHands").Property.Type : "Spanking Toy" },
				DynamicPreviewIcon: C => { return ((InventoryIsWorn(C, "SpankingToys", "ItemHands")) && (InventoryGet(C, "ItemHands").Property != null)) ? InventoryGet(C, "ItemHands").Property.Type : "Paddle" }
			}, {
				Name: "SpankingToysCrop", Value: 20, PrerequisiteBuyGroups: ["SpankingToys"], Random: false,
				DynamicAllowInventoryAdd: () => { return false }
			}, {
				Name: "SpankingToysFlogger", Value: 40, PrerequisiteBuyGroups: ["SpankingToys"], Random: false,
				DynamicAllowInventoryAdd: () => { return false }
			}, {
				Name: "SpankingToysCane", Value: 15, PrerequisiteBuyGroups: ["SpankingToys"], Random: false,
				DynamicAllowInventoryAdd: () => { return false }
			}, {
				Name: "SpankingToysHeartCrop", Value: 30, PrerequisiteBuyGroups: ["SpankingToys"], Random: false,
				DynamicAllowInventoryAdd: () => { return false }
			}, {
				Name: "SpankingToysPaddle", Value: 35, PrerequisiteBuyGroups: ["SpankingToys"], Random: false,
				DynamicAllowInventoryAdd: () => { return false }
			}, {
				Name: "SpankingToysWhipPaddle", Value: 25, PrerequisiteBuyGroups: ["SpankingToys"], Random: false,
				DynamicAllowInventoryAdd: () => { return false }
			}, {
				Name: "SpankingToysWhip", Value: 50, PrerequisiteBuyGroups: ["SpankingToys"], Random: false,
				DynamicAllowInventoryAdd: () => { return false }
			}, {
				Name: "SpankingToysCattleProd", Value: 45, PrerequisiteBuyGroups: ["SpankingToys"], Random: false,
				DynamicAllowInventoryAdd: () => { return false }
			}, {
				Name: "SpankingToysTennisRacket", Value: -1, PrerequisiteBuyGroups: ["SpankingToys"], Random: false,
				DynamicAllowInventoryAdd: () => { return false }
			}
		]
	},

	{
		Group: "ItemNeck",
		Category: "Item",
		Activity: ["Kiss", "Lick", "Nibble", "Caress", "MassageHands", "Choke"],
		Priority: 34,
		Default: false,
		Color: ["Default"],
		
		Left: 185,
		Top: 160,
		Zone: [[200, 200, 100, 70]],
		Asset: [
			{ Name: "LeatherCollar", Value: 20, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "LeatherCollarBell", Value: 30, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "LeatherCollarBow", Value: 25, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "SlaveCollar", Priority: 34, Random: false, Effect: ["Lock"], OwnerOnly: true, Extended: true, Enable: false, Value: -1, Time: 5, Difficulty: 50, AllowEffect: ["GagNormal"], AllowBlock: ["ItemMouth", "ItemMouth2", "ItemMouth3"], AllowType: ["SteelPosture", "LeatherPosture", "PetCollar", "HighCollar", "LeatherCollarBell", "LeatherCollarBow", "MaidCollar", "BatCollar", "HighSecurityCollar", "SpikeCollar", "BordelleCollar", "LeatherCorsetCollar", "StrictPostureCollar", "LatexPostureCollar", "HeartCollar", "NobleCorsetCollar", "OrnateCollar", "LoveLeatherCollar", "SlenderSteelCollar"]},
			{ Name: "ClubSlaveCollar", Random: false, Effect: ["Lock"], Enable: false, Value: -1, Time: 5, Difficulty: 50, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 15 }] },
			{ Name: "ShockCollar", Random: false, Extended: true, Effect: ["ReceiveShock"], BuyGroup: "ShockCollar", Value: 80, Time: 15, Difficulty: 50, AllowLock: true, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }] },
			{ Name: "ShockCollarRemote", Random: false, Wear: false, Effect: ["TriggerShock"], BuyGroup: "ShockCollar", Value: -1, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }, { Group: "Blush", Name: "Soft", Timer: 15 }, { Group: "Eyes", Name: "Closed", Timer: 5 }] },
			{ Name: "BatCollar", Value: 25, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "PostureCollar", Value: 40, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "SteelPostureCollar", Value: 60, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "DogCollar", Random: false, Value: 20, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "SpikeCollar", Value: 40, Time: 5, Difficulty: 50, AllowLock: true },
			{
				Name: "HighCollar", Value: 50, Time: 5, Difficulty: 50, AllowLock: true,
				Layer: [
					{ Name: "Leather", AllowColorize: true },
					{ Name: "Rings", AllowColorize: false }
				]
			},
			{ Name: "LeatherChoker", Value: 10, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "PetCollar", Value: -1, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "MaidCollar", Value: 30, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "BordelleCollar", Value: 30, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "LoveLeatherCollar", Value: 50, Time: 5, Difficulty: 50, LoverOnly: false, Random: false, AllowLock: true },
			{ Name: "StrictPostureCollar", Priority: 38, Value: 60, Time: 30, RemoveTime: 40, Difficulty: 50, AllowLock: true },
			{ Name: "NobleCorsetCollar", Value: 45, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "HeartCollar", Value: 50, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "LatexPostureCollar", IsRestraint: true, Priority: 38, Random: false, BuyGroup: ["LatexPostureCollar"], Block: ["ItemMouth"], Effect: ["GagNormal"], Value: 80, Time: 20, RemoveTime: 30, Difficulty: 50, AllowLock: true },
			{ Name: "LeatherCorsetCollar", IsRestraint: true, DefaultColor: "#404040", Random: false, Priority: 38, BuyGroup: ["LeatherCorsetCollar"], Block: ["ItemMouth"], Effect: ["GagNormal"], Value: 75, Time: 20, RemoveTime: 30, Difficulty: 50, AllowLock: true },
			{ Name: "HighSecurityCollar", Value: 70, Time: 5, Difficulty: 50, AllowLock: true },
			{ Name: "OrnateCollar", Value: 80, Time: 5, Difficulty: 50, AllowLock: true ,
			Layer: [
					{ Name: "Collar", AllowColorize: true },
					{ Name: "Gem", AllowColorize: false }
				]
			},
			{ Name: "SlenderSteelCollar", Value: 30, Time: 5, Difficulty: 50, AllowLock: true }
		]
	},

	{
		Group: "ItemNeckAccessories",
		Category: "Item",
		Priority: 41,
		Default: false,
		Color: ["Default"],
		Left: 0,
		Top: 190,
		Zone: [[100, 200, 100, 70]],
		Asset: [
			{ Name: "CollarBell", Value: 5, Random: false, Prerequisite: "Collared", Time: 5, Difficulty: 3, AllowLock: true },
			{ Name: "CollarBow", Value: 5, Random: false, Prerequisite: "Collared", Time: 5, Difficulty: 1 },
			{ Name: "CollarShockUnit", Value: 80, Random: false, Extended: true, Effect: ["ReceiveShock"], Prerequisite: "Collared", Time: 5, Difficulty: 6, AllowLock: true, BuyGroup: "ShockCollar", ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 15 }] },
			{ Name: "ShockCollarRemote", Random: false, Wear: false, Effect: ["TriggerShock"], BuyGroup: "ShockCollar", Value: -1, ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }, { Group: "Blush", Name: "Soft", Timer: 15 }, { Group: "Eyes", Name: "Closed", Timer: 5 }] },
			{ Name: "CollarNameTag", Value: 50, DefaultColor: "#aaa366", Random: false, IsRestraint: false, Prerequisite: "Collared", Time: 5, Difficulty: 20, Extended: true, AllowLock: true, PropertyLocked: true, AllowType: ["Angel", "BadGirl", "BindMe", "Bitch", "Boobs", "Cupcake", "Devil", "Dom", "Free", "FuckMe", "GagMe", "Goddess", "GoodGirl", "HoldMe", "Jewel", "Love", "Maid", "Meat", "Miss", "Mummy", "Nice", "Needy", "Owned", "Precious", "Pudding", "Queen", "Slave", "Slut", "Sub", "Sweetie", "Taken", "Toy", "Useless", "UseMe", "Whore"] },
			{ Name: "CollarNameTagOval", Value: 50, DefaultColor: "#aaa366", Random: false, IsRestraint: false, Prerequisite: "Collared", Time: 5, Difficulty: 20, Extended: true, AllowLock: true, PropertyLocked: true, AllowType: ["Babe", "Bandit", "Bimbo", "Bratty", "Chair", "Chaste", "Crazy", "Cumslut", "Cutie", "Damsel", "Doll", "EdgeMe", "Evil", "ForSale", "Greedy", "Happy", "Horny", "Kinky", "Lady", "LockMe", "Nude", "Nurse", "Nympho", "Painslut", "Pillow", "Punish", "Robber", "Sad", "Switch", "Table", "Ticklish", "Undress", "Victim", "Violent", "Worm"] },
			{ Name: "CollarNameTagPet", Value: 50, DefaultColor: "#aaa366", Random: false, IsRestraint: false, Prerequisite: "Collared", Time: 5, Difficulty: 20, Extended: true, AllowLock: true, PropertyLocked: true, AllowType: ["Bunny", "Cat", "Dog", "Foxy", "Kitten", "Kitty", "Mochi", "Panda", "Pet", "PetMe", "Pixie", "Pony", "Puppy", "Racoon", "Sloth"] },
			{ Name: "CollarNameTagLover", Value: -1, DefaultColor: "#aaa366", Random: false, IsRestraint: false, Prerequisite: "Collared", Time: 5, Difficulty: 20, Extended: true, AllowLock: true, PropertyLocked: true, AllowType: ["Cookie", "Feather", "Lover", "Muffin"] },
			{ Name: "CollarNameTagLivestock", Value: 50, Random: false, IsRestraint: false, Prerequisite: "Collared", Time: 5, Difficulty: 20, Extended: true, AllowLock: true, PropertyLocked: true, AllowType: ["Animal", "BreedMe", "Cow", "Meat", "MilkMe", "Pig"] },
			{ Name: "CollarMoon", Value: 5, Random: false, Prerequisite: "Collared", Time: 5, Difficulty: 3, AllowLock: true },
			{ Name: "CollarSun", Value: 10, Random: false, Prerequisite: "Collared", Time: 5, Difficulty: 3, AllowLock: true },
			{ Name: "CollarLapis", Value: 10, Random: false, Prerequisite: "Collared", Time: 5, Difficulty: 3, AllowLock: true },
			{ Name: "CollarPentagram", Value: 10, Random: false, Prerequisite: "Collared", Time: 5, Difficulty: 3, AllowLock: true },
			{ Name: "CollarFlower", Value: 5, Random: false, Prerequisite: "Collared", Time: 5, Difficulty: 1, AllowLock: true },
			{ Name: "CollarRose", Value: 5, Random: false, Prerequisite: "Collared", Time: 5, Difficulty: 1, AllowLock: true }
		]
	},

	{
		Group: "ItemNeckRestraints",
		Category: "Item",
		Priority: 40,
		Default: false,
		IsRestraint: true,
		Color: ["Default"],
		Left: 0,
		Top: 190,
		Zone: [[300, 200, 100, 70]],
		Asset: [
			{ Name: "CollarChainLong", Value: 30, Random: false, Prerequisite: ["Collared", "NotSuspended", "NotHogtied"], Time: 5, Difficulty: 6, AllowLock: true, BuyGroup: "CollarChain", AllowPose: ["Kneel", "Horse", "KneelingSpread", "AllFours"], Effect: ["Tethered"], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 15 }], ParentGroup: ["BodyLower"] },
			{ Name: "CollarChainShort", Value: -1, Random: false, Prerequisite: ["Collared", "AllFours", "NotSuspended", "NotHogtied", "NotMounted", "CanKneel"], Time: 5, Difficulty: 6, AllowLock: true, AllowPose: ["AllFours"], BuyGroup: "CollarChain", SetPose: ["Kneel"], Effect: ["Freeze", "ForceKneel"], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 15 }, { Group: "Eyebrows", Name: "Soft", Timer: 5 }] },
			{ Name: "CollarLeash", Value: 20, Random: false, Prerequisite: "Collared", Time: 5, AllowPose: ["AllFours"], Difficulty: 6, AllowLock: true, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 15 }] },
			{ Name: "CollarLeashTaken", Value: -1, Random: false, AllowPose: ["AllFours"], Prerequisite: "Collared", Time: 5, Difficulty: 6, AllowLock: true, Effect: ["Tethered"], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 15 }] },
			{ Name: "ChainLeash", Value: 25, Random: false, AllowPose: ["AllFours"], Prerequisite: "Collared", Time: 5, Difficulty: 6, AllowLock: true, ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 15 }] },
			{ Name: "ChainLeashTaken", Value: -1, AllowPose: ["AllFours"], Random: false, Prerequisite: "Collared", Time: 5, Difficulty: 6, AllowLock: true, Effect: ["Tethered"], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 15 }] },
			{ Name: "CollarChainMedium", Value: -1, Random: false, Prerequisite: ["Collared", "NotSuspended", "NotHogtied"], Time: 5, Difficulty: 6, AllowLock: true, BuyGroup: "CollarChain", AllowPose:  ["AllFours","Kneel"], Effect: ["Tethered"], ExpressionTrigger: [{ Group: "Blush", Name: "Medium", Timer: 15 }], ParentGroup: ["BodyLower"] },
		]
	},

	{
		Group: "ItemMouth",
		Category: "Item",
		Activity: ["Kiss", "FrenchKiss", "PoliteKiss", "Lick", "Nibble", "Caress"],
		Priority: 35,
		Default: false,
		IsRestraint: true,
		Effect: ["GagNormal"],
		Color: ["Default"],
		Left: 150,
		Top: 0,
		Zone: [[100, 130, 100, 70]],
		Asset: [
			{ Name: "ClothGag", DefaultColor: "#B0B0B0", Extended: true, Difficulty: -4, Value: 15, Time: 10, Effect: ["GagVeryLight"], AllowEffect: ["GagVeryLight", "GagLight", "GagEasy"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowType: ["Small", "Cleave", "OTM", "OTN"], BuyGroup: "ClothGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{
				Name: "WiffleGag", DefaultColor: "#FF6060", Effect: ["GagNormal"], Difficulty: 1, Value: 30, Time: 10, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowLock: true, BuyGroup: "WiffleGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Strap", AllowColorize: false },
					{ Name: "Ball", AllowColorize: true }
				]
			},
			{
				Name: "HarnessBallGag", DefaultColor: "#FF6060", Effect: ["GagMedium"], Difficulty: 4, Value: 60, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "HarnessBallGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Harness", AllowColorize: false },
					{ Name: "Ball", AllowColorize: true }
				]
			},
			{ Name: "HarnessPanelGag", DefaultColor: "#404040", Effect: ["GagEasy"], Difficulty: 6, Value: 80, Time: 20, AllowLock: true, Hide: ["Mouth"], BuyGroup: "HarnessPanelGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{
				Name: "RingGag", DefaultColor: "#404040", Effect: ["GagEasy"], Value: 30, Time: 5, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowLock: true, BuyGroup: "RingGag",  SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Mouth", AllowColorize: false },
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{ Name: "DuctTape", Extended: true, Difficulty: -2, Value: 50, Time: 10, RemoveTime: 5, BuyGroup: "DuctTape", Hide: ["Mouth"], Effect: ["GagVeryLight"], AllowEffect: ["GagVeryLight", "GagLight", "GagEasy", "GagNormal"], AllowType: ["Small", "Crossed", "Full", "Double", "Cover"], SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "PacifierGag", Random: false, Difficulty: -50, Effect: ["GagVeryLight"], Value: 10, Time: 2, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], BuyGroup: "PacifierGag", Block: ["ItemMouth2", "ItemMouth3"] },
			{ Name: "HarnessPacifierGag", Random: false, Difficulty: 2, Effect: ["GagLight"], Value: 50, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], BuyGroup: "HarnessPacifierGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "DusterGag", Priority: 42, Random: false, Effect: ["GagEasy"], Difficulty: 4, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], BuyGroup: "DusterGag", Block: ["ItemMouth2", "ItemMouth3"] },
			{ Name: "HarnessPonyBits", Random: false, Difficulty: 4, Effect: ["GagNormal"], Value: -1, Time: 20, AllowLock: true, BuyGroup: "HarnessPonyBits", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "PumpGag", DefaultColor: "#404040", Effect: [], Random: false, Extended: true, Value: 100, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }], AllowEffect: ["GagLight", "GagEasy", "GagMedium", "GagVeryHeavy"], BuyGroup: "PumpGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "KittyGag", Random: false, DefaultColor: "#A0A0A0", Effect: ["GagLight"], Difficulty: -4, Value: 20, Time: 10, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], BuyGroup: "KittyGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "KittenHarnessPanelGag", Random: false, DefaultColor: "#A0A0A0", Effect: ["GagEasy"], Difficulty: 6, Value: 80, Time: 20, AllowLock: true, Hide: ["Mouth"], BuyGroup: "KittenHarnessPanelGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "CarrotGag", Effect: ["GagMedium"], Random: false, Value: 40, Time: 15, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "CarrotGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "MuzzleGag", DefaultColor: "#404040", Difficulty: 6, Value: 70, Time: 20, AllowLock: true, Hide: ["Mouth"], BuyGroup: "MuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "RegularSleepingPill", Enable: false, Wear: false, Value: -1, Bonus: [{ Type: "KidnapSneakiness", Factor: 3 }] },
			{ Name: "PantiesMask", Effect: ["GagVeryLight"], Random: false, Value: 20, Time: 15, Hide: ["Mouth"], BuyGroup: "PantiesMask" },
			{
				Name: "PlugGag", Random: false, Extended: true, Value: 100, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }], Effect: ["GagEasy"], AllowEffect: ["GagEasy", "GagHeavy"], AllowType: ["Open", "Plug"], BuyGroup: "PlugGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat",
				Layer: [
					{ Name: "Strap", AllowColorize: true },
					{ Name: "Tongue", AllowColorize: false },
					{ Name: "Close", AllowColorize: true, AllowTypes: ["Plug"] }
				]
			},
			{
				Name: "DildoGag", Priority: 42, Random: false, DefaultColor: "#404040", Effect: ["GagMedium"], Difficulty: 4, Value: 60, Time: 20, AllowLock: true, Hide: ["Mouth"], BuyGroup: "DildoGag", Block: ["ItemMouth2", "ItemMouth3"], SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Strap", AllowColorize: false },
					{ Name: "Dildo", AllowColorize: true }
				]
			},
			{ Name: "BoneGag", Random: false, Difficulty: 6, Value: 50, Time: 10, Effect: ["GagLight"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowLock: true, BuyGroup: "BoneGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ 
				Name: "ChopstickGag", Difficulty: 2, Value: 15, Time: 10, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "ChopstickGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Chopsticks", AllowColorize: true },
					{ Name: "Tongue", AllowColorize: false }
				]
			},
			{
				Name: "BambooGag", DefaultColor: "#A07858", Difficulty: 6, Value: 30, Time: 10, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "BambooGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Rod", AllowColorize: false },
					{ Name: "Rope", AllowColorize: true }
				]
			},
			{ Name: "HarnessBallGag1", Effect: ["GagHeavy"], Difficulty: 4, Value: 75, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "HarnessBallGag1", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "PumpkinGag", Random: false, Effect: ["GagEasy"], Difficulty: 1, Value: 40, Time: 10, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "PumpkinGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{
				Name: "LipGag", Effect: ["GagLight"], Value: 40, Time: 5, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "LipGag",  SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Mouth", AllowColorize: false },
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{
				Name: "SpiderGag", Effect: ["GagEasy"], Value: 45, Time: 5, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "SpiderGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Mouth", AllowColorize: false },
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{
				Name: "ClothStuffing", Effect: ["GagLight"], Difficulty: -20, Value: 10, Time: 5, Hide: ["Mouth"], BuyGroup: "ClothStuffing",
				Layer: [
					{ Name: "Cheeks", AllowColorize: false },
					{ Name: "Cloth", AllowColorize: true }
				]
			},
			{
				Name: "PantyStuffing", DefaultColor: "#900000", Effect: ["GagLight"], Difficulty: -20, Value: 10, Time: 5, Hide: ["Mouth"], BuyGroup: "PantyStuffing",
				Layer: [
					{ Name: "Lips", AllowColorize: false },
					{ Name: "Cloth", AllowColorize: true }
				]
			},
			{ Name: "ChloroformCloth", Random: false, Effect: ["GagVeryLight"], Value: 40, Time: 2, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "High", Timer: 20 }, { Group: "Eyebrows", Name: "Soft", Timer: 180 }, { Group: "Eyes", Name: "Wink", Timer: 180 }] },
			{ Name: "ScarfGag", Effect: ["GagLight"], Value: 15, Time: 10, Hide: ["Mouth"], BuyGroup: "ScarfGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "LewdGag", Random: false, Effect: ["GagLight"], Value: 70, Time: 10, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], SetPose: ["GagFlat"], Prerequisite: "GagFlat", BuyGroup: "LewdGag" },
			{ Name: "DeepthroatGag", Random: false, DefaultColor: "#404040", Difficulty: 5, Effect: ["GagHeavy"], Value: 55, Time: 15, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Eyebrows", Name: "Raised", Timer: 10 }], BuyGroup: "DeepthroatGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "LeatherCorsetCollar", Random: false, DefaultColor: "#404040", Hide: ["Mouth"], BuyGroup: ["LeatherCorsetCollar"], Block: ["ItemNeck"], Value: 75, Time: 20, RemoveTime: 30, Difficulty: 50, AllowLock: true, BuyGroup: "LeatherCorsetCollar", SetPose: ["GagCorset"], Prerequisite: "GagCorset" },
			{ Name: "LatexPostureCollar", Random: false, Hide: ["Mouth"], BuyGroup: ["LatexPostureCollar"], Block: ["ItemNeck"], Value: 80, Time: 20, RemoveTime: 30, Difficulty: 50, AllowLock: true, BuyGroup: "LatexPostureCollar", SetPose: ["GagCorset"], Prerequisite: "GagCorset" },
			{ Name: "BitGag", Difficulty: 4, Effect: ["GagNormal"], Value: 40, Time: 20, ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowLock: true, BuyGroup: "BitGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "XLBoneGag", Random: false, Difficulty: 6, Value: 60, Time: 10, Effect: ["GagNormal"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowLock: true, BuyGroup: "XLBoneGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "DogMuzzleExposed", Random: false, Difficulty: 7, Value: 50, Time: 10, Effect: ["GagNormal"], AllowLock: true, Hide: ["Mouth"], Block: ["ItemMouth2", "ItemMouth3"] },
			{ Name: "FoxyHarnessPanelGag", Random: false, Difficulty: 6, Value: 40, Time: 20, Effect: ["GagNormal"], AllowLock: true, Hide: ["Mouth"], Block: ["ItemMouth2", "ItemMouth3"] },
			{ Name: "BallGag", Effect: ["GagMedium"], Difficulty: 2, Value: 40, Time: 10, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group:"Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "BallGag", SetPose:["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Strap", AllowColorize: false},
					{ Name: "Ball", AllowColorize: true}
				]
			},
			{
				Name: "TongueStrapGag", Effect: ["GagEasy"], Value: 35, Time: 15, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "TongueStrapGag",
				Layer: [
					{ Name: "Mouth", AllowColorize: false },
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{ Name: "BallGagMask", Effect: ["GagMedium"], Difficulty: 6, Value: 90, Time: 30, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "BallGagMask", SetPose:["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Strap", AllowColorize: false },
					{ Name: "Ball", AllowColorize: true }
				]
			},
			{
				Name: "HookGagMask", Effect: ["GagEasy"], Difficulty: 6, Value: 70, Time: 30, Effect: ["GagEasy"], AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "HookGagMask",
				Layer: [
					{ Name: "Mouth", AllowColorize: false },
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{
				Name: "DildoPlugGag", Random: false, Extended: true, Value: 100, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Eyebrows", Name: "Soft", Timer: 10 }], Effect: ["GagEasy"], AllowEffect: ["GagEasy", "GagVeryHeavy"], AllowType: ["Open", "Plug"], BuyGroup: "DildoPlugGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Strap", AllowColorize: true },
					{ Name: "Tongue", AllowColorize: false },
					{ Name: "Close", AllowColorize: true, AllowTypes: ["Plug"] }
				]
			},
			{ Name: "SteelMuzzleGag", Difficulty: 8, Value: 80, Time: 30, AllowLock: true, Hide: ["Mouth"], BuyGroup: "SteelMuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "StitchedMuzzleGag", Difficulty: 5, Value: 60, Time: 15, Effect: ["GagEasy"], AllowLock: true, Hide: ["Mouth"], BuyGroup: "StitchedMuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "LatexBallMuzzleGag", Difficulty: 6, Value: 65, Time: 15, Effect: ["GagMedium"], AllowLock: true, Hide: ["Mouth"], BuyGroup: "LatexBallMuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{
				Name: "SockStuffing", DefaultColor: "#FFFFFF", Effect: ["GagLight"], Difficulty: -20, Value: 10, Time: 5, Hide: ["Mouth"], BuyGroup: "SockStuffing",
				Layer: [
					{ Name: "Lips", AllowColorize: false },
					{ Name: "Cloth", AllowColorize: true }
				]
			}
		]
	},

	{
		Group: "ItemMouth2",
		Category: "Item",
		Priority: 36,
		Default: false,
		IsRestraint: true,
		Effect: ["GagNormal"],
		Color: ["Default"],
		Left: 150,
		Top: 0,
		Zone: [[200, 130, 100, 70]],
		Asset: [
			{ Name: "ClothGag", Random: false, DefaultColor: "#B0B0B0", Extended: true, Difficulty: -4, Value: -1, Time: 10, Effect: ["GagVeryLight"], AllowEffect: ["GagVeryLight", "GagLight", "GagEasy"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowType: ["Small", "Cleave", "OTM", "OTN"], Block: ["ItemMouth"], BuyGroup: "ClothGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{
				Name: "WiffleGag", Random: false, DefaultColor: "#FF6060", Effect: ["GagNormal"], Difficulty: 1, Value: -1, Time: 10, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth"], BuyGroup: "WiffleGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Strap", AllowColorize: false },
					{ Name: "Ball", AllowColorize: true }
				]
			},
			{
				Name: "HarnessBallGag", Random: false, DefaultColor: "#FF6060", Effect: ["GagMedium"], Difficulty: 4, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth"], BuyGroup: "HarnessBallGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Harness", AllowColorize: false },
					{ Name: "Ball", AllowColorize: true }
				]
			},
			{ Name: "HarnessPanelGag", Random: false, DefaultColor: "#404040", Effect: ["GagEasy"], Difficulty: 6, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], Block: ["ItemMouth"], BuyGroup: "HarnessPanelGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{
				Name: "RingGag", Random: false, DefaultColor: "#404040", Effect: ["GagEasy"], Value: -1, Time: 5, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth"], BuyGroup: "RingGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{ Name: "DuctTape", Random: false, Extended: true, Difficulty: -2, Value: -1, Time: 10, RemoveTime: 5, Hide: ["Mouth"], BuyGroup: "DuctTape", Effect: ["GagVeryLight"], AllowEffect: ["GagVeryLight", "GagLight", "GagEasy", "GagNormal"], AllowType: ["Small", "Crossed", "Full", "Double", "Cover"], Block: ["ItemMouth"], SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "HarnessPacifierGag", Random: false, Difficulty: 2, Effect: ["GagLight"], Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], Block: ["ItemMouth"], BuyGroup: "HarnessPacifierGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "DusterGag", Random: false, Priority: 42, Effect: ["GagEasy"], Difficulty: 4, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], BuyGroup: "DusterGag", Block: ["ItemMouth", "ItemMouth3"] },
			{ Name: "HarnessPonyBits", Random: false, Difficulty: 4, Effect: ["GagNormal"], Value: -1, Time: 20, AllowLock: true, Block: ["ItemMouth"], BuyGroup: "HarnessPonyBits", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "KittyGag", Random: false, DefaultColor: "#A0A0A0", Effect: ["GagLight"], Difficulty: -4, Value: -1, Time: 10, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], Block: ["ItemMouth"], BuyGroup: "KittyGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "KittenHarnessPanelGag", Random: false, DefaultColor: "#A0A0A0", Effect: ["GagEasy"], Difficulty: 6, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], Block: ["ItemMouth"], BuyGroup: "KittenHarnessPanelGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "CarrotGag", Random: false, Effect: ["GagMedium"], Random: false, Value: -1, Time: 15, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth"], BuyGroup: "CarrotGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "MuzzleGag", Random: false, DefaultColor: "#404040", Difficulty: 6, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], Block: ["ItemMouth"], BuyGroup: "MuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "PantiesMask", Random: false, Effect: ["GagVeryLight"], Random: false, Value: -1, Time: 15, Hide: ["Mouth"], Block: ["ItemMouth"], BuyGroup: "PantiesMask" },
			{
				Name: "DildoGag", Priority: 42, Random: false, DefaultColor: "#404040", Effect: ["GagMedium"], Difficulty: 4, Value: 60, Time: 20, AllowLock: true, Hide: ["Mouth"], BuyGroup: "DildoGag", Block: ["ItemMouth", "ItemMouth3"], SetPose: ["GagFlat"], Prerequisite: "GagFlat",
				Layer: [
					{ Name: "Strap", AllowColorize: false },
					{ Name: "Dildo", AllowColorize: true }
				]
			},
			{ Name: "BoneGag", Random: false, Difficulty: 6, Value: -1, Time: 10, Effect: ["GagLight"], AllowLock: true, ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth"], BuyGroup: "BoneGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "HarnessBallGag1", Random: false, Effect: ["GagHeavy"], Difficulty: 4, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth"], BuyGroup: "HarnessBallGag1", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "PumpkinGag", Random: false, Effect: ["GagEasy"], Difficulty: 1, Value: -1, Time: 10, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "PumpkinGag", Block: ["ItemMouth"], SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{
				Name: "LipGag", Random: false, Effect: ["GagLight"], Value: -1, Time: 5, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth"], BuyGroup: "LipGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{
				Name: "SpiderGag", Random: false, Effect: ["GagEasy"], Value: -1, Time: 5, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth"], BuyGroup: "SpiderGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{ Name: "ChloroformCloth", Random: false, Effect: ["GagVeryLight"], Value: -1, Time: 2, Hide: ["Mouth"], Block: ["ItemMouth"], ExpressionTrigger: [{ Group: "Blush", Name: "High", Timer: 20 }, { Group: "Eyebrows", Name: "Soft", Timer: 180 }, { Group: "Eyes", Name: "Wink", Timer: 180 }], BuyGroup: "ChloroformCloth", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "ScarfGag", Random: false, Effect: ["GagLight"], Value: -1, Time: 10, Hide: ["Mouth"], Block: ["ItemMouth"], BuyGroup: "ScarfGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "LewdGag", Random: false, Effect: ["GagLight"], Value: -1, Time: 10, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], Block: ["ItemMouth"], BuyGroup: "LewdGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "LeatherCorsetCollar", Random: false, DefaultColor: "#404040", Hide: ["Mouth"], BuyGroup: ["LeatherCorsetCollar"], Block: ["ItemNeck", "ItemMouth"], Value: -1, Time: 20, RemoveTime: 30, Difficulty: 50, AllowLock: true, BuyGroup: "LeatherCorsetCollar", SetPose: ["GagCorset"], Prerequisite: "GagCorset" },
			{ Name: "LatexPostureCollar", Random: false, Hide: ["Mouth"], BuyGroup: ["LatexPostureCollar"], Block: ["ItemNeck", "ItemMouth"], Value: -1, Time: 20, RemoveTime: 30, Difficulty: 50, AllowLock: true, BuyGroup: "LatexPostureCollar", SetPose: ["GagCorset"], Prerequisite: "GagCorset" },
			{ Name: "BitGag", Random: false, Difficulty: 4, Effect: ["GagNormal"], Value: -1, Time: 20, ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowLock: true, Block: ["ItemMouth"], BuyGroup: "BitGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "XLBoneGag", Random: false, Difficulty: 6, Value: -1, Time: 10, Effect: ["GagNormal"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowLock: true, Block: ["ItemMouth"], BuyGroup: "XLBoneGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "BallGag", Effect: ["GagMedium"], Difficulty: 2, Value: -1, Time: 10, AllowLock: true, Block: ["ItemMouth"],  Hide: ["Mouth"], ExpressionTrigger: [{ Group:"Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "BallGag", SetPose:["GagUnique"], Prerequisite: "GagUnique", Layer: [{ Name: "Strap", AllowColorize: false}, { Name: "Ball", AllowColorize: true}] },
			{ Name: "BallGagMask", Effect: ["GagMedium"], Difficulty: 6, Value: 90, Time: 30, AllowLock: true, Block: ["ItemMouth"], Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "BallGagMask", SetPose:["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Strap", AllowColorize: false },
					{ Name: "Ball", AllowColorize: true }
				]
			},
			{ Name: "SteelMuzzleGag", Difficulty: 8, Value: 80, Time: 30, AllowLock: true, Block: ["ItemMouth"], Hide: ["Mouth"], BuyGroup: "SteelMuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "StitchedMuzzleGag", Difficulty: 5, Value: 60, Time: 15, Effect: ["GagEasy"], AllowLock: true, Block: ["ItemMouth"], Hide: ["Mouth"], BuyGroup: "StitchedMuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "LatexBallMuzzleGag", Difficulty: 6, Value: 65, Time: 15, Effect: ["GagMedium"], AllowLock: true, Block: ["ItemMouth"], Hide: ["Mouth"], BuyGroup: "LatexBallMuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" }
		]
	},

	{
		Group: "ItemMouth3",
		Category: "Item",
		Priority: 37,
		Default: false,
		IsRestraint: true,
		Effect: ["GagNormal"],
		Color: ["Default"],
		Left: 150,
		Top: 0,
		Zone: [[300, 130, 100, 70]],
		Asset: [
			{ Name: "ClothGag", Random: false, DefaultColor: "#B0B0B0", Extended: true, Difficulty: -4, Value: -1, Time: 10, Effect: ["GagVeryLight"], AllowEffect: ["GagVeryLight", "GagLight", "GagEasy"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowType: ["Small", "Cleave", "OTM", "OTN"], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "ClothGag" },
			{
				Name: "WiffleGag", Random: false, DefaultColor: "#FF6060", Effect: ["GagNormal"], Difficulty: 1, Value: -1, Time: 10, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "WiffleGag",  SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Strap", AllowColorize: false },
					{ Name: "Ball", AllowColorize: true }
				]
			},
			{
				Name: "HarnessBallGag", Random: false, DefaultColor: "#FF6060", Effect: ["GagMedium"], Difficulty: 4, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "HarnessBallGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Harness", AllowColorize: false },
					{ Name: "Ball", AllowColorize: true }
				]
			},
			{ Name: "HarnessPanelGag", Random: false, DefaultColor: "#404040", Effect: ["GagEasy"], Difficulty: 6, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "HarnessPanelGag" },
			{
				Name: "RingGag", Random: false, DefaultColor: "#404040", Effect: ["GagEasy"], Value: -1, Time: 5, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "RingGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{ Name: "DuctTape", Random: false, Extended: true, Difficulty: -2, Value: -1, Time: 10, RemoveTime: 5, Hide: ["Mouth"], BuyGroup: "DuctTape", Effect: ["GagVeryLight"], AllowEffect: ["GagVeryLight", "GagLight", "GagEasy", "GagNormal"], AllowType: ["Small", "Crossed", "Full", "Double", "Cover"], Block: ["ItemMouth", "ItemMouth2"] },
			{ Name: "HarnessPacifierGag", Random: false, Difficulty: 2, Effect: ["GagLight"], Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "HarnessPacifierGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "DusterGag", Random: false, Priority: 42, Effect: ["GagEasy"], Difficulty: 4, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], BuyGroup: "DusterGag", Block: ["ItemMouth", "ItemMouth2"] },
			{ Name: "HarnessPonyBits", Random: false, Difficulty: 4, Effect: ["GagNormal"], Value: -1, Time: 20, AllowLock: true, Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "HarnessPonyBits", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "KittyGag", Random: false, DefaultColor: "#A0A0A0", Effect: ["GagLight"], Difficulty: -4, Value: -1, Time: 10, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "KittyGag" },
			{ Name: "KittenHarnessPanelGag", Random: false, DefaultColor: "#A0A0A0", Effect: ["GagEasy"], Difficulty: 6, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "KittenHarnessPanelGag" },
			{ Name: "CarrotGag", Effect: ["GagMedium"], Random: false, Value: -1, Time: 15, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "CarrotGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "MuzzleGag", Random: false, DefaultColor: "#404040", Difficulty: 6, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "MuzzleGag" },
			{ Name: "PantiesMask", Effect: ["GagVeryLight"], Random: false, Value: 20, Time: 15, Hide: ["Mouth"], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "PantiesMask" },
			{
				Name: "DildoGag", Priority: 42, Random: false, DefaultColor: "#404040", Effect: ["GagMedium"], Difficulty: 4, Value: 60, Time: 20, AllowLock: true, Hide: ["Mouth"], BuyGroup: "DildoGag", Block: ["ItemMouth", "ItemMouth2"], SetPose: ["GagFlat"], Prerequisite: "GagFlat",
				Layer: [
					{ Name: "Strap", AllowColorize: false },
					{ Name: "Dildo", AllowColorize: true }
				]
			},
			{ Name: "BoneGag", Random: false, Difficulty: 6, Value: -1, Time: 10, Effect: ["GagLight"], AllowLock: true, ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "BoneGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "HarnessBallGag1", Random: false, Effect: ["GagHeavy"], Difficulty: 4, Value: -1, Time: 20, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "HarnessBallGag1", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "PumpkinGag", Random: false, Effect: ["GagEasy"], Difficulty: 1, Value: -1, Time: 10, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "PumpkinGag", Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "PumpkinGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{
				Name: "LipGag", Random: false, Effect: ["GagLight"], Value: -1, Time: 5, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "LipGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{
				Name: "SpiderGag", Random: false, Effect: ["GagEasy"], Value: -1, Time: 5, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "SpiderGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Gag", AllowColorize: true }
				]
			},
			{ Name: "ChloroformCloth", Random: false, Effect: ["GagVeryLight"], Value: -1, Time: 2, Hide: ["Mouth"], Block: ["ItemMouth", "ItemMouth2"], ExpressionTrigger: [{ Group: "Blush", Name: "High", Timer: 20 }, { Group: "Eyebrows", Name: "Soft", Timer: 180 }, { Group: "Eyes", Name: "Wink", Timer: 180 }], BuyGroup: "ChloroformCloth", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "ScarfGag", Random: false, Effect: ["GagLight"], Value: -1, Time: 10, Hide: ["Mouth"], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "ScarfGag" },
			{ Name: "LewdGag", Random: false, Effect: ["GagLight"], Value: -1, Time: 10, AllowLock: true, Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }], Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "LewdGag" },
			{ Name: "LeatherCorsetCollar", Random: false, DefaultColor: "#404040", Hide: ["Mouth"], BuyGroup: ["LeatherCorsetCollar"], Block: ["ItemNeck", "ItemMouth", "ItemMouth2"], Value: -1, Time: 20, RemoveTime: 30, Difficulty: 50, AllowLock: true, BuyGroup: "LeatherCorsetCollar", SetPose: ["GagCorset"], Prerequisite: "GagCorset" },
			{ Name: "LatexPostureCollar", Random: false, Hide: ["Mouth"], BuyGroup: ["LatexPostureCollar"], Block: ["ItemNeck", "ItemMouth", "ItemMouth2"], Value: -1, Time: 20, RemoveTime: 30, Difficulty: 50, AllowLock: true, BuyGroup: "LatexPostureCollar", SetPose: ["GagCorset"], Prerequisite: "GagCorset" },
			{ Name: "BitGag", Random: false, Difficulty: 4, Effect: ["GagNormal"], Value: -1, Time: 20, ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowLock: true, Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "BitGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "XLBoneGag", Random: false, Difficulty: 6, Value: -1, Time: 10, Effect: ["GagNormal"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], AllowLock: true, Block: ["ItemMouth", "ItemMouth2"], BuyGroup: "XLBoneGag", SetPose: ["GagUnique"], Prerequisite: "GagUnique" },
			{ Name: "BallGag", Effect: ["GagMedium"], Difficulty: 2, Value: -1, Time: 10, AllowLock: true, Block: ["ItemMouth", "ItemMouth2"],  Hide: ["Mouth"], ExpressionTrigger: [{ Group:"Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "BallGag", SetPose:["GagUnique"], Prerequisite: "GagUnique", Layer: [{ Name: "Strap", AllowColorize: false}, { Name: "Ball", AllowColorize: true}] },
			{ Name: "BallGagMask", Effect: ["GagMedium"], Difficulty: 6, Value: 90, Time: 30, AllowLock: true, Block: ["ItemMouth", "ItemMouth2"], Hide: ["Mouth"], ExpressionTrigger: [{ Group: "Fluids", Name: "DroolSides", Timer: 30 }], BuyGroup: "BallGagMask", SetPose:["GagUnique"], Prerequisite: "GagUnique",
				Layer: [
					{ Name: "Strap", AllowColorize: false },
					{ Name: "Ball", AllowColorize: true }
				]
			},
			{ Name: "SteelMuzzleGag", Difficulty: 8, Value: 80, Time: 30, AllowLock: true, Block: ["ItemMouth", "ItemMouth2"], Hide: ["Mouth"], BuyGroup: "SteelMuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "StitchedMuzzleGag", Difficulty: 5, Value: 60, Time: 15, Effect: ["GagEasy"], AllowLock: true, Block: ["ItemMouth", "ItemMouth2"], Hide: ["Mouth"], BuyGroup: "StitchedMuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" },
			{ Name: "LatexBallMuzzleGag", Difficulty: 6, Value: 65, Time: 15, Effect: ["GagMedium"], AllowLock: true, Block: ["ItemMouth", "ItemMouth2"], Hide: ["Mouth"], BuyGroup: "LatexBallMuzzleGag", SetPose: ["GagFlat"], Prerequisite: "GagFlat" }
		]
	},

	{
		Group: "ItemHead",
		Category: "Item",
		Activity: ["Kiss", "Slap", "Caress", "TakeCare", "Pet", "Pull", "Cuddle", "Rub"],
		Priority: 43,
		Default: false,
		IsRestraint: true,
		Color: ["Default"],
		Left: 150,
		Top: 20,
		Zone: [[175, 0, 150, 130]],
		Asset: [
			{ Name: "ClothBlindfold", DefaultColor: "#A0A0A0", Effect: ["BlindLight", "Prone"], Hide: ["Glasses"], Value: 15, Time: 5 },
			{ Name: "LeatherBlindfold", DefaultColor: "#404040", Effect: ["BlindNormal", "Prone"], Hide: ["Glasses"], Value: 30, Time: 5, AllowLock: true },
			{ Name: "LeatherHood", DefaultColor: "#404040", Effect: ["BlindHeavy", "DeafLight", "Prone", "GagNormal"], Hide: ["HairFront", "HairBack", "Glasses", "ItemMouth", "ItemMouth2", "ItemMouth3",, "Eyes", "HairAccessory1", "HairAccessory2"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemEars", "ItemNeck"], Difficulty: 50, Value: 60, Time: 15, AllowLock: true },
			{ Name: "LeatherHoodOpenEyes", DefaultColor: "#404040", Effect: ["GagLight"], Hide: ["HairFront", "HairBack", "Glasses", "ItemMouth", "ItemMouth2", "ItemMouth3", "HairAccessory1", "HairAccessory2"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemEars", "ItemNeck"], Difficulty: 50, Value: 40, Time: 15, AllowLock: true },
			{ Name: "LeatherSlimMask", DefaultColor: "#555555", Effect: ["BlindHeavy", "Prone", "GagLight"], Hide: ["Glasses", "ItemMouth", "ItemMouth2", "ItemMouth3", "Eyes"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemEars"], Difficulty: 50, Value: 70, Time: 15, AllowLock: true, Prerequisite: ["NotHogtied"] },
			{ Name: "LeatherSlimMaskOpenMouth", DefaultColor: "#555555", Effect: ["BlindHeavy", "Prone"], Hide: ["Glasses", "Eyes"], Block: ["ItemEars"], Difficulty: 50, Value: 70, Time: 15, AllowLock: true, Prerequisite: ["NotHogtied"] },
			{ Name: "LeatherSlimMaskOpenEyes", DefaultColor: "#555555", Effect: ["GagLight"], Hide: ["ItemMouth", "ItemMouth2", "ItemMouth3"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemEars"], Difficulty: 50, Value: 70, Time: 15, AllowLock: true, Prerequisite: ["NotHogtied"] },
			{ Name: "StuddedBlindfold", DefaultColor: "#FF4040", Effect: ["BlindNormal", "Prone"], Hide: ["Glasses"], Difficulty: 2, Value: -1, Time: 5, AllowLock: true },
			{ Name: "KittyBlindfold", DefaultColor: "#A0A0A0", Effect: ["BlindLight", "Prone"], Hide: ["Glasses"], Value: 25, Time: 5, AllowLock: true },
			{ Name: "DuctTape", Extended: true, AllowEffect: ["BlindNormal", "Prone", "GagNormal"], AllowBlock: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemEars"], Hide: ["Glasses"], Value: 50, Time: 10, RemoveTime: 5, BuyGroup: "DuctTape", AllowType: ["Double", "Wrap", "Mummy"] },
			{ Name: "SmallBlindfold", DefaultColor: "#404040", Effect: ["BlindLight", "Prone"], Hide: ["Glasses"], Value: 40, Time: 5, AllowLock: true },
			{ Name: "LeatherHoodOpenMouth", DefaultColor: "#404040", Effect: ["Prone", "BlindHeavy"], Block: ["ItemEars"], Hide: ["HairFront", "HairBack", "Glasses", "HairAccessory1", "HairAccessory2"], Difficulty: 50, Value: 50, Time: 15, AllowLock: true },
			{ Name: "FullBlindfold", Priority: 30, DefaultColor: "#353535", Effect: ["BlindHeavy", "Prone"], Hide: ["Glasses"], Difficulty: 6, Value: 40, Time: 5, AllowLock: true },
			{ Name: "LeatherHoodSensDep", DefaultColor: "#555555", Effect: ["BlindHeavy", "DeafHeavy", "Prone", "GagHeavy"], Hide: ["HairFront", "HairBack", "Glasses", "ItemMouth", "ItemMouth2", "ItemMouth3", "Eyes", "Hat", "HairAccessory1", "HairAccessory2"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemEars", "ItemNeck"], Difficulty: 50, Value: 100, Time: 15, AllowLock: true, Alpha: [[150, 50, 200, 50]], Prerequisite: ["NotHogtied"] },
			{ Name: "LatexHoodOpenHair", DefaultColor: "#555555", Block: ["ItemEars"], Hide: ["HairFront", "HairBack", "Hat", "HairAccessory1", "HairAccessory2"], Difficulty: 50, Value: 45, Time: 15, AllowLock: true, Alpha: [[150, 50, 200, 87]], Prerequisite: ["NotHogtied"] },
			{ Name: "LeatherHoodSealed", DefaultColor: "#555555", Effect: ["BlindHeavy", "Prone", "GagLight"], Hide: ["HairFront", "HairBack", "Glasses", "ItemMouth", "ItemMouth2", "ItemMouth3", "Eyes", "Hat", "HairAccessory1", "HairAccessory2"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemEars", "ItemNeck"], Difficulty: 50, Value: 70, Time: 15, AllowLock: true, Alpha: [[150, 50, 200, 100]], Prerequisite: ["NotHogtied"] },
			{ Name: "PolishedSteelHood", Effect: ["BlindHeavy", "DeafLight", "Prone", "GagHeavy"], Hide: ["HairFront", "HairBack", "Glasses", "ItemMouth", "ItemMouth2", "ItemMouth3", "Eyes", "HairAccessory1", "HairAccessory2"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemEars", "ItemNeck"], Difficulty: 50, Value: 85, Time: 15, AllowLock: true },
			{ Name: "SackHood", Effect: ["Prone", "BlindHeavy"], Block: ["ItemEars", "ItemMouth", "ItemMouth2", "ItemMouth3"], Hide: ["HairFront", "HairBack", "Glasses", "ItemMouth", "ItemMouth2", "ItemMouth3", "HairAccessory1", "HairAccessory2", "Hat"], Difficulty: 3, Value: 20, Time: 5 },
			{ Name: "LewdBlindfold", Priority: 30, Random: false, Effect: ["BlindLight", "Prone"], Hide: ["Glasses"], Value: 45, Time: 5, AllowLock: true, ExpressionTrigger: [{ Group: "Blush", Name: "Light", Timer: 5 }, { Group: "Eyes", Name: "Closed", Timer: 5 }] },
			{ Name: "LatexBlindfold", Effect: ["BlindNormal", "Prone"], Hide: ["Glasses"], Value: 35, Time: 5, AllowLock: true },
			{ Name: "DogHood", DefaultColor: "#404040", Random: false, Effect: ["GagNormal"], Hide: ["HairFront", "HairBack", "Glasses", "ItemMouth", "ItemMouth2", "ItemMouth3", "HairAccessory1", "HairAccessory2"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemEars"], Difficulty: 50, Value: 60, Time: 15, AllowLock: true },
			{ Name: "FoxyMask", Random: false, Effect: ["GagLight"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"], Difficulty: 2, Value: 50, Time: 15, AllowLock: true },
			{ Name: "SleepMask", Effect: ["BlindLight", "Prone"], Hide: ["Glasses"], Value: 5, Time: 5 },
			{ Name: "BlackoutLenses", DefaultColor: "#333333", Random: false, Effect: ["BlindHeavy", "Prone"], Hide: ["Glasses", "Eyes"], Difficulty: 10, Value: 60 }
		]
	},

	{
		Group: "ItemEars",
		Category: "Item",
		Activity: ["Kiss", "Lick", "Nibble", "Pinch", "Caress", "Whisper"],
		Priority: 1,
		Default: false,
		IsRestraint: true,
		Color: ["Default"],
		Left: 150,
		Top: 50,
		Zone: [[100, 0, 75, 130], [325, 0, 75, 130]],
		Asset: [
			{ Name: "LightDutyEarPlugs", Visible: false, Effect: ["DeafLight"], Difficulty: 50, Value: 15, Time: 5 },
			{ Name: "HeavyDutyEarPlugs", Visible: false, Effect: ["DeafHeavy"], Difficulty: 50, Value: 30, Time: 5 },
			{ Name: "HeadphoneEarPlugs", Visible: false, Effect: [""], AllowEffect: ["DeafLight", "DeafHeavy"], Difficulty: 50, Value: 50, Time: 5, Extended: true, AllowType: ["Off", "Light", "Heavy"] }
		]
	},

	{
		Group: "ItemMisc",
		Category: "Item",
		Priority: 47,
		Default: false,
		Color: ["Default"],
		Top: -250,
		Zone: [[10, 0, 90, 200]],
		Asset: [
			{ Name: "MetalPadlock", Wear: false, Value: 15, Time: 10, IsLock: true, Effect: [] },
			{ Name: "IntricatePadlock", Wear: false, Value: 50, Time: 30, IsLock: true, Effect: [] },
			{ Name: "TimerPadlock", Wear: false, Value: 80, RemoveTimer: 300, MaxTimer: 300, IsLock: true, Effect: [] },
			{ Name: "CombinationPadlock", Wear: false, Value: 100, IsLock: true, Random: false, Effect: [] },
			{ Name: "OwnerPadlock", Wear: false, Value: 60, Time: 10, IsLock: true, OwnerOnly: true, Effect: [] },
			{ Name: "OwnerTimerPadlock", Wear: false, Value: 100, RemoveTimer: 300, MaxTimer: 604800, IsLock: true, OwnerOnly: true, Effect: [] },
			{ Name: "LoversPadlock", Wear: false, Value: 60, Time: 10, IsLock: true, LoverOnly: true, Effect: [] },
			{ Name: "LoversTimerPadlock", Wear: false, Value: 100, RemoveTimer: 300, MaxTimer: 604800, IsLock: true, LoverOnly: true, Effect: [] },
			{ Name: "MistressPadlock", Wear: false, Value: -1, Time: 10, IsLock: true, Effect: [] },
			{ Name: "MistressTimerPadlock", Wear: false, Value: -1, RemoveTimer: 300, MaxTimer: 14400, IsLock: true, Effect:[] },
			{ Name: "MetalPadlockKey", Wear: false, Value: 10, Effect: ["Unlock-MetalPadlock"] },
			{ Name: "IntricatePadlockKey", Wear: false, Value: 30, Effect: ["Unlock-IntricatePadlock"] },
			{ Name: "OwnerPadlockKey", Wear: false, Value: 60, OwnerOnly: true, Effect: ["Unlock-OwnerPadlock", "Unlock-OwnerTimerPadlock"] },
			{ Name: "LoversPadlockKey", Wear: false, Value: 40, LoverOnly: true, Effect: ["Unlock-LoversPadlock", "Unlock-LoversTimerPadlock"] },
			{ Name: "MistressPadlockKey", Wear: false, Value: -1, Effect: ["Unlock-MistressPadlock", "Unlock-MistressTimerPadlock"] },
			{ Name: "MetalCuffsKey", Wear: false, Value: 20, Effect: ["Unlock-MetalCuffs"], Time: 5 },
			{ Name: "WoodenMaidTray", Enable: false, Value: -1 },
			{ Name: "WoodenMaidTrayFull", Enable: false, Value: -1 },
			{ Name: "WoodenPaddle", Enable: false, Value: -1 }
		]
	},

	{
		Group: "ItemDevices",
		Category: "Item",
		Priority: 48,
		IsRestraint: true,
		ParentGroup: "BodyUpper",
		Default: false,
		Color: ["Default"],
		Left: 0,
		Top: -250,
		Zone: [[10, 600, 90, 400], [400, 600, 90, 400]],
		Asset: [
			{ Name: "WoodenBox", SelfBondage: 5, RemoveAtLogin: true, Alpha: [[1, 1, 70, 999], [420, 1, 80, 999]], Effect: ["Prone", "Enclose", "BlindNormal", "GagLight", "Freeze"], Value: 60, Time: 15, RemoveTime: 10, Difficulty: -2, AllowLock: true, Prerequisite: ["NotSuspended", "NotHogtied"] },
			{ Name: "SmallWoodenBox", SelfBondage: 5, RemoveAtLogin: true, Alpha: [[1, 1, 70, 999], [420, 1, 80, 999]], SetPose: ["Kneel"], Effect: ["ForceKneel", "Prone", "Enclose", "BlindNormal", "GagLight", "Freeze"], Value: 40, Time: 15, RemoveTime: 10, Difficulty: -2, AllowLock: true, Prerequisite: ["NotSuspended", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader"] },
			{ Name: "MilkCan", RemoveAtLogin: true, Effect: ["BlindHeavy", "Prone", "Enclose", "GagHeavy", "Freeze"], SetPose: ["Kneel"], Value: -1, Time: 15, RemoveTime: 10, Difficulty: 1 },
			{ Name: "WaterCell", RemoveAtLogin: true, Effect: ["Prone", "Enclose", "GagMedium", "Freeze"], SetPose: ["Suspension", "LegsClosed"], Block: ["ItemFeet"], Value: -1, Time: 15, RemoveTime: 15, Difficulty: 1 },
			{ Name: "Cage", RemoveAtLogin: true,  Alpha: [[1, 80, 105, 900], [410, 80, 105, 900]], Effect: ["Prone", "Enclose", "Freeze"], Value: 120, Time: 15, RemoveTime: 10, Difficulty: 4, AllowLock: true, Prerequisite: ["NotKneeling", "NotSuspended"] },
			{ Name: "LowCage", RemoveAtLogin: true, Alpha: [[1, 80, 75, 900], [400, 80, 95, 900]], SetPose: ["Kneel"], Effect: ["ForceKneel", "Prone", "Enclose", "Freeze"], Value: 80, Time: 15, RemoveTime: 10, Difficulty: 4, AllowLock: true, Prerequisite: ["NotSuspended", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader"] },
			{ Name: "SaddleStand", RemoveAtLogin: true, Height: 30, Value: 100, Time: 10, Difficulty: -2, AllowLock: true, SetPose: ["LegsOpen"], Prerequisite: ["LegsOpen", "AllFours", "NotSuspended", "NotHogtied", "NotHorse", "NotKneeling", "NotKneelingSpread", "NotShackled", "StraitDressOpen"], Block: ["ItemPelvis", "ItemLegs", "ItemFeet"], Effect: ["Prone", "Freeze", "Mounted"] },
			{ Name: "BurlapSack", SelfBondage: 4, Priority : 29, Block: ["ItemArms", "ItemBreast", "ItemButt", "ItemFeet", "ItemHands", "ItemLegs", "ItemMisc", "ItemNipples", "ItemNipplesPiercings", "ItemPelvis", "ItemTorso", "ItemVulva", "ItemVulvaPiercings", "ItemBoots"], SetPose: ["Kneel", "BackElbowTouch"], Effect: ["ForceKneel", "Block", "Prone", "Freeze"], Hide: ["Cloth", "ClothLower", "Shoes", "ItemBoots", "ItemLegs", "ItemFeet", "ItemArms", "ItemButt", "TailStraps", "Wings", "BodyLower", "Socks", "ItemHidden", "ItemNipplesPiercings"], Difficulty: 5, Value: 35, Time: 15, RemoveTime: 6, Prerequisite: ["NotSuspended", "AllFours", "NotHogtied", "NotYoked", "NotMounted", "NotKneelingSpread", "NoFeetSpreader"] },
			{ Name: "InflatableBodyBag", Priority: 31, Extended: true, SelfBondage: 6, SelfUnlock: false, Block: ["ItemArms", "ItemBreast", "ItemButt", "ItemFeet", "ItemHands", "ItemLegs", "ItemMisc", "ItemNipples", "ItemNipplesPiercings", "ItemPelvis", "ItemTorso", "ItemVulva", "ItemVulvaPiercings", "ItemBoots"], SetPose: ["LegsClosed", "BackElbowTouch"], AllowPose: ["Kneel"], Effect: ["Block", "Prone", "Freeze"], Hide: ["Cloth", "Suit", "ClothLower", "SuitLower", "Shoes", "ItemBoots", "ItemLegs", "ItemFeet", "ItemArms", "ItemButt", "TailStraps", "Wings", "BodyLower", "Socks", "ItemNipplesPiercings"], AllowType: ["Light", "Inflated", "Bloated", "Max"], HideItem: ["ItemVulvaFullLatexSuitWand"], Difficulty: 1, Value: 225, Time: 30, RemoveTime: 50, AllowLock: true, Prerequisite: ["NotSuspended", "AllFours", "NotHogtied", "NotYoked", "NotMounted", "NotKneelingSpread", "NoFeetSpreader"] },
			{ Name: "BondageBench", SelfBondage: 4, RemoveAtLogin: false, Priority: 1, Extended: true, SetPose: ["LegsClosed"], Effect: ["Block", "Prone", "Freeze"], Value: 250, Time: 10, RemoveTime: 10, Prerequisite: ["NotKneeling", "AllFours", "NotSuspended", "NotHogtied", "NotMounted", "NoFeetSpreader"] },
			{ Name: "TeddyBear", RemoveAtLogin: true, Priority: 34, IsRestraint: false, Extended: true, Difficulty: -10, Value: 50, Time: 5, Effect: [], AllowPose: ["TapedHands", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Bolero", "Horse", "StraitDressOpen", "Yoked"], AllowType: ["Bear", "Fox", "Kitty", "Pup", "Bunny", "Pony"] },
			{ Name: "OneBarPrison", SelfBondage: 2, RemoveAtLogin: true, Priority: 16, Value: 75, Time: 20, Difficulty: 8, AllowLock: true, SetPose: ["LegsOpen"], Prerequisite: ["AccessVulva", "AllFours", "LegsOpen", "NotSuspended", "NotHogtied", "NotHorse", "NotKneeling", "NotChaste", "StraitDressOpen"], Block: ["ItemPelvis", "ItemLegs", "ItemVulva", "ItemFeet"], Effect: ["Prone", "Freeze", "Mounted"],
				Layer: [
					{ Name: "Bar", AllowColorize: true },
					{ Name: "Pussy", AllowColorize: false }
				]
			},
			{ Name: "TheDisplayFrame", SelfBondage: 5, RemoveAtLogin: true, Value: 100, Time: 10, Difficulty: 50, AllowLock: true, SetPose: ["LegsClosed", "BackElbowTouch"], Prerequisite: ["DisplayFrame", "AllFours", "NotSuspended", "NotHogtied", "NotHorse", "NotKneeling"], Block: ["ItemArms", "ItemLegs", "ItemFeet", "ItemBoots", "ItemNeckAccessories"], Effect: ["Prone", "Freeze", "Block", "Mounted"] },
			{ Name: "Sybian", RemoveAtLogin: true, IsRestraint: false, Value: 80, Time: 10, Difficulty: 1, Priority: 22, SetPose: ["KneelingSpread"], Prerequisite: ["AccessVulva", "NotKneeling", "AllFours", "LegsOpen", "NotSuspended", "NotHogtied", "NotShackled", "NotChaste", "StraitDressOpen", "NotHorse"], Block: ["ItemLegs", "ItemFeet", "ItemBoots", "ItemPelvis", "ItemButt", "ItemVulva"], Effect: ["Egged", "Freeze"], Hide: ["Shoes", "Socks", "ItemBoots", "ItemFeet", "ItemLegs", "ItemVulva"], HideItem: ["ClothLowerPajama1", "ClothLowerShorts1", "ClothLowerJeans1", "ClothLowerJeans2", "ClothLowerWaspie1", "ClothLowerWaspie2", "ClothLowerWaspie3", "ClothLowerLatexPants1", "ItemDevicesTeddyBear", "SuitLowerReverseBunnySuit"] },
			{ Name: "StrapOnSmooth", IsRestraint: false, Value: 25, Time: 10, Difficulty: 1, Priority: 34 },
			{ Name: "StrapOnStuds", IsRestraint: false, Value: 25, Time: 10, Difficulty: 1, Priority: 34 },
			{ Name: "DisplayCase", SelfBondage: 1, RemoveAtLogin: true, Alpha: [[1, 1, 70, 999], [420, 1, 80, 999]], Effect: ["Prone", "Enclose", "DeafLight", "GagLight", "Freeze"], Value: 60, Time: 15, RemoveTime: 10, Difficulty: -2, AllowLock: true, Prerequisite: ["NotSuspended"] },
			{ Name: "SmallDisplayCase", SelfBondage: 1, RemoveAtLogin: true, Alpha: [[1, 1, 70, 999], [420, 1, 80, 999]], SetPose: ["Kneel"], Effect: ["ForceKneel", "Prone", "Enclose", "DeafLight", "GagLight", "Freeze"], Value: 40, Time: 15, RemoveTime: 10, Difficulty: -2, AllowLock: true, Prerequisite: ["NotSuspended", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader"] },
			{ Name: "WoodenBoxOpenHead", AllowBlock: ["ItemHands"], SelfBondage: 3, Extended: true, AllowPose: ["Yoked"], RemoveAtLogin: true, Alpha: [[1, 220, 70, 999], [420, 220, 80, 999]], Effect: ["Prone", "Freeze", "Block"], Value: 60, Time: 15, RemoveTime: 10, Difficulty: -2, AllowLock: true, Prerequisite: ["NotSuspended", "NotHogtied"], Block: ["ItemArms", "ItemBreast", "ItemButt", "ItemFeet", "ItemLegs", "ItemMisc", "ItemNipples", "ItemNipplesPiercings", "ItemPelvis", "ItemTorso", "ItemVulva", "ItemVulvaPiercings", "ItemBoots"], Hide: ["Wings"] },
			{ Name: "SmallWoodenBoxOpenHead", AllowBlock: ["ItemHands"], SelfBondage: 3, Extended: true, AllowPose: ["Yoked"] , RemoveAtLogin: true, Alpha: [[1, 220, 70, 999], [420, 220, 80, 999]], SetPose: ["Kneel"],  Effect: ["ForceKneel", "Prone", "Freeze", "Block"], Value: 40, Time: 15, RemoveTime: 10, Difficulty: -2, AllowLock: true, Prerequisite: ["NotSuspended", "NotHogtied", "NotMounted", "NotKneelingSpread", "NoFeetSpreader", "NotYoked"], Block: ["ItemArms", "ItemBreast", "ItemButt", "ItemFeet", "ItemLegs", "ItemMisc", "ItemNipples", "ItemNipplesPiercings", "ItemPelvis", "ItemTorso", "ItemVulva", "ItemVulvaPiercings", "ItemBoots"], SetPose: ["Kneel"], Hide: ["Wings"]  },
			{ Name: "WoodenStocks", SelfBondage: 4, RemoveAtLogin: true, Value: 150, Time: 10, Difficulty: 50, AllowLock: true, SetPose: ["Yoked"], Effect: ["Prone", "Freeze", "Block", "Mounted"], Prerequisite: ["NotKneeling", "AllFours", "NotSuspended", "NotHogtied", "NotKneelingSpread", "NoItemArms", "LegsOpen"], Block: ["ItemArms", "ItemFeet", "ItemLegs", "ItemBoots"]},
			{ Name: "Vacbed", RemoveAtLogin: true, Alpha: [[1, 1, 70, 999], [420, 1, 80, 999]], SelfBondage: 3, Value: 200, Time: 10, Difficulty: 50, SetPose: ["Yoked"], Effect: ["Prone", "Freeze", "Block", "Mounted"], Prerequisite: ["NotKneeling", "AllFours", "NotSuspended", "NotHogtied", "NotKneelingSpread", "NoItemArms", "LegsOpen", "NoItemHands", "NoItemLegs", "NoHorse", "NoItemFeet"], Block: ["ItemArms", "ItemBoots", "ItemBreasts", "ItemButt", "ItemEars", "ItemFeet", "ItemHands", "ItemLegs", "ItemMisc", "ItemNeck", "ItemNeckAccessories", "ItemNeckRestraints", "ItemNipples", "ItemNipplesPiercings", "ItemPelvis", "ItemTorso", "ItemVulva", "ItemVulvaPiercings", "DogHood", "ItemHead"], Hide: ["HairFront"]}
		]
	},
	
	{
		Group: "ItemAddon",
		Category: "Item",
		Priority: 49,
		IsRestraint: true,
		Default: false,
		Color: ["Default"],
		Left: 0,
		Top: -250,
		Zone: [[400, 0, 90, 200]],
		Asset: [
			{ Name: "BondageBenchStraps", RemoveAtLogin: false, IsRestraint: true, Extended: true, Block: ["ItemDevices"], AllowType: ["Light", "Normal", "Heavy", "Full"], Hide: ["HairBack", "Wings", "TailStraps", "ItemButt"], SelfBondage: 5, AllowLock: true, Value: -1, SetPose: ["LegsClosed"], Effect: ["Block", "Prone"], Time: 5, Difficulty: 12 }
		]
	},

	{
		Group: "ItemBoots",
		Category: "Item",
		Activity: ["Kiss", "PoliteKiss", "Lick", "Suck", "Nibble", "Tickle", "Spank", "MassageHands", "MassageFeet", "TakeCare"],
		Priority: 23,
		ParentGroup: "BodyLower",
		Default: false,
		AllowPose: ["LegsClosed", "Kneel", "Hogtied"],
		IsRestraint: true,
		Color: ["Default"],
		Left: 125,
		Top: 500,
		Zone: [[100, 870, 300, 130]],
		Asset: [
			{ Name: "PonyBoots", Height: 35, Value: -1, Time: 10, RemoveTime: 15, Difficulty: 6, AllowLock: true, Alpha: [[75, 875, 140, 200],[290, 875, 140, 200]], Hide: ["Shoes"] },
			{ Name: "BalletHeels", Height: 35, Value: 75, Time: 10, RemoveTime: 15, Difficulty: 6, AllowLock: true, Alpha: [[75, 875, 140, 200],[290, 875, 140, 200]], Hide: ["Shoes"] },
			{ Name: "BalletWedges", Height: 35, Value: 50, Time: 10, RemoveTime: 15, Difficulty: 6, AllowLock: true, Alpha: [[75, 875, 140, 200],[290, 875, 140, 200]], Hide: ["Shoes"] },
			{ Name: "ToeCuffs", Value: 35, Time: 10, RemoveTime: 5, Difficulty: 4, Effect: ["Freeze", "Prone"], SetPose: ["LegsClosed"], AllowLock: true, Hide: ["Shoes"], Prerequisite: "ToeTied" },
			{ Name: "LeatherToeCuffs", Value: 50, Time: 10, RemoveTime: 5, Difficulty: 3, Effect: ["Freeze", "Prone"], SetPose: ["LegsClosed"], AllowLock: true, Hide: ["Shoes"], Prerequisite: "ToeTied" },
			{ Name: "ToeTie", DefaultColor: "#605020", Value: 15, Time: 10, RemoveTime: 5, Difficulty: 2, Effect: ["Freeze", "Prone"], SetPose: ["LegsClosed"], Hide: ["Shoes"], Prerequisite: "ToeTied" },
			{ Name: "ThighHighLatexHeels", Height: 30, Value: -1, Time: 10, RemoveTime: 15, BuyGroup: "ThighHighLatexHeels", AllowLock: true, Alpha: [[75, 850, 140, 200], [290, 850, 140, 200]], Hide: ["Shoes"] },
			{ Name: "LockingHeels", Height: 15, Value: 40, Time: 10, RemoveTime: 15, Difficulty: 6, AllowLock: true, Hide: ["Shoes"]}
		]
	},
	
	{
		Group: "ItemHidden",
		Category: "Item",
		Default: false,
		IsRestraint: true,
		Color: ["Default"],
		Asset: [
		    { Name: "LeatherArmbinderStrap", Priority: 31,  AllowType: ["Strap", "WrapStrap", "None"], Value: -1 },
			{ Name: "LeatherArmbinderWrapStrap", Priority: 31, AllowType: ["WrapStrap", "None"], Value: -1 },
			{ Name: "SuspensionHempRope", Priority: 31, Value: -1 },
			{ Name: "SuspensionChains", Priority: 31, Value: -1 }
		]
	}
	
];

// 3D Custom Girl based pose
var PoseFemale3DCG = [

	{
		Name: "Kneel",
		OverrideHeight: -250,
		Hide: ["ItemFeet"]
	},
	{
		Name: "Horse",
		OverrideHeight: -75,
		Hide: ["ItemFeet"]
	},
	{
		Name: "KneelingSpread",
		OverrideHeight: -250,
		Hide: ["ItemFeet"]
	},
	{
		Name: "Yoked",
		Hide: ["Hands"]
	},
	{
		Name: "Hogtied",
		OverrideHeight: -575,
		Hide: ["BodyLower", "Hands", "ClothLower", "Wings", "TailStraps", "Gloves", "Panties", "Pussy", "ItemHands", "ItemPelvis", "ItemVulva", "ItemVulvaPiercings", "ItemButt", "ItemLegs", "ItemFeet", "SuitLower"],
		MovePosition: [{ Group: "Socks", X: 0, Y: -400 }, { Group: "Shoes", X: 0, Y: -500 }, { Group: "ItemBoots", X: 0, Y: -500 }]
	},
	{
		Name: "Suspension",
		OverrideHeight: 150,
		Hide: []
	},
	{
		Name: "SuspensionHogtied",
		OverrideHeight: 0,
		Hide: ["BodyLower", "Hands", "ClothLower", "Wings", "TailStraps", "Gloves", "Panties", "Pussy", "ItemHands", "ItemPelvis", "ItemVulva", "ItemVulvaPiercings", "ItemButt", "ItemLegs", "ItemFeet", "SuitLower"]
	},
	{
		Name: "AllFours",
		OverrideHeight: -560,
		Hide: ["ItemFeet", "ClothLower", "SuitLower", "Nipples", "Pussy", "BodyLower", "Wings", "ItemPelvis", "ItemVulva", "ItemVulvaPiercings", "ItemLegs", "ItemBoots", "Suit", "Panties", "Bra"],
		MovePosition: [{ Group: "TailStraps", X: 0, Y: -300 }, { Group: "ItemButt", X: 0, Y: -300 } ]
	}

];

// 3D Custom Girl based activities
var ActivityFemale3DCG = [
	{
		Name: "Kiss",
		MaxProgress: 50,
		TargetSelf: ["ItemHands", "ItemArms", "ItemBoots", "ItemBreast", "ItemNipples"],
		Prerequisite: ["UseMouth"]
	},
	{
		Name: "FrenchKiss",
		MaxProgress: 70,
		Prerequisite: ["UseMouth", "ZoneNaked"]
	},
	{
		Name: "PoliteKiss",
		MaxProgress: 30,
		TargetSelf: ["ItemHands", "ItemBoots"],
		Prerequisite: ["UseMouth"]
	},
	{
		Name: "Lick",
		MaxProgress: 80,
		TargetSelf: ["ItemMouth", "ItemHands", "ItemArms", "ItemBoots", "ItemBreast", "ItemNipples"],
		Prerequisite: ["UseMouth", "ZoneNaked"]
	},
	{
		Name: "Suck",
		MaxProgress: 60,
		TargetSelf: ["ItemHands", "ItemArms", "ItemBoots", "ItemNipples"],
		Prerequisite: ["UseMouth", "ZoneNaked"]
	},
	{
		Name: "Nibble",
		MaxProgress: 40,
		TargetSelf: ["ItemMouth", "ItemHands", "ItemArms", "ItemBoots", "ItemNipples"],
		Prerequisite: ["UseMouth", "ZoneNaked"]
	},
	{
		Name: "Whisper",
		MaxProgress: 20,
		Prerequisite: ["UseMouth"]
	},
	{
		Name: "Tickle",
		MaxProgress: 50,
		TargetSelf: ["ItemTorso", "ItemPelvis", "ItemBreast", "ItemNipples", "ItemLegs", "ItemFeet", "ItemBoots", "ItemArms", "ItemHands"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "Caress",
		MaxProgress: 80,
		TargetSelf: ["ItemTorso", "ItemPelvis", "ItemBreast", "ItemNipples", "ItemLegs", "ItemFeet", "ItemBoots", "ItemArms", "ItemHands", "ItemButt", "ItemVulva", "ItemHead", "ItemNeck", "ItemMouth", "ItemEars"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "Pet",
		MaxProgress: 20,
		TargetSelf: ["ItemHead"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "Cuddle",
		MaxProgress: 30,
		Prerequisite: []
	},
	{
		Name: "Rub",
		MaxProgress: 60,
		Prerequisite: []
	},
	{
		Name: "TakeCare",
		MaxProgress: 10,
		TargetSelf: ["ItemBoots", "ItemHands", "ItemHead"],
		Prerequisite: ["UseHands", "ZoneNaked"]
	},
	{
		Name: "MassageHands",
		MaxProgress: 60,
		TargetSelf: ["ItemTorso", "ItemPelvis", "ItemBreast", "ItemLegs", "ItemFeet", "ItemBoots", "ItemArms", "ItemHands", "ItemButt", "ItemVulva", "ItemHead", "ItemNeck"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "MassageFeet",
		MaxProgress: 40,
		Prerequisite: ["UseFeet"]
	},
	{
		Name: "Grope",
		MaxProgress: 50,
		TargetSelf: ["ItemButt", "ItemBreast"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "Pinch",
		MaxProgress: 20,
		TargetSelf: ["ItemNipples", "ItemEars", "ItemArms", "ItemPelvis"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "Spank",
		MaxProgress: 40,
		TargetSelf: ["ItemButt", "ItemLegs", "ItemFeet", "ItemArms", "ItemHands", "ItemPelvis", "ItemTorso"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "SpankItem",
		MaxProgress: 70,
		Prerequisite: []
	},
	{
		Name: "Slap",
		MaxProgress: 30,
		TargetSelf: ["ItemBreast", "ItemHead"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "Pull",
		MaxProgress: 30,
		TargetSelf: ["ItemHead"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "Choke",
		MaxProgress: 50,
		TargetSelf: ["ItemNeck"],
		Prerequisite: ["UseHands"]
	},
	{
		Name: "MasturbateTongue",
		MaxProgress: 100,
		Prerequisite: ["UseMouth", "ZoneNaked"]
	},
	{
		Name: "MasturbateHand",
		TargetSelf: ["ItemBreast", "ItemVulva", "ItemButt"],
		MaxProgress: 100,
		Prerequisite: ["UseHands", "ZoneNaked"]
	},
	{
		Name: "MasturbateFist",
		MaxProgress: 100,
		Prerequisite: ["UseHands", "ZoneNaked"]
	},
	{
		Name: "MasturbateFoot",
		MaxProgress: 100,
		Prerequisite: ["UseFeet", "ZoneNaked"]
	},
	{
		Name: "MasturbateItem",
		MaxProgress: 100,
		Prerequisite: ["ZoneNaked"]
	}
	
]
