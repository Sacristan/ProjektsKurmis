#pragma strict

var target : Transform; //destination
var speed : float = 100; //speed (it will complete the motion in 1/speed seconds)
private var pointA : Vector3;

function Start(){
	if (target == null && GameObject.FindWithTag("Merkis1")){//par merki uzstada objektu ar tagu player
		target = GameObject.FindWithTag("Merkis1").transform;//merkis ir player atrasanas vieta
		
		}

}

function Update () {
    if(target) {
       
            pointA = transform.position; //Set the start
      var i = Mathf.PingPong(Time.time * speed, 2);
            transform.position = Vector3.Lerp(pointA,target.position, i);
			if(transform.position==target.position)Destroy(gameObject, 1);
        }
    }
