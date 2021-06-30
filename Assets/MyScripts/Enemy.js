#pragma strict

var speed = 2.0; //kustibas atrums
var rotationSpeed = 5.0; // rotacijas atrums
var shootRange = 10.0;  //
var attackRange = 20.0;
var tuvaisUzbrukums = 9.9;
var shootAngle = 0.4;
var dontComeCloserRange = 10.0; //uzlieku 10 lai nenak tuvaak
var delayShootTime = 0.35; //animaacijas gaidisanai, uzbrukuma animaacijas
var pickNextWaypointDistance = 2.0;
//private var palielinaatsAtrums = 10.0;
var target : Transform;
private var merkis1: Transform;
private var merkis2: Transform;


private var lastShot = -10.0;

// Nepieciesams varona kontrolieris
@script RequireComponent (CharacterController)

function Start () {
	if (target == null && GameObject.FindWithTag("Kurmis")){//par merki uzstada objektu ar tagu player
		target = GameObject.FindWithTag("Kurmis").transform;//merkis ir player atrasanas vieta
		//merkis1 = GameObject.FindWithTag("Merkis1").transform;
	//	merkis2 = GameObject.FindWithTag("Merkis2").transform;
		}
	Patrol(); //izsauc patrol funkciju
}

function Patrol () {
	var curWayPoint = AutoWayPoint.FindClosest(transform.position); //atrast tuvaka trajektorijas punkta atrasanas vietu
	//var izmantot AutoWayPoint.FindClosest, jo taa ir statiska fukcija un pieejama visiem speeles objektiem
	while (true) {
		var waypointPosition = curWayPoint.transform.position;  //nofikse trajektorijas punkta attalumu
		// Ja tuvu trajektorijas punktam, tad atrod nakamo
		if (Vector3.Distance(waypointPosition, transform.position) < pickNextWaypointDistance) //ja cermes attalums lidz trajektorijas punktam mazaks par 2 
			curWayPoint = PickNextWaypoint (curWayPoint); //parliek izsaucot metodi un nododot tai esoso

		// Uzbrukt varonim un nogaidit lidz:
		// - varonis nogalinats
		// -varonis arpus redzesloka		
		if (CanSeeTarget ()) //ja ienaidnieks redzams, tad sakas uzbrukums
			yield StartCoroutine("AttackPlayer"); //sakt funkciju AttackPlayer
		
		// Virzities uz trajektorijas punktu
		MoveTowards(waypointPosition);
		
		yield; //nogaidit
	}
}


function CanSeeTarget () : boolean { // Vai merkis ir redzams, fukcija virpirms parbauda vai distance starp cermi un kurmi ir lielaka par attack range, true gadijuma atgriez false, preteeja gadijuma neatgriz neko,bet paliek true
	if (Vector3.Distance(transform.position, target.position) > attackRange){ // atgriez true augsejai izsaucosajai funkcijai, ja attalums no cermes lidz kurmim mazaks par atackRange, tad izpildas return false;
		return false;
		} else return true;
	var hit : RaycastHit; //define raycasthit tipa mainigo.
	if (Physics.Linecast (transform.position, target.position, hit)){//atgriež true, ja ir jebkads colliders(seit kurmja colliders) starp sakumu un beigam, pedejais - hit -saja vieta sanem info kur raycast atsitas, pret kurmi
	
		return hit.transform == target; // sis uzstada merki uz hit atrasanas vietu un atgriez to izsaucosajai funkcijai;
} 
	return false; //default meodes atgriesana, ko atgriez izsaucosajai metodei
}

function Shoot () {
//so funkcija nostraadaa kameer kurmis no ceermes ir noteiktaa attaalumaa
//tepat var palaist ari kadu kurmja animaciju,lai taa nostraada un sis noraustas, kad izskrien cauri
//papildus izveidojama update oncollisionenter, kas nosaka kad kurmis sit, bet te var izmainit
//kkadu kurmja mainigo, kas skaita dzivibas
	animation.CrossFade("Default Take", 0.3); //saak uzbukuma animaciju, pabeigt fade 0.3 sekundees, t.i. iepludinaat.

	// Wait until half the animation has played
	yield WaitForSeconds(delayShootTime); //pagaida kameer vismaz puse no animaacijas ir nospeeleeta
	
	// Fire gun
//parbaudei	BroadcastMessage("Fire"); // kkas ar mesage nosuutiisanu citam objektam
	
	// Wait for the rest of the animation to finish
	yield WaitForSeconds(animation["Default Take"].length - delayShootTime);// pagaida, kameer nospeelee otru animaacijas pusi
}

