document.addEventListener('DOMContentLoaded', function() {

    //get profile id
    const userId = document.querySelector('#user-id').value;

    //load correct follow buttons
    LoadFollowBtns(userId);

    // load posts for this profile
    load_posts(userId);

    // follow and unfollow on button click
    const followBtn = document.querySelector('#follow');
    if (followBtn) {
        followBtn.addEventListener('click', () => follow('true', userId));
    }
    const unfollowBtn = document.querySelector('#unfollow');
    if (unfollowBtn) {
        unfollowBtn.addEventListener('click', () => follow('false', userId));
    }

})

function LoadFollowBtns(profileId) {
    //load correct buttons based on user and follows:
    const currentUserId = document.querySelector('#current-user-id').value;
    console.log(`LoadFollowBtns call for current user id: ${currentUserId}`);
    if (currentUserId === 'None' || currentUserId === profileId) {
        // hide buttons if not logged in or current users profile
        console.log("follow buttons hidden")
        document.querySelector('#follow').style.display = 'none';
        document.querySelector('#unfollow').style.display = 'none';
    }
    else {
        //Get request to API to check if profile is followed
        getFollowing()
            .then(ids=> {
                console.log(`return from getFollowing function ${ids}`)

                if (ids.includes(profileId.toString())) {
                    //hide follow button and show unfollow button
                    document.querySelector('#follow').style.display = 'none';
                    document.querySelector('#unfollow').style.display = 'block';
                    console.log('show unfollow button')
                }
                else {
                    //hide unfollow button and show follow button
                    document.querySelector('#follow').style.display = 'block';
                    document.querySelector('#unfollow').style.display = 'none';
                    console.log("show follow button")
                }
            })
    };
}



function follow(follow, userId) {
    //post request to profile 
        fetch('/follow', {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                follow: follow
            })
        })
        .then(response => response.json())
        .then(result => {
            // Print result
            console.log(result);
            //reload follow buttons
            LoadFollowBtns(userId);
        });
}

