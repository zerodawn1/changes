var ColorPickerX, ColorPickerY, ColorPickerWidth, ColorPickerHeight;
var ColorPickerInitialHSV, ColorPickerLastHSV, ColorPickerHSV, ColorPickerCallback, ColorPickerSourceElement;

var ColorPickerHueBarHeight = 40;
var ColorPickerSVPanelGap = 20;
var ColorPickerPalleteHeight = 100;
var ColorPickerPalleteGap = 20;

var ColorPickerLayout = {
    HueBarOffset: NaN,
    HueBarHeight: NaN,
    SVPanelOffset: NaN,
    SVPanelHeight: NaN,
    PalleteOffset: NaN,
    PalleteHeight: NaN
};

function ColorPickerAttachEventListener() {
    var CanvasElement = document.getElementById("MainCanvas");
    if (!CommonIsMobile) {
        CanvasElement.addEventListener("mousedown", ColorPickerStartPick);
    }
    CanvasElement.addEventListener("touchstart", ColorPickerStartPick);
}

function ColorPickerRemoveEventListener() {
    var CanvasElement = document.getElementById("MainCanvas");
    CanvasElement.removeEventListener("mousedown", ColorPickerStartPick);
    CanvasElement.removeEventListener("touchstart", ColorPickerStartPick);
}

function ColorPickerStartPick(Event) {
    // Only fires at first touch on mobile devices
    if (Event.changedTouches) {
        if (Event.changedTouches.length > 1) return;
    }

    var SVPanelOffset = ColorPickerLayout.SVPanelOffset;
    var SVPanelHeight = ColorPickerLayout.SVPanelHeight;
    var PalleteOffset = ColorPickerLayout.PalleteOffset;
    var PalleteHeight = ColorPickerLayout.PalleteHeight;

    var C = ColorPickerGetCoordinates(Event);
    var X = C.X;
    var Y = C.Y;
    if (X >= ColorPickerX && X < ColorPickerX + ColorPickerWidth) {
        if (Y >= ColorPickerY && Y < ColorPickerY + ColorPickerHueBarHeight) {
            document.addEventListener("mousemove", ColorPickerPickHue);
            document.addEventListener("touchmove", ColorPickerPickHue);
            ColorPickerPickHue(Event);
        } else if (Y >= SVPanelOffset && Y < SVPanelOffset + SVPanelHeight) {
            document.addEventListener("mousemove", ColorPickerPickSV);
            document.addEventListener("touchmove", ColorPickerPickSV);
            ColorPickerPickSV(Event);
        } else if (Y >= PalleteOffset && Y < PalleteOffset + PalleteHeight) {
            ColorPickerSelectFromPallete(Event);
        }
        document.addEventListener("mouseup", ColorPickerEndPick);
        document.addEventListener("touchend", ColorPickerEndPick);
    }
}

function ColorPickerEndPick(Event) {
    document.removeEventListener("mousemove", ColorPickerPickHue);
    document.removeEventListener("mousemove", ColorPickerPickSV);
    document.removeEventListener("mouseup", ColorPickerEndPick);

    document.removeEventListener("touchmove", ColorPickerPickHue);
    document.removeEventListener("touchmove", ColorPickerPickSV);
    document.removeEventListener("touchend", ColorPickerEndPick);
}

function ColorPickerGetCoordinates(Event) {
    var X, Y;
    if (Event.changedTouches) {
        // Mobile
        var Touch = Event.changedTouches[0];
        X = Touch.clientX;
        Y = Touch.clientY;
    } else {
        // PC
        X = Event.clientX;
        Y = Event.clientY;
    }

    var rect = document.getElementById("MainCanvas").getBoundingClientRect();
	if (document.body.clientWidth <= document.body.clientHeight * 2) {
		MouseX = Math.round((X - rect.left) * 2000 / document.body.clientWidth);
		MouseY = Math.round((Y - rect.top) * 2000 / document.body.clientWidth);
	} else {
		MouseX = Math.round((X - rect.left) * 1000 / document.body.clientHeight);
		MouseY = Math.round((Y - rect.top) * 1000 / document.body.clientHeight);
    }
    return { X: MouseX, Y: MouseY };
}

function ColorPickerPickHue(Event) {
    var C = ColorPickerGetCoordinates(Event);
    ColorPickerHSV.H = Math.max(0, Math.min(1, (C.X - ColorPickerX) / ColorPickerWidth));
    ColorPickerLastHSV = Object.assign({}, ColorPickerHSV);
    ColorPickerNotify();
}

function ColorPickerPickSV(Event) {
    var C = ColorPickerGetCoordinates(Event);
    var SVPanelOffset = ColorPickerLayout.SVPanelOffset;
    var SVPanelHeight = ColorPickerLayout.SVPanelHeight;

    var S = (C.X - ColorPickerX) / ColorPickerWidth;
    var V = 1 - (C.Y - SVPanelOffset) / SVPanelHeight;
    ColorPickerHSV.S = Math.max(0, Math.min(1, S));
    ColorPickerHSV.V = Math.max(0, Math.min(1, V));
    ColorPickerLastHSV = Object.assign({}, ColorPickerHSV);
    ColorPickerNotify();
}

