#pragma strict

var newSkin : GUISkin;
var logoTexture : Texture2D;

function PauseMenu() 
{
    GUI.BeginGroup(Rect(Screen.width / 2 - 150, 50, 300, 300));
    GUI.Box(Rect(0, 0, 300, 300), "");
	//iespeja pievienot kkadu logo 
    GUI.Label(Rect(15, 10, 300, 68), logoTexture);
    
	if(GUI.Button(Rect(55, 100, 180, 40), "Resume")) 
	{
		Time.timeScale = 1.0;
   
		var pauseMenu: PauseMenu = GetComponent("PauseMenu") as PauseMenu; 
		pauseMenu.enabled = false;
		Screen.showCursor=false;
	}
    
    if(GUI.Button(Rect(55, 150, 180, 40), "Retry")) 
	{
		//katram gadijumam normala laika kustiba
		Time.timeScale = 1.0;
		//ielade 2 limeni
		Application.LoadLevel(1);
    }
    
    if(GUI.Button(Rect(55, 200, 180, 40), "Quit")) 
	{
		Application.Quit();
    }
    
    GUI.EndGroup(); 
}

function OnGUI () 
{
    GUI.skin = newSkin;
    Screen.showCursor = true;
    PauseMenu();

}


