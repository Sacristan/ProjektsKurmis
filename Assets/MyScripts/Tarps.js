#pragma strict

var merkis:Transform;
var merkis2:Transform;
var merkis3:Transform;
var atrums=0.5;

var objekts:Transform; 
function Update()
{
	if (transform.position==merkis.transform.position){
		MoveObject(transform, merkis,merkis2,3.0);
	return;
	}
 
 if(transform.position==merkis2.transform.position){
	MoveObject(transform, merkis2, merkis3,3.0);
	return;
 }
 if (transform.position==merkis3.transform.position){
	MoveObject(transform,merkis3,merkis, 3.0);
	return;
 }
 }


function MoveObject (thisTransform : Transform, startPos : Transform, endPos : Transform, time : float) {    
var i = 0.0;    
var rate = 1.0/time;    
while (i < 1.0) {        
i += Time.deltaTime * rate;        
thisTransform.position = Vector3.Lerp(startPos.position, endPos.position, i);   
animation.CrossFade("Default Take");
yield; }
}