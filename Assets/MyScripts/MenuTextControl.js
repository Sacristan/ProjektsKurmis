#pragma strict

var isQuitButton=false;
var isPlayButton=false;
var isBeginButton=false;
var isNormalButton=false;
var isAdventButton=false;
var isHCButton=false;

var play:GameObject;
var quit:GameObject;
var title:GameObject;
var begin:GameObject;
var advent:GameObject;
var nnormal:GameObject;
var hc:GameObject;


function OnMouseEnter() 
{
	//nomaina teksta krasu!
		GetComponent(TextMesh).fontStyle = FontStyle.Bold;
		GetComponent(TextMesh).characterSize +=0.005;
		renderer.material.color = Color.green;
		gameObject.Find("ClickOn").audio.Play();

	//Debug.Log("ZALS");
}

function OnMouseExit() 
{

	//nomaina atpakal uz baltu
		GetComponent(TextMesh).fontStyle = FontStyle.Bold;
		GetComponent(TextMesh).characterSize -=0.005;
		renderer.material.color = Color.white;
	//Debug.Log("BALTS");
}

function OnMouseUp()
{
		var targetScript:CharacterMovement=FindObjectOfType(CharacterMovement);
	//Iziet poga?
		if(isQuitButton)
		{
		//darbosies tikai BuildMode
			Application.Quit();
		}
		if(isPlayButton)
		{
			play.active=false;
			quit.active=false;
			var titleTxtMesh: TextMesh = title.GetComponent("TextMesh") as TextMesh;
			titleTxtMesh.text="Grutibas limenis";
		
			begin.active=true;
			nnormal.active=true;
			advent.active=true;
			hc.active=true;
		}
		if(isBeginButton)
		{
			targetScript.diff="Beginner";
			Application.LoadLevel(1);
		}
		if(isNormalButton)
		{
			targetScript.diff="Normal";
			Application.LoadLevel(1);
		}
		if(isAdventButton)
		{
			targetScript.diff="Adventure";
			Application.LoadLevel(1);
		}
		if(isHCButton)
		{
			targetScript.diff="Hardcore";
			Application.LoadLevel(1);
		}
	
}