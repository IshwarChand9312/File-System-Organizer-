function organizeFn(dirPath){

    // 1. input -> directory path give
    let destPath ;
    if(dirPath == undefined){
      //  console.log("kindly enter the path");
      destPath = process.cwd();
        return ;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            destPath = path.join(dirPath,"organized_files");
           if(fs.existsSync(destPath) == false){
            fs.mkdirSync(destPath);
           }
            
        } else{
            console.log("kindly enter the correct path");
            return ;
        }
    }

    organizeHelper(dirPath , destPath);
    // 2. create -> organized_files -> directory
    // 3. identify categories of all the files present in that inpt directory ->
    // 4. copy / cut files to that organized directory of any of category folder
    // 
}

function organizeHelper(src , dest){

    let childNames = fs.readdirSync(src);
    
    for(let i = 0 ; i < childNames.length ; i++){
        let childAddress = path.join(src , childNames[i]);
       let isfile = fs.lstatSync(childAddress).isFile();

       if(isfile){
         //  console.log(childNames[i]);
           let  category = getCategory(childNames[i]);

           console.log(childNames[i] , "belongs to --> " , category);
            sendFiles(childAddress , dest , category);
        }
    }

}

function sendFiles(srcFilePath , dest , category){

    let categoryPath = path.join(dest , category);

    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
     let destFilePath = path.join(categoryPath,fileName);
     fs.copyFileSync(srcFilePath , destFilePath);
     fs.unlinkSync(srcFilePath);
     console.log(fileName , "copied to path" ,category);
}

function getCategory(name){

    let ext = path.extname(name);
    //console.log(ext);
    ext = ext.slice(1);
    for(let type in types){

    let cTypeArray = types[type];

        for(let i = 0 ; i < cTypeArray.length ;i++){
            if(ext == cTypeArray[i]){
                return type
                };
            }
    }

    return "others";
}

module.exports = {
    organizeKey : organizeFn
}