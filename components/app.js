import './blog-post.js';
import './blog-post-list.js';
import './my-header.js';
import './my-footer.js';
const blogPostsElement = document.getElementById('blog-posts');
let content =[];
let searchParams = new URLSearchParams(window.location.search);

function encode(r) {
  return r.replace(/[\x26\x0A\x3c\x3e\x22\x27]/g, function(r) {
	return "&#" + r.charCodeAt(0) + ";";
  });
}

let postId = searchParams.get('id') ? '/'+searchParams.get('id') : '';
var url="https://data.jakopec.net/wp-json/wp/v2/posts" + postId;
  await fetch(url)
    .then(response => response.json())
    .then((data) => {
    if (postId===''){
      data.map(element => content.unshift({
      title:encode(element.title.rendered),
      description:encode(element.excerpt.rendered),
      link:element.id})
    )}
    else {
      content.push ({
        title:encode(data.title.rendered),
        description:encode(data.content.rendered)
      })
    }
    console.log(data)
    return content;
  }
    )
blogPostsElement.posts = content
