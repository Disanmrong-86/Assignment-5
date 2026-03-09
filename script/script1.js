let allData = [];

const removeActive =() => {
    const remove = document.querySelectorAll('.tab-btn')
    remove.forEach(btn=>{
        btn.classList.remove('active')
    })
}

const countIssue = (data)=> {
    const count = document.getElementById('issue-count')
    count.innerText = data.length
}

const allIssues=() => {
    manageSpinner(true)
      removeActive();
     const allBtn = document.getElementById('all-btn');
    allBtn.classList.add('active')
    const url ='https://phi-lab-server.vercel.app/api/v1/lab/issues'
    fetch(url)
    .then(res=> res.json())
    .then(data => {
        allData = (data.data)
        displayIssue(allData)
        countIssue(allData);
    });
}
// {
//     "id": 50,
//     "title": "Create automated testing pipeline",
//     "description": "Set up CI/CD pipeline with automated tests running on every commit and pull request.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "ci_cd_cindy",
//     "assignee": "test_tina",
//     "createdAt": "2024-02-10T08:00:00Z",
//     "updatedAt": "2024-02-10T08:00:00Z"
// }
const displayIssue = (datas) => {
    const issueContainer = document.getElementById('issue-container')
    issueContainer.innerHTML = ''

    datas.forEach(data => {
        console.log(data)
           const issueDiv = document.createElement('div')
    issueDiv.innerHTML = `
        <div onclick="issueModal(${data.id})"  class=" bg-white px-5 py-5 rounded-md border-t-green-600 space-y-3 h-[100%]">
            <div class=" p-4 border-t-4 ${data.status == 'open' ? 'border-t-green-700':'border-t-purple-700' }">
                <div class="flex justify-between items-center">
                    <p>${createIcon(data.status)}
                    <p class="">${createPriority(data.priority)}</p>
                </div>
                <p class="text-xl font-bold ">${data.title}</p>
                <p class="text-gray-400">${data.description}</p>
                <div class="flex gap-1 items-center">
                 ${createLabel(data.labels)}
                </div>
                <br>
                <hr>
                <p>${data.author}</p>
                <div class="">
                    <p>${data.createdAt}</p>
                </div>
           </div>
        </div>
    `
    issueContainer.append(issueDiv)
    })
    countIssue(datas)
    manageSpinner(false)
 
}
const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('issue-container').classList.add('hidden')
    }
    else{
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('issue-container').classList.remove('hidden')
    }
}

const createLabel = (arr) => {
 return arr.map(el=> {
    let extraClass = "";
    if(el === "enhancement"){
        extraClass =" bg-green-300 text-green-800"
    }
    else if(el === "help wanted"){
        extraClass = "bg-yellow-100 text-yellow-800"
    }
    else if(el === "bug"){
        extraClass = "bg-red-300 text-red-800"
    }else{
        extraClass="bg-blue-200 text-blue-800"
    }
    return `<span class= "btn rounded-2xl ${extraClass}"> ${el}</span>`
}).join(" ");
}


const createIcon = (data)=> {
    let icon = ''
    if(data== 'open'){
        icon = '<span><img src="./assets/Open-Status.png" alt=""></span>'
    }
    else{
        icon = '<span><img src="./assets/Closed- Status .png" alt=""></span>'
    }
    return `${icon}`
}
const createPriority = (priority) => {
    let extraClass = ''
    if(priority === "high"){
        extraClass = "bg-red-200 text-red-800"
    }
    else if(priority === "medium"){
        extraClass = "bg-yellow-200 text-yellow-800"
    }else if(priority === "low"){
        extraClass = "bg-gray-200 text-gray-800"
    }
    return`<span class="btn rounded-md ${extraClass}">${priority}</span>`
}

const openIssue = () => {
    manageSpinner(true)
    removeActive();
    const openBtn = document.getElementById('open-btn')
    openBtn.classList.add('active');
    const open = allData.filter(issue => issue.status == "open")
    displayIssue(open);
    countIssue(open)
}
// openIssue();
const closeIssue = () => {
    manageSpinner(true)
    removeActive();
    const closeBtn = document.getElementById('close-btn')
    closeBtn.classList.add('active');
    const close = allData.filter(issue => issue.status == "closed")
    displayIssue(close);
    countIssue(close)

}



const issueModal = (id)=> {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(data => displayIssueModal(data.data))
}
const displayIssueModal = (data)=> {
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML= `
    <div class="space-y-3 p-5 rounded-xl">
    <h2 class="font-bold text-2xl">${data.title} </h2>
      <div class="flex gap-3">
        <button class="btn bg-green-800 text-white rounded-full">${data.status}</button>
        <div class="flex gap-2 items-center">
            <p class="bg-gray-500 rounded-full w-2 h-2"></p>
            <p> Opened by ${data.author} 
        </div>
        <div class="flex gap-2 items-center">
            <p class="bg-gray-500 rounded-full w-2 h-2"></p>
            <p>22/02/2026 
        </div>
      </div>
    <div class="flex gap-1 items-center">
          ${createLabel(data.labels)}
    </div>
    <p class="text-gray-400">${data.description}</p>
    <br>
    <div class="flex justify-between items-center bg-slate-200 py-4 px-3 rounded-xl">
        <div>
            <p>Assignee:</p>
            <h3 class="font-bold">${data.author}</h3>
        </div>
        <div>
            <p>Priority</p>
            <p class="">${createPriority(data.priority)}</p>
        </div>
    </div>
    </div>
    `;
    document.getElementById('my_modal_5').showModal();
}


allIssues();

document.getElementById('search-btn').addEventListener('click',()=> {
    const search = document.getElementById('search-issue')
    const searchValue = search.value.trim().toLowerCase()
    manageSpinner(true)
    removeActive()
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res=> res.json())
    .then(data =>displayIssue(data.data) )

})