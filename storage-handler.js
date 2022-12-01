class storageHandler {
    constructor() {
        this.storage = window.localStorage;
        this.jsonStorage = window.localStorage.getItem("studentList");
        if(this.jsonStorage == null){
            this.fetchedStorage = [];
        } else{
            this.fetchedStorage = JSON.parse(this.jsonStorage);
        }
        
    }

    addToStorage(data){
        this.fetchedStorage.push(data);
        this.storage.setItem("studentList",JSON.stringify(this.fetchedStorage));
    }

    removeFromStorage(data){
        //remove from storage based on data
    }
}

export default storageHandler;