function load_posts(user_id, pageNumber=1) {

    //GET request to API to load all existing posts
    console.log(`User id type check: ${user_id}`);

    //clear div of all current loaded posts within
    document.querySelector('#posts-view').innerHTML = '';
    
    // fetch for current user_id, if no user id respond with all posts
    // paginator to only get the 10 current posts
    fetch(`/load_posts/${user_id ? user_id : ''}?page=${pageNumber}`)
    .then(response => response.json())
    .then(posts => {
        //loop through posts
        posts.forEach(post => {
            const element = document.createElement('div');
            element.classList.add('card', 'rounded',  'container-fluid', 'm-3');
            element.innerHTML = `
            <a class="nav-link" href="/profile/${post.user_id}/"><h3>${post.username}</h3></a>
            <p>${post.body}</p>
            <p>${post.timestamp}</p>
            <p>Likes:${post.likes}</p>`

            document.querySelector('#posts-view').append(element)
        });
    });
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