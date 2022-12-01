import InputGenerator from "./input-generator.js";
import itemHandler from "./item-handler.js";
import storageHandler from "./storage-handler.js";

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

let inputList;
let itemsList;
let storage = new storageHandler();



initPage();



function initPage() {
    let contentDiv = document.getElementById("inputs-content-container");
    let dbDiv = document.getElementById("students-content-container");
    
    

    let languages = ["Python", "R", "PHP", "C#", "C++", "Javascript"];
    let radios = [
        "CAFS 1gr.",
        "CAFS 2gr.",
        "CAFS 3gr.",
        "CAFS 4gr.",
        "CAFS 5gr.",
        "CAFS 6gr.",
        "CAFS 7gr.",
        "CAFS 8gr.",
        "CAFS 9gr.",
        "CAFS 10gr."
    ];

    let objectInputTemplate = [
        {
            displayName: "Name",
            name: "name",
            type: "text",
            placeholder: "Name",
            parameters: null
        },
        {
            displayName: "Surname",
            name: "surname",
            type: "text",
            placeholder: "Surname",
            parameters: null
        },
        {
            displayName: "Age",
            name: "age",
            type: "number",
            placeholder: "20",
            parameters: null
        },
        {
            displayName: "Phone Number",
            name: "phone",
            type: "tel",
            placeholder: "+37060000000",
            parameters: null
        },
        {
            displayName: "Email",
            name: "email",
            type: "email",
            placeholder: "email@domain.com",
            parameters: null
        },
        {
            displayName: "IT Skills",
            name: "skills",
            type: "range",
            placeholder: null,
            parameters: null
        },
        {
            displayName: "Group",
            name: "group",
            type: "radio",
            placeholder: null,
            parameters: radios
        },
        {
            displayName: "Languages",
            name: "languages",
            type: "checkbox",
            placeholder: null,
            parameters: languages
        }
    ];

    // let submissionTemplate = [
    //     {
    //         name: "Maria",
    //         surname: "Carrasco",
    //         age: "22",
    //         phone: "+34000000000",
    //         email: "email@domain.es",
    //         group: "CAFS 7gr.",
    //         skills: 5,
    //         languages: ["Python", "R", "PHP", "C#"]
    //     },
    //     {
    //         name: "Rokas",
    //         surname: "Sungaila",
    //         age: "27",
    //         phone: "+44000000000",
    //         email: "email@domain.co.uk",
    //         group: "CAFS 3gr,",
    //         skills: 7,
    //         languages: ["Python", "R", "PHP", "C++", "Javascript"]
    //     },
    //     {
    //         name: "Mantas",
    //         surname: "Bagdanavičius",
    //         age: "30",
    //         phone: "+37000000000",
    //         email: "email@domain.lt",
    //         group: "CAFS 10gr,",
    //         skills: 1,
    //         languages: ["Python", "R", "PHP", "C#", "C++", "Javascript"]
    //     }
    // ];

    
    console.log(storage.fetchedStorage);

    let buttonTemplate = [
        //["display text", "id" + "-button", primary/secondary, visible/invisible]
        ["Submit", "submit", "primary", true],
        ["Save Changes", "save-changes", "primary", false],
        ["Cancel", "cancel", "secondary", false]
    ];
    //title of the inputs side
    addHeader(contentDiv, "Form", "primary");
    inputList = fillInputs(objectInputTemplate, contentDiv);
    // console.log(inputList);

    //submit buttons
    generateButtons(contentDiv, buttonTemplate);

    //students
    addHeader(dbDiv, "Students", "primary");

    //filter
    addHeader(dbDiv, "Filters", "secondary");
    let filtersDiv = document.createElement("div");
    filtersDiv.classList.add("filters-container");
    filtersDiv.innerText = "filters here";
    dbDiv.append(filtersDiv);
    
    //student list
    let studentList = document.createElement("div");
    studentList.classList.add("student-item-list");
    studentList.id = "student-item-list";
    dbDiv.append(studentList);

    itemsList = retrieveStudents(storage.fetchedStorage);

    

    drawStudents(studentList);
    console.log("students drawn from memory");


}

function drawStudents(){
    itemsList.forEach((element,index) => {
        element.setIndex(index);
        let location = document.getElementById("student-item-list");
        location.append(element.element());
    });
}

function deleteItem(index){
    itemsList[index].domElement.remove();
    itemsList.splice(index,1);
    //remove from storage
    drawStudents();
}

function addSingleElement(data){
    let element = new itemHandler(data);
    storage.addToStorage(data);
    element.deleteButton.addEventListener("click",()=>{deleteItem(element.currentIndex)});
    itemsList.push(element);
    drawStudents();
    return 1;
}

