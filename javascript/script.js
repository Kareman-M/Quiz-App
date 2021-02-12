// select elemnts
let bullets = document.querySelector('.bullets');
let answerd = document.querySelector('.answerd');
let numOfQues = document.querySelector('.numbers');
//////////////////////////////////////////////////////////////////
let numOfAnsQes = document.querySelector('.answerd'); 
let x = 1;
numOfAnsQes.innerHTML = x;
/////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

let questions = document.querySelector('.answers');
let ques = document.querySelector(".ques");

///////////////////////////////////////////////
let theRightAnswer = 0;
//select buttoun elemnts
let prvs_nxt = document.querySelector(".prvs_nxt");
let prvsBtn = document.querySelector('.prvs-btn');
let nxtBtn = document.querySelector('.nxt-btn');
let submitBtn = document.querySelector('.submit_btn');
/*******************************************************************/
let curIndex = 0;
//Ajax Function
function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){

        if(this.readyState===4 && this.status===200){

            let myRequestObj = JSON.parse(this.responseText);
            let qcount = myRequestObj.length;
            
            // calling the functions

            bullQues(qcount);
            addQues(myRequestObj[curIndex],qcount);
            //Time 
            time(600,qcount);
            //Next Question
            nxtBtn.onclick = ()=>{
                // get the right answer
                let righAnswer = myRequestObj[curIndex].right_answer;
                
                // get the next question
                curIndex++;

                // check right answer 
                checkAnswer(righAnswer,qcount);

                //Remove The last Question to put the new one
                questions.innerHTML ="";
                // add new question
                addQues(myRequestObj[curIndex],qcount);
                if(curIndex<qcount){
                x++;
                numOfAnsQes.innerHTML = x;
                }
                // color new bullet
                //colorBullets() 

                //the end of answers and show the result
                showResult(qcount);
               
            }
            prvsBtn.onclick = ()=>{
                if(curIndex !=0){
                // get the right answer
                let righAnswer = myRequestObj[curIndex].right_answer;
                // get the previous question
                curIndex--;
                // check right answer 
                checkAnswer(righAnswer,qcount);
                //Remove The last Question to get the previous one
                questions.innerHTML ="";
                // add previous question
                addQues(myRequestObj[curIndex],qcount); 
                --x;
                numOfAnsQes.innerHTML = x;
                }
                if(curIndex < qcount-1){

                    prvs_nxt.appendChild(nxtBtn);
                }
        }
    }
    }

    myRequest.open("GET","../javascript/question.json","true");
    myRequest.send();
  
}
getQuestions();


/***********************************************************************************/
// add the number of question an the bullets function 

function bullQues(b){
    numOfQues.innerHTML = b;
    // for(let i=0; i<b;i++){
    //     let span = document.createElement("span");
    //     span.className = "span";
    //     if(i === 0){
    //         span.className = "on";
    //     }
    //     bullets.appendChild(span);}
}
 /**********************************************************/
 // set question and it's answers functions

    function addQues(obj,count){
        if(curIndex<count){
        //creat the head of the question
        let h2 = document.createElement("h2");
        h2.innerHTML = obj["ques-title"];
        questions.appendChild(h2);

        // creat the answers and radio button

        for (let i =1 ; i<5 ; i++){

         let div = document.createElement('div');
        div.className = "answer";
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = "question"
        radio.id =`answer_${i}`;
        radio.dataset.answer = obj[`answer_${i}`];
            if(i==1){
              radio.checked=true;
            } 
        //creat lable element and text
        let lable = document.createElement('label');
        lable.htmlFor = `answer_${i}`;
        lable.innerHTML = obj[`answer_${i}`];
            //append radio and lable to the main div
        div.appendChild(radio);
        div.appendChild(lable);
        // append div to the questions part
        questions.appendChild(div);
    }
}
}
/****************************************************************************************/

//  Check Answers Function
function checkAnswer(right_answer,Q_C){
    let answers = document.getElementsByName('question');
    let chosenAnswer;
    for(let i =0 ; i<answers.length ; i++){
        if(answers[i].checked){
            chosenAnswer = answers[i].dataset.answer;
            console.log(chosenAnswer);
        }}

        //Get Next Question And Handle Bullets
        if(right_answer === chosenAnswer){
            console.log(right_answer);
            console.log(chosenAnswer);
            theRightAnswer=theRightAnswer+1;
            console.log(theRightAnswer)
        }
        
}
/************************************************************************************************/
//coloerd the bullets function

// function colorBullets() {
//     let spn = document.getElementsByClassName('span');
//     let span = Array.from(spn);
// span.forEach((span,index) => {
//     if(curIndex===index){
//         span.className="on";
//     }
//     console.log(span)
    
// });
// }
/***************************************************************************************************/
//Show Results Function
function showResult(count){
    if(curIndex ===count-1){
        nxtBtn.remove();
    }
}
/****************************************************************************************************/
 //end answers and show degree with submit button

 submitBtn.onclick = function(){
    clearInterval(timeInterval);
    submit();
}
 function submit(){
    questions.remove();
    prvsBtn.remove();
    nxtBtn.remove();
    submitBtn.remove();
    let h2 = document.createElement('h2');
    ques.appendChild(h2);
    console.log(theRightAnswer)
    h2.innerHTML=` Your Degree is "${theRightAnswer}"`;
    h2.style.textAlign = "center";
    h2.style.padding = "10px";
    h2.style.color = "red"
 }
 /*****************************************************************************************************/
// Time Function
let timecount = document.querySelector('.time');
let timeInterval;
function time(deration,count){
    if(curIndex<count){
        let minuts,seconds;
        timeInterval = setInterval(function(){

            minuts = parseInt(deration/60);
            seconds= parseInt(deration%60);
            
            minuts = minuts<10 ? `0${minuts}` : minuts;

            seconds = seconds<10 ? `0${seconds}` : seconds;
            
            timecount.innerHTML = `Time: ${minuts}:${seconds}`
            if(--deration<0){
                clearInterval(timeInterval);
                submit();
            }
        },1000)
    }
}