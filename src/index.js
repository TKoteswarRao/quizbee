import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./assets/style.css"
import quizService from "./quizService"
import QuestionBox from "./components/QuestionBox"
import Result from "./components/Result"

class QuizBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    response: 0
  }

  getQuestions = () => {
    quizService().then(question => {
      this.setState({
        questionBank: question
      });
    });

  };
  componentDidMount() {
    this.getQuestions();
  }
  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      })
    }
    this.setState({
      response: this.state.response < 5 ? this.state.response + 1 : 5
    })
  }

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      response: 0
    })
  }
  render() {
    return (
      <div className="container">
        <div className="title">QuizBee</div>

        {this.state.questionBank.length > 0 &&
          this.state.response < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox question={question} options={answers}
                key={questionId}
                selected={answer => this.computeAnswer(answer, correct)}
              />
            )
          )}

        {this.state.response === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
      </div>
    );
  }
}




ReactDOM.render(
  <React.StrictMode>
    <QuizBee />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default QuizBee;
