<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">

    <q-form
      class="q-gutter-md" @submit="validateForm" action="/" method="post"
    >
      <q-input
        filled
        v-model="nameComplet"
        label="Nom Complet"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Escriu el nom']"
      >
        <q-icon name="text_format"/>
      </q-input>

      <q-input
        filled
        v-model="dni"
        label="DNI"
        lazy-rules
        :rules="[ dni.error = true || 'Escriu el dni']"
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
        :rules="[ password.error = true || 'Escriu la contrasenya']"
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
    }
  }
}
</script>
