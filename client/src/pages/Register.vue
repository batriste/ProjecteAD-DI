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
        :rules="[ validName || 'Escriu el nom']"
      >
        <q-icon name="text_format"/>
      </q-input>

      <q-input
        filled
        v-model="dni"
        label="DNI"
        lazy-rules
        :rules="[ isVDni || 'Escriu el dni']"
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
        :rules="[ val => val.length >= 4|| 'Escriu la contrasenya']"
      >
        <q-icon name="password"/>
      </q-input>
      <q-input
        filled
        type="password"
        v-model="password2"
        label="Password"
        lazy-rules
        :rules="[ val => val === this.password || 'Escriu la contrasenya']"
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
      nameComplet: '',
      dni: {
        error: false,
        string: ''
      },
      username: '',
      password: '',
      password2: '',
      validated: null
    }
  },
  computed: {
    isVDni () {
      return new RegExp('[0-9](8)[A-Z]').test(this.dni)
    },
    validName () {
      var nameC = this.nameComplet.split(' ')
      return (
        nameC.length() >= 3 &&
        nameC.filter(this.nameC).length() === nameC.length()
      )
    }
  }
}
</script>