function handleButton(value,button) {
    if (value == "submit") {
        removeMistakes();
        if(!checkMistakes()){
            showStatus(button,"failure");
            return;
        }

        let data = {};
        for (let i = 0; i < inputList.length - 2; i++) {
            const element = inputList[i];
            data[element.dataset.name] = element.value;
        }
        for (let i = 0; i < inputList[6].length; i++) {
            const element = inputList[6][i];
            if (element.checked) {
                data.group = element.value;
                break
            }
        }
        data.languages = [];
        for (let i = 0; i < inputList[7].length; i++) {
            const element = inputList[7][i];
            if(element.checked){
                data.languages.push(element.value);
            }
        }


        if(addSingleElement(data)){
            showStatus(button,"success");
            //clear inputs
        }else{
            //do unsuccess
        }
    } 
}

const showStatus = async (button,message) => {
    button.toggleAttribute("disabled");
    let temp = button.innerText;
    button.innerText = message;
    button.classList.add(message + "-button");

    await sleep(2000);

    button.innerText = temp;
    button.classList.remove(message + "-button");
    button.toggleAttribute("disabled");
}

function checkMistakes(){
    //if mistaken add red border and optionally failed text
    let isValid = true;
    for (let i = 0; i < 5; i++) {
        const element = inputList[i];
        if(!element.value){
            showMistake(element, "Field must not be empty");
            isValid = false;
        }
    }
    //check all requirements for the field
    // if(nameInput.value.length < 3){
    //     addFailureSpan(nameInput,"Vardas privalo būti bent 3 simbolių ilgumo.");
    //     isValid = 0;
    // }
    // if(surnameInput.value.length < 3){
    //     addFailureSpan(surnameInput, "Pavardė privalo būti bent 3 simbolių ilgumo.");
    //     isValid = 0;
    // }
    // if(ageInput.value < 0){
    //     addFailureSpan(ageInput, "Amžius privalo būti teigiamas skaičius");
    //     isValid = 0;
    // }
    // if(ageInput.value > 120){
    //     addFailureSpan(ageInput, "Įvestas amžius per didelis.");
    //     isValid = 0;
    // }
    // if(phoneInput.value.length < 9 || phoneInput.value.length > 12){
    //     addFailureSpan(phoneInput, "Įvestas telefono numeris yra neteisingas.");
    //     isValid = 0;
    // }
    // if(emailInput.value.length < 8 || !emailInput.value.includes("@")){
    //     addFailureSpan(emailInput, "Įvestas elektroninis paštas yra neteisingas.");
    //     isValid = 0;
    // }

    return isValid;
}

function removeMistakes(){
    let allMessages = document.querySelectorAll(".warning-message");
    allMessages.forEach(element => {
        element.remove();
    });

    let allClasses = document.querySelectorAll(".red-border");
    // console.log(allClasses);
    allClasses.forEach(element => {
        element.classList.toggle("red-border");
    });
}

function showMistake(object, message = ""){
    object.classList.add("red-border");
    let spanWarning = document.createElement("span");
    spanWarning.classList.add("warning-span","warning-message");
    spanWarning.innerText = message;
    // console.log(object);
    object.parentElement.append(spanWarning);

}

function addHeader(location, text = "My Header", type) {
    let inputsHeaderDiv = document.createElement("div");
    inputsHeaderDiv.classList.add(type + "-header-container");

    let header = document.createElement(type == "primary" ? "h1" : "h2");
    header.classList.add(type + "-header");
    header.innerText = text;
    inputsHeaderDiv.append(header);
    location.append(inputsHeaderDiv);
}

function fillInputs(inputTemplate, location) {
    let allMyInputs = [];
    inputTemplate.forEach((element, index) => {
        let inputObject = new InputGenerator(element);
        allMyInputs.push(inputObject.generateInput(location));
        //push input object?
    });
    return allMyInputs;
}


function generateButtons(location, buttonTemplate) {
    let divContainer = document.createElement("div");
    divContainer.classList.add("submit-buttons");
    divContainer.classList.add("button-container");

    buttonTemplate.forEach(element => {
        let buttonElement = document.createElement("button");
        buttonElement.id = element[1] + "-button";
        buttonElement.classList.add("button");
        buttonElement.classList.add(element[2] + "-button");
        buttonElement.hidden = !element[3];
        buttonElement.innerText = element[0];
        buttonElement.addEventListener("click", () => { handleButton(element[1],buttonElement); });
        divContainer.append(buttonElement);
    });
    location.append(divContainer);
}

function retrieveStudents(data) {
    let items = [];
    data.forEach(element => {
        let object = new itemHandler(element);
        object.deleteButton.addEventListener("click",()=>{deleteItem(object.currentIndex)});
        items.push(object);
    });
    return items;
}

