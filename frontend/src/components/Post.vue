<template>
  <div class="posts">
    <div class="posts__header">
      <button class="btn modifier"><i class="fas fa-ellipsis-v"></i></button>
      <button class="btn" @click="deletePost(post.id)">
        <i class="fas fa-times"></i>
      </button>
      
    </div>
    <h3 class="titre">{{ post.titre }}</h3>
    <div class="image__like">
      <img
        class="image"
        :src="'http://localhost:5000/' + post.image_url"
        alt="logo_groupomania"
      />
    </div>
    <p class="contenu">
      {{ post.contenu }}
    </p>
    <div class="commentaire ">
      <input
        v-model="comment"
        type="text"
        class="text"
        placeholder="Ecrire votre commentaire !"
      />
      <button class="btn" @click="addComment(post.id)">
        <i class="fas fa-check"></i>
      </button>
    </div>
    <div>
      <p
        class="comment-area"
        v-for="comment in post.comments"
        :key="comment.id"
      >
        {{ comment.contenu }}
        <span>date de publication</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Post",
  props: ["post"],
  data() {
    return {
      comment: "",
      liked: false,
    };
  },
  created() {
    console.log("hello world");
    const userid = this.$store.state.user.userId;
    console.log(userid);
  },
  methods: {
    deletePost(postId) {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      axios
        .delete("http://localhost:5000/posts/" + postId, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addComment(postId) {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const data = JSON.stringify({ contenu: this.comment, postId: postId });
      axios
        .post("http://localhost:5000/comment/", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}

/* header */

.header {
  display: grid;
  width: auto;
  align-items: center;
  grid-template-columns: 2fr 0.3fr 0.3fr;
  grid-template-rows: repeat(1, 1fr);
  grid-template-areas: "groupomania__logo fa-edit fa-sign-in-alt";
}

.groupomania__logo {
  justify-content: start;
}

.fa-sign-in-alt,
.fa-times {
  font-size: x-large;
}

.fa-edit,
.fa-ellipsis-v,
.fa-check {
  font-size: x-large;
}

.fa-edit:hover,
.fa-ellipsis-v:hover,
.fa-check:hover {
  color: green;
}

.fa-sign-in-alt:hover,
.fa-times:hover {
  color: red;
}

.modifier {
  padding: 5px;
}

.header img {
  width: 10rem;
}

h2 {
  border-bottom: solid 3px lightsalmon;
}

/* header */

/* titre */
h2 {
  display: flex;
  justify-content: center;
}
/* titre */

/* middle */

.conteneur {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.posts__header {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
}

.image__like {
  display: flex;
  justify-content: center;
  object-fit: cover;
  margin-bottom: 2rem;
}

.image__like img {
  width: 60%;
}

.titre {
  margin-top: 10rem auto;
  display: flex;
  justify-content: center;
}

.contenu {
  width: 100%;
  margin-bottom: 0.5rem;
}

.commentaire {
  display: grid;
  grid-template-columns: 10fr 1fr 1fr;
  margin-bottom: 0.5rem;
  width: 100%;
}

.text {
  width: 100%;
  height: 2rem;
  border-radius: 5px;
  border: solid 1px lightgrey;
  outline: none;
  justify-content: center;
}

.btn {
  outline: none;
  cursor: pointer;
}

.comment-area {
  color: lightsalmon;
  padding: 0.5rem 0;
}

.comment-area  span{
display: flex;
justify-content: flex-end;
color: lightblue;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
font-style: italic;
}

/* middle */
</style>
