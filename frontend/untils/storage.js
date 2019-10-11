if(process.browser){ // 只在浏览器端定义
    const localStorage = window.localStorage
}


export const storage = {
    setItem(key,value){
        const val = JSON.stringify(value)
        localStorage.setItem(key,val)
    },
    getItem(key){
        const value = localStorage.getItem(key)
        return JSON.parse(value)
    },
    clearItem(key){
        localStorage.setItem(key,'')
    },
    clear(){
        localStorage.clear()
    },
    removeItem(key){
        localStorage.removeItem(key)
    },
    multiGet(keys) {
        const values = {};
        keys.forEach((key) => {
            values[key] = localStorage.getItem(key)
        });
        return values;
    },
    multiClear(keys) {
        keys.forEach(key => localStorage.setItem(key,''))
    },
    multiRemove(keys) {
        keys.forEach(key => localStorage.removeItem(key))
    }
}
