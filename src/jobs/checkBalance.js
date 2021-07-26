import {Configuration} from '../db/models';
import axios from 'axios';
var CronJob = require("cron").CronJob;


const scheduler = {};
//assignRider to pending task
scheduler.checkSMSGlobalBalance = new CronJob("15 2 * * * *", async function () {
  try{
    var configurationList = await Configuration.findAll({where: {company: 'SMS_GLOBAL'}});
   // console.log(configurationList[0])
    if(configurationList.length > 0){
    for(let i =0; i< configurationList.length ; i++){
      
      const response = await  axios.get(`${configurationList[i].url}/credit-api.php`, {
        params: {
          user: configurationList[i].user,
          password: configurationList[i].password,
          country: 'US'
        }
      });
     
      let amountLeft = response.data.split(";")[0].slice(8);
      let creditBalance = response.data.split(";")[2].slice(4);
      await Configuration.update({amountLeft:amountLeft, creditBalance: creditBalance},{where: {id: configurationList[i].id}})
    }
  
  }
  

  }catch(e){
    console.error(e);
  }
 
});


scheduler.checkRouteeBalance = new CronJob("15 2 * * * *", async function () {
  try{
    var configurationList = await Configuration.findAll({where: {company: 'ROUTEE'}});
   // console.log(configurationList[0])
    if(configurationList.length > 0){
    for(let i =0; i< configurationList.length ; i++){
      
      const response = await  axios.get(`https://connect.routee.net/accounts/me/balance`, {
        headers: {
          'Authorization': 'Bearer ae36521a-3cef-4407-aa2b-0d7bdc1960d2'
        }
      });
      await Configuration.update({creditBalance: response.data.balance}, {where: {id:configurationList[i].id }})
      if(response.data.balance < 1){
        const response = await  axios.post(`${configurationList[i].url}`, {
          from:"CodeInsyt",
          to: "+2330244151506",
          body: `Running out of sms bundle on Routee- ${configurationList[i].name}. Kindly top up!`
      }, {
          headers: {
              'Authorization': `Bearer ${data.configuration.apiKey}`
          }
      });
      }
     
    }
  
  }
  
  }catch(e){
    console.error(e);
  }
 
});


scheduler.checkNaloBalance = new CronJob("* 10 * * * *", async function () {
  try{
    var configurationList = await Configuration.findAll({where: {company: 'NALO'}});
    for(let i =0 ; i < configurationList.length; i++){
      const response = await  axios.get(`https://sms.nalosolutions.com/nalosms/credit_bal.php`, {
        params: {
          'username': configurationList[i].user,
          'password': configurationList[i].password
        }
      });
     // console.log("response for nalo ", response)
      await Configuration.update({creditBalance: response.data.total_sms, amountLeft: response.data.balance}, {where: {id:configurationList[i].id }})
    }

  }catch(e){
    console.error(e);
  }

})

scheduler.init = ()=>{
  scheduler.checkNaloBalance.start()
 // scheduler.checkRouteeBalance.start();
}

module.exports = scheduler;
