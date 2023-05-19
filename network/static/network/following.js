document.addEventListener("DOMContentLoaded", function() {

    // get current user id
    const userId = document.querySelector('#user-id');

    // get users that current user is following
    getFollowing()
    .then(ids=> {
        console.log(ids);
        if (ids){
            load_posts(ids);
        }
             
    })
})

