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
    let razor_token =0;
    let razor_exchanges=0
    let data = await getData(address);
    let children=new Set()
  
    for(var i =0 ; i<data.length;i++){
        var obj=data[i]
        if(obj.tokenSymbol=="RAZOR" && obj.to!=address&& obj.to!="0x4cd4bc363458b52380d695b5c923b8994a245281" && obj.to!="0xed5b940de6f21fcc6d1168cb78590f9ab6cd2ba6"){
            children.add(obj.to)
            if(obj.to !="0x0f95e6627923848a08232b5fca813c0fb86042b8" && obj.to!="0xe069cb01d06ba617bcdf789bf2ff0d5e5ca20c71" && obj.to!="0x3e66b66fd1d0b02fda6c811da9e0547970db2f21"&& obj.to!="0x0211f3cedbef3143223d3acf0e589747933e8527"&& obj.to!="0x0211f3cedbef3143223d3acf0e589747933e8527"&& obj.to!="0x4cd4bc363458b52380d695b5c923b8994a245281")
           	{ razor_token=razor_token + (obj.value/10**18)
           	
           	}
            else{
                razor_exchanges+=(obj.value/10**18)
            }
         
        }
    }
    var array= Array.from(children)
    var _obj= new Object()
    _obj.partner_address= address;
   _obj.children=array;
   _obj.value=razor_token
   _obj.exchange=razor_exchanges
   
   final_json.push(_obj);
    
   for(j=0;j<_obj.children.length;j++){
       if(_obj.children[j]!=address && (_obj.children[j]!="0x0f95e6627923848a08232b5fca813c0fb86042b8"&& _obj.children[j]!="0xe069cb01d06ba617bcdf789bf2ff0d5e5ca20c71"&& _obj.children[j]!="0x3e66b66fd1d0b02fda6c811da9e0547970db2f21" && _obj.children[j]!="0x0211f3cedbef3143223d3acf0e589747933e8527"))
       {    await cleanData(_obj.children[j])
            
            
            
          
           

           
           
       }
       
   }

   return(final_json)


  
   
   


    
 
    
   


}


const answer =async ()=>{
let addresses=[
'0x8540f74e41cdb6a730708e75a00e3c1244ea816f'
,'0xdb551657bdf5336769ce0eda7da7c7f370d1835c',
'0x1d945e9ea2da9cb9a36b3e53e78b5e22bea1e3d9',
'0xe3462680b4a93591b9da3b054aa9f3757bc6b8b1',
'0x0dda891159e84cb9d0fd9233b54d20137c355d51',
'0x0ed67daaacf97acf041cc65f04a632a8811347ff',
'0x7aa48800c1f5cb80a670cb66635dd382237777c6',
'0x60c018ac98f575f9257a203960c1aeadcf05cbde',
'0xdc12571179e6c88ae5da8f0fdbf775d3b25a8a75',
'0x1dd2718fd01d05c9f50fce8bb723a4c7483a1e15',
'0x8c405dd569d597720c04e3c1577ce3841e206ce5',
'0x81929bde7629c48cdf4a6615093b1d531d145b91',
'0xf09b5428fa5c4aa4732a24a0f6d71b99f6050838',
'0xee338a4307544f7ac4e8569311dccb7fcc59a00d',
'0xe5d0ef77aed07c302634dc370537126a2cd26590',
'0x6d16749cefb3892a101631279a8fe7369a281d0e',
'0xa93ee2d5ac5b802b9a8dbbc4db2cb3a772e89c7c'
,'0x8d4de035d3f696682b503c8d022d3e4f7f550c91'
,'0x84FABD111C71A5A0B20E5864fFcb213C7429e556'
,'0x0efa138a27fb6a388b1498680759db5990d844b1'
,'0x72ba1965320ab5352fd6d68235cc3c5306a6ffa2'
,'0x1dd2718fd01d05c9f50fce8bb723a4c7483a1e15'
,'0xd350a04d2566b5356afc7b6ec93db428084d7392'
,'0x53a2f447c61152917493679f8105811198648d81'
,'0xd350a04d2566b5356afc7b6ec93db428084d7392'
,'0x81929bde7629c48cdf4a6615093b1d531d145b91'
,'0x543a4a8c551e6c81b03fdea63ab52444cb2c24bf'
,'0xfdef5eb0534b8e8cb604154c4d8392ef9bea725f'
,'0x60cbCE4d462148dE22084839217957045800A338'
,'0x1dbe623157f7cdf98771020e688f7bc25a2e9a21'
,'0x40c4ad0274801e555e6caa4c2529a50a413ec903'
,'0x2bc2390c826ae5a86fb0e2cb88eb15344a6f3183',
'0xc4a66858e61b950d579c3758fb3e90f2bbacc3c6',
'0x00cd9fad11d5b2118a3dd32d5d43fdb33bde9e85',
'0xb6799f729ff7bf37043fd68a364e56adcee78644',
'0xfd062c2d666961a305c33e8ba78b33352e99dd69',
'0xe11a0391f7931cd389efc5486344c9a054fc1783',
'0x54feffe8714c9d3b1e85180c1e94b9523a482f83',
'0x15ba2277c6d622844555439744fc62fb95699e00',
'0x50ce06ab2404c72fbd57620ea8aa0e282065a831',
'0xf503feb4f6570e0a44c5231df53dae3fb5d7d628',
'0x762b7fdda2aaa3d0cca3696f7b537d07314a9268',
'0xa53c1ddc63d9f33994c4a2189eb4f92e36694c5c',
'0x8391d31724a02034f5bc250d26583bc12c294d2d',
'0xa50801a3e3d26d2774a0eee31e968f26a57273cb',
'0x762b7fdda2aaa3d0cca3696f7b537d07314a9268',
'0xbbd78233f019e3774baa601b613cea31bbddd4bf',
'0x4cd4bc363458b52380d695b5c923b8994a245281',
'0x94d2eddfdea49718d3d569a3e4dc4339f5ee1eeb'






]
let total_exchange=0
let result
var t1 = new Date().getTime();
for(var i=0;i<addresses.length;i++)
{
result=await cleanData(addresses[i])


}
console.log(result)
for(var i=0;i<result.length;i++){
    total_exchange+=result[i].exchange
}
console.log(total_exchange)
var t0 = new Date().getTime();
console.log("Call to doSomething took " + (t0 - t1) + " milliseconds.")
}






answer();




