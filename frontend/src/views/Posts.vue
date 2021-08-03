<template>
  <div class="header">
    <img src="../assets/icon-left-font.png" alt="logo_groupomania" />
    <h1>
      Bienvenue {{ $store.state.user.nom + "\t" + $store.state.user.prenom }} !
    </h1>
  </div>
  <div class="buttons__header">
    <button @click="createPost()" class="btn">Créer un post</button>
    <button @click="logout()" class="btn">Déconnexion</button>
  </div>
  <div class="conteneur">
    <div class="left__side"></div>
    <div class="middle__side">
      <div class="posts" v-for="post in posts" :key="post.id">
        <Post v-bind:post="post" />
      </div>
    </div>
    <div class="right__side"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Post from "../components/Post.vue";
export default {
  name: "Posts",
  components: {
    Post,
  },

  data() {
    return {
      comment: "",
      posts: [""],
      users: [""],
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
    console.log(this.$store.state.user.nom);
    // const responseUsers = await axios.get("http://localhost:5000/user/login");
    // console.log(responseUsers);
    // this.posts = responseUsers.data;
  },

  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    },

    createPost: function() {
      this.$router.push("/CreatePost");
    },
    addComment(postId) {
      console.log(this.comment);
      console.log(postId);
    },

    switchToCreateAccount: function() {
      this.mode = "create";
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
  grid-template-columns: repeat(1, 1fr);
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
  display: flex;
  flex-direction: column;
}

.card__action {
  color: lightcoral;
  text-decoration: underline;
}

.image__like {
  display: flex;
  align-items: flex-end;
}
</style>
