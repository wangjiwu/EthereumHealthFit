import "../stylesheets/app.css";
import {  default as Web3 } from 'web3';
import {  default as contract } from 'truffle-contract';

import fitbody_artifacts from '../../build/contracts/Fitbody.json'

var accounts;
var Fitbody = contract(fitbody_artifacts);
var members = []
var contract_address = "0x4dad57e0505bA0Cf46E432e7735442955f6C7B76"
window.account_one = "0x769E101B8CCA1d8e70e66d7DF27a2706b51B5c2A"
         

window.addEventListener('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    Fitbody.setProvider(web3.currentProvider);
    App.start();

});


window.App = { //where to close
    

    start: function() {
        var self = this;

        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
            accounts = accs;
            //$("#tentantAddress").html(getBalance(accounts[0])); //prints balance

            console.log(accounts);
            
        });
        $("#login_in").click(function() {
            window.account_one = $("#address").val()
            console.log(window.account_one)
            App.getAllMembersInfo()
           
        });

        $("#createMember").click(function() {
            console.log($("#name").val())

            App.creatMember($("#name").val(), $("#url").val())
            App.getAllMembersInfo()
        });

        $("#train").click(function() {
            console.log($("#trainId").val())

            var id = $("#trainId").val()
            var group1 = $("[name='Fruit']").filter(":checked"); 
            var choice = group1.attr("id")


            App.TrainBody(id, choice)
            App.getAllMembersInfo()
           
        });
        $("#RestBody").click(function() {
            console.log($("#activityId").val())

            var id = $("#activityId").val()
           
            App.RestBody(id)
            App.getAllMembersInfo()
           
        });
        $("#IncreaseNutrition").click(function() {
            console.log($("#activityId").val())

            var id = $("#activityId").val()
           
            App.IncreaseNutrition(id)
            App.getAllMembersInfo()
           
        });
        $("#StudyKnowledg").click(function() {
            console.log($("#activityId").val())

            var id = $("#activityId").val()
           
            App.StudyKnowledge(id)
            App.getAllMembersInfo()
           
        });







    },
    getBodyCount : function(){
       //alert("getBodyCount")
        Fitbody.at(contract_address).then(function(instance){
            return instance.getBodyCount.call();
        }).then(function(num){
            console.log(num.toNumber());
            return num.toNumber();
        }).catch(function(err){
            console.log(err);
        });
    },
    creatMember : function(name, url){
        //alert("creatMember")
  
        console.log(window.account_one)

        Fitbody.at(contract_address).then(function(instance){
            return instance.creatMember(name, url, {from:  window.account_one, gas:1000000} );
        }).then(function(result){
            console.log(result);
            //alert("create success")
        }).catch(function(err){
            console.log(err);
            alert("create failed")
        });
    },
    getMemberInfo : function(num, flag){
        //alert("getMemberInfo")
        
        Fitbody.at(contract_address).then(function(instance){
            return instance.members.call(num);
        }).then(function(result){

            console.log(result[0].toNumber(), result[1].toNumber(),
            result[2].toNumber(), result[3].toNumber(),
            result[4].toNumber(),result[5], result[6],
            result[9].toNumber()
            );

            if (flag) {


                var rowTem = '<tr>' + 
                '<td>' + num + '</td>' + 
                '<td>' + result[5] + '</td>' + 
                '<td>' + result[6] + '</td>' + 
                '<td>' + result[0].toNumber() + '</td>' + 
                '<td>' + result[1].toNumber() + '</td>' + 
                '<td>' + result[2].toNumber() + '</td>' + 
                '<td>' + result[3].toNumber() + '</td>' + 
                '<td>' + result[4].toNumber() + '</td>' + 
                '<td>' + result[9].toNumber() + '</td>' + 
                '</tr>';
    
                $(".table>tbody:last").append(rowTem);//复制tr，并且添加

            }


            return [result[0].toNumber(), result[1].toNumber(),
            result[2].toNumber(), result[3].toNumber(),
            result[4].toNumber(),result[5], result[6],
            result[9].toNumber()]
            
            //alert("get success")
        }).catch(function(err){
            console.log(err);
            alert("get failed")
        });
    },
    getAllMembersInfo : function(){
        members = []
        Fitbody.at(contract_address).then(function(instance){
           return instance.getBodyCount.call();
       }).then(function(num){
            var tmp = []
            $(".table>tbody").empty();
            for(var i = 0; i < num.toNumber(); i++) {
                tmp =   App.getMemberInfo(i, true);
                console.log(tmp)
            }
        //     console.log(members);
            
       }).catch(function(err){
           console.log(err);
       });
    },

    TrainBody : function(id, choice){
        //alert("TrainBody")     
        
        Fitbody.at(contract_address).then(function(instance){
            return instance.TrainBody(id, choice,  {from:  window.account_one, gas:1000000});
        }).then(function(result){
            
            //alert("Train success")
        }).catch(function(err){
            console.log(err);
            alert("Train failed")
        });
    },

    RestBody : function(id){
        //alert("RestBody")
        
        Fitbody.at(contract_address).then(function(instance){
            return instance.RestBody(id,  {from:  window.account_one, gas:1000000});
        }).then(function(result){
            
            //alert("Rest success")
        }).catch(function(err){
            console.log(err);
            alert("Rest failed")
        });
    },

    StudyKnowledge : function(id){
        //alert("StudyKnowledge")
       
        
        Fitbody.at(contract_address).then(function(instance){
            return instance.StudyKnowledge(id,  {from:  window.account_one, gas:1000000});
        }).then(function(result){
            
            //alert("Rest success")
        }).catch(function(err){
            console.log(err);
            alert("Rest failed")
        });
    },
    IncreaseNutrition : function(id){
        //alert("StudyKnowledge")
        
        Fitbody.at(contract_address).then(function(instance){
            return instance.IncreaseNutrition(id,  {from: account_one, gas:1000000});
        }).then(function(result){
            
            //alert("get success")
        }).catch(function(err){
            console.log(err);
            alert("get failed")
        });
    },

    bodyToOwner : function(){
        //alert("StudyKnowledge")
      
        Fitbody.at(contract_address).then(function(instance){
            return instance.bodyToOwner.call(0);
        }).then(function(result){
            console.log(result)
            //alert("IncreaseNutrition success")
        }).catch(function(err){
            console.log(err);
            alert("IncreaseNutrition failed")
        });
    },






};//loop for main