document.addEventListener('DOMContentLoaded', function() {

    console.log("dom loaded");

    //by default load all posts
    load_posts();

    //new post when user clicks post button
    document.querySelector('#new-post-form').onsubmit = new_post;
});

function load_posts() {
    //GET request to API to load all existing posts

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
    });
}

