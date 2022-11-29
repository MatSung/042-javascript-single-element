import InputGenerator from "./input-generator.js";
import itemHandler from "./item-handler.js";





initPage();

function initPage() {
    let contentDiv = document.getElementById("inputs-content-container");
    let dbDiv = document.getElementById("students-content-container");

    let languages = ["Python", "R", "PHP", "C#", "C++", "Javascript"];
    let inputTemplate = [
        ["Name", "text", "Name"],
        ["Surname", "text", "Surname"],
        ["Age", "number", "20"],
        ["Phone Number", "tel", "+370600000"],
        ["Email", "email", "email@domain.com"],
        ["IT Skills", "range"],
        ["Group", "radio", [
            ["CAFS 1gr.", 1],
            ["CAFS 2gr.", 2],
            ["CAFS 3gr.", 3],
            ["CAFS 4gr.", 4],
            ["CAFS 5gr.", 5],
            ["CAFS 6gr.", 6],
            ["CAFS 7gr.", 7],
            ["CAFS 8gr.", 8],
            ["CAFS 9gr.", 9],
            ["CAFS 10gr.", 10]
        ]],
        ["Languages", "checkbox", languages]
    ];

    let submissionTemplate = [
        [
        "Maria",
        "Carrasco",
        "22",
        "+34000000000",
        "email@domain.es",
        7,
        5,
        ["Python", "R", "PHP", "C#"]
    ],
    [
        "Rokas",
        "Sungaila",
        "27",
        "+44000000000",
        "email@domain.co.uk",
        3,
        7,
        ["Python", "R", "PHP", "C++", "Javascript"]
    ],
    [
        "Mantas",
        "Bagdanavičius",
        "30",
        "+37000000000",
        "email@domain.lt",
        10,
        1,
        ["Python", "R", "PHP", "C#", "C++", "Javascript"]
    ]
    ];

    let buttonTemplate = [
        //["face name", "id" + "-button", primary/secondary, visible/invisible]
        ["Submit", "submit", "primary", true],
        ["Save Changes", "save-changes", "primary", false],
        ["Cancel", "cancel", "secondary", false]
    ];
    //title of the inputs side
    addHeader(contentDiv, "Form", "primary");
    let inputList = fillInputs(inputTemplate, contentDiv);

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
    dbDiv.append(studentList);

    let itemsList = retrieveStudents(submissionTemplate);
    itemsList.forEach((element,index) => {
        element.setIndex(index);
        studentList.append(element.element());
    });
    console.log(itemsList);

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
        let inputObject = new InputGenerator(element[0], element[1], element[2]);
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
        buttonElement.innerText = element[0];
        buttonElement.hidden = !element[3];
        divContainer.append(buttonElement);
    });
    location.append(divContainer);
}

function retrieveStudents(data){
    let items = [];
    data.forEach(element => {
        let object = new itemHandler(element);
        items.push(object);
    });
    return items;
}