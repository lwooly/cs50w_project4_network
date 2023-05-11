document.addEventListener('DOMContentLoaded', function() {

    //new post when user clicks post button
    document.querySelector('#new-post-form').onsubmit = new_post;

    //by default load all posts
    load_posts();
});

function load_posts() {

    //GET request to API to load all existing posts
    console.log("function called");
    fetch('/posts')
    .then(response => response.json())
    .then(posts => {
        //loop through posts
        posts.forEach(post => {
            const element = document.createElement('div');
            element.classList.add('card', 'rounded',  'container-fluid', 'm-3');
            element.innerHTML = `
            <h3>${post.user}</h3>
            <p>${post.body}</p>
            <p>${post.timestamp}</p>
            <p>Likes: ${post.likes}<p>`

            document.querySelector('#posts-view').append(element)
        });
    });
}

function new_post(event) {
    
    event.preventDefault()

    //get values from form for the new post
    const post_body = document.querySelector('#post-body').value;

    //make a post request to new_post path adding a new post
    fetch('/new_post', {
        method: 'POST',
        body: JSON.stringify({
            post_body: post_body
        })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);

        //clear posts div and reload with a GET request.
        document.querySelector('#posts-view').innerHTML = '';
        load_posts();
    });
}