function ColorPickerSelectFromPallete(Event) {
    var C = ColorPickerGetCoordinates(Event);
    var P = Math.max(0, Math.min(1, (C.X - ColorPickerX) / ColorPickerWidth));
    var HSV = P > 0.5 ? ColorPickerInitialHSV : ColorPickerLastHSV;
    ColorPickerHSV = Object.assign({}, HSV);
    ColorPickerNotify();
}

function ColorPickerNotify() {
    var Color = ColorPickerHSVToCSS(ColorPickerHSV);
    if (ColorPickerCallback) {
        ColorPickerCallback(Color);
    }

    if (ColorPickerSourceElement) {
        ColorPickerSourceElement.value = Color;
    }
}

function ColorPickerHide() {
    ColorPickerSourceElement = null;
    ColorPickerInitialHSV = null;
    ColorPickerLastHSV = null;
    ColorPickerCallback = null;
    ColorPickerRemoveEventListener();
}

function ColorPickerCSSColorEquals(Color1, Color2) {
    Color1 = Color1.toUpperCase();
    Color2 = Color2.toUpperCase();
    if (!CommonIsColor(Color1) || !CommonIsColor(Color2)) return false;
    // convert short hand hex color to standard format
    if (Color1.length == 4) Color1 = "#" + Color1[1] + Color1[1] + Color1[2] + Color1[2] + Color1[3] + Color1[3];
    if (Color2.length == 4) Color2 = "#" + Color2[1] + Color2[1] + Color2[2] + Color2[2] + Color2[3] + Color2[3];
    return Color1 == Color2;
}

function ColorPickerDraw(X, Y, Width, Height, Src, Callback) {
    
    // Calculate Layout
    ColorPickerLayout.HueBarHeight = ColorPickerHueBarHeight;
    ColorPickerLayout.HueBarOffset = Y;
    ColorPickerLayout.PalleteHeight = ColorPickerPalleteHeight;
    ColorPickerLayout.PalleteOffset = Y + Height - ColorPickerLayout.PalleteHeight;
    ColorPickerLayout.SVPanelHeight = Height - ColorPickerLayout.HueBarHeight - ColorPickerLayout.PalleteHeight - ColorPickerSVPanelGap - ColorPickerPalleteGap;
    ColorPickerLayout.SVPanelOffset = ColorPickerLayout.HueBarOffset + ColorPickerHueBarHeight + ColorPickerSVPanelGap;

    var SVPanelOffset = ColorPickerLayout.SVPanelOffset;
    var SVPanelHeight = ColorPickerLayout.SVPanelHeight;
    var PalleteOffset = ColorPickerLayout.PalleteOffset;
    var PalleteHeight = ColorPickerLayout.PalleteHeight;

    var HSV;
    if (ColorPickerInitialHSV == null) {
        // Get initial color value based on type of source
        var Color;
        if (Src instanceof HTMLInputElement) {
            ColorPickerSourceElement = Src;
            Color = Src.value.trim();
        } else {
            if (ColorPickerSourceElement != null) {
                ColorPickerSourceElement = null;
            }
            Color = Src;
        }

        HSV = ColorPickerCSSToHSV(Color);
        ColorPickerInitialHSV = Object.assign({}, HSV);
        ColorPickerLastHSV =  Object.assign({}, HSV);
        ColorPickerHSV =  Object.assign({}, HSV);
        ColorPickerRemoveEventListener();   // remove possible duplicated attached event listener, just in case
        ColorPickerAttachEventListener();
    } else {
        // Watch source element change
        if (ColorPickerSourceElement != null) {
            var UserInputColor = ColorPickerSourceElement.value.trim().toUpperCase();
            if (CommonIsColor(UserInputColor)) {
                var PrevColor = ColorPickerHSVToCSS(ColorPickerHSV).toUpperCase();
                if (!ColorPickerCSSColorEquals(UserInputColor, PrevColor)) {
                    if (ColorPickerCallback) {
                        // Fire callback due to source element changed by user interaction
                        ColorPickerCallback(UserInputColor);
                    }
                    ColorPickerHSV = ColorPickerCSSToHSV(UserInputColor, ColorPickerHSV);
                }
            }
        }
        // Use user updated HSV
        HSV = ColorPickerHSV;
    }

    // Draw Hue Control
    var Grad;
    Grad = MainCanvas.createLinearGradient(X, Y, X + Width, Y);
    Grad.addColorStop(0.00, "#f00");
    Grad.addColorStop(0.16, "#ff0");
    Grad.addColorStop(0.33, "#0f0");
    Grad.addColorStop(0.50, "#0ff");
    Grad.addColorStop(0.66, "#00f");
    Grad.addColorStop(0.83, "#f0f");
    Grad.addColorStop(1.00, "#f00");
    MainCanvas.fillStyle = Grad;
    MainCanvas.fillRect(X, Y, Width, ColorPickerHueBarHeight);

    // Draw S/V Panel
    DrawRect(X, SVPanelOffset, Width, SVPanelHeight, ColorPickerHSVToCSS({ H: HSV.H, S: 1, V: 1 }));
    
    Grad = MainCanvas.createLinearGradient(X, SVPanelOffset, X + Width, SVPanelOffset);
    Grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    Grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    MainCanvas.fillStyle = Grad;
    MainCanvas.fillRect(X, SVPanelOffset, Width, SVPanelHeight);
    
    Grad = MainCanvas.createLinearGradient(X, SVPanelOffset, X, SVPanelOffset + SVPanelHeight);
    Grad.addColorStop(0, "rgba(0, 0, 0, 0)");
    Grad.addColorStop(1, "rgba(0, 0, 0, 1)");
    MainCanvas.fillStyle = Grad;
    MainCanvas.fillRect(X, SVPanelOffset, Width, SVPanelHeight);
    
    var CSS = ColorPickerHSVToCSS(HSV);
    DrawCircle(X + HSV.S * Width, SVPanelOffset + (1 - HSV.V) * SVPanelHeight, 8, 16, CSS);
    DrawCircle(X + HSV.S * Width, SVPanelOffset + (1 - HSV.V) * SVPanelHeight, 14, 4, (HSV.V > 0.8 && HSV.S < 0.2) ? "#333333" : "#FFFFFF");
    // Draw Hue Picker
    DrawEmptyRect(X + HSV.H * (Width - 20), Y, 20, ColorPickerHueBarHeight, "#FFFFFF");

    // Draw Pallette
    DrawRect(X, PalleteOffset, ColorPickerWidth / 2, PalleteHeight, ColorPickerHSVToCSS(ColorPickerLastHSV));
    DrawRect(X + ColorPickerWidth / 2, PalleteOffset, ColorPickerWidth / 2, PalleteHeight, ColorPickerHSVToCSS(ColorPickerInitialHSV));

    ColorPickerX = X;
    ColorPickerY = Y;
    ColorPickerWidth = Width;
    ColorPickerHeight = Height;
    ColorPickerCallback = Callback;
}

