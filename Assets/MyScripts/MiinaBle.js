#pragma strict

var attalums = 0.05;
var kurmis:Transform;
var explosion:GameObject;
private var spragst:boolean = false;

function Start(){
if (kurmis == null && GameObject.FindWithTag("Kurmis")){//par merki uzstada objektu ar tagu player
		kurmis = GameObject.FindWithTag("Kurmis").transform;//merkis ir player atrasanas vieta
		gameObject.Find("explode").audio.Play();
		}

}

function Update(){

attalums = Vector3.Distance(transform.position, kurmis.position);

if(attalums<3&& !spragst){
spragst = true;
Instantiate(explosion, transform.position, transform.rotation);
Destroy(gameObject, 0);

}


}