// Register SW
let postselect,postscontainer;
window.addEventListener('load', async function(){

    
    postselect=this.document.getElementById("postselect");
    postscontainer=this.document.getElementById('postcontainer');
    await fillselect();
    postselect.addEventListener('change',await displaydetails);
    if(this.navigator.serviceWorker){
        
        await this.navigator.serviceWorker.register('./sw.js');
        console.log("Service Worker Exist ");

    }else{
        
        console.log("Service Worker Not Exist ");
    }
});
async function fillselect(){
    let allposts = await fetch("https://jsonplaceholder.typicode.com/posts");
    let alljsbobjescts=await allposts.json();
    postselect.innerHTML=alljsbobjescts.map(post=>{
        return `<option value="${post.id}">${post.title}</option>`
    })
}

async function displaydetails(event){
    let targetpost = await fetch(`https://jsonplaceholder.typicode.com/posts/${event.target.value}`);
    let jsobj = await targetpost.json();
    // title : body
    postscontainer.innerHTML=`
        <div style="border:2px solid black;padding:!0p ;margin:10px auto;width:80%">
            <h2 style="padding:10px ; border:2px solid black;text-align:center;background-color:lightgray;">${jsobj.title}</h2>
            <p style="margin:10px auto;text-align:center;background-color:lightyellow;">${jsobj.body}</p>
        </div>
    `;
}