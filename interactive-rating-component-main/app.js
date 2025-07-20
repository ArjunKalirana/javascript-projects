const rating= document.querySelectorAll(".rating p");
const submitBtn = document.querySelector(".submit button");
const ratingContainer = document.querySelector(".rate");
const thankContainer = document.querySelector(".thanks");
const selectRate = document.getElementById('value');

let selectedRating=null;
rating.forEach(p => {
    p.addEventListener('click',()=>{
        rating.forEach(r => r.classList.remove('selected'))
        p.classList.add('selected');
        selectedRating = p.textContent;
        console.log(selectedRating)
    })
})

submitBtn.addEventListener('click',()=>{
    if(selectedRating){
        ratingContainer.classList.add('hidden');
        thankContainer.classList.remove('hidden');
        selectRate.innerHTML=selectedRating;
    }
    else{
        alert("Please select a rating before submitting.");
    }
})

