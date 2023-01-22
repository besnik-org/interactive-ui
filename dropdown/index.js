/**
 * @author AL EMRAN
 * @author_email emrancu1@gmail.com
 * @company Besnik.
 * @started at 6am 8th December 2022.
 */

(function () {

    /** select all faq container **/
    let dropdownContainers = document.querySelectorAll('.dropdown-container');
    let defaultCss = `position:absolute;
                    top: 100%;
                    left: 0;
                    background: white;
                    opacity: 0;
                    visibility: hidden;
                    z-index: -1;
                    transition: all .5s
                  `;

    let activeCss = `opacity: 1;
                   visibility: visible;
                   z-index: 999;
                  `;

    if (dropdownContainers.length) {

        let defaultOptions = {
            transition_speed: 300, // expected value  numeric milliseconds
            close_outside_click: true,  // expected value 'true', 'false'
            control_by: 'style'  // expected value 'class', 'style'
        }

        dropdownContainers.forEach(dropdownContainer => {


            let transitionSpeed = dropdownContainer.hasAttribute('transition_speed') ? parseInt(dropdownContainer.getAttribute('transition_speed')) : defaultOptions.transition_speed;

            let closeOutsideClick = dropdownContainer.hasAttribute('close_outside_click') ? dropdownContainer.getAttribute('close_outside_click') === 'true' : defaultOptions.close_outside_click;

            let control_by = dropdownContainer.hasAttribute('control_by') ? dropdownContainer.getAttribute('control_by') : defaultOptions.control_by;

            if(control_by === 'style') {

               let dropDownContentArea = dropdownContainer.querySelector('.dropdown-content')
                dropdownContainer.style.cssText = `position:relative;`;
                dropDownContentArea.style.cssText = defaultCss;

                dropdownContainer.querySelector('.dropdown-btn').addEventListener('click', function(){

                    if(dropDownContentArea.style.opacity === 1){
                        dropDownContentArea.style.cssText = activeCss;
                    }else{
                        dropDownContentArea.style.cssText = defaultCss;
                    }
                })
            }

        })


    }

})();