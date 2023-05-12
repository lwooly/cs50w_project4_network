function load_posts(user_id) {

    //GET request to API to load all existing posts
    console.log(`User id: ${user_id}`);
    fetch(`/load_posts/${user_id ? user_id : ''}`)
    .then(response => response.json())
    .then(posts => {
        //loop through posts
        posts.forEach(post => {
            const element = document.createElement('div');
            console.log(post.user_id)
            element.classList.add('card', 'rounded',  'container-fluid', 'm-3');
            element.innerHTML = `
            <a class="nav-link" href="{% url 'profile/${post.user_id}'  %}"><h3>${post.username}</h3></a>
            <p>${post.body}</p>
            <p>${post.timestamp}</p>
            <p>Likes: ${post.likes}</p>`

            document.querySelector('#posts-view').append(element)
        });
    });
}