'use strict'

async function getAwait(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(error){
        console.error("ERROR: ", error);
    }
}

//start of DOM event:
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM Content Loaded');

    const overlay = document.querySelector('.overlay');
    const classes = overlay.classList;
    setTimeout(() => {
        classes.toggle('hidden');
    });

    //button event:
    submitModal.addEventListener('click', function(){
        classes.toggle('hidden');
        const username = document.getElementById('username').value;   
        const apiUrl = `https://api.github.com/users/${username}`;
        console.log(username);
        console.log(apiUrl);

        getAwait(apiUrl).then(function(response){
            console.log(response);
            showInfo(response);
        });

    });
});
//end of DOM event ^

//BELOW IS WORK FOR GENERATING INFO:
const userImage = document.getElementById('userImage');
const personName = document.getElementById('name');
const login = document.getElementById('login');
const company = document.getElementById('company');
const placement = document.getElementById('location');
const bio = document.getElementById('bio');
const followers = document.getElementById('followers');
const following = document.getElementById('following');

// both "name" and "location" are reserved keywords >:(

function showInfo(response){
    personName.innerHTML = response.name;
    login.innerHTML = "@" + response.login;
    company.innerHTML = "Company: " + response.company;
    placement.innerHTML = "Location: " + response.location;
    bio.innerHTML = "Bio: " + response.bio;
    followers.innerHTML = "Followers: " + response.followers;
    following.innerHTML = "Following: " + response.following;
    userImage.src = response.avatar_url;
}


//Clear Form:
const clearForm = document.getElementById('clearForm');

clearForm.addEventListener('click', ()=>{
    window.location.reload();
})
