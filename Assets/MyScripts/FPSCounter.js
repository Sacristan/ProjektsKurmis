#pragma strict

private var xPos : int=400;
private var yPos : int=5;
private var wide : int=29;
private var high : int=20;

private var fps : float;

function Update () {
	fps = 1.0 / Time.smoothDeltaTime;
}

function OnGUI () {
	GUI.Label(Rect(Screen.width - wide, yPos, wide, high), fps.ToString());
}