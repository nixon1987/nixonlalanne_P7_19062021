<template>
  <div class="conteneur">
    <div class="identification">
      <p>Bienvenue..</p>
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
    <div class="creation__posts">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
    <div class="forum__vue">
      <h1>titre</h1>
      <img src="../assets/logo.png" alt="logo_groupomania" />
      <p>contenu</p>
    </div>
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

  methods: {
    created() {
      axios
        .get("http://localhost:5000/posts")
        .then((reponse) => (this.posts = reponse.data));
    },
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.forum__vue {
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
}

.identification {
  display: flex;
  margin: 2rem 5rem;
  justify-content: space-between;
}

.button {
  height: 2rem;
}

/* header {
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: 2rem auto;
}

header img {
  padding: 0 2rem;
}

header nav {
  display: flex;
  align-items: center;
}

nav ul {
  margin: 0;
  padding: 0;
  display: flex;
}

nav ul li {
  margin: 0;
  font-weight: 500;
  list-style-type: none;
  text-decoration: none;
}

.menu {
  padding: 2rem;
  color: black;
  text-decoration: none;
}



.forum__vue {
  display: flex;
  flex-direction: column;
  max-width: 60%;
  margin: 0 auto;
} */

.voi {
  display: flex;
  justify-content: left;
}
</style>
