const axios =require('axios').default;

let final_json=[]

const getData = async (address) =>{
    try{
        const information = await axios("https://api.etherscan.io/api?module=account&action=tokentx&address="+address+"&startblock=0&endblock=999999999&sort=asc&apikey=R6PJFEY2RIP2AB8J2N4UKRK5V65D7ZPJZ8");
        return(information.data.result)
    }catch(err){
        console.log(err);
    }

}

const cleanData = async (address) =>{
    let j=0
    let data = await getData(address);
    let children=new Set()
    let children_transaction =[]
    for(var i =0 ; i<data.length;i++){
        var obj=data[i]
        if(obj.tokenSymbol=="RAZOR"){
            children.add(obj.to)
        }
    }
    var array= Array.from(children)
    var _obj= new Object()
    _obj.partner_address= address;
   _obj.children=array;
   
   console.log(_obj)
    
   for(j=0;j<_obj.children.length;j++){
       if(_obj.children[j]!=address && _obj.children[j]!="0x0f95e6627923848a08232b5fca813c0fb86042b8")
       {    let transaction= await cleanData(_obj.children[j])
            
            
            
           j=j+1;
           

           
           
       }
   }
   
  
   
   


    
 
    
   


}

cleanData("0xf09b5428fa5C4AA4732A24A0f6d71B99f6050838");



