function load_posts(user_id) {

    //GET request to API to load all existing posts
    console.log(`User id: ${user_id}`);
    fetch(`/load_posts/${user_id ? user_id : ''}`)
    .then(response => response.json())
    .then(posts => {
        //loop through posts
        posts.forEach(post => {
            const element = document.createElement('div');
            console.log(post.likes)
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