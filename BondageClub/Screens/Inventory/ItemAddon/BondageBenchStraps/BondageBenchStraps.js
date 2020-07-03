"use strict";
var InventoryItemAddonBondageBenchStrapsMessage = "";

// Loads the item extension properties
function InventoryItemAddonBondageBenchStrapsLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Restrain: null };
	DialogFocusItem.Property.SelfUnlock = false;
	InventoryItemAddonBondageBenchStrapsMessage = null;
}

// Draw the item extension screen
function InventoryItemAddonBondageBenchStrapsDraw() {
	
	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the possible poses
	DrawText(DialogFind(Player, "BondageBenchStrapsSelectTightness"), 1500, 500, "white", "gray");
	DrawButton(1000, 550, 225, 225, "", (DialogFocusItem.Property.Restrain == null) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Light.png", 1000, 550);
	DrawText(DialogFind(Player, "BondageBenchStrapsPoseLight"), 1125, 800, "white", "gray");
	DrawButton(1250, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Normal")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Normal.png", 1250, 550);
	DrawText(DialogFind(Player, "BondageBenchStrapsPoseNormal"), 1375, 800, "white", "gray");
	DrawButton(1500, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Heavy")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Heavy.png", 1500, 550);
	DrawText(DialogFind(Player, "BondageBenchStrapsPoseHeavy"), 1625, 800, "white", "gray");
	DrawButton(1750, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Full")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Full.png", 1750, 550);
	DrawText(DialogFind(Player, "BondageBenchStrapsPoseFull"), 1875, 800, "white", "gray");

	// Draw the message if present
	if (InventoryItemAddonBondageBenchStrapsMessage != null) DrawTextWrap(DialogFind(Player, InventoryItemAddonBondageBenchStrapsMessage), 1100, 850, 800, 160, "White");
}

// Catches the item extension clicks
function InventoryItemAddonBondageBenchStrapsClick() {
	if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogFocusItem = null;
	if (CommonIsClickAt(1000, 550, 225, 225) && (DialogFocusItem.Property.Restrain != null)) InventoryItemAddonBondageBenchStrapsSetPose(null);
	if (CommonIsClickAt(1250, 550, 225, 225) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Normal"))) InventoryItemAddonBondageBenchStrapsSetPose("Normal");
	if (CommonIsClickAt(1500, 550, 225, 225) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Heavy"))) InventoryItemAddonBondageBenchStrapsSetPose("Heavy");
	if (CommonIsClickAt(1750, 550, 225, 225) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Full"))) InventoryItemAddonBondageBenchStrapsSetPose("Full");
}

// Sets the cuffs pose (wrist, elbow, both or none)
function InventoryItemAddonBondageBenchStrapsSetPose(NewPose) {
	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemAddonBondageBenchStrapsLoad();
	}

	InventoryItemAddonBondageBenchStrapsMessage = null;

	if (InventoryGet(C, "Cloth") != null || InventoryGet(C, "ClothLower") != null) {
		InventoryItemAddonBondageBenchStrapsMessage = "RemoveClothesForItem";
		return;
	}
	
	DialogFocusItem.Property.SetPose = ["LegsClosed"];
	DialogFocusItem.Property.Type = NewPose;
	if (NewPose == "Normal") DialogFocusItem.Property.Difficulty = 3;
	if (NewPose == "Heavy") DialogFocusItem.Property.Difficulty = 6;
	if (NewPose == "Full") DialogFocusItem.Property.Difficulty = 9;
	DialogFocusItem.Property.Restrain = NewPose;

	// Adds the lock effect back if it was padlocked
	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
		DialogFocusItem.Property.Effect.push("Lock");
	}

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "BondageBenchStrapsRestrain" + ((NewPose == null) ? "None" : NewPose);
	var Dictionary = [];
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	Dictionary.push({Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	ChatRoomPublishCustomAction(msg, true, Dictionary);

	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}
}