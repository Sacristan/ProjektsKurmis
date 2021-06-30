#pragma strict

function Update () {
if (Input.GetAxis("Vertical") > 0.2 ||Input.GetAxis("Vertical") < -0.2)
       animation.CrossFade ("walk");
	   
   else
      animation.CrossFade ("idle");

	if (Input.GetButton("Jump")){
	animation.CrossFade("jump");
	gameObject.Find("jump").audio.Play();
	}
if(Input.GetButton("Uzbruk")){
 animation.CrossFade("attack");
}
}