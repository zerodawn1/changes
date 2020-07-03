"use strict";

var LoverTimerChooseList = [1, 2, 4, 8, 16, 24, 48, 72, 96, 120, 144, 168, -144, -72, -48, -24, -8, -4];
var LoverTimerChooseIndex = 0;

// Loads the item extension properties
function InventoryItemMiscLoversTimerPadlockLoad() {
    if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property == null)) DialogFocusSourceItem.Property = {};
    if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.RemoveItem == null)) DialogFocusSourceItem.Property.RemoveItem = false;
    if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.ShowTimer == null)) DialogFocusSourceItem.Property.ShowTimer = true;
    if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.EnableRandomInput == null)) DialogFocusSourceItem.Property.EnableRandomInput = false;
    if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.MemberNumberList == null)) DialogFocusSourceItem.Property.MemberNumberList = [];
}

// Draw the extension screen
function InventoryItemMiscLoversTimerPadlockDraw() {
    var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
    if ((DialogFocusItem == null) || (DialogFocusSourceItem.Property.RemoveTimer < CurrentTime)) { InventoryItemMiscLoversTimerPadlockExit(); return; }
    if (DialogFocusSourceItem.Property.ShowTimer) {
        DrawText(DialogFind(Player, "TimerLeft") + " " + TimerToString(DialogFocusSourceItem.Property.RemoveTimer - CurrentTime), 1500, 150, "white", "gray");
    } else { DrawText(DialogFind(Player, "TimerUnknown"), 1500, 150, "white", "gray"); }
    DrawRect(1387, 225, 225, 275, "white");
    DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
    DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");
    DrawText(DialogFind(Player, DialogFocusItem.Asset.Group.Name + DialogFocusItem.Asset.Name + "Intro"), 1500, 600, "white", "gray");

    // Draw the settings
    if (Player.CanInteract() && (C.IsLoverOfPlayer())) {
        MainCanvas.textAlign = "left";
        DrawButton(1100, 666, 64, 64, "", "White", (DialogFocusSourceItem.Property.RemoveItem) ? "Icons/Checked.png" : "");
        DrawText(DialogFind(Player, "RemoveItemWithTimer"), 1200, 698, "white", "gray");
        DrawButton( 1100, 746, 64, 64, "", "White", (DialogFocusSourceItem.Property.ShowTimer) ? "Icons/Checked.png" : "");
        DrawText(DialogFind(Player,"ShowItemWithTimerRemaining"), 1200, 778, "white", "gray");
        DrawButton(1100, 826, 64, 64, "", "White", (DialogFocusSourceItem.Property.EnableRandomInput) ? "Icons/Checked.png" : "");
        DrawText(DialogFind(Player, "EnableRandomInput"), 1200, 858, "white", "gray");
        MainCanvas.textAlign = "center";
    } else {
        if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.LockMemberNumber != null))
            DrawText(DialogFind(Player, "LockMemberNumber") + " " + DialogFocusSourceItem.Property.LockMemberNumber.toString(), 1500, 700, "white", "gray");
        DrawText(DialogFind(Player, DialogFocusItem.Asset.Group.Name + DialogFocusItem.Asset.Name + "Detail"), 1500, 800, "white", "gray");
        DrawText(DialogFind(Player, (DialogFocusSourceItem.Property.RemoveItem) ? "WillRemoveItemWithTimer" : "WontRemoveItemWithTimer"), 1500, 868, "white", "gray");
    }

    // Draw buttons to add/remove time if available
    if (Player.CanInteract() && (C.IsLoverOfPlayer())) {
        DrawButton(1100, 910, 250, 70, DialogFind(Player, "AddTimerTime"), "White");
        DrawBackNextButton(1400, 910, 250, 70, LoverTimerChooseList[LoverTimerChooseIndex] + " " + DialogFind(Player, "Hours"), "White", "",
            () => LoverTimerChooseList[(LoverTimerChooseList.length + LoverTimerChooseIndex - 1) % LoverTimerChooseList.length] + " " + DialogFind(Player, "Hours"),
            () => LoverTimerChooseList[(LoverTimerChooseIndex + 1) % LoverTimerChooseList.length] + " " + DialogFind(Player, "Hours"));
    }
    else if (Player.CanInteract() && DialogFocusSourceItem.Property.EnableRandomInput){
        for (var I = 0; I < DialogFocusSourceItem.Property.MemberNumberList.length; I++) {
            if (DialogFocusSourceItem.Property.MemberNumberList[I] == Player.MemberNumber) return;
        }
        DrawButton(1100, 910, 250, 70, "- 2 " + DialogFind(Player, "Hours"), "White");
        DrawButton(1400, 910, 250, 70, DialogFind(Player, "Random"), "White");
        DrawButton(1700, 910, 250, 70, "+ 2 " + DialogFind(Player, "Hours"), "White");
    }
}

