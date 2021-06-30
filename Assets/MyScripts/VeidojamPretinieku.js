#pragma strict

var ceerme: GameObject;

//function Update () {

 //if (Input.GetButtonDown("Fire1")) {
        // Instantiate the projectile at the position and rotation of this transform
      
	//	Instantiate(ceerme, transform.position, transform.rotation);
        
      
    //}
	
//}


function Start () {
  //  pointA = transform.position;
	ceerme.tag="Enemy";
    while (true) {
   
    //    var i = Mathf.PingPong(Time.time * speed, 1);
     //   transform.position = Vector3.Lerp(pointA, pointB.position, i);
		Instantiate(ceerme, transform.position, transform.rotation);
        yield WaitForSeconds(5.0);
	
   }
}