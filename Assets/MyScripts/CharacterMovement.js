var movementSpeed:float=2.0;
//skriptam pieskirtais prefabs un taa parvietoasanaas aatrums 
var leksanasAugstums = 2;
var gravity :float = 20.0;
private var moveDirection : Vector3 = Vector3.zero;
private var lec:boolean=false;
 var IrUzZemes:boolean = false;
 var explosion:GameObject;
//function OnCollisionExit(collision : Collision) {
	//IrUzZemes=false;
//}
var particlePrefab:Transform;

var tarpsDamage:int;
var minaDamage:int;
static var diff;
function Start()
{
	if(diff=="Beginner")
	{
		tarpsDamage=10;
		minaDamage=20;
	}
	if(diff=="Normal")
	{
		tarpsDamage=20;
		minaDamage=40;
	}
	if(diff=="Adventure")
	{
		tarpsDamage=30;
		minaDamage=60;
	}
	if(diff=="Hardcore")
	{
		tarpsDamage=50;
		minaDamage=100;
	}
}
function Update ()
{
	var controller : CharacterController = GetComponent(CharacterController);
	//kustiiba labajaa virzienaa ar animaaciju
   if (Input.GetAxis("Horizontal") > 0.2)
   {
		transform.eulerAngles.y=0;
        animation.CrossFade ("walk");
		transform.position.x-=Time.deltaTime*movementSpeed;
		gameObject.Find("iesanaa").audio.Play();
	}
	//kustiiba kreisajaa virzienaa ar animaaciju
   else if(Input.GetAxis("Horizontal")< -0.2)
   {
		transform.eulerAngles.y=180;
		animation.CrossFade ("walk");
		transform.position.x+=Time.deltaTime*movementSpeed;
		gameObject.Find("iesanaa").audio.Play();
		//if(transform.eulerAngles.y>0)transform.Rotate(0,-180,0,Space.World);
   }
   //idle animaacija
   else
      animation.CrossFade ("idle");
	//uzbrukums/raksana  
	if(Input.GetButtonDown("Fire1"))
	{
	   animation.CrossFade("attack");
	   gameObject.Find("raksana").audio.Play();
	   
	   var DistanceFromObjectToMouseInPixels = 
	   Vector3.Magnitude(Camera.main.WorldToScreenPoint(transform.position) - Input.mousePosition);
	   
	   var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	   var hit: RaycastHit;
	   if (Physics.Raycast(ray, hit)
	   &&DistanceFromObjectToMouseInPixels<=65) 
	   {
			Instantiate(particlePrefab, hit.point, Quaternion.identity);
		}
	   //DiggingControl.ATTACKING=true;
     //  var bullet = Instantiate(
	 //Prefab,transform.gameObject.Find("spawnPoint").transform.position,Quaternion.identity);
	   //bullet.gameObject.tag ="colliderChecker";
	   //bullet.rigidbody.AddForce(Input.mousePosition);
	   //print(Input.mousePosition);
	}
	
	//if (controller.isGrounded) {
		
	//	if(!lec){
			if (Input.GetButton ("Jump")) {
				if(IrUzZemes){
					IrUzZemes=false;
					rigidbody.velocity = transform.up * 6;					// lekðana
					//transform.position.y=transform.position.y+leksanasAugstums; // teleportâcija :p
					gameObject.Find("jump").audio.Play();
					animation.Play("jump",PlayMode.StopAll);
					
					//StartCoroutine(Lec());
				}
			 
     //   }
      //  if (Input.GetButton ("Jump")) {
		//StartCoroutine(Lec());
			// transform.position.y=Time.deltaTime*leksanasAugstums;
		//	 animation.Play("jump",PlayMode.StopAll);
        }
   // }

    // Apply gravity
  // transform.position.y -= gravity * Time.deltaTime;
 
}

function OnTriggerEnter()
{
	//Debug.Log("SIETS!!!");
	print(collider);
	ScoreEventHP.siets=true;
}

//function Lec()
//{
//	lec = true;
//	yield WaitForSeconds(0.5);
//	lec = false;
//}

function OnCollisionEnter(other:Collision)
{
	if (!IrUzZemes) 
	{
		IrUzZemes=true; //mainîgais lekðanas pârbauei
		animation.Play("jump",PlayMode.StopAll);
	}
	//nodrosina piekluvi skriptam, kas nav tajaa pasaa gameObject
	var targetScript:ScoreEventHP=FindObjectOfType(ScoreEventHP);
	if(other.gameObject.CompareTag("Pickup"))
	{
		var scr=200-(0.5*Time.time);
		if(scr<=0) {scr=0;}
		targetScript.OnPickup(scr);
		print(scr);
		Destroy(other.gameObject);
	}
	
	if(other.gameObject.CompareTag("Miina"))
	{
		targetScript.OnDamage(minaDamage);//vai lielaaks
		Instantiate(explosion,other.gameObject.transform.position,other.gameObject.transform.rotation);
		Destroy(other.gameObject);
		gameObject.Find("explode").audio.Play();
	}
 
 	if(other.gameObject.CompareTag("Tarps"))
	{
		targetScript.OnDamage(tarpsDamage);
	}
}