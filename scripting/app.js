//deaths variables
let newDeaths = document.querySelector('#newdeaths p');
let totalDeaths = document.querySelector('#totaldeaths p');
//confirmed variables
let newConfirmed = document.querySelector('#newconfirmed p');
let totalConfirmed = document.querySelector('#totalconfirmed p');
//recovered variables
let newRecovered = document.querySelector('#newrecovered p');
let totalRecovered = document.querySelector('#totalrecovered p');

//last update
let lastUpdate = document.querySelector('header p');

let newDeCoRe = [newDeaths, newConfirmed, newRecovered];

let overviewReq = new XMLHttpRequest();
overviewReq.open('GET', 'https://api.covid19api.com/summary', true);
overviewReq.send();
overviewReq.onprogress = function(){
    newDeCoRe.forEach(newElement => {
        newElement.innerHTML = 'please wait!';
    })
};
overviewReq.onload = function (){
    if(this.status === 200){
        let responseObj = JSON.parse(this.responseText);
        //new responses
        newDeaths.innerHTML = responseObj.Global.NewDeaths.toLocaleString();
        newConfirmed.innerHTML = responseObj.Global.NewConfirmed.toLocaleString();
        newRecovered.innerHTML = responseObj.Global.NewRecovered.toLocaleString();
        //total responses
        totalDeaths.innerHTML = responseObj.Global.TotalDeaths.toLocaleString();
        totalConfirmed.innerHTML = responseObj.Global.TotalConfirmed.toLocaleString();
        totalRecovered.innerHTML = responseObj.Global.TotalRecovered.toLocaleString();
        lastUpdate.innerHTML = 'Last Update in ' + responseObj.Global.Date;
    }
};
overviewReq.onerror = function (){
    newDeCoRe.forEach(newElement => {
        newElement.innerHTML = 'an error happend!';
    })
};
