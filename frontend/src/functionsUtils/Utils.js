

// 
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        console.log("É false, json falso")    
        return false;
    }
    console.log("É true, json é verdadeiro")
    return true;
}