#pragma strict

var lookAtTarget:Transform;

function Update () 
{
	transform.LookAt(lookAtTarget);
}