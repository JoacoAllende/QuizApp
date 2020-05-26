import React from 'react'

class QuestionEditor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer: '',
            category: '',
            level: ''
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onInputChange(e) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    onFormSubmit(e) {
        e.preventDefault()
        this.props.onQuestionSubmit(e.target)
        this.setState({
            question: '',
            answer: '',
            category: '',
            level: ''
        })
    }

    render() {
        const { question, answer, category, level } = this.state
        return (
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>Question</label>
                        <input type="text" value={question} name="question" 
                        onChange={this.onInputChange} placeholder="Question" />
                    </div>
                    <div className="field">
                        <label>Answer</label>
                        <textarea type="text" value={answer} name="answer" 
                        onChange={this.onInputChange} placeholder="Answer" />
                    </div>
                    <div className="field">
                        <label>Category</label>
                        <select className="ui fluid dropdown" value={category} name="category" 
                        onChange={this.onInputChange}>
                            <option value="">Select Category</option>
                            <option value="Sport">Sport</option>
                            <option value="Politics">Politics</option>
                            <option value="Cooking">Cooking</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Level</label>
                        <select className="ui fluid dropdown" value={level} name="level" 
                        onChange={this.onInputChange}>
                            <option value="">Select Level</option>
                            <option value="Easy">Easy</option>
                            <option value="Mediun">Mediun</option>
                            <option value="Difficult">Difficult</option>
                        </select>
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default QuestionEditor