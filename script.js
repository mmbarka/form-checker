const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
const form = document.querySelector('form');
const  progressBar = document.getElementById("progress-bar");

let pseudo,email,password,confirmPass;


const errorDisplay = (tag, message, valid) =>{

    const container = document.querySelector("." + tag + "-container");
    const error = document.querySelector("." + tag + "-container > span");
    
    if(!valid)
    {
        container.classList.add("error");
        error.textContent = message;
    }
    else
    {
        container.classList.remove("error");
        error.textContent = message;
    }
}

const pseudoChecker = (value) => {
    
    if(value.length > 0 && (value.length < 3 || value.length >20 ))
    {
        errorDisplay("pseudo","le pseudo doit contenir entre 3 et 20 caractères");
        pseudo = null;
    }
    else if(!value.match(/^[a-zA-Z0-9_.-]*$/))
    {
        errorDisplay("pseudo","le pseudo ne doit pas contenir de caractères spéciaux");
        pseudo = null;
    }
    else
    {
        errorDisplay("pseudo","",true);
        pseudo = value;   
    }
};
const emailChecker = (value) => {

    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    {
        errorDisplay("email","adresse mail invalide");
        email = null;
    }
    else
    {
        errorDisplay("email","",true);
        email = value;   
    }
};
const passwordChecker = (value) => {

    progressBar.classList = '';

    if(!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
    {
        errorDisplay("password","Minimum 8 caractères une majuscule et un chiffre");
        progressBar.classList.add('progressRed');
        password = null
    }
    else if(value.length < 12)
    {
        errorDisplay("password","",true);
        progressBar.classList.add('progressBlue');
        password = value;

    }
    else
    {
        errorDisplay("password","",true);
        progressBar.classList.add('progressGreen');
        password = value;
    }

    if(confirmPass)
    {
        confirmChecker(confirmPass)
    }
};
const confirmChecker = (value) => {
    if( value !== password)
    {
        errorDisplay("confirm"," les mots de passe ne correspondent pas");
        confirmPass = false;
    }
    else
    {
        errorDisplay("confirm","",true); 
        confirmPass = true; 
    }
};


inputs.forEach((input) => {
    
    input.addEventListener("input", (e) =>{
        
        switch(e.target.id)
        {
            case "pseudo":
                pseudoChecker(e.target.value)
                break;
            case "email":
                emailChecker(e.target.value)
                break;
            case "password":
                passwordChecker(e.target.value)
                break;
            case "confirm":
                confirmChecker(e.target.value)
                break;
            default:
                null;
        }
    });
});

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(pseudo && email && password && confirmPass)
    {
      const data = {
          pseudo,
          email,
          password
      };
      console.log(data);
      inputs.forEach((input) => (input.value = ""));

      progressBar.classList = "";
      pseudo = null;
      email = null;
      password = null;
      confirmPass = null;

      alert('inscription validée');
    }
    else
    {
        alert('veuillez remplir correctement les champs');
    }
})