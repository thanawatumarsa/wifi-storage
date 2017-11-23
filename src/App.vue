<template>
  <div id="app">
    <navbar :test="test" :signout="signout" :chkAdmin="chkAdmin" :chkLog="chkLog"></navbar>
    <div class="container">
      <router-view :wifiInfo="wifiInfo" :print="print" :chkLogin="chkLogin" :removeAccount="removeAccount" :users="users" :checkSignIn="checkSignIn" :editLoSave="editLoSave" :testlocationindex="testlocationindex" :editTestLo="editTestLo"
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
import printjs from 'print-js'

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
      testlocationindex: '',
      chkAdmin: false,
      adminGetUID: '',
      chkLog: false,
      temppp: [
        {
          test: '-KyfJTmftsY6ScXWpvhK'
        },
        {
          test: '-KyfVTBG597fkdphXDUR'
        }
      ]
    }
  },
  components: {
    Navbar
  },
  methods: {
    register: function () {
      userRef.push(this.newRegister)
      var tempemail = this.newRegister.email + ('@gmail.com')
      this.authFirebase(tempemail, this.newRegister.pass)
      this.newRegister.fname = ''
      this.newRegister.lname = ''
      this.newRegister.pass = ''
      this.newRegister.conpass = ''
      this.newRegister.email = ''
      tempemail = ''
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
    checkSignIn: function (email, pass) {
      if (email === 'admin' && pass === 'g0H3ll0p1n3') {
        var vm = this
        this.chkAdmin = true
        alert('Welcome Admin!')
        vm.$router.push('/dashboard')
      } else {
        this.signin()
      }
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
      this.chkAdmin = false
      this.chkLog = false
      this.userInfo.email = ''
      this.userInfo.uid = ''
      Firebase.auth().signOut().then(function () {
        localStorage.clear()
        console.log('Signed Out')
        router.push('login')
      }, function (error) {
        console.error('Sign Out Error', error)
      })
    },
    removeAccount: function (index, user, email, pass) {
      Firebase.auth().signInWithEmailAndPassword(email, pass).then(function () {
        var unsubscribe = Firebase.auth().onAuthStateChanged(firebaseUser => {
          console.log(firebaseUser.uid)
          firebaseUser.delete().then(function () {
            console.log('delete')
          })
        })
        unsubscribe()
      })
      this.deleteUser(user, index)
    },
    deleteUser: function (user, index) {
      userRef.child(user['.key']).remove()
    },
    test: function () {
      var user = Firebase.auth().currentUser
      console.log(this.wifidetail.testLocation)
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
    removeProject: function (index) {
      wifiInfoRef.child(this.wifiInfo[index]['.key']).remove()
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
      var tempdbm = {
        location: '',
        dbm: ''
      }
      tempdbm.location = this.newTestLocation.location
      tempdbm.dbm = ('-') + this.newTestLocation.dbm
      wifiInfoRef.child(this.wifiInfo[this.tempIndex]['.key']).child('accesspoint').child(this.locationindex).child('testLocation').push(tempdbm)
      this.wifidetail = this.wifiInfo[this.tempIndex].accesspoint[this.locationindex]
      this.newTestLocation.location = ''
      this.newTestLocation.dbm = ''
      tempdbm.location = ''
      tempdbm.dbm = ''
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
    },
    chkLogin: function () {
      this.chkLog = true
    },
    print: function () {
      printjs({printable: this.wifiInfo[this.tempIndex], properties: [this.wifiInfo[this.tempIndex].projectName], type: 'json', header: this.wifiInfo[this.tempIndex].projectName})
    }
  },
  mounted () {
    var vm = this
    if (this.$route.path === '/main') {
      this.chkLog = true
      vm.$router.push('/main')
    } else if (this.$route.path === '/dashboard') {
      this.chkLog = true
      console.log(this.chkLog)
      vm.$router.push('/dashboard')
    } else if (this.$route.path === '/aplists') {
      this.chkLog = true
      vm.$router.push('/aplists')
    } else if (this.$route.path === '/selectAP') {
      this.chkLog = true
      vm.$router.push('/selectAP')
    } else if (this.$route.path === '/admin') {
      this.chkLog = true
      vm.$router.push('/admin')
    } else {
      vm.$router.push('/login')
      this.chkLog = false
    }
  }
}
</script>

<style>
body {
  background-color: white;
}
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
.left {
  margin-top: 3%;
  float: left;
  font-size: 80%;
}
.cardLog {
    background-color: white;
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
    padding-bottom: 10%;
}
.cardlogContainer {
    padding: 2px 16px;
    padding-bottom: 3%;
    margin-bottom: 2%;
}
.loginContent {
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 5%;
  float: center;
  background-color: white;
}
.regContent {
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 5%;
  float: center;
  background-color: white;
}
</style>
