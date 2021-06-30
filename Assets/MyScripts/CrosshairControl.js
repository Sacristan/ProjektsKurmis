#pragma strict

var crosshairTexture : Texture2D;
var varRakt:Texture2D;
var nevarRakt:Texture2D;

function Start()
{
	Screen.showCursor=false;
}
function CanDig(varrakt:boolean)
{
	if(varrakt)crosshairTexture=varRakt;
	if(!varrakt)crosshairTexture=nevarRakt;
}
function OnGUI () {
    var mousePos = Event.current.mousePosition;
    GUI.DrawTexture( Rect( mousePos.x - (crosshairTexture.width/1.5),
                           mousePos.y - (crosshairTexture.height/1.5),
                           crosshairTexture.width*1.5,
                           crosshairTexture.height*1.5), crosshairTexture);
}