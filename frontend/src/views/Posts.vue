<template>
  <div v-for="user in users" :key="user.id" class="user">
    <i class="far fa-user"></i>{{ user.nom }}
  </div>
  <div class="header">
    <img src="../assets/icon-left-font.png" alt="logo_groupomania" />
    <h1>Bienvenue!!</h1>
  </div>
  <div class="buttons__header">
    <button @click="createPost()" class="btn">Créer un post</button>
    <button @click="logout()" class="btn">Déconnexion</button>
  </div>
  <div class="conteneur">
    <div class="left__side"></div>
    <div class="middle__side">
      <div class="posts" v-for="post in posts" :key="post.id">
        <p class="titre">{{ post.titre }}</p>
        <img class="image" src="../assets/logo.png" alt="logo_groupomania" />
        <p class="contenu">{{ post.contenu }}</p>
        <p class="commentaire">{{ post.comment }}</p>
        <div class="like">
          <span><i class="far fa-thumbs-up"></i></span>
          <span><i class="far fa-thumbs-down"></i></span>
        </div>
      </div>
    </div>
    <div class="right__side"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Posts",

  data() {
    return {
      posts: [""],
    };
  },

  mounted: function() {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  async created() {
    const responsePosts = await axios.get("http://localhost:5000/posts");
    this.posts = responsePosts.data;
  },
  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    },

    createPost: function() {
      this.$router.push("/CreatePost");
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

.header {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fa-user {
  padding: 2rem;
}

.user {
  display: flex;
  align-items: baseline;
}

.header img {
  width: 15rem;
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
  margin: 5rem auto;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    "titre titre "
    "image image "
    "contenu contenu"
    "commentaire like";
}

.titre {
  grid-area: titre;
}
.image {
  grid-area: image;
}
.contenu {
  grid-area: contenu;
}
.commentaire {
  grid-area: commentaire;
}

.like {
  grid-area: like;
}

/* .forum__vue {
  display: flex;
  flex-direction: column;
  margin: 5rem auto;
}

.forum__vue img {
  width: 30%;
  object-fit: cover;
  align-self: center;
}

.forum__vue h1 {
  align-self: center;
}

.forum__vue p {
  align-self: center;
  margin-bottom: 10rem;
}

.identification {
  display: flex;
  margin: 2rem 5rem;
  justify-content: space-between;
}

.button {
  height: 2rem;
  background: lightcoral;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  padding: 16px;
  color: white;
  width: 10rem;
  height: 3rem;
} */
</style>
