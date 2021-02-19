<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Qualificacions App
        </q-toolbar-title>

        <div>{{ datavalenciaSenseAnar }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Login',
    caption: 'login.dev',
    icon: 'login',
    link: '#/Login'
  },
  {
    title: 'About',
    caption: 'about.dev',
    icon: 'info',
    link: '#/About'
  }
]
export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed: {
    dataValencia () {
      const diaActual = new Date()
      var dia
      var mes
      switch (diaActual.getDay()) {
        case 1:
          dia = 'Dilluns'
          break
        case 2:
          dia = 'Dimarts'
          break
        case 3:
          dia = 'Dimecres'
          break
        case 4:
          dia = 'Dijous'
          break
        case 5:
          dia = 'Divendres'
          break
        case 6:
          dia = 'Dissabte'
          break
        default:
          dia = 'Diumenge'
          break
      }
      switch (diaActual.getmes()) {
        case 0:
          mes = 'Gener'
          break
        case 1:
          mes = 'Febrer'
          break
        case 2:
          mes = 'Marc'
          break
        case 3:
          mes = 'Abril'
          break
        case 4:
          mes = 'Maig'
          break
        case 5:
          mes = 'Juny'
          break
        case 6:
          mes = 'Juliol'
          break
        case 7:
          mes = 'Agost'
          break
        case 8:
          mes = 'Septembre'
          break
        case 9:
          mes = 'Octubre'
          break
        case 10:
          mes = 'Novembre'
          break
        case 11:
          mes = 'Desembre'
          break
      }
      return dia + mes
    }
  }
}
</script>
