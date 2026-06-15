//import stories
import {amanecerRojoIntro, amanecerRojoChapterOne, amanecerRojoChapterTwo} from "./stories/amanecerRojo.js";

//a data map of the stories so they can be easily referenced
const storyMap = {
    amanecerRojoIntro,
    amanecerRojoChapterOne,
    amanecerRojoChapterTwo,
};

function populateStoryDropdown(){

    storyInput.innerHTML = "";

    Object.entries(storyMap).forEach(([key, story])=>{

        const option = document.createElement("option");

        option.value = key;

        option.textContent = story.info.title;

        storyInput.append(option);
    });
}

//Select the HTML elements for the story title and description to mount
const storyTitle = document.querySelector('#current-story');
const storyDescr = document.querySelector('#story-description');
//Select HTML element to mount the lines of story to
const storyContainer = document.querySelector('#story-mount')
//Select HTML user Inputs
const storyBtn = document.querySelector('#story-selection-btn');
const storyInput = document.querySelector('#story-selection');
const compBtn = document.querySelector('#comprehension-btn');
const modalBtn = document.querySelector('#modal-close');
const modal = document.querySelector('#modal');

populateStoryDropdown();

storyBtn.addEventListener('click', loadStory);

function loadStory(){
    const storyKey = storyInput.value;
    const selectedStory = storyMap[storyKey];
    if(!selectedStory){
        alert("Story not found");
        return;
    }

    resetStoryContainer();
    generateStory(selectedStory);
};

function resetStoryContainer(){
    storyContainer.innerHTML = '';
};

//Function that takes one argument that is an array of objects (phrases of the story)
function generateStory(story){

    storyInfo(story);

    const lines = story.lines;
    lines.forEach(line =>{
        //create all the elements and add necessary CSS classes

        let container = document.createElement('div');
        container.classList.add('translation-row');

        let wrapper = document.createElement('div');
        wrapper.classList.add('wrapper')
        container.append(wrapper);

        let spDiv = document.createElement('div');
        spDiv.classList.add('line', 'spanish');
        let spHead = document.createElement('h4');
        spHead.textContent = "Spanish";
        let spLine = document.createElement('p');
        spLine.textContent = line.spanish;
        spDiv.append(spHead, spLine);

        let enDiv = document.createElement('div');
        enDiv.classList.add('line', 'english');
        let enHead = document.createElement('h4');
        enHead.textContent = "English";
        let enLine = document.createElement('p');
        enLine.classList.add('blur');
        enLine.textContent = line.english;
        enDiv.append(enHead, enLine);

        wrapper.append(spDiv, enDiv);
        
        let sliderDiv = document.createElement('div');
        sliderDiv.classList.add('slider');
        sliderDiv.innerHTML = `
            <div class="range-wrap wrapper">
                    <div class="full-width">
                        <p class="center-txt">Comprehension</p>
                        <p class="center-txt"><span class="slider-value">0</span>%</p>
                        <input class="slider-percent" type="range" min="0" max="100" value="0" step="1">
                        <div class="slider-labels">
                            <span>0%</span>
                            <span>|</span>
                            <span>|</span>
                            <span>50%</span>
                            <span>|</span>
                            <span>|</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
        `;

        container.append(sliderDiv);
        storyContainer.append(container);

        //add event listner to english lines to toggle blur on click
        enLine.addEventListener('click', ()=>{
            enLine.classList.toggle('blur');
        })        
    });

    const sliders = document.querySelectorAll(".slider-percent");

    sliders.forEach(slider=>{
        const valueDisplay = slider.parentElement.querySelector('.slider-value');

        function updateValue(){
            valueDisplay.textContent = slider.value;
        };

        slider.addEventListener('input', updateValue);

        updateValue();

    });
};

//function that fills in the story title and description 
function storyInfo(story){
    const title = story.info.title;
    const descr = story.info.description;

    storyTitle.textContent = title;
    storyDescr.textContent = descr;
};

function openModal(){
    calculateComp();
    modal.classList.remove('hidden');
}

function calculateComp(){
    //variable that adds up all the lines
    let totalLines = 0;
    const currentLines = document.querySelectorAll(".translation-row");
    currentLines.forEach(line => {
        totalLines += 1;
    });
    console.log(totalLines);
    let totalPoints = totalLines * 100;
    console.log(totalPoints);

    //add up all the values of the sliders and store in variable
    let inputPoints = 0;
    const sliderValues = document.querySelectorAll('.slider-percent');
    sliderValues.forEach(slider =>{
        inputPoints += Number(slider.value);
    });
    console.log("input points: ", inputPoints);

    //total value of sliders / (# of lines * 100)
    let rawScore = (Number(inputPoints) / Number(totalPoints)) *100;
    let score = rawScore.toFixed(1);
    console.log(score);

    const scoreValue = document.querySelector('#comp-number');
    scoreValue.textContent = score;
}

modalBtn.addEventListener('click', ()=>{
    modal.classList.add('hidden');
})

compBtn.addEventListener('click', openModal);