function AttackPlayer () { //uzbrukuma funkcija
	var lastVisiblePlayerPosition = target.position;	//peedeejaa kurmja atrasanaas vieta tiek uzlikta, t.i. ar raycast nokertaa
	
	while (true) {
		if (CanSeeTarget ()) { //izsauc funkciju, kas paarliecinaas par redzamiibu, ja nav redzams tad atgriezas pie uzsaucosaas funkcijas
			
			if (target == null) //ja meerkis vispaar nav, t.i. nomiris arii tad 
				return;

		
			var distance = Vector3.Distance(transform.position, target.position); //apreekina distanci liidz kurmim
			if (distance > attackRange) //attalums lidz kurmim lielaks par attackRange, tad atgriezas
				return;
			
			lastVisiblePlayerPosition = target.position;// atkal paarliek mainigo, jo tas sajaa briidii jau ir maniijies
			
			if (distance > dontComeCloserRange) //ja distance lielaaka par tuvaak naakamo attaalumu
				MoveTowards (lastVisiblePlayerPosition); //paarvieto ceermi pie kurmja, izsaucot funkciju
			else //izsauc funkciju
				RotateTowards(lastVisiblePlayerPosition); //rotee tuvaak kurmim


//Naakamaas 4 rindas apreekina vai ceerme skataas tiesi pretti kurmim, virpirms paareekina mainiigo no lokaalaa uz globaalo tad nosaka starpiibu starp kurmja un ceermes atrasanaas vietaam, uzstaada meerka skata virziena y uz nulli, beigaas apreekina 
			var forward = transform.TransformDirection(Vector3.forward);//parveido virzienu no lokaalaa uz globaalo, iekavaas var pierakstiit(Vector3(0,0,1), t.i. tagad saada ir atrasanaas vieta telpaa neatkariigi no visa cita
			var targetDirection = lastVisiblePlayerPosition - transform.position;//apreekina attaalumu no kurmja liidz ceermei
			targetDirection.y = 0; //uzstaada meerka (kurmja) y skatisanaas veertiibu uz nulli

			var angle = Vector3.Angle(targetDirection, forward); //apreekina lenki starp meerki un forward,t.i vai ceermes z-ass skataas tiesi pretii kurmim

			// Sak spelet lociisanos ja distance ir mazaaka par sausanas ataalumu un lenkis ir mazaaks par sausanas lenki
		if (distance < shootRange && angle < shootAngle)
				yield StartCoroutine("Shoot"); //izsauc Shoot funkciju
			//	var sasniedzis1 = GameObject.Find("CeermesMeerkis").GetComponent(Merkis1).sasniedzis1;
				// distance = Vector3.Distance(transform.position, target.position);
				//if(!sasniedzis1&&distance<=dontComeCloserRange&& angle<shootAngle) {//ja distance vienaada ar tuvaa uzbrukuma distanci, seit 9.5
				 // GameObject.Find("CeermesMeerkis").GetComponent(Merkis1).sasniedzis1;
				
				//if(!GameObject.Find("CeermesMeerkis").GetComponent(Merkis1).sasniedzis1;)
					//yield StartCoroutine("TuvaDistanceUzbrukums");
					//if(!sasniedzis2)
					//yield StartCoroutine("TuvaDistanceUzbrukums2");
			//	sasniedzis1=true;
			//}
			//TuvaDistanceUzbrukums(pedejaVieta);
			//yield StartCoroutine("Shoot");
		//	if ( !sasniedzis2 && distance<=dontComeCloserRange&& angle<shootAngle){ //ja distance vienaada ar tuvaa uzbrukuma distanci, seit 9.5
	//		yield StartCoroutine("TuvaDistanceUzbrukums2");
			//sasniedzis2=true;
	//		}
		} else {
				yield StartCoroutine("SearchPlayer", lastVisiblePlayerPosition); //preteejaa gadiijumaa izsauc funkciju ar Vector3 tipa mainiigo, nododot tai peedeejo kurmja poziiciju
			// Ja kurmis vairs nav redzams, tad paarstaaj tam dziities pakal (ja metode atgriez true tad paarstaaj);
			if (!CanSeeTarget ())
				return;
		
		}

		yield; //gaida kameer izpildaas
	}
}

