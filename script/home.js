// getting the ids
const cardContainer = document.getElementById("cardContainer");
const total=document.getElementById("total");
const loadingDisplay =document.getElementById("loadingDisplay");
const allBtn =document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn=document.getElementById("closedBtn");
let issues = [];
const searchInput = document.getElementById("searchInput");

// getting the response for all btn 

async function allCards(){

loadingDisplay.classList.remove("hidden");
loadingDisplay.classList.add("flex");

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json();

loadingDisplay.classList.add("hidden");

issues = data.data;

renderCards(issues);

}
allCards();



// openBtn working 
openBtn.addEventListener("click",async function(){
    openBtn.classList.remove("bg-gray-300","text-black");
    openBtn.classList.add("bg-purple-700","text-white");
     allBtn.classList.remove("bg-purple-700","text-white");
      allBtn.classList.add("bg-gray-300","text-black");
     closedBtn.classList.remove("bg-purple-700","text-white");
  closedBtn.classList.add("bg-gray-300","text-black");

})
// all btn working 
allBtn.addEventListener("click",function(){
    allBtn.classList.remove("bg-gray-300","text-black");
    allBtn.classList.add("bg-purple-700","text-white");
     openBtn.classList.remove("bg-purple-700","text-white");
      openBtn.classList.add("bg-gray-300","text-black");
     closedBtn.classList.remove("bg-purple-700","text-white");
  closedBtn.classList.add("bg-gray-300","text-black");

})
// closed btn working
closedBtn.addEventListener("click",function(){
    closedBtn.classList.remove("bg-gray-300","text-black");
    closedBtn.classList.add("bg-purple-700","text-white");
     openBtn.classList.remove("bg-purple-700","text-white");
      openBtn.classList.add("bg-gray-300","text-black");
     allBtn.classList.remove("bg-purple-700","text-white");
  allBtn .classList.add("bg-gray-300","text-black");

})



// call for id 
async function call(id){
    const rep = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const get = await rep.json();
}

//  place for open and closed 

function renderCards(data){

cardContainer.innerHTML = ""; 
total.innerText = data.length;

data.forEach(element => {

const card = document.createElement("div");
card.className="card bg-base-100 max-w-[260px] shadow-sm cursor-pointer";
card.addEventListener("click", function(){
openIssue(element.id);
});
card.addEventListener("click", function(){
openIssue(element.id);
});


card.innerHTML=`
<div>

<div class="card-body p-4 border-b border-gray-500 h-[250px] border-t-4 rounded-md
${element.status==='open'?'border-t-green-600':'border-t-purple-600'}">

<div class="flex justify-between">

<div>
${element.status==='open'
?'<img src="assets/Open-Status.png">'
:'<img src="assets/Closed- Status .png">'}
</div>

<div class="badge badge-soft ${
element.priority==='high'?'badge-secondary':
element.priority==='medium'?'badge-warning':
'badge-info'
}">
${element.priority}
</div>

</div>

<h2 class="card-title">${element.title}</h2>

<p>${element.description}</p>

<!-- labels -->
<div class="flex gap-1 mt-2">

<div class="badge badge-soft badge-secondary rounded-full">
${element.labels[0]==='bug'
?'<i class="fa-solid fa-bug"></i>'
:element.labels[0]==='help wanted'
?'<i class="fa-solid fa-life-ring"></i>'
:element.labels[0]==='enhancement'
?'<i class="fa-solid fa-spray-can-sparkles"></i>'
:''}

${element.labels[0] ? element.labels[0] : ""}
</div>

<div class="badge badge-soft badge-warning">
${element.labels[1]==='bug'
?'<i class="fa-solid fa-bug"></i>'
:element.labels[1]==='help wanted'
?'<i class="fa-solid fa-life-ring"></i>'
:element.labels[1]==='enhancement'
?'<i class="fa-solid fa-spray-can-sparkles"></i>'
:''}

${element.labels[1] ? element.labels[1] : ""}
</div>

</div>

</div>

<div class="p-[18px] text-gray-600">
<p>#1 by ${element.author}</p>
<p>${element.createdAt}</p>
</div>

</div>
`;

cardContainer.appendChild(card);

});

}
// open filtering 
openBtn.addEventListener("click",function(){

const openIssues = issues.filter(issue => issue.status === "open");

renderCards(openIssues);

});



