<template lang="html">
  <div class="col-xs-12 col-md-12 APContent">
    <div class="col-xs-12 col-md-12">
      <div class="" style="float:left; margin-top:1%">
      <a @click="changePage('/dashboard')" style="cursor:pointer">Project</a> / {{wifiInfo[tempIndex].projectName}}
      </div>
    </div>
    <div class="col-xs-12 col-md-12">
      <h3>Project name : {{wifiInfo[tempIndex].projectName}}</h3><br>
      <button data-toggle="modal" data-target="#basicModal" type="button" class="btn btn-primary" data-dismiss="modal" >New Access point</button>
      <!-- <download-excel class="btn btn-default" :data="test" :fields="jsonfields" name="Test-wifi.xls">Download Excel</download-excel> -->
      <hr>
      <div v-if="wifiInfo[tempIndex].accesspoint" class="tablecontrainer">
        <table class="table table">
            <thead>
              <tr>
                <th data-toggle="modal" data-target="#basicModal">
                  <center>
                  AP Name
                  </center>
                </th>
                <th>
                  <center>
                  S/N
                  </center>
                </th>
                <th>
                  <center>
                  MAC Address
                  </center>
                </th>
                <th>
                  <center>
                  Position
                  </center>
                </th>
                <th>
                  <center>
                    Channel
                  </center>
                </th>
                <th>
                  <center>
                  More Detail
                  </center>
                </th>
                <th>
                  <center>
                  </center>
                </th>
              </tr>
            </thead>
            <each-access-point :wifiInfo="wifiInfo" :tempIndex="tempIndex" :removeAp="removeAp" :editAp="editAp"
            :editaccesspoint="editaccesspoint" :apIndex="apIndex" :editApSave="editApSave" :wifidetail="wifidetail"
            :apDetail="apDetail"></each-access-point>
          </table>
        </div>
        <div v-else class="col-md-12" style="margin-bottom:3%">
          <h3>No information.</h3>
        </div>
    </div>


      <div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" style="overflow:hidden">
          <div class="modal-header" style="background-color:#4DAEE7; color: white">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Add Access Point</h4>
          </div>
          <div class="modal-body">
            <form>
                <div class="input-group">
                  <span class="input-group-addon" id="basic-addon1">
                    <span class="glyphicon glyphicon-pushpin"></span>
                  </span>
                  <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Name" v-model="newAccessPoint.apName"><br>
                </div>
                <div class="form-group">

                </div>
                <div class="form-group">
                  <input type="text" maxlength="20" id="addProject" name="addProject" class="form-control" placeholder="Serial Number" v-model="newAccessPoint.serial">
                </div>
                <div class="form-group">
                  <input type="text" maxlength="17" id="addProject" name="addProject" class="form-control" placeholder="MAC Address" v-model="newAccessPoint.mac">
                </div>
                <div class="form-group">
                  <input type="text" maxlength="20" id="addProject" name="addProject" class="form-control" placeholder="Location" v-model="newAccessPoint.location">
                </div>
                <div class="form-group">
                  <input type="number" min="1" max="30" id="addProject" name="addProject" class="form-control" placeholder="Channel" v-model="newAccessPoint.channel">
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addAccessPoint(wifiInfo, tempIndex)" type="button" class="btn btn-primary" data-dismiss="modal" :disabled="newAccessPoint.apName == ''">+ Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import eachAccessPoint from './eachAccessPoint'

export default {
  props: ['wifiInfo', 'tempIndex', 'newAccessPoint', 'addAccessPoint', 'removeAp', 'editAp', 'editaccesspoint', 'editApSave', 'apIndex', 'wifidetail', 'apDetail', 'print', 'jsonfields', 'jsondata', 'jsonmeta'],
  data () {
    return {
      test: []
    }
  },
  components: {
    eachAccessPoint
  },
  methods: {
    changePage: function (text) {
      var vm = this
      vm.$router.push(text)
    },
    pushData: function () {
      var lengthh = this.wifiInfo[this.tempIndex].accesspoint
      var count = Object.keys(lengthh).length
      var key = Object.keys(lengthh)
      for (var i = 0; i < count; i++) {
        var jsontemp = {
          project: '',
          apName: '',
          serial: '',
          mac: '',
          location: '',
          channel: '',
          testLocation: []
        }
        if (i === 0) {
          if (lengthh[key[i]].testLocation) {
            jsontemp.project = this.wifiInfo[this.tempIndex].projectName
            jsontemp.apName = lengthh[key[i]].apName
            jsontemp.serial = lengthh[key[i]].serial
            jsontemp.mac = lengthh[key[i]].mac
            jsontemp.location = lengthh[key[i]].location
            jsontemp.channel = lengthh[key[i]].channel
            var testCount = Object.keys(lengthh[key[i]].testLocation).length
            var testKey = Object.keys(lengthh[key[i]].testLocation)
            console.log(testCount)
            console.log(testKey)
            for (var n = 0; n < testCount; n++) {
              var testLo = {
                Location: '',
                dbm: ''
              }
              testLo.Location = lengthh[key[i]].testLocation[testKey[n]].location
              testLo.dbm = lengthh[key[i]].testLocation[testKey[n]].dbm
              jsontemp.testLocation.push(testLo)
            }
            this.test.push(jsontemp)
          } else {
            jsontemp.project = this.wifiInfo[this.tempIndex].projectName
            jsontemp.apName = lengthh[key[i]].apName
            jsontemp.serial = lengthh[key[i]].serial
            jsontemp.mac = lengthh[key[i]].mac
            jsontemp.location = lengthh[key[i]].location
            jsontemp.channel = lengthh[key[i]].channel
            jsontemp.testLocation = ''
            this.test.push(jsontemp)
          }
        } else {
          if (lengthh[key[i]].testLocation) {
            jsontemp.project = ''
            jsontemp.apName = lengthh[key[i]].apName
            jsontemp.serial = lengthh[key[i]].serial
            jsontemp.mac = lengthh[key[i]].mac
            jsontemp.location = lengthh[key[i]].location
            jsontemp.channel = lengthh[key[i]].channel
            var testCount2 = Object.keys(lengthh[key[i]].testLocation).length
            var testKey2 = Object.keys(lengthh[key[i]].testLocation)
            console.log(testCount2)
            console.log(testKey2)
            for (var m = 0; m < testCount2; m++) {
              var testLo2 = {
                Location: '',
                dbm: ''
              }
              testLo2.Location = lengthh[key[i]].testLocation[testKey2[m]].location
              testLo2.dbm = lengthh[key[i]].testLocation[testKey2[m]].dbm
              jsontemp.testLocation.push(testLo2)
            }
            this.test.push(jsontemp)
          } else {
            jsontemp.project = ''
            jsontemp.apName = lengthh[key[i]].apName
            jsontemp.serial = lengthh[key[i]].serial
            jsontemp.mac = lengthh[key[i]].mac
            jsontemp.location = lengthh[key[i]].location
            jsontemp.channel = lengthh[key[i]].channel
            jsontemp.testLocation = ''
            this.test.push(jsontemp)
          }
        }
      }
      console.log(this.test)
      // console.log(key[0])
    }
  },
  mounted () {
    // this.pushData()
  }
}
</script>

<style lang="css">
.allcontent {
  margin-top: -5%;
}
.tablecontrainer {
  margin-top: 5%;
}
.nameproject {
  margin-bottom: 3%;
  float: left;
}
.apContent {
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 5%;
  float: center;
  background-color: white;
}
.APContent {
  border: 1px solid #a6a6a6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 3%;
  background-color: white;
}
</style>
