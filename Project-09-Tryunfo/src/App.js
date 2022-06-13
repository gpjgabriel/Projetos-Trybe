import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import RenderCards from './components/RenderCards';
import SearchCard from './components/SearchCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      saveCards: [],
    };

    this.inputChange = this.inputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.validTrunfo = this.validTrunfo.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.searchCard = this.searchCard.bind(this);
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    const cardSave = this.state;
    const { saveCards, cardTrunfo } = this.state;
    this.setState({
      saveCards: [...saveCards, cardSave],
    }, this.validTrunfo(cardTrunfo));
    this.setState({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  inputChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    }, this.validFields);
  }

  validFields() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const arrAtt = [cardAttr1, cardAttr2, cardAttr3];
    const MAX_ATTRIBUTE = 90;
    const validAtt = arrAtt.every((att) => att >= 0 && att <= MAX_ATTRIBUTE);
    const MAX_SUM = 210;
    const validAttSum = arrAtt.reduce((acc, att) => Number(acc) + Number(att)) <= MAX_SUM;
    if (cardName && cardDescription && cardImage && validAtt && validAttSum) {
      return (this.setState({
        isSaveButtonDisabled: false }));
    } return this.setState({
      isSaveButtonDisabled: true });
  }

  validTrunfo(saveCards) {
    if (saveCards) {
      this.setState({
        hasTrunfo: saveCards,
      });
    }
  }

  deleteCard({ target }) {
    const { saveCards } = this.state;
    const nameCardDel = target.name;
    const filterCards = saveCards.filter((card) => card.cardName !== nameCardDel);
    if (filterCards.length === 0) {
      this.setState({
        saveCards: filterCards,
        cardTrunfo: saveCards[0].hasTrunfo,
        hasTrunfo: saveCards[0].hasTrunfo,
      });
    }
    const delTrunfo = filterCards.some((card) => card.cardTrunfo === true);
    this.setState({
      saveCards: filterCards,
      cardTrunfo: delTrunfo,
      hasTrunfo: delTrunfo,
    });
  }

  searchCard({ target }) {
    const { saveCards } = this.state;
    console.log(target.checked);
    if (target.checked) {
      const filterCards = saveCards.filter((card) => card.cardTrunfo === true);
      return this.setState({
        saveCards: filterCards,
      });
    }
    const filterCards = saveCards.filter((card) => card.cardName.includes(target.value)
        || card.cardRare === target.value);
    this.setState({
      saveCards: filterCards,
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      saveCards,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo-GPJ</h1>
        <Form
          onInputChange={ this.inputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <SearchCard searchCard={ this.searchCard } />
        <RenderCards saveCards={ saveCards } deleteCard={ this.deleteCard } />
      </div>
    );
  }
}

export default App;
