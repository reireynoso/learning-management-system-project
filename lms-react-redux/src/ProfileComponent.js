import React, { Component,Fragment } from 'react'
import { Bar,Polar } from 'react-chartjs-2';
import {connect} from 'react-redux'
import {Animated} from 'react-animated-css'

class ProfileComponent extends Component {
    state = {
        chartData: {},
        mathAverage: 0,
        scienceAverage: 0,
        literatureAverage: 0,
        historyAverage: 0,
        technologyAverage: 0,
        currentStudent: {},
        graphView: ''
    }

    getChartDataTeacher(courses){
        let labelsTeacher = courses.map(course => {
            return course.name
        })

        let dataTeacher = courses.map(course => {
            return course.grades
        })
        this.setState({
            chartData:{
              labels: labelsTeacher,
              datasets:[
                {
                  label:'Population',
                  data: dataTeacher,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                  ]
                }
              ]
            }
          });
    }
    getChartData(math, science, literature, history, technology){
        this.setState({
          chartData:{
            labels: ['Math', 'Science', 'Literature', 'History', 'Technology'],
            datasets:[
              {
                label:'Population',
                data:[
                    // this.state.mathAverage,
                    // this.state.scienceAverage,
                    // this.state.literatureAverage,
                    // this.state.historyAverage,
                    // this.state.technologyAverage
                    math,
                    science,
                    literature,
                    history,
                    technology
                ],
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]
          }
        });
      }

      handleGraphView = (graphName) => {
        let Scroll = require('react-scroll')
        let scroll = Scroll.animateScroll;

        this.setState({
            graphView: graphName
        })
        scroll.scrollToBottom()
      }

    //   averageCalculator = (scoresArray) => {
    //     let totalScore = 0;
    //     scoresArray.map(score => {
    //         totalScore += score.grade_assigned
    //     })
    //     if(scoresArray.length !== 0){
    //         return totalScore / scoresArray.length
    //     }
    //     else{
    //         return 0
    //     }
        
    //   }

    //   gradeSorter = (gradeData) => {
        // console.log(gradeData)

        // let mathScores = [];
        // let scienceScores = [];
        // let literatureScores = [];
        // let historyScores = [];
        // let technologyScores = [];

        // gradeData.grades.map(grade => {
        //     switch(grade.subject){
        //         case "Math":
        //             mathScores = [...mathScores, grade]
        //         break;
        //         case "Science":
        //             scienceScores = [...scienceScores, grade]
        //         break;
        //         case "Literature":
        //             literatureScores = [...literatureScores, grade]
        //         break;
        //         case "History":
        //             historyScores = [...historyScores, grade]
        //         break;
        //         case "Technology":
        //             technologyScores = [...technologyScores, grade]
        //         break;
        //         default: return null
        //     }
        // })
        // console.log(this.averageCalculator(mathScores))
        // console.log(literatureAverage)
        // console.log(scienceAverage)
        // this.setState({
        //     mathAverage: this.averageCalculator(mathScores),
        //     scienceAverage: this.averageCalculator(scienceScores),
        //     literatureAverage: this.averageCalculator(literatureScores),
        //     historyAverage: this.averageCalculator(historyScores),
        //     technologyAverage: this.averageCalculator(technologyScores)
        // })     
    //   }

      componentDidMount = () => {
        const token = localStorage.getItem("token")
        const urlSplit = this.props.history.location.pathname.split("/")
        const url = urlSplit[3]
        const path = urlSplit[2]// checks where to fetch. either student or teacher path
        
        fetch(`http://localhost:3000/api/v1/${path}s/${url}/${path}_grades`, {
            headers: {
                "Authorization": `Bearer ${token}`
           }
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            // this.gradeSorter(data)
            // this.getChartData();
            // this.setState({
            //     currentStudent: data.student
            // })
            if(path === "teacher"){
                // console.log(data) //data presents teacher courses with course averages
                this.getChartDataTeacher(data)
            }
            else{
                this.getChartData(data.math, data.science, data.literature, data.history, data.technology); 
            } 
            // this.setState({
            //     mathAverage: data.math,
            //     scienceAverage: data.science,
            //     literatureAverage: data.literature,
            //     historyAverage: data.history,
            //     technologyAverage: data.technology
            // })
        })
        // this.getChartData(data.math, data.science, data.literature, data.history, data.technology);   
    }
       
    render() {
        // console.log(this.state)
        return (
            <div className="ui container" style={{marginTop: "10px", height: '80vh'}}>
                <h1>Profile</h1>
                {
                    Object.keys(this.props.currentUser).length !== 0 ?
                    <Animated animationIn="fadeInLeft" animationInDuration={2000} animationOut="fadeOut" isVisible={true}>
                    <div className="ui centered card">
                        <div className="image">
                            <img src={this.props.currentUser.image_url}/>
                        </div>
                        <div className="content">
                            <h1>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h1>
                            <p>{this.props.currentUser.bio}</p>
                        </div>
                    </div>
                    </Animated>
                    :
                    <h1>Loading</h1>
                }
                <h2>View Average Grades by Subject</h2>
                <div className="ui large buttons">
                    <button className="ui grey button" onClick={() => this.handleGraphView("Polar")}>Polar Graph View</button>
                    <div className="or"></div>
                    <button className="ui black button" onClick={() => this.handleGraphView("Bar")}>Bar Graph View</button>
                </div>
                 
                {
                    this.state.graphView ? 
                    <Fragment>
                        {
                            this.state.graphView === "Bar" ?
                            <Bar
                                data={this.state.chartData}
                                options={{
                                    title:{
                                        display:true,
                                        text: 'Bar Graph Average Grades',
                                        fontSize:25
                                    },
                                    legend:{
                                        display:false,
                                        position: 'bottom'
                                    }
                                }}
                            />
                            :
                            <Polar
                                data={this.state.chartData}
                                options={{
                                title:{
                                    display: 'hello',
                                    text: 'Polar Chart Average Grades',
                                    fontSize:25
                                },
                                legend:{
                                    display:true,
                                    position:'bottom'
                                }
                                }}
                            />
                        }
                    </Fragment>
                    :
                    null
                }                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(ProfileComponent)