let data = [
    {
        "menu": {
            "id": "file",
            "value": "File",
            "popup": {
                "menuitem": [
                    { "value": "New", "onclick": "CreateNewDoc()" },
                    { "value": "Open", "onclick": "OpenDoc()" },
                    { "value": "Close", "onclick": "CloseDoc()" }
                ]
            }
        }
    },
    {
        "menu": {
            "id": "file",
            "value": "File",
            "popup": {
                "menuitem": [
                    { "value": "New one", "onclic0k22": "CreateNewDoc()" },
                    { "value": "Open one", "onclick": "OpenDoc22()" },
                    { "value": "Close22", "onclick": "CloseDoc()" }
                ]
            }
        }
    }
]
let newData = []
 data.forEach(element=>{
    // console.log(element);
    for(i=0;i<element.menu.popup.menuitem.length;i++){
        newData.push(element.menu.popup.menuitem[i])
    }
 })
//  console.log("new data is",newData);


const tableSize = 5
for (let i=1; i<=tableSize;i++){
    console.log(i+1);
    // for (let j = 0; j <= tableSize; j++) {
    //           let v = i*j  
    //           console.log("v data",v);
    // }
}

