//import stories 
import {asterionChapterOne, asterionChapterTwo, asterionChapterThree, asterionChapterFour, asterionChapterFive} from "./stories/asterion.js";


//a data map of the stories so they can be easily referenced
const storyMap = {
    asterionChapterOne,
    asterionChapterTwo,
    asterionChapterThree,
    asterionChapterFour,
    asterionChapterFive,
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
    storyContainer.innerHTML = `
        <div class="grid-box section-title right-border">
        <p>Spanish</p>
        </div>
        <div class="grid-box section-title">
        <div>
        <p>English</p>
        <p class="directions">Click to reveal text</p>
        </div>
        </div>
    `;
};

//Function that takes one argument that is an array of objects (phrases of the story)
function generateStory(story){

    storyInfo(story);

    const lines = story.lines;
    lines.forEach(line =>{
        //create all the elements and add necessary CSS classes
        let spDiv = document.createElement('div');
        spDiv.classList.add('right-border', 'grid-box');

        let enDiv = document.createElement('div');
        enDiv.classList.add('blur','grid-box');

        let spLine = document.createElement('p');
        let enLine = document.createElement('p');

        //add text value from data
        spLine.textContent = line.spanish;
        enLine.textContent = line.english;

        //append them all together
        spDiv.append(spLine);
        enDiv.append(enLine);
        storyContainer.append(spDiv, enDiv);

        //add event listner to english lines to toggle blur on click
        enDiv.addEventListener('click', ()=>{
            enDiv.classList.toggle('blur');
        })
    });
};

//function that fills in the story title and description 
function storyInfo(story){
    const title = story.info.title;
    const descr = story.info.description;

    storyTitle.textContent = title;
    storyDescr.textContent = descr;
};