// See: https://gist.github.com/mjackson/5311256
function ColorPickerCSSToHSV(Color, DefaultHSV) {
    Color = Color || "#FFFFFF";
    var M = Color.match(/^#(([0-9a-f]{3})|([0-9a-f]{6}))$/i)
    var R, G, B;
    if (M) {
        var GRP = M[1];
        if (GRP.length == 3) {
            R = Number.parseInt(GRP[0] + GRP[0], 16) / 255;
            G = Number.parseInt(GRP[1] + GRP[1], 16) / 255;
            B = Number.parseInt(GRP[2] + GRP[2], 16) / 255;
        } else if (GRP.length == 6) {
            R = Number.parseInt(GRP[0] + GRP[1], 16) / 255;
            G = Number.parseInt(GRP[2] + GRP[3], 16) / 255;
            B = Number.parseInt(GRP[4] + GRP[5], 16) / 255;
        }
    }

    if (isNaN(R) || isNaN(G) || isNaN(B)) {
        return DefaultHSV ? DefaultHSV : { H: 0, S: 0, V: 1 };
    }

    var Max = Math.max(R, G, B);
    var Min = Math.min(R, G, B);
    var D = Max - Min;
    var H = 0;
    var S = (Max == 0) ? 0 : D / Max;
    var V = Max;

    if (D == 0) {
        H = 0;
    } else {
        if (Max == R) {
            H = (G - B) / D + (G < B ? 6 : 0); 
        } else if (Max == G) { 
            H = (B - R) / D + 2;
        } else {
            H = (R - G) / D + 4;
        }
        H /= 6;
    }

    return { H: H, S: S, V: V };
}

function ColorPickerHSVToCSS(HSV) {
    var R, G, B;
    var H = HSV.H, S = HSV.S, V = HSV.V;
    var I = Math.floor(H * 6);
    var F = H * 6 - I;
    var P = V * (1 - S);
    var Q = V * (1 - F * S);
    var T = V * (1 - (1 - F) * S);

    switch (I % 6) {
        case 0: R = V, G = T, B = P; break;
        case 1: R = Q, G = V, B = P; break;
        case 2: R = P, G = V, B = T; break;
        case 3: R = P, G = Q, B = V; break;
        case 4: R = T, G = P, B = V; break;
        case 5: R = V, G = P, B = Q; break;
    }
  
    var RS = Math.floor(R * 255).toString(16).toUpperCase();
    var GS = Math.floor(G * 255).toString(16).toUpperCase();
    var BS = Math.floor(B * 255).toString(16).toUpperCase();

    if (RS.length == 1) RS = "0" + RS;
    if (GS.length == 1) GS = "0" + GS;
    if (BS.length == 1) BS = "0" + BS;

    return "#" + RS + GS + BS;
}
