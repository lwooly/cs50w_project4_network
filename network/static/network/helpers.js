function load_posts(user_id, pageNumber=1) {

    //GET request to API to load all existing posts
    console.log(`User id type check: ${user_id}`);

    //clear div of all current loaded posts within
    document.querySelector('#posts-view').innerHTML = '';

    //get current user
    const currentUser = document.querySelector('#current-user-id').value;
    console.log(`current user: ${currentUser}`)
    console.log(typeof(currentUser));
    
    // fetch for current user_id, if no user id respond with all posts
    // paginator to only get the 10 current posts
    fetch(`/load_posts/${user_id ? user_id : ''}?page=${pageNumber}`)
    .then(response => response.json())
    .then(data => {
        //manage buttons shown to click through posts
        const maxPageNumber = data.paginator.num_pages;
        console.log(`Max : ${maxPageNumber}`);
        if (pageNumber >= maxPageNumber) {
            document.querySelector('#nextBtn').style.display = 'none';
        }
        else {
            document.querySelector('#nextBtn').style.display = 'block';
        }
        if (pageNumber <= 1) {
            document.querySelector('#previousBtn').style.display = 'none';
        }
        else {
            document.querySelector('#previousBtn').style.display = 'block';
        }

        const posts = data.posts;
        //loop through posts
        posts.forEach(post => {
            const element = document.createElement('div');
            element.classList.add('card', 'rounded',  'container-fluid', 'm-3');
            // Add edit button to posts of current user
            let button = '';
            console.log(typeof(post.user_id));
            if (currentUser === post.user_id.toString()) {
                button = `<button id="${post.id}" class="edit-btn btn btn-primary mt-2">Edit</button>`;
            }
            
            element.innerHTML = `
            <a class="nav-link" href="/profile/${post.user_id}/"><h3>${post.username}</h3></a>
            <div id="body-${post.id}"
                <p>${post.body}</p>
            </div>
            <p>${post.timestamp}</p>
            <p>Likes:${post.likes}</p>
            ${button}
            `
            document.querySelector('#posts-view').append(element)
        });
        selectEditButtons();
    });
    
}
// edit box added but not yet functional

function  selectEditButtons(){
    //edit post when user clicks 
    //get all edit buttons
    let editButtons = document.querySelectorAll('.edit-btn');
    console.log(editButtons);
    editButtons.forEach(editButton => {
        editButton.addEventListener('click', processEdit)
    });
}


function processEdit(event) {
    event.preventDefault()
    //save the id of the clicked btn
    const clickedBtnId = event.target.id;
    console.log(`clicked ID: ${clickedBtnId}`);

    //now get body with this id
    let bodyEdit = document.querySelector(`#body-${clickedBtnId}`)
    if (bodyEdit) {
        console.log('success');
        bodyEdit.innerHTML = `
        <div id="edit-post" class="">
            <form id="edit-post-form">
                    <label for="post-body" class="form-label, mb- h5">Edit Post</label>
                    <textarea class="form-control pr-5"  id="post-body" rows="3"></textarea>
                    <button id="post-edit-btn" class="btn btn-primary mt-2 " value=>Edit</button>
            </form>
        </div>`;
    }

}



function getFollowing() {
 //Get request to API to check if profile is followed
 return fetch('/follow')
 .then(response => response.json())
 .then(ids => {
     idsString = ids.toString()
     console.log(`following these ids: ${idsString}`);
     return idsString;
 });
}

//load with empty for all users
function managePosts(ids="") {

    console.log(`function called with id: ${ids}`);
    
    //keep track of page number
    let pageNumber = 1;

    document.querySelector('#previousBtn').addEventListener('click', function(event) {
        event.preventDefault()
        pageNumber = pageNumber - 1;
        console.log(`Page number: ${pageNumber}`);
        load_posts(ids, pageNumber);
    })
    document.querySelector('#nextBtn').addEventListener('click', function(event) {
        event.preventDefault()

        pageNumber = pageNumber + 1;
        console.log(`Page number: ${pageNumber}`);
        load_posts(ids, pageNumber);
    })

     //by default load all posts:
     load_posts(ids);
}