function SearchPlayer (position : Vector3) { //funkcijai jaanodod atrasannas vieta
	// Iet pretti kurmim, peec 3 sekundeem paartrauc un iet uz savu vieut, ja kurmis nav redzams 
	var timeout = 3.0; //mainiigais gaidiisanai
	while (timeout > 0.0) {
		MoveTowards(position); //virzaas pretii nodotajam lielumam position

		// Atrasts meerkis kurmis
		if (CanSeeTarget ())//ja meerkis ir redzams, t.i. uzbrukuma attaalumaa
			return;

		timeout -= Time.deltaTime; //paareekina laiku, samazinot par laiku, ko prasiija peedeejais freims katru reizi
		yield; //gaida izpildi
	}
}

function RotateTowards (position : Vector3) { //metode ar nododamu atrasanaas vietu
	//SendMessage("SetSpeed", 0.0); //izkomentets parbaudei, laikam suuta zinu citam skriptam
	
	var direction = position - transform.position; //apreekina virzienu, kas ir atrasannas vietas starpiiba no nodotaas liidz ceermes vietai
	direction.y = 0; //uzstaada apreekinaataas y veertiibu uz nulli, lai ceerme neiegrimu zemee vai nelektu gaisaa
	if (direction.magnitude < 0.1) //magnitude atgriez vektora garumu, seit ja tas mazaaks par 0.1 tad atgriezas
		return;
	
	// Roteet pretii meerkim
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);//uzstaada par cik ceerme rotee pret savaam asiim
	//Quaternion.Slerp sfeeriski rotee no pirmaa iekavaas pie otraa iekavaas par noteikto peedeejo izmeeru iekavaas
	//Quaternion.LookRotation sii veitaa paarsvaraa izmanto LookAt, bet vispaar izveido rotaaciju kas skataas   uz prieksu no pirmaa iekavaas ar skatu uz augsu  pret otro iekavaas. principaa seko noraadiitajam iekavaas, var noraadit vector3
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);
	//eilera lenki graados, noraada katras dalas rotaaciju pret asi x-pret x-asi, z-pret z un y-pret y asim
	//Vector3 rprezentaa 3d vektorus un punktus, var uzstaadit lielumus x,y un z
	//kaa tiesi dabojas nevaru izprast, izskataas, ka nosaka par cik jaarotee paareekina eilera lenkus
}

function MoveTowards (position : Vector3) { //virza ceermi pretii nodotajam lielumam iekavaas
	var direction = position - transform.position;//apreekina virzienu, kas ir atrasannas vietas starpiiba no nodotaas liidz ceermes vietai
	direction.y = 0;//uzstaada apreekinaataas y veertiibu uz nulli, lai ceerme neiegrimu zemee vai nelektu gaisaa
	if (direction.magnitude < 0.5) {//magnitude atgriez vektora garumu, seit ja tas mazaaks par 0.1 tad atgriezas
	// parbaudei izkomentets	SendMessage("SetSpeed", 0.0);
		return;
	}
	
	// Rotee apkaart meerkim, aprakstiits iepriekssejaa funkcijaa
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	//Paarveido aatrumu taa lai tas samazinnatos, ja ceerme nav tiesi pret kurmi Modify speed so we slow down when we are not facing the target
	var forward = transform.TransformDirection(Vector3.forward);//parveido virzienu no lokaalaa uz globaalo, iekavaas var pierakstiit(Vector3(0,0,1), t.i. tagad saada ir atrasanaas vieta telpaa neatkariigi no visa cita
	var speedModifier = Vector3.Dot(forward, direction.normalized);//uzstaada mainiigo uz veertiibu
	//Vector3.Dot atgriez rezultaatu no 2 vektoriem, kurs pasaka kaadaa ir virzienu nobiide, normalizeetiem vektoriem atgriez 1 ja tie abi raada pilniigi vienaada virzienaa, -1 ja preteeja
	speedModifier = Mathf.Clamp01(speedModifier);// saspiez mainiigo iekavaas taa lai tas buutu starp 0 un 1

	// Paarvieto ceermi
	direction = forward * speed * speedModifier;// paareekina virzienu, kuraa raada, t.i. seit virzienam piereizina aatrumu un lielumu
	GetComponent (CharacterController).SimpleMove(direction);//paarvieto ceermi uz noteiktu vietu ceermi taa lai izskatiitos normaali
	
//parbaudei	SendMessage("SetSpeed", speed * speedModifier, SendMessageOptions.DontRequireReceiver);
}

