document.addEventListener('DOMContentLoaded', function() {
    
    //new post when user clicks post button
    const newPostForm = document.querySelector('#new-post-form');
    if (newPostForm) {
        newPostForm.onsubmit = new_post;
    }

        //load posts and then enable button selection - asynchronously
    
    managePosts();


});





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
        console.log(result['paginator']);

        //clear posts div and reload with a GET request.
        document.querySelector('#posts-view').innerHTML = '';
        manage_posts();

        //clear text area input ready for new post
        document.querySelector('#post-body').value = '';
    });
}

