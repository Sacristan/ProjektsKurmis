#pragma strict

private var pm:PauseMenu;

function Start()
{
	//lai ieladejot limeni neizmestu Pause Menu
	pm = GetComponent("PauseMenu") as PauseMenu;
	pm.enabled=false;
}

function Update () 
{
	// velak Esc pogas gadijumu var nomainit pret Pause Menu pogu vai kkadu citu variantu
	if(Input.GetKey("escape")) 
	{
		//apstadina laiku
		Time.timeScale = 0;
		//gameObject.Find("First Person Controller").GetComponent("MouseLook").enabled=false;
		pm.enabled = true;
    }
}