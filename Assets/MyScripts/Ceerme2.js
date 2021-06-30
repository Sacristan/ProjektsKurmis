#pragma strict

var pointB : Transform;
private var pointA : Vector3;
var speed = 1.0;

function Start () {
    pointA = transform.position;
	
    while (true) {
   
        var i = Mathf.PingPong(Time.time * speed, 1);
        transform.position = Vector3.Lerp(pointA, pointB.position, i);
        yield;
	
   }
}