function PickNextWaypoint (currentWaypoint : AutoWayPoint) { //AutoWayPoint ir skripts, kas pievienots tuksam speeles objektam, kurs tiek novietots videe, katrs taads punkts ir trajektorija
	//  So izmanto lai atrastu to trajektorijas punktu, uz kuru ceermei jaaatgriezas lai uzsaaktu kustiibu starp punktiem

	//  Virziens kuraa ceerme kustas, seit uzstaada lokaalo kaa globaalo mainiigo, ceermes x un y asis ir 0, bet z ir 1 - z noraadiis kur ceerme dodas
	var forward = transform.TransformDirection(Vector3.forward);

	//Izveelas labaako, t.i. tuvaako trajektorijas punktiem, jo tuvaakos virzienos noraadiss vektori jo lielaaks atgrieztais dot buus
	var best = currentWaypoint;// uzstaada mainiigajam nodoto trajektorijas punktu, to kurs bija kad metodi izsauca
	var bestDot = -10.0;//labaakais atgrieztais dot(vektoru nobiidei starp diviem vektoriem) trajektorijas punktiem, nav normalizzeti taapeec virs 1 un zem -1
	for (var cur : AutoWayPoint in currentWaypoint.connected) { //conenected ir AutoWayPoint publisks mainiigais bet currentWaypoint ir ta skripta tipa objekts tapec tiek kllat tam
	//cur tiek uzstaadits kaa AutoWayPoint elements.
	//izpildaas kameer cur ir masiivaa connected
		var direction = Vector3.Normalize(cur.transform.position - transform.position);//vector3.normalize paarveido vektoru taa lai taa lielums buutu 1
		//augseejaa rinda nosaka ceermes atrasanaas vietu pret punkta atrasanaas vietu un paarveido taa lielumu uz 1
		var dot = Vector3.Dot(direction, forward); //nosaka vai forward un direction noraada vienaa virzienaa, vector3.dot nosaka virzienu nobiidi diviem vektoriem
		if (dot > bestDot && cur != currentWaypoint) { //ja apreekinaataa virzienu nobiide ir lielaaka par -10 un tuvaakais trajektorijas punkts ir cits no masiiva - t.i. preteejs nodotajam
			bestDot = dot;//labaakais punkts  tagad ir apreekinaatais punkts
			best = cur; //labaakais trajektorijas punkts tiek uzstaadits kaa tikko atrastais punkts no masiiva
		}
	}
	
	return best; //atgriez labaako no visiem trajektorijas punktiem, kuri ir masiivaa
	//ceerme rezultaataa dosies uz to trajektorijas punktu, kura vektoru nobiide no taas vektora nobiides buuss mazaakaa, t.i. 
//uz to punktu kura vektors raadiis tajaa pasaa virzienaa kaa ceermes vektors un uzsaaks kustiibu 
//starp  visiem izliktajiem trajektorijas punktiem, ne reizi nesaniedzot to, jo katru reizi kad ceerme buu punktam
//tuvumaa taa izveeleesies naakamo punktu kura vektors raadiss vistuvaak ceermes pasas vektora virzienam
// t.i. ja divi vektori atradiisies viens otram blakus bet katrs raadiss preteejaa z-ass virzienaa tiks izveeleets tas kurs raada ceermes z-ass virzienaa, 
//neatkarigi no taa vai tas buus tuvaakais punkts vai taalaakais.
}