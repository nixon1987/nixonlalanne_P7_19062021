<template>
  <div class="header">
    <img src="../assets/icon-above-font.png" alt="logo_groupomania" />
  </div>
  <div class="container">
    <div class="header">
      <h2>Formulaire de création de poste</h2>
    </div>
    <form action="post" id="form" class="form" @submit="onUpload">
      <div class="form__control success">
        <label for="title">Titre</label>
        <input
          type="text"
          placeholder="Titre"
          id="Titre"
          v-model="titre"
          required
        />
        <i class="fa fa-check" aria-hidden="true"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
      </div>
      <div class="form__control error">
        <label for="image">image</label>
        <input type="file" @change="onFileSelected" />
        <img :src="getProfilePhoto" alt="" />
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
      </div>
      <div class="form__control">
        <label for="contenu">contenu du poste</label>
        <input
          type="text"
          placeholder="contenu"
          v-model="contenu"
          id="adresse"
          required
        />
        <i class="fa fa-check" aria-hidden="true"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
      </div>
      <button id="submitButton">submit</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "createPost",
  data() {
    return {
      titre: "",
      file: "",
      photo: "",
      contenu: "",
    };
  },

  methods: {
    getProfilePhoto() {
      return "../assets/" + this.data.photo;
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onUpload(e) {
      e.preventDefault();
      const userId = JSON.parse(localStorage.getItem("user"))?.userId;
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      var model = JSON.stringify({
        titre: this.titre,
        contenu: this.contenu,
        userId: userId,
      });
      var data = new FormData();
      data.append("image", this.selectedFile);
      data.append("post", model);

      axios
        .post("http://localhost:5000/posts", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/posts");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

* {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  margin: 1rem auto;
}

.header {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header img {
  width: 15rem;
}

.header h2 {
  margin: 0;
  font-size: 1rem;
  display: flex;
  justify-content: center;
}

.form {
  padding: 30px 40px;
}

.form__control {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}

.form__control label {
  display: inline-block;
  margin-bottom: 5px;
}

.form__control input {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  font-size: 14px;
  padding: 10px;
  width: 100%;
}

.form__control i {
  position: absolute;
  top: 40px;
  right: 10px;
  visibility: hidden;
}

.form__control small {
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.form button {
  background-color: lightcoral;
  color: white;
  border-radius: 4px;
  display: block;
  padding: 10px;
  width: 100%;
  font-size: 15px;
}
</style>
