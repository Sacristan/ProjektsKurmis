#pragma strict

var diamonds:GameObject[];
var mines:GameObject[];
var i:int;
var f:int=0;
var fiksetaMinasDistance:int=100;
var fiksetaDimantaDistance:int=100;

var diamondText:GUIText;
var mineText:GUIText;
var diamondTexture:GUITexture;
var mineTexture:GUITexture;

function Update () 
{
	for(i=0; i<diamonds.Length; i++)
	{
		if(diamonds[i])
		{
			var dimantaDistance=Vector2.Distance(transform.position, diamonds[i].transform.position);
			if(fiksetaDimantaDistance>dimantaDistance) fiksetaDimantaDistance=dimantaDistance;
		}
	}
	
		for(i=0; i<mines.Length; i++)
		{
			if(mines[i])
			{
				var minasDistance=Vector2.Distance(transform.position, mines[i].transform.position);
				if(fiksetaMinasDistance>minasDistance) fiksetaMinasDistance=minasDistance;
			}
		}	
		
		diamondText.text=""+fiksetaDimantaDistance+"m";
		mineText.text=""+fiksetaMinasDistance+"m";
		fiksetaDimantaDistance=100;
		fiksetaMinasDistance=100;
}
function OnGUI()
{
	diamondTexture.pixelInset=Rect(-390,-230,50, 50);
	mineTexture.pixelInset=Rect(-390, -290,50, 50);
	diamondText.pixelOffset=Vector2(-360,-210);
	mineText.pixelOffset=Vector2(-360,-270);
}