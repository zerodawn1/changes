"use strict";
var InventoryItemFeetSturdyLeatherBeltsMessage = "SelectItem";

// Loads the item extension properties
function InventoryItemFeetSturdyLeatherBeltsLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Restrain: null };
	DialogFocusItem.Property.SelfUnlock = false;
}

// Draw the item extension screen
function InventoryItemFeetSturdyLeatherBeltsDraw() {
	
	// Draw the header and item
	DrawRect(1375, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1377, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1487, 375, 221, "black");

	// Draw the possible poses
	if (!InventoryItemHasEffect(DialogFocusItem, "Lock", true)) {
		DrawText(DialogFind(Player, "SturdyLeatherBeltsSelectTightness"), 1487, 500, "white", "gray");
		DrawButton(1125, 550, 225, 225, "", (DialogFocusItem.Property.Restrain == null) ? "#888888" : "White");
		DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/One.png", 1125, 550);
		DrawText(DialogFind(Player, "SturdyLeatherBeltsPoseOne"), 1237, 800, "white", "gray");
		DrawButton(1375, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Two")) ? "#888888" : "White");
		DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Two.png", 1375, 550);
		DrawText(DialogFind(Player, "SturdyLeatherBeltsPoseTwo"), 1487, 800, "white", "gray");
		DrawButton(1625, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Three")) ? "#888888" : "White");
		DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Three.png", 1625, 550);
		DrawText(DialogFind(Player, "SturdyLeatherBeltsPoseThree"), 1737, 800, "white", "gray");
	
	// Draw the message if present
		if (InventoryItemFeetSturdyLeatherBeltsMessage != null) DrawTextWrap(DialogFind(Player, InventoryItemFeetSturdyLeatherBeltsMessage), 1087, 850, 800, 160, "White");
	} else DrawText(DialogFind(Player, "CantChangeWhileLocked"), 1500, 500, "white", "gray");
}

// Catches the item extension clicks
function InventoryItemFeetSturdyLeatherBeltsClick() {
	if (!InventoryItemHasEffect(DialogFocusItem, "Lock", true)) {
		if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogFocusItem = null;
		if ((MouseX >= 1125) && (MouseX <= 1350) && (MouseY >= 550) && (MouseY <= 775) && (DialogFocusItem.Property.Restrain != null)) InventoryItemFeetSturdyLeatherBeltsSetPose(null);
		if ((MouseX >= 1375) && (MouseX <= 1600) && (MouseY >= 550) && (MouseY <= 775) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Two"))) InventoryItemFeetSturdyLeatherBeltsSetPose("Two");
		if ((MouseX >= 1625) && (MouseX <= 1850) && (MouseY >= 550) && (MouseY <= 775) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Three"))) InventoryItemFeetSturdyLeatherBeltsSetPose("Three");
	} else return
}

// Sets the cuffs pose (wrist, elbow, both or none)
function InventoryItemFeetSturdyLeatherBeltsSetPose(NewPose) {

	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemFeetSturdyLeatherBeltsLoad();
	}

	// Cannot be used when wearing clothes
	if (InventoryGet(C, "ClothLower") != null) {
		InventoryItemFeetSturdyLeatherBeltsMessage = "RemoveClothesForItem";
		return;
	}

	// Sets the new pose with it's effects
	DialogFocusItem.Property.Restrain = NewPose;
	if (NewPose == null) {
		delete DialogFocusItem.Property.Difficulty;
		delete DialogFocusItem.Property.Type;
	} else {
		DialogFocusItem.Property.SetPose = ["LegsClosed"]; DialogFocusItem.Property.Type = NewPose;
		if (NewPose == "Two") DialogFocusItem.Property.Difficulty = 2;
		if (NewPose == "Three") DialogFocusItem.Property.Difficulty = 4;
	}
	DialogFocusItem.Property.Restrain = NewPose;

	// Adds the lock effect back if it was padlocked
	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
		DialogFocusItem.Property.Effect.push("Lock");
	}

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "SturdyLeatherBeltsRestrain" + ((NewPose == null) ? "None" : NewPose);
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