import React, { Component } from "react";
import {Container, Row, Col} from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './MainCourses.css';

import {localhost, fetchMainCourses} from '../util/util';


class MainCourses extends Component {
  state = {
    foods: [],
    activePage: 1,
    limit: 4,
    total: 0,
  }
  
  componentDidMount(){
    fetchMainCourses(this.state.activePage,this.state.limit)
         .then(res => {
           this.setState({
            foods: res.data.docs,
            total: res.data.total
           });
         })
         .catch(e => console.log(e));    
  }

  goToPage = (page) => {
    fetchMainCourses(page,this.state.limit)
         .then(res => {
           this.setState({
            activePage : page,
            foods: res.data.docs,
            total: res.data.total
           });
         })
         .catch(e => console.log(e));    
  }

  nextPage = () => {
    fetchMainCourses(this.state.activePage+1,this.state.limit)
    .then(res => {
      this.setState({
       activePage : this.state.activePage+1,
       foods: res.data.docs,
       total: res.data.total,
      });
    })
    .catch(e => console.log(e));    
  }
  prevPage = () => {
    fetchMainCourses(this.state.activePage-1,this.state.limit)
    .then(res => {
      this.setState({
       activePage : this.state.activePage-1,
       foods: res.data.docs,
       total: res.data.total
      });
    })
    .catch(e => console.log(e));    
  }
  
  render() {
   
    
    let pagination = null;
    if (this.state.total > 0) {
      const pageNumber = Math.ceil(this.state.total / this.state.limit);
      pagination = new Array(pageNumber).fill(null).map((_, i) => {
        return (
          <PaginationItem key={i} active={this.state.activePage === i+1}>
            <PaginationLink onClick={this.state.activePage !== i+1 ? () => this.goToPage(i+1): null}>
              {i+1}
            </PaginationLink>
          </PaginationItem>
        )
      });
    }
    let foods = "Loading Main Courses...";
    if (this.state.foods.length > 0 ){
      foods = this.state.foods.map((val, i) => {
        return(
          <React.Fragment key={val._id}>
            <Col className="item" lg="3" md="6">
            <img src={`${localhost}/${val.picture}`} alt="maincourses"/>
            <h6>{val.name}</h6>
            <div className="btn-wrap">
              <button className="btn btn-info" >Add to list</button>
              <button className="btn btn-primary" >Details</button>
              </div>
              <p className="lead">{`${val.price.toLocaleString()} IDR`}</p>
            </Col>
            {(i+1) % 4 === 0 ? <div className="w-100"></div>: null}
          </React.Fragment>
          
        )
      });
    }
    return (
      <React.Fragment>
      <div style={{textAlign:"center", marginTop:"25px"}}>
      <h1>Main Courses</h1>
      <img className="hrimg" src="../images/hrline.png" alt="hrline"/>
      
      </div>
      <Pagination style={{justifyContent:"center"}} aria-label="Page navigation example">
        <PaginationItem disabled={this.state.activePage === 1}>
          <PaginationLink previous onClick={this.prevPage} />
        </PaginationItem>
        {pagination}
        <PaginationItem disabled ={this.state.activePage === Math.ceil(this.state.total / this.state.limit)}>
          <PaginationLink next onClick={this.nextPage} />
        </PaginationItem>
      </Pagination>
      
      <Container>          
          <Row>
            {foods}
          </Row>
      </Container>
      </React.Fragment>
    );
  }
}

export default MainCourses;
