#pragma strict

var atrums = 3.0;
var rotacijasAtrums = 3.0;
var leksanasAugstums :float = 8.0;
var gravity :float = 20.0;
private var moveDirection : Vector3 = Vector3.zero;
static var kurmis : int = 0;

function Update ()
{
var controller : CharacterController = GetComponent(CharacterController);

//rotacija
transform.Rotate(0, Input.GetAxis ("Horizontal") * rotacijasAtrums, 0);
// parvietoties uz prieksu un atpakal
if(Input.GetAxis("Vertical")){
var forward = transform.TransformDirection(Vector3(1, 0, 0));
// forward is Shorthand for writing Vector3(0, 0, 1)
var esosaisAtrums = atrums * Input.GetAxis ("Vertical")*(-1);

controller.SimpleMove(forward * esosaisAtrums);
//if (Input.GetButtonDown("Vertical")){
//animation.Play("walk",PlayMode.StopAll);
//} else if (Input.GetButtonUp("Vertical")){
//animation.Rewind("walk");
//animation.Play("idle", PlayMode.StopAll);
}

//}

if (controller.isGrounded) {
        
        if (Input.GetButton ("Jump")) {
	
			 moveDirection.y = leksanasAugstums;
			
		//	 animation.Play("jump",PlayMode.StopAll);
        }
    }

    // Apply gravity
    moveDirection.y -= gravity * Time.deltaTime;
    
    // Move the controller
    controller.Move(moveDirection * Time.deltaTime);	

	}
		
@script RequireComponent(CharacterController)