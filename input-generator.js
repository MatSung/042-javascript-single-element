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
        this.inputElement;
    }

    generateInput(location) {
        let divContainer = document.createElement("div");
        divContainer.classList.add("input-item");
        let label = document.createElement("label");
        label.setAttribute("for", this.name + "-input");
        label.classList.add("input-label");
        label.innerText = this.displayName;
        divContainer.append(label);
        this.inputElement = document.createElement("input");
        this.inputElement.setAttribute("type", this.type);
        this.inputElement.id = this.type + "-input";
        this.inputElement.dataset.name = this.name;

        if (this.quantity == "single") {
            divContainer.classList.add("text-input-container");
            this.inputElement.classList.add("text-input");
            this.inputElement.setAttribute("placeholder", this.placeholder);
            divContainer.append(this.inputElement);
            
        } else if (this.quantity == "special") {
            divContainer.classList.add("range-input-container");
            this.inputElement.classList.add("range-input");
            this.inputElement.classList.add("slider");
            this.inputElement.value = 1;
            this.inputElement.setAttribute("max", 10);
            this.inputElement.setAttribute("min", 1);

            this.output = document.createElement("output");
            this.output.innerText = "1/10";
            divContainer.append(this.output);
            this.inputElement.setAttribute("oninput", "this.previousElementSibling.value = this.value + '/10'")
            divContainer.append(this.inputElement);

        } else if(this.quantity == "multiple"){
            //can only take a single radio input in the list
            //will fix
            divContainer.classList.add(this.type + "-input-container");
            //multiple inputs
            this.inputElement = [];
            this.parameters.forEach((element,index) => {
                let secondaryDiv = document.createElement("div");
                

                var multipleElement = document.createElement("input");
                multipleElement.setAttribute("type", this.type);
                multipleElement.name = this.name;
                multipleElement.value = element;
                multipleElement.id = this.name + "-" + this.type + "-" + (index+1);
                multipleElement.classList.add(this.name+"-radio-input");
                multipleElement.dataset.name = this.name;
                secondaryDiv.append(multipleElement);

                let secondaryLabel = document.createElement("label");
                secondaryLabel.classList.add(this.type + "-label");
                secondaryLabel.innerText = element;
                secondaryLabel.setAttribute("for",multipleElement.id);
                
                secondaryDiv.append(secondaryLabel);

                divContainer.append(secondaryDiv);
                this.inputElement.push(multipleElement);
            });
            
        }

        location.append(divContainer);
        
            return this.inputElement;
        
    }
    applyValue(value){
        if(this.quantity == "single"){
            this.inputElement.value = value;
            
        } else if (this.quantity == "multiple"){
            if(this.type == "checkbox"){
                value.forEach(element => {
                    // console.log(element);
                    this.inputElement[this.parameters.indexOf(element)].checked = true;
                });
            } else if (this.type =="radio"){
                this.inputElement[this.parameters.indexOf(value)].checked = true;
            }
        } else if (this.type=="range"){
            this.inputElement.value = value;
            this.output.innerText = value + "/10";
        }
    }
}

export default InputGenerator;