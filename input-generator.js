class InputGenerator {
    constructor(inputTemplateObject) {
        this.displayName = inputTemplateObject.displayName;
        this.type = inputTemplateObject.type;
        if(["text", "tel", "email", "number"].includes(inputTemplateObject.type)){
            this.quantity = "single";
        } else if (["radio","checkbox"].includes(inputTemplateObject.type)){
            this.quantity = "multiple";
        } else{
            this.quantity = "special";
        }
        this.parameters = inputTemplateObject.parameters;
        this.placeholder = inputTemplateObject.placeholder;
        this.name = inputTemplateObject.name;
    }

    generateInput(location) {
        let divContainer = document.createElement("div");
        divContainer.classList.add("input-item");
        let label = document.createElement("label");
        label.setAttribute("for", this.name + "-input");
        label.classList.add("input-label");
        label.innerText = this.displayName;
        divContainer.append(label);
        var inputElement = document.createElement("input");
        inputElement.setAttribute("type", this.type);
        inputElement.id = this.type + "-input";
        inputElement.dataset.name = this.name;

        if (this.quantity == "single") {
            divContainer.classList.add("text-input-container");
            inputElement.classList.add("text-input");
            inputElement.setAttribute("placeholder", this.placeholder);
            divContainer.append(inputElement);
            
        } else if (this.quantity == "special") {
            divContainer.classList.add("range-input-container");
            inputElement.classList.add("range-input");
            inputElement.classList.add("slider");
            inputElement.value = 1;
            inputElement.setAttribute("max", 10);
            inputElement.setAttribute("min", 1);

            let output = document.createElement("output");
            output.innerText = "1/10";
            divContainer.append(output);
            inputElement.setAttribute("oninput", "this.previousElementSibling.value = this.value + '/10'")
            divContainer.append(inputElement);

        } else if(this.quantity == "multiple"){
            //can only take a single radio input in the list
            //will fix
            divContainer.classList.add(this.type + "-input-container");
            //multiple inputs
            var inputElement = [];
            this.parameters.forEach((element,index) => {
                let secondaryDiv = document.createElement("div");
                

                var multipleElement = document.createElement("input");
                multipleElement.setAttribute("type", this.type);
                multipleElement.name = this.name;
                multipleElement.value = element;
                multipleElement.id = this.name + "-" + this.type + "-" + (index+1);
                multipleElement.dataset.name = this.name;
                secondaryDiv.append(multipleElement);

                let secondaryLabel = document.createElement("label");
                secondaryLabel.classList.add(this.type + "-label");
                secondaryLabel.innerText = element;
                secondaryLabel.setAttribute("for",multipleElement.id);
                
                secondaryDiv.append(secondaryLabel);

                divContainer.append(secondaryDiv);
                inputElement.push(multipleElement);
            });
            
        }

        location.append(divContainer);
            return inputElement;
        
    }
}

export default InputGenerator;