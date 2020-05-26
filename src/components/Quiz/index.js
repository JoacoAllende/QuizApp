import React from 'react'

class Quiz extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputAnswer: '',
            showAnswer: false,
            inputCategorySelected: ''
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.nextQuestion = this.nextQuestion.bind(this)
        this.onSelectCategory = this.onSelectCategory.bind(this)
    }

    onInputChange(e) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    nextQuestion() {
        this.setState({ showAnswer: false })
        this.props.onNextQuestion()
    }

    onSelectCategory(e) {
        e.preventDefault()
        this.props.selectCategory(e.target)
    }

    render() {
        const { inputAnswer, showAnswer, inputCategorySelected } = this.state
        const { completeQuestion, categorySelected, finished } = this.props
        if (finished) {
            return (
                <div className="ui segment">
                    <h2>The quiz has finished</h2>
                </div>
            )
        }
        else if (categorySelected) {
            const { question, answer, category, level } = completeQuestion
            return (
                <div className="ui segment">
                    <div className="ui form">
                        <div className="field">
                            <div className="header">
                                <h2>{category}</h2>
                            </div>
                        </div>
                        <div className="field">
                            <div className="header">
                                <h3>{level}</h3>
                            </div>
                        </div>
                        <div className="field">
                            <div className="header">
                                <h4>{question}</h4>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui input">
                                <label>
                                    Show answer
                                <input type="checkbox" value={showAnswer} name="showAnswer"
                                        onChange={this.onInputChange} />
                                </label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui input">
                                <input type="text" value={showAnswer ? answer : inputAnswer} name="inputAnswer"
                                    onChange={this.onInputChange} placeholder="Answer..." />
                            </div>
                        </div>
                        <button className="ui button" onClick={this.nextQuestion} >Next question</button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="ui segment">
                    <form className="ui form" onSubmit={this.onSelectCategory} >
                        <div className="field">
                            <label>Category</label>
                            <select className="ui fluid dropdown" value={inputCategorySelected}
                                name="inputCategorySelected"
                                onChange={this.onInputChange}>
                                <option value="">Select Category</option>
                                <option value="Sport">Sport</option>
                                <option value="Politics">Politics</option>
                                <option value="Cooking">Cooking</option>
                            </select>
                        </div>
                        <button className="ui button" type="submit" >Start quiz</button>
                    </form>
                </div>
            )
        }
    }
}

export default Quiz