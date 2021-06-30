#pragma strict

var radius = 1.0;
var pull = 10.0;
private var unappliedMesh : MeshFilter;
var kurmis:GameObject;

enum FallOff { Gauss, Linear, Needle }
var fallOff = FallOff.Gauss;

var textOb:GUIText;
var found:boolean=false;

static var reachedGround:boolean=false;

static function LinearFalloff (distance : float , inRadius : float) {
	return Mathf.Clamp01(1.0 - distance / inRadius);
}

static function GaussFalloff (distance : float , inRadius : float) {
	return Mathf.Clamp01 (Mathf.Pow (360.0, -Mathf.Pow (distance / inRadius, 2.5) - 0.01));
}

function NeedleFalloff (dist : float, inRadius : float)
{
	return -(dist*dist) / (inRadius * inRadius) + 1.0;
}

function DeformMesh (mesh : Mesh, position : Vector3, power : float, inRadius : float)
{
	
	var vertices = mesh.vertices;
	var normals = mesh.normals;
	var sqrRadius = inRadius * inRadius;
	// Calculate averaged normal of all surrounding vertices	
	var averageNormal = Vector3(0,-1200,0); //nosaka uz kuru  pusi tiks izliekts
	for (var i=0;i<vertices.length;i++)
	{
		var sqrMagnitude = (vertices[i] - position).sqrMagnitude;
		// Early out if too far away
		if (sqrMagnitude > sqrRadius)
			continue;

		var distance = Mathf.Sqrt(sqrMagnitude);
		var falloff = LinearFalloff(distance, inRadius);
		averageNormal += falloff * normals[i];
	}
	averageNormal = averageNormal.normalized;
	
	// Deform vertices along averaged normal
	for (i=0;i<vertices.length;i++)
	{
		sqrMagnitude = (vertices[i] - position).sqrMagnitude;
		// Early out if too far away
		if (sqrMagnitude > sqrRadius)
			continue;

		distance = Mathf.Sqrt(sqrMagnitude);
		switch (fallOff)
		{
			case FallOff.Gauss:
				falloff = GaussFalloff(distance, inRadius);
				break;
			case FallOff.Needle:
				falloff = NeedleFalloff(distance, inRadius);
				break;
			default:
				falloff = LinearFalloff(distance, inRadius);
				break;
		}
		
		vertices[i] += averageNormal * falloff * power;
	}
	
	mesh.vertices = vertices;
	mesh.RecalculateNormals();
	mesh.RecalculateBounds();
}

function FixedUpdate () 
{
/*
////////////////////////////////////////////////////////////////////////////////
	var updateHit : RaycastHit;
	var mouseVector:Vector3=Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x,Input.mousePosition.y,0));
	print(mouseVector);
	//if(Physics.Raycast(transform.position, transform.forward, updateHit))
	if(Physics.Raycast(transform.position, mouseVector, updateHit))
	{
		//print("NOKERTS: "+updateHit.collider);
		reachedGround=true;
	}
	else reachedGround=false;
	////////////////////////////////////////////////////////////////////////////////
	*/
	var targetScript:CrosshairControl=FindObjectOfType(CrosshairControl);
	
	var DistanceFromObjectToMouseInPixels = 
    Vector3.Magnitude(Camera.main.WorldToScreenPoint(kurmis.transform.position) - Input.mousePosition);
	//print(DistanceFromObjectToMouseInPixels);
	if(DistanceFromObjectToMouseInPixels<=65)
	{
		targetScript.CanDig(true);
	}
	else targetScript.CanDig(false);
	// When no button is pressed we update the mesh collider
	if (!Input.GetMouseButtonUp (0))
	{
		// Apply collision mesh when we let go of button
		//ApplyMeshCollider(); //iebûvçtâ metode
		RenewCollider(); // paðu metode, darbojas biðíu labâk
		
		return;
	}
		
	if(gameObject.CompareTag("Zeme"))
	{	
	//var kurmis = gameObject.FindGameObjectsWithTag("Kurmis");
	// Did we hit the surface
		var hit : RaycastHit;
		var hit2 : RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var ray2 = new Ray (kurmis.transform.position , hit2.point);
		if (Physics.Raycast (ray, hit))
		{
			if (kurmis.transform.position.x+1>hit.point.x && kurmis.transform.position.x-1<hit.point.x && kurmis.transform.position.y+1>hit.point.y && kurmis.transform.position.y-1<hit.point.y){
				var filter : MeshFilter = hit.collider.GetComponent(MeshFilter);
				
				if (filter)
				{
				// Don't update mesh collider every frame since physX
				// does some heavy processing to optimize the collision mesh.
				// So this is not fast enough for real time updating every frame
					if (filter != unappliedMesh&&gameObject.CompareTag("Zeme"))
					{
					//ApplyMeshCollider();
						RenewCollider();
						unappliedMesh = filter;
					}
					var relativePoint = filter.transform.InverseTransformPoint(hit.point);
			//	if(gameObject.CompareTag("Zeme")){
					DeformMesh(filter.mesh, relativePoint, pull * 0.5, radius);
				}
				// Deform mesh
					
			//	}
				//DeformMesh(filter.mesh, relativePoint, pull * Time.deltaTime, radius); //orìinâlais
				}
		}
	}
}

function ApplyMeshCollider () {
	if (unappliedMesh && unappliedMesh.GetComponent(MeshCollider)) {
		unappliedMesh.GetComponent(MeshCollider).mesh = unappliedMesh.mesh;
	}
	unappliedMesh = null;
}

function RenewCollider () {
		var mesh : Mesh = GetComponent(MeshFilter).mesh;		// dur dur
		var vertices : Vector3[] = mesh.vertices;
		
		transform.Destroy(GetComponent(MeshCollider));			// iznîcina veco collider
		yield new WaitForSeconds(0.001);								// pagaida kamçr tava grabaþa kompis saprot ka ir jâiznîcina vecais
		if(!transform.gameObject.GetComponent(MeshCollider)) transform.gameObject.AddComponent(MeshCollider);      // un pievieno jauno
	    transform.GetComponent(MeshCollider).sharedMesh = mesh; 
		unappliedMesh=null;		// hvz ko ðitas dara, bet droðvien noderîgs
}
/*
function OnMouseEnter()
{
	textOb.text=gameObject.name;
}
function OnMouseExit()
{
	textOb.text="Nav Zemes";
}
*/