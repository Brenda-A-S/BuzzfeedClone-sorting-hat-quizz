import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions-sorting-hat.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string = ""

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ""

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  photo:string = ""

  bgc:string = ""

  constructor() { }

  ngOnInit(): void {
    this.finished = false
    this.title = quizz_questions.title

    this.questions = quizz_questions.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionIndex = 0
    this.questionMaxIndex = this.questions.length

  }

  playerChoose(value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      
      if(finalAnswer === "G"){
        this.photo = '../../../assets/imgs/Gryffindor.webp'  
        this.bgc = "griff"  
        document.body.classList.toggle('griffindor')
      }else if(finalAnswer === "S"){
        this.photo = "../../../assets/imgs/Slytherin.webp"
        this.bgc = "sly" 
        document.body.classList.toggle('slytherin')
      }else if(finalAnswer === "H"){
        this.photo = "../../../assets/imgs/Hufflepuff.webp"
        this.bgc = "huff" 
        document.body.classList.toggle('hufflepuff')        
      }else{
        this.photo = "../../../assets/imgs/Ravenclaw.webp"
        this.bgc = "rav" 
        document.body.classList.toggle('ravenclaw')
      }
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr)=> {
      if(
        arr.filter(item => item=== previous).length >
        arr.filter(item => item=== current).length
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }
}
