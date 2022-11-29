class itemHandler {
    constructor(data = []) {
        this.rawData = data;
        let template = ["name", "surname", "age", "tel", "email", "rating", "group"];
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("student-item");

        let itemLeft = document.createElement("div");
        itemLeft.classList.add("student-item-left");
        let itemRight = document.createElement("div");
        itemRight.classList.add("student-item-right");

        let itemHeader = document.createElement("div");
        itemHeader.classList.add("student-item-header");

        this.spans = [];



        for (let i = 0; i < this.rawData.length - 1; i++) {
            const element = this.rawData[i];
            let newSpan = document.createElement("span");
            newSpan.classList.add("student-" + template[i]);
            newSpan.innerText = element;
            this.spans.push(newSpan);
        }
        this.spans.push([]);
        this.rawData[7].forEach(element => {
            let newSpan = document.createElement("span");
            newSpan.classList.add('student-language');
            newSpan.innerText = element;
            this.spans[7].push(newSpan);
        });

        //headers
        itemHeader.append(this.spans[0], this.spans[1], this.spans[2]);
        itemLeft.append(itemHeader);

        //secondaries
        let itemSecondary = document.createElement("div");

        this.spans[6].classList.add("secondary-header");
        this.spans[6].innerText = "CAFS " + this.spans[6].innerText + "gr.";

        this.spans[5].classList.add("secondary-header");
        this.spans[5].innerText += "/10";

        itemSecondary.classList.add("student-item-secondary");
        itemSecondary.append(this.spans[6], this.spans[5]);
        itemLeft.append(itemSecondary);

        //details
        let itemDetails = document.createElement("div");

        itemDetails.classList.add("student-item-details");
        itemDetails.append(this.spans[3], this.spans[4]);
        itemLeft.append(itemDetails);

        //buttons
        let itemButtons = document.createElement("div");

        itemButtons.classList.add("student-item-buttons");
        let editButton = document.createElement("button");
        editButton.classList.add("primary-button", "button");
        editButton.innerText = "Edit";

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("danger-button", "button");
        deleteButton.innerText = "Delete";


        itemButtons.append(editButton);
        itemButtons.append(deleteButton);

        itemLeft.append(itemButtons);

        //languages
        let itemLanguages = document.createElement("div");
        itemLanguages.classList.add("student-item-languages");
        this.spans[7].forEach(element => {
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
    }
}

export default itemHandler;