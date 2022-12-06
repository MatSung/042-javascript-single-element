class itemHandler {
    constructor(data = {}) {
        this.rawData = data;
        // console.log(data);
        let template = Object.keys(this.rawData);
        // console.log(template);

        let itemDiv = document.createElement("div");
        itemDiv.classList.add("student-item");

        let itemLeft = document.createElement("div");
        itemLeft.classList.add("student-item-left");
        let itemRight = document.createElement("div");
        itemRight.classList.add("student-item-right");

        let itemHeader = document.createElement("div");
        itemHeader.classList.add("student-item-header");

        this.spans = {};



        for (let i = 0; i < template.length - 1; i++) {
            let newSpan = document.createElement("span");
            newSpan.classList.add("student-" + template[i]);
            newSpan.innerText = this.rawData[template[i]];
            this.spans[template[i]] = newSpan;
        }
        // console.log(this.spans);
        this.spans.languages = [];
        this.rawData.languages.forEach(element => {
            let newSpan = document.createElement("span");
            newSpan.classList.add('student-language');
            newSpan.innerText = element;
            this.spans.languages.push(newSpan);
        });

        //will not work with any amount of inputs
        //headers
        itemHeader.append(this.spans.name, this.spans.surname, this.spans.age);
        itemLeft.append(itemHeader);

        //secondaries
        let itemSecondary = document.createElement("div");

        this.spans.group.classList.add("secondary-header");
        // this.spans.group.innerText = this.spans[6].innerText;

        this.spans.skills.classList.add("secondary-header");
        this.spans.skills.innerText += "/10";

        itemSecondary.classList.add("student-item-secondary");
        itemSecondary.append(this.spans.group, this.spans.skills);
        itemLeft.append(itemSecondary);

        //details
        let itemDetails = document.createElement("div");

        itemDetails.classList.add("student-item-details");
        itemDetails.append(this.spans.phone, this.spans.email);
        itemLeft.append(itemDetails);

        //buttons
        let itemButtons = document.createElement("div");

        itemButtons.classList.add("student-item-buttons");
        this.editButton = document.createElement("button");
        this.editButton.classList.add("primary-button", "button");
        this.editButton.innerText = "Edit";
        // editButton.addEventListener("click",() => {this.editMe()});

        this.deleteButton = document.createElement("button");
        this.deleteButton.classList.add("danger-button", "button");
        this.deleteButton.innerText = "Delete";
        // this.deleteButton.addEventListener("click",() => {deleteItem(this.currentIndex)});


        itemButtons.append(this.editButton);
        itemButtons.append(this.deleteButton);

        itemLeft.append(itemButtons);

        //languages
        let itemLanguages = document.createElement("div");
        itemLanguages.classList.add("student-item-languages");
        this.spans.languages.forEach(element => {
            itemLanguages.append(element);
        });
        
        itemRight.append(itemLanguages);


        itemDiv.append(itemLeft);
        itemDiv.append(itemRight);

        this.domElement = itemDiv;
    }
    element() {
        return this.domElement;
    }
    setIndex(index) {
        this.domElement.dataset.currentIndex = index;
        this.currentIndex = index;
    }
}

export default itemHandler;