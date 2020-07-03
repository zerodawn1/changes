"use strict";

// Loads the item extension properties
function InventoryItemHeadOldGasMaskLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = {};
}

// Draw the item extension screen
function InventoryItemHeadOldGasMaskDraw() {
	DrawRect(1387, 225, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");

	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	var itemBlocked = InventoryGet(C, "ItemAddon") != null;
	var tube1IsBlocked = InventoryIsPermissionLimited(C, "OldGasMaskTube1", "ItemAddon") || InventoryIsPermissionLimited(C, "OldGasMaskTube1", "ItemAddon");
	var tube2IsBlocked = InventoryIsPermissionLimited(C, "OldGasMaskTube2", "ItemAddon") || InventoryIsPermissionLimited(C, "OldGasMaskTube2", "ItemAddon");
	var rebreatherIsBlocked = InventoryIsPermissionLimited(C, "OldGasMaskRebreather", "ItemAddon") || InventoryIsPermissionLimited(C, "OldGasMaskRebreather", "ItemAddon");
	var lensesIsBlocked = InventoryIsPermissionBlocked(C, "OldGasMaskLenses", "ItemAddon") || InventoryIsPermissionLimited(C, "OldGasMaskLenses", "ItemAddon");

	DrawButton(1250, 650, 200, 55, DialogFind(Player, "OldGasMaskLenses"), itemBlocked || lensesIsBlocked ? "#888" : "White");
	DrawButton(1550, 650, 200, 55, DialogFind(Player, "OldGasMaskTubeA"), itemBlocked || tube1IsBlocked ? "#888" : "White");
	DrawButton(1250, 750, 200, 55, DialogFind(Player, "OldGasMaskRebreather"), itemBlocked || rebreatherIsBlocked ? "#888" : "White");
	DrawButton(1550, 750, 200, 55, DialogFind(Player, "OldGasMaskTubeB"), itemBlocked || tube2IsBlocked ? "#888" : "White");

	// Draw the message if the player is wearing an addon
	if (itemBlocked) {
		DrawTextWrap(DialogFind(Player, "ItemAddonRemoveAddon"), 1100, 850, 800, 160, "White");
	} else if (tube1IsBlocked || tube2IsBlocked || lensesIsBlocked || rebreatherIsBlocked) { 
		DrawTextWrap(DialogFind(Player, "ItemAddonsSomeWrongPermissions"), 1100, 850, 800, 160, "White");
	}
}

// Catches the item extension clicks
function InventoryItemHeadOldGasMaskClick() {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	var itemBlocked = InventoryGet(C, "ItemAddon") != null;
	
	if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogFocusItem = null;
	if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogFocusItem = null;
	
	if ((MouseX >= 1250) && (MouseX <= 1450) && (MouseY >= 650) && (MouseY <= 705) && !itemBlocked) InventoryItemHeadOldGasMaskSetItem("OldGasMaskLenses");
	if ((MouseX >= 1550) && (MouseX <= 1750) && (MouseY >= 650) && (MouseY <= 705) && !itemBlocked) InventoryItemHeadOldGasMaskSetItem("OldGasMaskTube1");
	if ((MouseX >= 1250) && (MouseX <= 1450) && (MouseY >= 750) && (MouseY <= 805) && !itemBlocked) InventoryItemHeadOldGasMaskSetItem("OldGasMaskRebreather");
	if ((MouseX >= 1550) && (MouseX <= 1750) && (MouseY >= 750) && (MouseY <= 805) && !itemBlocked) InventoryItemHeadOldGasMaskSetItem("OldGasMaskTube2");
	
}

// Sets the lenses
function InventoryItemHeadOldGasMaskSetItem(Item) {

	// Loads the item
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemHeadOldGasMaskLoad();
	}
	
	// Do not continue if the item is blocked by permissions
	if (InventoryIsPermissionBlocked(C, Item, "ItemAddon") || InventoryIsPermissionLimited(C, Item, "ItemAddon")) return;
	
	// Wear the item
	InventoryWear(C, Item, "ItemAddon", DialogColorSelect);
	DialogFocusItem = InventoryGet(C, "ItemAddon");
	
	// Refreshes the character and chatroom
	CharacterRefresh(C);
	CharacterLoadEffect(C);
	var msg = "OldGasMaskUse" + Item;
	var Dictionary = [];
	Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
	Dictionary.push({ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
	Dictionary.push({ Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
	ChatRoomPublishCustomAction(msg, true, Dictionary);
	ChatRoomCharacterItemUpdate(C, "ItemAddon");

	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}
}
