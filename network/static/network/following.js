document.addEventListener("DOMContentLoaded", function() {

    // get current user id
    const userId = document.querySelector('#user-id');

    // get users that current user is following
    getFollowing()
    .then(ids=> {
        load_posts(Number(ids)); // works for one user id but load posts needs updating to work for a user id array
    })
})

