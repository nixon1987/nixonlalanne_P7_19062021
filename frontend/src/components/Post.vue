<template>
  <div class="post">
    <i class="fas fa-times"></i>
    <p class="titre">{{ post.titre }}</p>
    <div class="image__like">
      <img
        class="image"
        :src="'http://localhost:5000/' + post.image_url"
        alt="logo_groupomania"
      />
      <div class="like">
        <span><i class="far fa-thumbs-up">+5</i></span>
        <span><i class="far fa-thumbs-down">+3</i></span>
      </div>
    </div>
    <p class="contenu">
      {{ post.contenu }}
    </p>
    <div class="commentaire comment-area">
      <input
        v-model="comment"
        type="text"
        class="text"
        placeholder="Ecrire votre commentaire !"
      />
      <button class="btn" @click="addComment(post.id)">
        <i class="fas fa-check"></i>
      </button>
      <p v-for="comment in post.comments" :key="comment.id">
        {{ comment.contenu }}
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
    };
  },
  methods: {
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

.header h1 {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.header img {
  width: 10rem;
}

.buttons__header {
  display: flex;
  justify-content: space-around;
}

.btn {
  border: solid 1px lightcoral;
  font-size: 16px;
  outline: none;
  line-height: 1;
  padding: 16px 30px;
  border-radius: 10px;
  background: white;
  color: black;
  cursor: pointer;
  transition: all 0.2s linear;
}

.btn:hover {
  background: lightcoral;
  color: white;
}

.btn:active {
  background: white;
  color: lightcoral;
}

/* middle */

.conteneur {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin: 5rem auto;
}

.left__side,
.right__side {
  background: lightcoral;
  border-radius: 10px;
}

.posts img {
  width: 20rem;
  height: 15rem;
  object-fit: cover;
  display: flex;
  justify-content: center;
}

.posts {
  display: grid;
  width: 70vh;
  height: 40vh;
  margin: 0 auto;
  grid-gap: 10px 10px;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    "fa-times fa-times"
    "titre titre "
    "image image "
    "contenu contenu"
    "commentaire commentaire";
}

.fa-times {
  grid-area: fa-times;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.titre {
  grid-area: titre;
  display: flex;
  justify-content: center;
}
.image {
  grid-area: image;
}
.contenu {
  grid-area: contenu;
}
.commentaire {
  grid-area: commentaire;
  width: 100%;
}

.like {
  grid-area: like;
  display: flex;
  flex-direction: column;
}

.image__like {
  display: flex;
  align-items: flex-end;
}

.text {
  width: 90%;
  height: 2rem;
  border-radius: 5px;
  border: solid 1px lightgrey;
  outline: none;
}

.btn {
  border: solid 1px lightcoral;
  font-size: 10px;
  outline: none;
  padding: 10px 10px;
  border-radius: 10px;
  background: white;
  color: black;
  cursor: pointer;
  transition: all 0.2s linear;
}

.btn:hover {
  background: lightcoral;
  color: white;
}
</style>
