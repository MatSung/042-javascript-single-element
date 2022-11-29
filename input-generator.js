class InputGenerator {
    constructor(title = "myInput", type = "text", parameters = "placeholder") {
        this.title = title;
        this.type = type;
        this.parameters = parameters;
    }

    generateInput(location) {
        let divContainer = document.createElement("div");
        divContainer.classList.add("input-item");
        let label = document.createElement("label");
        label.setAttribute("for", this.title + "-input");
        label.classList.add("input-label");
        label.innerText = this.title;
        divContainer.append(label);
        var inputElement = document.createElement("input");
        inputElement.setAttribute("type", this.type);
        inputElement.id = this.type + "-input";

        if (["text", "tel", "email", "number"].includes(this.type)) {
            divContainer.classList.add("text-input-container");
            inputElement.classList.add("text-input");
            inputElement.setAttribute("placeholder", this.parameters);
            divContainer.append(inputElement);
            
        } else if (this.type == "range") {
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
        } else if(this.type == "radio"){
            //can only take a single radio input in the list
            //will fix
            divContainer.classList.add("radio-input-container");
            //multiple inputs
            var inputElement = [];
            this.parameters.forEach((element,index) => {
                let secondaryDiv = document.createElement("div");
                

                var radioElement = document.createElement("input");
                radioElement.setAttribute("type", this.type);
                radioElement.name = this.title;
                radioElement.value = element[1];
                radioElement.id = "radio-" + (index+1);
                secondaryDiv.append(radioElement);

                let secondaryLabel = document.createElement("label");
                secondaryLabel.classList.add("radio-label");
                secondaryLabel.innerText = element[0];
                secondaryLabel.setAttribute("for",radioElement.id);
                
                secondaryDiv.append(secondaryLabel);

                divContainer.append(secondaryDiv);
                inputElement.push(radioElement);
            });
            
        } else if (this.type == "checkbox"){
            divContainer.classList.add("checkbox-input-container");
            //multiple inputs
            var inputElement = [];
            this.parameters.forEach((element,index) => {
                let secondaryDiv = document.createElement("div");
                

                var radioElement = document.createElement("input");
                radioElement.setAttribute("type", this.type);
                radioElement.name = this.title;
                radioElement.value = element;
                radioElement.id = "checkbox-" + (index+1);
                secondaryDiv.append(radioElement);

                let secondaryLabel = document.createElement("label");
                secondaryLabel.classList.add("checkbox-label");
                secondaryLabel.innerText = element;
                secondaryLabel.setAttribute("for",radioElement.id);
                
                secondaryDiv.append(secondaryLabel);

                divContainer.append(secondaryDiv);
                inputElement.push(radioElement);
            });
        }

        location.append(divContainer);
            return inputElement;
        
    }
}

export default InputGenerator;