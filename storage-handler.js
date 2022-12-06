class storageHandler {
    constructor() {
        this.storage = window.localStorage;
        this.jsonStorage = window.localStorage.getItem("studentList");
        if(this.jsonStorage == null){
            this.fetchedStorage = [];
            console.log("storage empty");
        } else{
            this.fetchedStorage = JSON.parse(this.jsonStorage);
        }
        console.log("storage fetched");
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