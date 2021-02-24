<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">

    <q-form
      class="q-gutter-md" @submit="validateForm" action="/" method="post"
    >
      <q-input
        filled
        v-model="full_name"
        label="Nom Complet"
        lazy-rules
<<<<<<< Updated upstream
        :rules="[ val => val && val.length > 0 || 'Escriu el nom']"
=======
        :rules="[ val => validName || 'Escriu el nom']"
>>>>>>> Stashed changes
      >
        <q-icon name="text_format"/>
      </q-input>

      <q-input
        filled
        v-model="dni"
        label="DNI"
        lazy-rules
<<<<<<< Updated upstream
        :rules="[ dni.error = true || 'Escriu el dni']"
=======
        :rules="[ val => isVDni || 'Escriu el dni']"
>>>>>>> Stashed changes
       >
        <q-icon name="credit_card"/>
      </q-input>
      <q-input
        filled
        v-model="username"
        label="Usuari"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Escriu el usuari']"
      >
        <q-icon name="perm_identity"/>
      </q-input>
      <q-input
        filled
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
<<<<<<< Updated upstream
        :rules="[ password.error = true || 'Escriu la contrasenya']"
=======
        :rules="[ val => val.length >= 4 || 'Escriu la contrasenya']"
      >
        <q-icon name="password"/>
      </q-input>
      <q-input
        filled
        type="password"
        v-model="password2"
        label="Password"
        lazy-rules
        :rules="[ val => val === this.password || 'La contrasenya no coincideix']"
>>>>>>> Stashed changes
      >
        <q-icon name="password"/>
      </q-input>

      <div>
        <q-btn label="Registrar" class="full-width" size="lg" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
  </q-page>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
<<<<<<< Updated upstream
      nameComplet: null,
      dni: {
        error: false,
        string: null
      },
      username: null,
      password: {
        error: false,
        string: null
      },
      validated: null
    }
  },
  methods: {
    validateForm () {
      if (this.dni.string === '' && this.password.string === '') {
        return false
      }
      this.validated = true
      if (this.dni.string.length !== 9) {
        this.dni.error = true
        this.validated = false
      } else {
        this.dni.error = false
      }
      return this.validated
=======
      full_name: '',
      dni: '',
      username: '',
      password: '',
      password2: ''
    }
  },
  computed: {
    isVDni () {
      return new RegExp('[0-9](8)[A-Z]').test(this.dni)
    },
    validName () {
      var nameC = this.full_name.split(' ')
      return (
        nameC.length() >= 3 &&
        nameC.filter(this.nameC).length() === nameC.length()
      )
>>>>>>> Stashed changes
    }
  }
}
</script>