// Catches the item extension clicks
function InventoryItemMiscLoversTimerPadlockClick() {
    if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) InventoryItemMiscLoversTimerPadlockExit();
    if (!Player.CanInteract()) return;
    var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;

    if (C.IsLoverOfPlayer()) {
        if ((MouseX >= 1100) && (MouseX <= 1164)) {
            if ((MouseY >= 666) && (MouseY <= 730)) { DialogFocusSourceItem.Property.RemoveItem = !(DialogFocusSourceItem.Property.RemoveItem); }
            if ((MouseY >= 746) && (MouseY <= 810)) { DialogFocusSourceItem.Property.ShowTimer = !(DialogFocusSourceItem.Property.ShowTimer); }
            if ((MouseY >= 826) && (MouseY <= 890)) { DialogFocusSourceItem.Property.EnableRandomInput = !(DialogFocusSourceItem.Property.EnableRandomInput); }
            if (CurrentScreen == "ChatRoom") ChatRoomCharacterItemUpdate(CharacterGetCurrent());
        }
    }

    if ((MouseY >= 910) && (MouseY <= 975)) {
        if (C.IsLoverOfPlayer()) {
            if ((MouseX >= 1100) && (MouseX < 1350)) InventoryItemMiscLoversTimerPadlockAdd(LoverTimerChooseList[LoverTimerChooseIndex] * 3600);
            if ((MouseX >= 1400) && (MouseX < 1650)) {
                if (MouseX <= 1525) LoverTimerChooseIndex = (LoverTimerChooseList.length + LoverTimerChooseIndex - 1) % LoverTimerChooseList.length;
                else LoverTimerChooseIndex = (LoverTimerChooseIndex + 1) % LoverTimerChooseList.length;
            }
        }
        else if (DialogFocusSourceItem.Property.EnableRandomInput) {
            for (var I = 0; I < DialogFocusSourceItem.Property.MemberNumberList.length; I++){
                if (DialogFocusSourceItem.Property.MemberNumberList[I] == Player.MemberNumber) return;
            }
            if ((MouseX >= 1100) && (MouseX < 1350)) { InventoryItemMiscLoversTimerPadlockAdd(-2 * 3600, true); }
            if ((MouseX >= 1400) && (MouseX < 1650)) { InventoryItemMiscLoversTimerPadlockAdd(4 * 3600 * ((Math.random() >= 0.5) ? 1 : -1), true); }
            if ((MouseX >= 1700) && (MouseX < 1950)) { InventoryItemMiscLoversTimerPadlockAdd(2 * 3600, true); }
        }
    }
}

// When a value is added to the timer, can be a negative one
function InventoryItemMiscLoversTimerPadlockAdd(TimeToAdd, PlayerMemberNumberToList) {
    if (PlayerMemberNumberToList) DialogFocusSourceItem.Property.MemberNumberList.push(Player.MemberNumber);
    var TimerBefore = DialogFocusSourceItem.Property.RemoveTimer;
    if (DialogFocusItem.Asset.RemoveTimer > 0) DialogFocusSourceItem.Property.RemoveTimer = Math.round(Math.min(DialogFocusSourceItem.Property.RemoveTimer + (TimeToAdd * 1000), CurrentTime + (DialogFocusItem.Asset.MaxTimer * 1000)));
    var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
    if (CurrentScreen == "ChatRoom") {
        var timeAdded = (DialogFocusSourceItem.Property.RemoveTimer - TimerBefore) / (1000 * 3600);
        var msg = ((timeAdded < 0) && DialogFocusSourceItem.Property.ShowTimer ? "TimerRemoveTime" : "TimerAddTime");
        var Dictionary = [];
        Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
        Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
        if (DialogFocusSourceItem.Property.ShowTimer) {
            Dictionary.push({Tag: "TimerTime", Text: Math.round(Math.abs(timeAdded))});
            Dictionary.push({Tag: "TimerUnit", TextToLookUp: "Hours"});
        } else {
            Dictionary.push({Tag: "TimerTime", TextToLookUp: "TimerAddRemoveUnknownTime"});
            Dictionary.push({Tag: "TimerUnit", Text: ""});
        }
        Dictionary.push({Tag: "FocusAssetGroup", AssetGroupName: C.FocusGroup.Name});

        for (var A = 0; A < C.Appearance.length; A++) {
            if (C.Appearance[A].Asset.Group.Name == C.FocusGroup.Name)
                C.Appearance[A] = DialogFocusSourceItem;
        }
        ChatRoomPublishCustomAction(msg, true, Dictionary);
    } else { CharacterRefresh(C); }
    InventoryItemMiscLoversTimerPadlockExit();
}

// Exits the extended menu
function InventoryItemMiscLoversTimerPadlockExit() {
    DialogFocusItem = null;
    if (DialogInventory != null) DialogMenuButtonBuild((Player.FocusGroup != null) ? Player : CurrentCharacter);
}