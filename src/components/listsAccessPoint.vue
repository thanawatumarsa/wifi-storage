<template lang="html">
  <div class="col-xs-12 col-md-12 APContent">
    <div class="col-xs-12 col-md-12">
      <div class="" style="float:left; margin-top:1%">
      <a @click="changePage('/dashboard')" style="cursor:pointer">Dashboard</a> / {{wifiInfo[tempIndex].projectName}}
      </div>
    </div>
    <div class="col-xs-12 col-md-12">
      <h3>Project name : {{wifiInfo[tempIndex].projectName}}</h3><br>
      <button data-toggle="modal" data-target="#basicModal" type="button" class="btn btn-primary" data-dismiss="modal" >New Access point</button>
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
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Add Access Point</h4>
          </div>
          <div class="modal-body">
            <form>
                <div class="input-group">
                  <span class="input-group-addon" id="basic-addon1">*</span>
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
                  <input type="number" id="addProject" name="addProject" class="form-control" placeholder="Channel" v-model="newAccessPoint.channel">
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
  props: ['wifiInfo', 'tempIndex', 'newAccessPoint', 'addAccessPoint', 'removeAp', 'editAp', 'editaccesspoint', 'editApSave', 'apIndex', 'wifidetail', 'apDetail', 'print'],
  components: {
    eachAccessPoint
  },
  methods: {
    changePage: function (text) {
      var vm = this
      vm.$router.push(text)
    }
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
