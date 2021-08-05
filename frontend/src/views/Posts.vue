<template>
  <div class="header">
    <img
      class="groupomania__logo"
      src="../assets/icon-left-font.png"
      alt="logo_groupomania"
    />
    <button class="btn" @click="createPost()">
      <i class="far fa-edit"></i>
    </button>
    <button class="btn" @click="logout()">
      <i class="fas fa-sign-in-alt"></i>
    </button>
    <button class="btn"><i class="fas fa-minus-circle"></i></button>
  </div>
  <h2 class="welcome">
    Bienvenue {{ $store.state.user.prenom + "\t" + $store.state.user.nom }} !
  </h2>
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

/* header */

.header {
  display: grid;
  width: auto;
  align-items: center;
  grid-template-columns: 2fr 0.3fr 0.3fr 0.3fr;
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
.fa-check,
.fa-minus-circle {
  font-size: x-large;
}

.fa-edit:hover,
.fa-ellipsis-v:hover,
.fa-check:hover {
  color: green;
}

.fa-sign-in-alt:hover,
.fa-times:hover,
.fa-minus-circle:hover {
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

.posts {
  height: auto;
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
  margin-bottom: 2rem;
}

.commentaire {
  display: grid;
  grid-template-columns: 10fr 1fr 1fr;
  margin-bottom: 2rem;
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
</style>
