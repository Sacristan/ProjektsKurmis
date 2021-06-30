#pragma strict 

var destroyTime:float=2;

//skripts iznicina objektu peec destroyTime sekundeem, lai nepiesarnotu atminu un neradiitu liekas kolizijas
function Update () 
{
	Destroy(gameObject,destroyTime);
}