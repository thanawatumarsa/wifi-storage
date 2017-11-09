<template>
  <div id="app" class="">
    <navbar :test="test" :signout="signout"></navbar>
    <div class="container">
      <router-view :wifiInfo="wifiInfo" :addAccessPoint="addAccessPoint" :newAccessPoint="newAccessPoint" :tempIndex="tempIndex" :toAccessPoint="toAccessPoint" :removeProject="removeProject" :addProject="addProject" :newProject="newProject" :changePage="changePage"
      :newRegister = "newRegister" :register = "register" :dataLogin="dataLogin" :signin="signin"></router-view>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import Navbar from '@/components/navbar'

let config = {
  apiKey: 'AIzaSyCq9XSREG-KQz4IZgmmbcSpRYgz4HK-KpQ',
  authDomain: 'wifi-storage.firebaseapp.com',
  databaseURL: 'https://wifi-storage.firebaseio.com',
  storageBucket: 'wifi-storage.appspot.com',
  messagingSenderId: '1062691344683'
}
let app = Firebase.initializeApp(config)
let db = app.database()
let wifiInfoRef = db.ref('wifiInfo')
let userRef = db.ref('users')

export default {
  name: 'app',
  firebase: {
    wifiInfo: wifiInfoRef,
    users: userRef
  },
  data () {
    return {
      wifidata: [],
      newRegister: {
        fname: '',
        lname: '',
        pass: '',
        conpass: '',
        email: ''
      },
      newAccessPoint: {
        apName: '',
        serial: '',
        mac: '',
        location: ''
      },
      dataLogin: {
        email: '',
        pass: ''
      },
      newProject: {
        projectName: '',
        accesspoint: ''
      },
      tempIndex: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    register: function () {
      userRef.push(this.newRegister)
      this.authFirebase(this.newRegister.email, this.newRegister.pass)
      this.newRegister.fname = ''
      this.newRegister.lname = ''
      this.newRegister.pass = ''
      this.newRegister.conpass = ''
      this.newRegister.email = ''
    },
    authFirebase: function (email, pass) {
      var router = this.$router
      Firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/weak-password') {
          alert('the password is too weak')
        } else {
          alert(errorMessage)
        }
        console.log(error)
      }).then(function (sendEmailVerify) {
        if (sendEmailVerify === false) {
          return false
        } else {
          Firebase.auth().currentUser.sendEmailVerification()
          alert('Email Verification Sent! Please check yor email address.')
          alert('Register Success!')
          console.log(Firebase.auth().currentUser)
          router.push('/login')
          return true
        }
      })
    },
    signin: function () {
      var router = this.$router
      Firebase.auth().signInWithEmailAndPassword(this.dataLogin.email, this.dataLogin.pass).catch(function (error) {
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong Password')
        } else {
          alert(errorMessage)
        }
        console.log(error)
      }).then(function (checkVerify) {
        var unsubscribe = Firebase.auth().onAuthStateChanged(firebaseUser => {
          if (firebaseUser.emailVerified) {
            alert('Welcome')
            console.log('email is verify')
            console.log(firebaseUser.uid)
            router.push('/dashboard')
          } else {
            console.log('Email is not verified')
            alert('Please verify your email address then login again')
          }
        })
        unsubscribe()
      })
    },
    signout: function () {
      Firebase.auth().signOut().then(function () {
        localStorage.clear()
        console.log('Signed Out')
      }, function (error) {
        console.error('Sign Out Error', error)
      })
    },
    test: function () {
      var user = Firebase.auth().currentUser
      var email, uid, emailVerified
      if (user != null) {
        email = user.email
        emailVerified = user.emailVerified
        uid = user.uid
      }
      console.log(email)
      console.log(emailVerified)
      console.log(uid)
      console.log(wifiInfoRef)
    },
    addProject: function () {
      wifiInfoRef.push(this.newProject)
      this.newProject.projectName = ''
      this.newProject.accesspoint = ''
    },
    removeProject: function (project) {
      wifiInfoRef.child(project['.key']).remove()
    },
    changePage: function (page) {
      var vm = this
      vm.$router.push(page)
    },
    toAccessPoint: function (index) {
      var vm = this
      vm.$router.push('/aplists')
      vm.tempIndex = index
    },
    addAccessPoint: function (wifi, index) {
      wifiInfoRef.child(wifi[index]['.key']).child('accesspoint').push(this.newAccessPoint)
      this.newAccessPoint.apName = ''
      this.newAccessPoint.serial = ''
      this.newAccessPoint.mac = ''
      this.newAccessPoint.location = ''
    }
  },
  mounted () {
    var vm = this
    vm.$router.push('/login')
    console.log(this.wifiInfo)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#loginCard {
  width: 40px;
  background-color: red;
}
.loginPosition {
  margin-top: 10%
}
.left {
  margin-top: 3%;
  float: left;
  font-size: 80%;
}
.cardLog {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}
.cardLog:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.cardReg {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding-bottom: 4%;
}
.cardReg:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.cardContainer {
    padding: 2px 16px;
    padding-bottom: 5%;
}
</style>
