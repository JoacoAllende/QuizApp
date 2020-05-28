import React from 'react'
import { AppContainer, HeaderContainer } from './index.style'
import QuestionEditor from '../QuestionEditor'
import Quiz from '../Quiz'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            questionEditor: false,
            quiz: false,
            index: 0,
            categorySelected: '',
            questionsGame: [],
            finished: false
        }
        this.onQuestionSubmit = this.onQuestionSubmit.bind(this)
        this.onNextQuestion = this.onNextQuestion.bind(this)
        this.showQuestionEditor = this.showQuestionEditor.bind(this)
        this.showQuiz = this.showQuiz.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
    }

    onQuestionSubmit(target) {
        const { questions } = this.state
        const { question, answer, category, level } = target
        this.setState({
            questions: [...questions, {
                question: question.value,
                answer: answer.value,
                category: category.value,
                level: level.value
            }]
        })
    }

    onNextQuestion() {
        const { questionsGame, index } = this.state
        const finished = index + 1 === questionsGame.length
        this.setState(prevState => ({ index: prevState.index + 1, finished }))
    }

    showQuestionEditor() {
        this.setState({ questionEditor: true, quiz: false })
    }

    showQuiz() {
        this.setState({ quiz: true, questionEditor: false, categorySelected: '', finished: false, index: 0 })
    }

    selectCategory(target) {
        const { inputCategorySelected } = target
        const { questions } = this.state
        const questionsGame = questions
            .filter(question => question.category === inputCategorySelected.value)
            .sort((a, b) => a.level.length - b.level.length)
        let finished = questionsGame.length === 0;
        this.setState({ categorySelected: inputCategorySelected.value, questionsGame, finished })
    }

    render() {
        const { questionEditor, quiz, index, categorySelected, finished } = this.state
        let { questionsGame } = this.state
        if (!questionsGame)
            questionsGame = []
        if (questionEditor) {
            return (
                <AppContainer className="ui container">
                    <HeaderContainer className="ui segment">
                        <button className="ui button" onClick={this.showQuiz} >Start quiz</button>
                        <button className="ui button" onClick={this.showQuestionEditor} >Add questions</button>
                    </HeaderContainer>
                    <QuestionEditor onQuestionSubmit={this.onQuestionSubmit} />
                </AppContainer>
            )
        }
        else if (quiz) {
            return (
                <AppContainer className="ui container">
                    <HeaderContainer className="ui segment">
                        <button className="ui button" onClick={this.showQuiz} >Start quiz</button>
                        <button className="ui button" onClick={this.showQuestionEditor} >Add questions</button>
                    </HeaderContainer>
                    <Quiz completeQuestion={questionsGame[index]} onNextQuestion={this.onNextQuestion}
                        categorySelected={categorySelected} selectCategory={this.selectCategory}
                        finished={finished} />
                </AppContainer>
            )
        }
        return (
            <AppContainer className="ui container">
                <HeaderContainer className="ui segment">
                    <button className="ui button" onClick={this.showQuiz} >Start quiz</button>
                    <button className="ui button" onClick={this.showQuestionEditor} >Add questions</button>
                </HeaderContainer>
            </AppContainer>
        )
    }
}

export default App