 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
 import {getDatabase, ref, set, get, child, update, remove} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
 
 const firebaseConfig = {
   apiKey: "AIzaSyDR0SaCre51RkNS2ugTjK0u5VQ0aqti9G8",
   authDomain: "niis-bank.firebaseapp.com",
   projectId: "niis-bank",
   storageBucket: "niis-bank.appspot.com",
   messagingSenderId: "435680462553",
   appId: "1:435680462553:web:478135c6fd31e014fa60c8",
   measurementId: "G-1EZMGD3KG5"
 };

 let accnumberFormat="^[0-9]{6}$";
 let accpasswordFormat="^[0-9]{4}$";

 window.onload()
 {
    const app = initializeApp(firebaseConfig);
    const db=getDatabase();
    const dbref=ref(db);
   multicolor();
  
document.getElementById('register-button').onclick= registerValidation;
document.getElementById('login-button').onclick= loginValidation;
document.getElementById('deposit-btn').onclick= forDeposit;
document.getElementById('withdraw-btn').onclick= forWithdraw;
document.getElementById('transfer-btn').onclick= forTransfer;
 document.getElementById('home-btn1').onclick= nevigatetoHome;
 document.getElementById('home-btn2').onclick= nevigatetoHome;
 document.getElementById('home-btn3').onclick= nevigatetoHome;
 document.getElementById('withdraw-submit').onclick= doWithdraw;
 document.getElementById('transfer-submit').onclick= doTransfer;
 document.getElementById('deposit-submit').onclick= doDeposit;
 



function nevigatetoHome()
{
    
        document.getElementById("errorMessage").innerHTML=" ";
        document.getElementById("login-portal").style="display:none";
        document.getElementById("register-portal").style="display:none";
        document.getElementById("portal").style="display:inline-block";
        document.getElementById("Withdraw-portal").style="display:none";
        document.getElementById("transfer-portal").style="display:none";
        document.getElementById("deposit-portal").style="display:none";
        document.getElementById("options").style="display:inline-block";
        refreshOriginalAmount(accNumber,accPass);
}

function forWithdraw()
{
    
    document.getElementById("login-portal").style="display:none";
    document.getElementById("register-portal").style="display:none";
    document.getElementById("portal").style="display:inline-block";
    document.getElementById("Withdraw-portal").style="display:inline-block";
    document.getElementById("transfer-portal").style="display:none";
    document.getElementById("deposit-portal").style="display:none";
    document.getElementById("options").style="display:none"; 

    
}
function forDeposit()
{
    
            document.getElementById("login-portal").style="display:none";
            document.getElementById("register-portal").style="display:none";
            document.getElementById("portal").style="display:inline-block";
            document.getElementById("Withdraw-portal").style="display:none";
            document.getElementById("transfer-portal").style="display:none";
            document.getElementById("deposit-portal").style="display:inline-block";
            document.getElementById("options").style="display:none"; 
}
function forTransfer()
{
     
            document.getElementById("login-portal").style="display:none";
            document.getElementById("register-portal").style="display:none";
            document.getElementById("portal").style="display:inline-block";
            document.getElementById("Withdraw-portal").style="display:none";
            document.getElementById("transfer-portal").style="display:inline-block";
            document.getElementById("deposit-portal").style="display:none";
            document.getElementById("options").style="display:none"; 
}


function multicolor()
{
    var refreshIntervalId = setInterval(
function () {
var randomColor = Math.floor(Math.random()*16777215).toString(16);
var banktext=document.getElementById("Multi-color");
banktext.style.color=randomColor;
console.log(banktext);
},1000);
}
let errormsg="for now here no error";

document.getElementById("forregisterred").onclick=switchtoRegister;
document.getElementById("forloginred").onclick=switchtoLogin;
function switchtoRegister()
{
        
        document.getElementById("login-portal").style="display:none";
        document.getElementById("register-portal").style="display:inline-block";
     
    
}
function switchtoLogin()
{
    document.getElementById("login-portal").style="display:inline-block";
    document.getElementById("register-portal").style="display:none";
}

let accNumber=document.getElementById("Lname").value;
let accPass=document.getElementById("lpassword").value;
function loginValidation()
{

    accNumber=document.getElementById("Lname").value;
    accPass=document.getElementById("lpassword").value;
    
    if(accNumber.match(accnumberFormat) && accPass.match(accpasswordFormat))
    {
        
        getLoginDetails(accNumber,accPass);

    }
    else{
       document.getElementById("errorMessage").innerHTML="Enter Valid Credential Format";
    }

} 


function registerValidation()
{
    
   let registerName=document.querySelector('#rname').value;
   let registerAccNumber=document.querySelector('#rAccNumber').value;
   let registerMobileNumber=document.querySelector('#rmnumber').value;
   let registerEmail=document.querySelector('#remail').value;
   let registerPassword=document.querySelector('#rpassword').value;
   let registerConfirmPassword=document.querySelector('#rcnpassword').value;
    console.log(registerName);
    console.log(registerEmail);
    console.log(registerAccNumber);
    console.log(registerMobileNumber);
    console.log(registerPassword);
    console.log(registerConfirmPassword);
    if(registerName=="")
    {
        alert('Name should not be blank');
    }
    else if(registerAccNumber.match(accnumberFormat) &&  registerPassword.match(accpasswordFormat) )
    {
        
         if(registerPassword !==registerConfirmPassword)
        {
            alert('Password and confirm Password should be same');
        }
        else{

            set(ref(db,"accNumber"+registerAccNumber+"/accPin"+registerConfirmPassword+"/accDetails"),
            {
                Name:registerName,
                AVLBalance: 0 ,
                Email: registerEmail,
                Phone:registerMobileNumber
            }).then(()=>
            {
                alert ("Register SuccessFully")
            document.getElementById("login-portal").style="display:inline-block";
            document.getElementById("register-portal").style="display:none";
            document.getElementById("portal").style="display:none";
            document.getElementById("Withdraw-portal").style="display:none";
            document.getElementById("transfer-portal").style="display:none";
            document.getElementById("deposit-portal").style="display:none";
            document.getElementById("options").style="display:inline-block"; 
            }).catch((error)=>{
                alert("Register Failed \n"+error);
            });

            set(ref(db,"accNumber"+registerAccNumber+"/Receieved"),
            {
                Recivedamt: 2
            }).then(()=>{
                alert("Received Amount Updated");
            }).catch((error)=>
            {
                alert("Received Amount Updated Failed\n"+error);
            });
            
        }
        
    }
    else if(!registerAccNumber.match(accnumberFormat) &&  !registerPassword.match(accpasswordFormat) )
    {
        alert("Account number and password format is not correct");
    }
    

    alert(this.RegisterName);

}

let customerTotalBalanceforlogin;

function getLoginDetails(pIn,pSw)
{
    let customNameforlogin;
    



get(child(dbref,"accNumber"+pIn+"/accPin"+pSw+"/accDetails")).then((snapshot)=>{
    if(snapshot.exists())
    {
        customNameforlogin=snapshot.val().Name;
        customerTotalBalanceforlogin=snapshot.val().AVLBalance;
        document.getElementById("userName").innerHTML="Hii \t"+customNameforlogin;
        document.getElementById("userBalance").innerHTML="Total Balance : \t"+customerTotalBalanceforlogin;
        document.getElementById("errorMessage").innerHTML=" ";
        document.getElementById("login-portal").style="display:none";
        document.getElementById("register-portal").style="display:none";
        document.getElementById("portal").style="display:inline-block";
        document.getElementById("Withdraw-portal").style="display:none";
        document.getElementById("transfer-portal").style="display:none";
        document.getElementById("deposit-portal").style="display:none";
        document.getElementById("options").style="display:inline-block";
        document.getElementById("forProfileLogo").style="display:inline-block";
    }
    else{
        document.getElementById("errorMessage").innerHTML="No data found in database";
    }
}).catch((error)=>
{
    console.error(error);
})

let recivedAmount;

get(child(dbref,"accNumber"+pIn+"/Receieved")).then((snapshot)=>{
    if(snapshot.exists())
    {
        let total=snapshot.val().Recivedamt;
        recivedAmount=customerTotalBalanceforlogin+total;
        updateamtindatabase(pIn,pSw,recivedAmount);
        resetRecivedamttoZero(pIn);
    }
    else{
        document.getElementById("errorMessage").innerHTML="No Received Amount Find In DataBase"
    }
}).catch((error)=>{
    document.getElementById("errorMessage").innerHTML=error;
})
}

function updateamtindatabase(pIn,pSw,amt)
{
    
    update(ref(db,"accNumber"+pIn+"/accPin"+pSw+"/accDetails"),
            {
                AVLBalance:amt 
            }).then(()=>{
                console.log("Received Amount Updated");
                refreshOriginalAmount(accNumber,accPass);
            }).catch((error)=>
            {
                alert("Received Amount Updated Failed\n"+error);
            });
   
}

function resetRecivedamttoZero(pIn)
{
    update(ref(db,"accNumber"+pIn+"/Receieved"),
    {
        Recivedamt:parseInt(0)
    }).then(()=>{
        console.log("Received Amount Updated to Zero");
    }).catch((error)=>
    {
        alert("Received Amount Updated Failed\n"+error);
    });
}

function updateAvilableBalance(pIn,pSw,uptamt)
{
    
    update(ref(db,"accNumber"+pIn+"/accPin"+pSw+"/accDetails"),
    {
        AVLBalance: parseInt(uptamt)
    }).then(()=>{
        document.getElementById("errorMessage").innerHTML="Deposit Amount Updated";
        refreshOriginalAmount(pIn,pSw);

    }).catch((error)=>
    {
        document.getElementById("errorMessage").innerHTML=error;
    });
}

function doWithdraw()
{
    let amt=document.getElementById('withdraw-amount').value;
    if(amt<100)
    {
        document.getElementById("errorMessage").innerHTML="Minimum  Withdraw amount Rs.100"
    }
    else{
        if(customerTotalBalanceforlogin<=amt)
        {
            document.getElementById("errorMessage").innerHTML="Insufficient Balance ";
           
        }
        else{
            document.getElementById("errorMessage").innerHTML="";
            customerTotalBalanceforlogin=parseInt(customerTotalBalanceforlogin)-parseInt(amt);
            updateAvilableBalance(accNumber,accPass,customerTotalBalanceforlogin);
        }
        
    }

}

function doDeposit()
{
    let amt=document.getElementById('deposit-amount').value;
    
    if(amt<100)
    {
        document.getElementById("errorMessage").innerHTML="Minimum  Deposit amount Rs.100";
    }
    else{
        document.getElementById("errorMessage").innerHTML="";
        customerTotalBalanceforlogin=parseInt(customerTotalBalanceforlogin)+parseInt(amt);
        updateAvilableBalance(accNumber,accPass,customerTotalBalanceforlogin);

    }
}
function doTransfer()
{
    
    let recaccno=document.getElementById('reciverAccNumber').value;
    let tranfAmt=document.getElementById('transfer-amount').value;
    if(recaccno=="")
    {
        document.getElementById("errorMessage").innerHTML="Receiver Account Number Should not be Blank" 
    }else{
        document.getElementById("errorMessage").innerHTML="";
        if(recaccno.match(accnumberFormat))
        {
            
            if(parseInt(tranfAmt)>parseInt(customerTotalBalanceforlogin))
            {
                document.getElementById("errorMessage").innerHTML="Insufficient Balance ";
            }
            else{
                

                update(ref(db,"accNumber"+recaccno+"/Receieved"),{
        Recivedamt:tranfAmt

    }).then(()=>{
        document.getElementById("errorMessage").innerHTML="Money Transferred Successfully";
        customerTotalBalanceforlogin=parseInt(customerTotalBalanceforlogin)-parseInt(tranfAmt);
        updateAvilableBalance(accNumber,accPass,customerTotalBalanceforlogin);
        refreshOriginalAmount(accNumber,accPass);
    }).catch((error)=>
    {
        document.getElementById("errorMessage").innerHTML=error;
    });
                
            }
           
        }else{
            document.getElementById("errorMessage").innerHTML="Incorrect Account Number Format";
        }
    }

}

function refreshOriginalAmount(pIn,pSw)
{
    get(child(dbref,"accNumber"+pIn+"/accPin"+pSw+"/accDetails")).then((snapshot)=>{
        if(snapshot.exists())
        {
            
            customerTotalBalanceforlogin=snapshot.val().AVLBalance;
            document.getElementById("userBalance").innerHTML="Total Balance : \t"+customerTotalBalanceforlogin;
            
            
        }
        else{
            document.getElementById("errorMessage").innerHTML="No data found in database";
        }
    }).catch((error)=>
    {
        console.error(error);
    })
}

}
