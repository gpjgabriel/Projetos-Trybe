import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchQuestionsApi, fetchTokenApi } from '../services/triviaApi';
import { tokenLogin, dataQuestions, pointNew } from '../store/actions';
import AnswerScreen from './AnswerScreen';

const NUMBER_RANDOM = 0.5;
const RESPONSE_CODE = 3;
const LAST_QUESTION = 4;
const POINTS_DIFFICULTY = { hard: 3, medium: 2, easy: 1 };
const CORRECT_ANSWER = 'correct-answer';
const NUMBER_TEN = 10;
const TIME_OUT = 1000;
const TIMER_MIN = 0;

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      Allquestions: [],
      numberQuestion: 0,
      answers: [],
      // loading: true,
      isFetching: false,
      isAnswer: false,
      seconds: 30,
    };
  }

  componentDidMount() {
    this.getQuestionsApi();

    const interval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }), () => {
        const { seconds } = this.state;
        if (seconds === TIMER_MIN) clearInterval(interval);
      });
    }, TIME_OUT);
  }

  getQuestionsApi = async () => {
    const { tokenState } = this.props;
    const questionsReturn = await fetchQuestionsApi(tokenState);
    // Se o TOKEN expirar, a API retorna um RESPONSE_CODE = 3 -> no else é solicitando um novo TOKEN
    if (questionsReturn.response_code !== RESPONSE_CODE) {
      this.sortAndPostQuestions(questionsReturn);
    } else {
      const tokenApi = await fetchTokenApi();
      const { loginToken } = this.props;
      localStorage.setItem('token', tokenApi.token);
      loginToken(tokenApi.token);
      this.getQuestionsApi();
    }
  }

  btnClickAnswer = ({ target }) => {
    const { seconds, numberQuestion } = this.state;
    const { question, login, player, newPoint } = this.props;
    if (target.name === CORRECT_ANSWER) {
      const sumScore = NUMBER_TEN + (seconds * POINTS_DIFFICULTY[question.difficulty]);
      const hash = md5(login.email).toString();
      const urlPhoto = `https://www.gravatar.com/avatar/${hash}`;
      let lastRanking = [];
      if (localStorage.getItem('ranking')) {
        lastRanking = JSON.parse(localStorage.getItem('ranking'));
        const lastPlay = lastRanking
          .find((lastPlayer) => lastPlayer.name === login.nome);
        console.log(numberQuestion);
        lastRanking = lastRanking.filter((item) => item !== lastPlay);
        console.log(lastPlay);
        console.log(lastRanking);
        console.log(player.score);
      }
      const dataPlayer = {
        name: login.nome,
        score: sumScore + player.score,
        url: urlPhoto };
      const dataPlayerStr = JSON.stringify([...lastRanking, dataPlayer]);
      localStorage.setItem('ranking', dataPlayerStr);
      newPoint({ score: player.score + sumScore, assertions: player.assertions + 1 });
    }
    this.setState({
      isAnswer: true,
    });
  }

  sortAndPostQuestions(questionsReturn) {
    const { inputQuestionsStore } = this.props;
    const { numberQuestion } = this.state;
    // Coloca todas as respostas em um único Array;
    const allAnswers = [
      questionsReturn.results[numberQuestion].correct_answer,
      ...questionsReturn.results[numberQuestion].incorrect_answers];
    const answersWithDataTestId = [];
    // Coloca todas as respostas com seu respectivo DataTestId em um Array para criar o Random;
    allAnswers.map((answer, index) => {
      if (index === 0) {
        answersWithDataTestId.push({
          answer,
          dataTestId: CORRECT_ANSWER,
          className: CORRECT_ANSWER,
        });
        return answersWithDataTestId;
      }
      answersWithDataTestId.push({
        answer,
        dataTestId: `wrong-answer-${index - 1}`,
        className: 'wrong-answer',
      });
      return answersWithDataTestId;
    });
    // Embaralha o conteúdo do array de respostas
    // Parte do código retirado de: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const randomAnswers = answersWithDataTestId.sort(
      () => Math.random() - NUMBER_RANDOM,
    );
    // Envia pra Store a pergunta, o número dela e as respostas desordenadas;
    inputQuestionsStore({
      question: questionsReturn.results[numberQuestion],
      number: numberQuestion,
      answers: randomAnswers,
    });
    this.setState({
      questionsReturn,
      Allquestions: questionsReturn.results,
      answers: randomAnswers,
      isFetching: true,
    });
  }

  render() {
    const {
      Allquestions,
      numberQuestion,
      isFetching,
      answers,
      isAnswer,
      questionsReturn,
      seconds,
    } = this.state;
    const { history } = this.props;
    return (
      <main>
        {isFetching && (
          isAnswer ? <AnswerScreen /> : (
            <div>
              <p>
                { seconds }
              </p>
              <h2 data-testid="question-category">
                {Allquestions[numberQuestion].category}
              </h2>
              <h1 data-testid="question-text">{Allquestions[numberQuestion].question}</h1>
              <div data-testid="answer-options">
                {answers.map(({ answer, dataTestId }, index) => (
                  // seconds === TIMER_MIN ?
                  <button
                    type="button"
                    key={ index }
                    className={ seconds === TIMER_MIN && 'wrong-answer' }
                    disabled={ seconds === TIMER_MIN }
                    name={ dataTestId }
                    data-testid={ dataTestId }
                    onClick={ this.btnClickAnswer }
                  >
                    {answer}
                  </button>))}
              </div>
            </div>
          ))}
        {isAnswer && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              if (numberQuestion === LAST_QUESTION) history.push('/feedback');
              else {
                this.setState(() => {
                  this.setState({
                    seconds: 30,
                    numberQuestion: numberQuestion + 1,
                    isAnswer: false,
                  });
                  console.log(numberQuestion);
                }, () => {
                  this.sortAndPostQuestions(questionsReturn);
                });
              }
            } }
          >
            Next
          </button>)}
      </main>
    );
  }
}

GameScreen.propTypes = {
  tokenState: propTypes.string,
  loginToken: propTypes.func,
  inputQuestionsStore: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  newPoint: (point) => dispatch(pointNew(point)),
  loginToken: (token) => dispatch(tokenLogin(token)),
  inputQuestionsStore: (questionsApi) => dispatch(dataQuestions(questionsApi)),
});

const mapStateToProps = (state) => ({
  tokenState: state.token,
  question: state.questionsReducer.question,
  player: state.player,
  login: state.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
