#pragma strict

var target:Transform;
var pointB : Vector3;
var uzbrukuma_attalums=10;
var attack: boolean = false;
var rotateSpeed = 120.0;



function Start () {    
var pointA = transform.position;   

if (target == null && GameObject.FindWithTag("Player")){//par merki uzstada objektu ar tagu player
		target = GameObject.FindWithTag("Player").transform;//merkis ir player atrasanas vieta
		}
while (true) {  
var distance = Vector3.Distance(transform.position, target.position);
//if(distance<=uzbrukuma_attalums){
	// yield Attack();
	 
	
	
//} else{
yield MoveObject(transform, pointA, pointB, 3.0);
transform.Rotate(0,180,0);
yield MoveObject(transform, pointB, pointA, 3.0);
transform.Rotate(0,180,0);}//aiziet un pagriezties par 180 gradiem
//}
}



function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {    
var i = 0.0;    
var rate = 1.0/time;    
while (i < 1.0) {        
i += Time.deltaTime * rate;        
thisTransform.position = Vector3.Lerp(startPos, endPos, i);   
animation.CrossFade("Default Take");
yield; }
}


//function Attack (){
	//uzbruk = true;
	



	//uzbruk = false;
//}
/*

function RotateTowardsPosition (targetPos : Vector3, rotateSpeed : float) : float //rotacija pret merki
{
	// Compute relative point and get the angle towards it
	var relative = transform.InverseTransformPoint(targetPos);
	var angle = Mathf.Atan2 (relative.x, relative.z) * Mathf.Rad2Deg;
	// Clamp it with the max rotation speed
	var maxRotation = rotateSpeed * Time.deltaTime;
	var clampedAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
	// Rotate
	transform.Rotate(0, clampedAngle, 0);
	// Return the current angle
	return angle;
}

/*function mAttack()
{
  var hit : RaycastHit;
  if(attack)
  {
    var fwd = transform.TransformDirection (Vector3.forward);
    //if(Physics.Raycast(rTarget.position, Vector3.forward, hit, mRange))
    if(Physics.Raycast(transform.position, fwd, hit, mRange))
    {
      Debug.DrawLine (transform.position, hit.point, Color.red);
      if(hit.collider.tag == "Player")
      {
        aEnemy.animation.Play("Attack");
        Debug.Log("Attacked");
        pAttack = true;
        var pScript = hit.collider.GetComponent(Player);
        pScript.LoseHealth(damage);
        attack = false;
      }
      else
      {
        pAttack = false;
        aEnemy.animation.Stop();
      }
    }
  }
  else
  {
  	yield WaitForSeconds(aLength);
  	attack = true;
  }
}*/