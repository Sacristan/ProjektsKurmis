#pragma strict

var hpTexture:GUITexture;
var eventTexture:GUITexture;
var eventText:GUIText;
var scoreText:GUIText;
var hpText:GUIText;

private var score:int=0;
private var finalScore:int=0;
static var HP:int=100;
private var EVENT:int=0;

static var gameOver:boolean=false;
static var siets:boolean=false;
private var showRetryMenu:boolean=false;

var buttonWidth:int=200;
var buttonHeight:int=50;
var spacing:int=5;

function Start()
{
	Time.timeScale=1;//lai ielaadeejot nebutu apstadinats laiks
}
function OnPickup(returnedScore: int)
{
	EVENT++;
	gameObject.Find("akmenis").audio.Play();
	score+=returnedScore;
}

function OnDamage(returnedDamage: int)
{
	gameObject.Find("attack").audio.Play();
	HP-=returnedDamage;
}

function OnGUI()
{
	hpTexture.pixelInset = Rect (-100,-300,(HP*2)+1, 15);
	
	eventTexture.pixelInset=Rect(-340, 190,(EVENT*40)+1, 15);
	eventText.text=EVENT+"/5";
	
	hpText.pixelOffset=Vector2(100,-285);
	eventText.pixelOffset=Vector2(-140,195);
	scoreText.pixelOffset=Vector2(-340,185);
	
	if(showRetryMenu)
	{
		GUILayout.BeginArea(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - 200, buttonWidth, 400));
		
		GUILayout.Label ("Spele Beigusies!");
		GUILayout.Label ("Jusu Score ir: "+finalScore);
		GUILayout.Space(spacing);
		
		if(GUILayout.Button("Retry",GUILayout.Height(buttonHeight)))
		{
			Application.LoadLevel(1);
			HP=100;
			showRetryMenu=false;
		}
		GUILayout.Space(spacing);
		if(GUILayout.Button("Exit",GUILayout.Height(buttonHeight)))
		{
			Application.Quit();
		}
		GUILayout.EndArea();
	}
}

function Update()
{
	scoreText.text="Score: "+score;
	hpText.text=HP+" /100";
	
	if(HP<=0)
	{  
		gameObject.Find("fail").audio.Play();
		siets=true;
				HP = 100;

		
	}
	if(EVENT>=5)
	{
	gameObject.Find("win").audio.Play();
		gameOver=true;
		
		
	}
	
	if(gameOver)
	{
		Time.timeScale=0;
		showRetryMenu=true;
		gameOver=false;
		siets=false;
		if(HP<0)HP=0;
		finalScore=score+(EVENT*100)+FinalScore(EVENT);
		gameObject.Find("fail").audio.Play();
		
	}
	if(siets||HP<=0)
	{
	Time.timeScale=0;
	showRetryMenu=true;
	gameOver=false;
	siets=false;
	if(HP<0)HP=0;
	finalScore=score+(EVENT*100)+FinalScore(EVENT);
	gameObject.Find("fail").audio.Play();
}
}
function FinalScore(EVENT:int)
{
	var score=0;
	if(EVENT==0)score+=(HP*0);
	if(EVENT==1)score+=(HP*2);
	if(EVENT==2)score+=(HP*4);
	if(EVENT==3)score+=(HP*6);
	if(EVENT==4)score+=(HP*8);
	if(EVENT==5)score+=(HP*10);
	return score;
}