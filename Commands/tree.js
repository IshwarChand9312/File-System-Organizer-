function treeFn(dirPath){

    // console.log("Tree command implemented For");
 
     // 1. input -> directory path give
     let destPath ;
     if(dirPath == undefined){
         treeHelper(process.cwd() , "");
       //  console.log("kindly enter the path");
         return ;
     } else {
         let doesExist = fs.existsSync(dirPath);
         if(doesExist){
            treeHelper(dirPath ,""); 
         } else{
             console.log("kindly enter the correct path");
             return ;
         }
     }
 }
 
 function treeHelper(dirPath , indent){
 // is file or folder 
 
    let isFile =  fs.lstatSync(dirPath).isFile();
 
    if(isFile == true){
        let fileName = path.basename(dirPath);
        console.log(indent + " |------ + ",fileName);
    }
    else {
        let dirName = path.basename(dirPath);
        console.log(indent + "----");
        let childrens = fs.readdirSync(dirPath);
 
        for(let i = 0 ; i < childrens.length ; i++){
          let childPath =  path.join(dirPath , childrens[i]);
          treeHelper(childPath , indent + "\t");
        }
 
    }
 
 
 }

 module.exports = {
     treeKey : treeFn
 }