import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { dataQuestions } from '../store/actions';
import '../css/button.css';

class AnswerScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      questionState: '',
      // numberQuestion: 0,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.getQuestionStore();
  }

  getQuestionStore = () => {
    const { getQuestion } = this.props;
    this.setState({
      questionState: getQuestion,
      // numberQuestion: getQuestion.number + 1,
      isFetching: true,
    });
  }

  render() {
    const { questionState, isFetching } = this.state;
    return (
      <main>
        {isFetching && (
          <div>
            <h2 data-testid="question-category">
              {questionState.question.category}
            </h2>
            <h1 data-testid="question-text">{questionState.question.question}</h1>
            <div data-testid="answer-options">
              {questionState.answers.map(({ answer, dataTestId, className }, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ dataTestId }
                  className={ className }
                  // onClick= { this.btnClickAnswer }
                >
                  {answer}
                </button>))}
            </div>
          </div>
        )}
      </main>
    );
  }
}

AnswerScreen.propTypes = {
  inputQuestionsStore: propTypes.func,
  getQuestion: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  inputQuestionsStore: (questionsApi) => dispatch(dataQuestions(questionsApi)),
});

const mapStateToProps = (state) => ({

  getQuestion: state.questionsReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerScreen);
