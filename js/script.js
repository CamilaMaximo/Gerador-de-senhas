//Seleção de Elementos
const generatePasswordButton = document.querySelector("#generate-password")
const generatePasswordElement = document.querySelector("#generated-password")

//Novas funcionalidades
const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

//funções
//letras, Números e Símbolos
const getLetterLowercase = ()=> {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 97);
}
const getLetterUppercase = () => {
        return String.fromCharCode(Math.floor(Math.random()* 26) + 65);
}
const getNumber = () => {
        return Math.floor(Math.random()* 10).toString();
}  
const getSymbol = () => {
    const symbol = "(){}[]=<>/,.!@$%&+-";
    return symbol[Math.floor(Math.random() * symbol.length)];
};




const generatePassword = (getLetterLowercase,getLetterUppercase,getNumber,getSymbol) =>{

    let password = ""
   

//segunda versão

    const passwordLength = +lengthInput.value;
    const generators = [];
    if(lettersInput.checked){
        generators.push(getLetterLowercase, getLetterUppercase)
    }
    if(numbersInput.checked){
        generators.push(getNumber)
    }
    if(symbolsInput.checked){
        generators.push(getSymbol)
    }
    if(generators.length === 0){
       return;
    }
    

    for(i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() =>{
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
            
            password += randomValue;
            
        });
    };
    password = password.slice(0, passwordLength);
    
    generatePasswordElement.style.display = "block";
    generatePasswordElement.querySelector("h4").innerText = password;
};
//Eventos

generatePasswordButton.addEventListener("click",() => {
    generatePassword(
    getLetterLowercase,
    getLetterUppercase,
    getNumber,
    getSymbol
    );
});

openCloseGeneratorButton.addEventListener("click", () =>{
    generatePasswordContainer.classList.toggle("hide");
});

//copy

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();
    const password = generatePasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com sucesso!"

        setTimeout(()=> {
            copyPasswordButton.innerText = "Copiar"
        }, 1000);
    });
});