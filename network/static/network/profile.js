document.addEventListener('DOMContentLoaded', function() {
    // load posts for this profile
    const userId = document.querySelector('#user-id').value;
    console.log(userId)
    load_posts(userId);
})

