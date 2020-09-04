import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Container,Row,Col } from 'react-bootstrap';
import Statewise from './Statewise'
import {BrowserRouter as Router,Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
class App extends React.Component {

constructor(props){
  super(props);
  this.state={
      isLoading:true,
      dataSource:null,
      dataSource2:null,
      daily_confirmed:null,
  }
}
componentDidMount (){
  return fetch('https://api.covid19india.org/data.json')
     .then( (response) => response.json() )
     .then( (responseJson) =>{
       this.setState({
           isLoading:false,
           dataSource :responseJson.cases_time_series,
           dataSource2:responseJson.statewise
           
       })
          
     })
     .catch((error) => {
         console.log(error)
     });
 }

  render() {
    if(this.state.isLoading){

      return(
          <h1>Loading</h1>
      )

  }  
  else{
    let m=0;
    let mont=[]
    let n_dailyConfirmed =0
   let n_totalrecovered=0
   let n_totaldeceased=0
    let dat = this.state.dataSource.map((val, key) =>
    {
      //const daily_confirmed = []
      // global.n_dailyConfirmed = daily_confirmed.map((daily_confirmed) => val.dailyconfirmed)
     
     n_dailyConfirmed = val.totalconfirmed
    n_totalrecovered = val.totalrecovered
    n_totaldeceased = val.totaldeceased
    let  n_month=val.date
     
    
       
         
         mont[m]=n_totalrecovered
         m=m+1;
          
         
 
 
    
        return (
        n_totalrecovered,mont,n_totaldeceased,n_dailyConfirmed
        
        /*<View key={key}>
            
            <Text>{n_dailyConfirmed}</Text>
            
             </View>*/)
    });
    
   


    let i
    let k=[]
    for(i=0;i<dat.length;i++)
    {
      k[i]=dat[i];
    }
  
return(
  <Container fluid>
    <Row className="align-items-center  " style={{ textAlign:"center",fontSize:30,fontWeight:"bold",
    color:"white",shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
        backgroundColor:"#5827b0",
        height:100,}}><Col className="text-align-center text-wrap">COVID-19 INFORMATION
        </Col>
  </Row>
        
<Row className="align-items-center tottxt" style={{textAlign:"center"}}>
  <Col className="text-uppercase">Total Confirmed</Col>
  <Col className="text-uppercase">Total Recovered</Col>
  <Col className="text-uppercase">Total Deceased</Col>
</Row>
     <Row className="align-items-center" style={{textAlign:"center"}}>
         <Col style={{fontSize:16,color:"#FF334F",fontWeight:"bold"}}>{n_dailyConfirmed}</Col>
          <Col style={{fontSize:16,color:"green",fontWeight:"bold"}}>{n_totalrecovered}</Col>
           <Col style={{fontSize:16,color:"black",fontWeight:"bold"}}>{n_totaldeceased}</Col>     
      </Row>
      <Row className="align-items-center text-uppercase" style={{textAlign:"center"}}><Col>Statewise details (Click on any state to get district wise details)</Col></Row>
      
      <Router>
        <div >
         <Route path = "/Statewise" component ={"/Statewise"}/>
                  </div>
        </Router>
      <div className="align-items-center txtmd brdr" >
                  
                  
                  <Row style={{marginLeft:3,marginRight:3}}>
                  <Col className="brdrright" xs={5} sm={4} md={4} style={{textAlign:"center"}}>State</Col>
                  <Col className="brdrright" style={{textAlign:"center",paddingRight:0,paddingLeft:0}} >Confirmed</Col>
                  <Col className="brdrright" style={{textAlign:"center",paddingRight:0,paddingLeft:0}}>Active</Col>
                  <Col className="brdrright" style={{textAlign:"center",paddingRight:0,paddingLeft:0}} >Recovered</Col>
                  <Col style={{textAlign:"center",paddingRight:0,paddingLeft:0}}>Deaths</Col>
                  </Row>
                  
       </div>
      <div className="align-items-center text-uppercase statewise">
      
        <ul className="align-items-center text-uppercase txtmed " style={{paddingInlineStart:0,fontWeight:"bold",marginLeft:5,marginRight:5,marginTop:10}}>
          {this.state.dataSource2.map(item=>{
            if(item.statecode!="TT"){
          return(
            
            
             <Row className="align-items-center single" style={{textAlign:"center"}}>
               <Col xs={5} sm={4} md={4}  className=""> 
            <Button className="text-wrap stbtn" >{item.state}</Button>
            </Col>
            <Col style={{color:"#FF334F"}}> 
            {item.confirmed}
            </Col>
            <Col style={{color:"blue"}}> 
            {item.active}
            </Col>
            <Col  style={{color:"green"}}> 
            {item.recovered}
            </Col>
            <Col  style={{color:"black"}}> 
            {item.deaths}
            </Col>
            </Row>
                  
          
          )
           
            } 
          })}
          </ul>
        
        </div>     

 </Container>
  );
}
  }
}


export default App;
