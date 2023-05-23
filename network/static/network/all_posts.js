document.addEventListener('DOMContentLoaded', function() {
   
    //new post when user clicks post button
    const newPostForm = document.querySelector('#new-post-form');
    if (newPostForm) {
        newPostForm.onsubmit = new_post;
    }
    
    //keep track of page number
    let pageNumber = 1;

    document.querySelector('#previousBtn').addEventListener('click', function(event) {
        event.preventDefault()
        pageNumber = pageNumber - 1;
        console.log(`Page number: ${pageNumber}`);
        load_posts("", pageNumber);
    })
    document.querySelector('#nextBtn').addEventListener('click', function(event) {
        event.preventDefault()

        pageNumber = pageNumber + 1;
        console.log(`Page number: ${pageNumber}`);
        load_posts("", pageNumber);
    })

    
     //by default load all posts
     load_posts("", pageNumber);
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
        load_posts();

        //clear text area input ready for new post
        document.querySelector('#post-body').value = '';
    });
}

