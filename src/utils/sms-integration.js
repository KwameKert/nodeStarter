import axios from 'axios';
import {Message} from '../db/models';
import constants from '../config/constants';
import message from '../db/models/message';


 const smsGlobal = async (data) =>{
    //data: configurationUrl, configurationUser, configurationPassword, 
    const response = await  axios.get(`${configuration.url}/http-api.php`, {
        params: {
          action: 'sendsms',
          user: configuration.user,
          password: configuration.password,
          from:data.senderId,
          to: data.destination,
          text: data.text
        }
      });
      if(response.data.substring(0,2) == 'OK'){
        data = {...data, status: 'successful'}
         message = await Message.create({...data});
      }else{
        data = {...data, status: 'failed'};
         message = await Message.create({...data});
      }
      return response;
}


const nalo = async (data) =>{
    //data: configurationUrl, configurationUser, configurationPassword, 
    console.log("nalo here ")
    try{
        const response = await  axios.get(`https://api.nalosolutions.com/bulksms/`, {
        params: {
          username: data.configuration.user,
          password: data.configuration.password,
          dlr: 1,
          type: 0,
          destination: data.destination,
          source:"AGHQ",
          message: data.text
        }
      });
      console.log("nice one here +",response.data.substr(0, 4))
      if(response.data.substr(0, 4) != "1701"){
        return null;
      }
      data = {...data, status: 'successful'}
      let message = await Message.create({...data});
      return message;
    }catch(e){
        console.error(e)
        console.log("nalo errr")
        //  console.error(e);
          data = {...data,sender:data.senderId, status: 'failed'};
           await Message.create({...data});
          return null;
    }  
}


const routeMobileSingle = async (data) =>{
  try{
      //console.log("im here")
      const response = await  axios.get(`http://api.rmlconnect.net/bulksms/bulksms`, {
      params: {
        username: data.configuration.user,
        password: data.configuration.password,
        dlr: 1,
        type: 5,
        destination: data.destination,
        source:data.senderId,
        message: data.text
      }
    });
  
    if(response.data.substr(0, 4) != "1701"){
      return null;
    }
    let responseArr = response.data.split("|");
    
    data = {...data, sender:data.senderId, status: 'successful', trackingId: responseArr[2] }
    let message = await Message.create({...data});
    return message;
  }catch(e){
      console.error(e)
      console.log("nalo errr")
      //  console.error(e);
        data = {...data,sender:data.senderId, status: 'failed'};
         await Message.create({...data});
        return null;
  }  
}


const routeMobileBulk= async (data) =>{
  try{
      console.log("bulksms here");
      const response = await  axios.get(`http://api.rmlconnect.net/bulksms/bulksms`, {
      params: {
        username: data.configuration.user,
        password: data.configuration.password,
        dlr: 1,
        type: 5,
        destination: data.destination,
        source:data.senderId,
        message: data.text
      }
    });
    console.log("nice one here +",response.data.substr(0, 4))
    if(response.data.substr(0, 4) != "1701"){
      return null;
    }
    data = {...data, status: 'successful'}
    let message = await Message.create({...data});
    return message;
  }catch(e){
      console.error(e)
      console.log("nalo errr")
      //  console.error(e);
        data = {...data,sender:data.senderId, status: 'failed'};
         await Message.create({...data});
        return null;
  }  
}



 const routeeSingle = async (data) =>{
     try{
     
        const response = await  axios.post(`${data.configuration.url}`, {
            callback: { strategy: "OnChange", url: `${constants.HOST_URL}/api/message/callback`},
            from:data.senderId,
            to: data.destination,
            body: data.text
        }, {
            headers: {
                'Authorization': `Bearer ${data.configuration.apiKey}`
            }
        });
  //     console.log(response)
      let message =  await Message.create({...data,sender:data.senderId,  trackingId: response.data.trackingId, status: response.data.status});
        return message;
        
     }catch(e){
         console.log("routee errr")
       //  console.error(e);
         data = {...data,sender:data.senderId, status: 'failed'};
          await Message.create({...data});
         return null;
     }

}

const routeeBulk = async (data) => {
  try{
  
    let phoneNumbers = data.destination.split(",");
    const response = await  axios.post(`${data.configuration.url}/campaign`, {
      callback: { strategy: "OnChange", url: `${constants.HOST_URL}/api/message/callback`},
      from:data.senderId,
      to: phoneNumbers,
      body: data.text
  }, {
      headers: {
          'Authorization': `Bearer ${data.configuration.apiKey}`
      }
  });


  let message =  await Message.create({...data,sender:data.senderId,  trackingId: response.data.trackingId, status: response.data.state});
  return message;


  }catch(e){
         console.log("routee errr")
       //  console.error(e);
         data = {...data,sender:data.senderId, status: 'failed'};
          await Message.create({...data});
         return null;
     }
}



export const blastSmsSingle = (data) =>{
   // console.log("got here")
    console.log(data.configuration.company);
    switch(data.configuration.company){
        case 'SMS_GLOBAL':
            return smsGlobal(data);
            
        case 'ROUTEE':
            return routeeSingle(data);

        case 'ROUTE_MOBILE':
            return routeMobileSingle(data);
        
        case 'NALO':
            return nalo(data);
        
        default:
            return routee(data);

    }
}




//sms bulk 
export const blastSmsBulk = (data) =>{
  // console.log("got here")
   console.log(data.configuration.company);
   switch(data.configuration.company){
       case 'ROUTEE':
           return routeeBulk(data);
       case 'NALO':
           return nalo(data);

       case 'ROUTE_MOBILE':
          return routeMobileBulk(data);
      
       default:
           return routeeBulk(data);

   }
}