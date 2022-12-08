/**
 * @author AL EMRAN
 * @author_email emrancu1@gmail.com
 * @company Besnik.
 * @started at 6am 8th December 2022.
 */

(function () {

    /**
     * hide FAQ's all answers without clicked question's answer
     * @param questions
     * @param avoidableIndex
     * @param faqAnswerControlBy
     */
    function hideOthersAnswer(questions, avoidableIndex, faqAnswerControlBy) {
        questions.forEach((question, i) => {
            if (i !== avoidableIndex) {
                let answerArea = selectAnswerForToggle(question);

                if (faqAnswerControlBy === 'style') {
                    answerArea.style.height = '0px'
                }

                answerArea?.classList.remove('active')
                question?.classList.remove('active')
            }
        })
    }

    /**
     * select answer element of clicked question. Answer may place inside question element or after question element.
     * @param question
     * @returns {null|Element|*}
     */
    function selectAnswerForToggle(question) {

        let answerFromInside = question.querySelector('.answer');
        if (answerFromInside) {
            return answerFromInside;
        }

        let answerFromNextElement = question.nextElementSibling;
        if (answerFromNextElement && answerFromNextElement.matches('.answer')) {

            return answerFromNextElement
        }

        return null;
    }

    /** select all faq container **/
    let faqContainers = document.querySelectorAll('.faq-container');

    if (faqContainers.length) {

        let defaultFaqOptions = {
            slide_speed: 300, // expected value  numeric miliseconds
            close_others: true,  // expected value 'true', 'false'
            answer_control_by: 'style'  // expected value 'class', 'style'
        }

        faqContainers.forEach(faqContainer => {

            let faqAnswerSlideSpeed = faqContainer.hasAttribute('slide_speed') ? parseInt(faqContainer.getAttribute('slide_speed')) : defaultFaqOptions.slide_speed;

            let faqCloseOtherAnswer = faqContainer.hasAttribute('close_others') ? faqContainer.getAttribute('close_others') == 'true' : defaultFaqOptions.close_others;

            let faqAnswerControlBy = faqContainer.hasAttribute('answer_control_by') ? faqContainer.getAttribute('answer_control_by') : defaultFaqOptions.answer_control_by;

            let questions = faqContainer.querySelectorAll('.question');

            questions.forEach((question, i) => {

                let answerArea = selectAnswerForToggle(question);

                let answerAreaHeight = answerArea.getBoundingClientRect().height;

                /**
                 * add some style for slide-up & down transition when answerControlBy value is 'style' (default).
                 */
                if (faqAnswerControlBy === 'style') {
                    answerArea.style.cssText = `
                    overflow: hidden;
                    transition: height ${faqAnswerSlideSpeed}ms ease-in;
                  `;
                    answerArea.style.height = '0px'
                }

                question.addEventListener('click', function () {

                    answerArea.classList.toggle('active')
                    question.classList.toggle('active')

                    if (faqAnswerControlBy === 'style') {

                        if (answerArea.style.height === '0px') {
                            answerArea.style.height = answerAreaHeight + 'px'
                        } else {
                            answerArea.style.height = '0px'
                        }

                    }

                    if (faqCloseOtherAnswer) {
                        hideOthersAnswer(questions, i, faqAnswerControlBy)
                    }

                })

            })

        })


    }

})();