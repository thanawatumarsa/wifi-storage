<template>
  <div id="app" class="">
    <navbar :test="test" :signout="signout"></navbar>
    <div class="container">
      <router-view :wifiInfo="wifiInfo" :editLoSave="editLoSave" :testlocationindex="testlocationindex" :editTestLo="editTestLo"
      :editTestLocation="editTestLocation" :removeTestLocation="removeTestLocation" :locationindex="locationindex" :addTestLocation="addTestLocation"
      :newTestLocation="newTestLocation" :apDetail="apDetail" :wifidetail="wifidetail" :apIndex="apIndex" :editAp="editAp" :removeAp="removeAp"
      :addAccessPoint="addAccessPoint" :newAccessPoint="newAccessPoint" :tempIndex="tempIndex" :editApSave="editApSave" :toAccessPoint="toAccessPoint" :removeProject="removeProject"
      :addProject="addProject" :newProject="newProject" :changePage="changePage":newRegister = "newRegister"
      :register = "register" :dataLogin="dataLogin" :signin="signin" :editaccesspoint="editaccesspoint"></router-view>
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
      userInfo: {
        uid: '',
        email: ''
      },
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
        location: '',
        channel: '',
        testLocation: ''
      },
      dataLogin: {
        email: '',
        pass: ''
      },
      newProject: {
        projectName: '',
        accesspoint: ''
      },
      editaccesspoint: {
        apName: '',
        serial: '',
        mac: '',
        location: '',
        channel: ''
      },
      newTestLocation: {
        location: '',
        dbm: ''
      },
      editTestLocation: {
        location: '',
        dbm: ''
      },
      tempIndex: '',
      apIndex: '',
      wifidetail: '',
      locationindex: '',
      testlocationindex: ''
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
      var router = this.$router
      Firebase.auth().signOut().then(function () {
        localStorage.clear()
        console.log('Signed Out')
        router.push('login')
      }, function (error) {
        console.error('Sign Out Error', error)
      })
    },
    test: function () {
      var user = Firebase.auth().currentUser
      if (user != null) {
        this.userInfo.email = user.email
        this.userInfo.uid = user.uid
      }
      console.log(user)
      console.log(this.userInfo.uid)
      console.log(this.userInfo.email)
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
      console.log(this.$route.path)
    },
    addAccessPoint: function (wifi, index) {
      wifiInfoRef.child(wifi[index]['.key']).child('accesspoint').push(this.newAccessPoint)
      this.newAccessPoint.apName = ''
      this.newAccessPoint.serial = ''
      this.newAccessPoint.mac = ''
      this.newAccessPoint.location = ''
      this.newAccessPoint.channel = ''
    },
    editAp: function (wifi, index) {
      this.editaccesspoint.apName = wifi.apName
      this.editaccesspoint.serial = wifi.serial
      this.editaccesspoint.mac = wifi.mac
      this.editaccesspoint.location = wifi.location
      this.editaccesspoint.channel = wifi.channel
      this.addApIndex(index)
    },
    addApIndex: function (index) {
      this.apIndex = index
    },
    editApSave: function (wifi, index) {
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(index).update({apName: this.editaccesspoint.apName})
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(index).update({serial: this.editaccesspoint.serial})
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(index).update({mac: this.editaccesspoint.mac})
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(index).update({location: this.editaccesspoint.location})
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(index).update({channel: this.editaccesspoint.channel})
    },
    removeAp: function (index) {
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(index).remove()
    },
    apDetail: function (wifi, index) {
      this.wifidetail = wifi
      this.locationindex = index
    },
    addTestLocation: function (wifi) {
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(this.locationindex).child('testLocation').push(this.newTestLocation)
      this.wifidetail = this.wifiInfo[this.tempIndex].accesspoint[this.locationindex]
      this.newTestLocation.location = ''
      this.newTestLocation.dbm = ''
    },
    removeTestLocation: function (index) {
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(this.locationindex).child('testLocation').child(index).remove()
      this.wifidetail = this.wifiInfo[this.tempIndex].accesspoint[this.locationindex]
    },
    editTestLo: function (wifi, index) {
      this.editTestLocation.location = wifi.location
      this.editTestLocation.dbm = wifi.dbm
      this.addTestLoIndex(index)
    },
    editLoSave: function (wifi, index) {
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(this.locationindex).child('testLocation').child(index).update({location: this.editTestLocation.location})
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(this.locationindex).child('testLocation').child(index).update({dbm: this.editTestLocation.dbm})
      this.wifidetail = this.wifiInfo[this.tempIndex].accesspoint[this.locationindex]
    },
    addTestLoIndex: function (index) {
      this.testlocationindex = index
    }
  },
  mounted () {
    var vm = this
    if (this.$route.path === '/main') {
      vm.$router.push('/main')
    } else if (this.$route.path === '/dashboard') {
      vm.$router.push('/dashboard')
    } else if (this.$route.path === '/aplists') {
      vm.$router.push('/aplists')
    } else if (this.$route.path === '/selectAP') {
      vm.$router.push('/selectAP')
    } else {
      vm.$router.push('/login')
    }
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
