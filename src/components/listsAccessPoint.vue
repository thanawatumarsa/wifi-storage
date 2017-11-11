<template lang="html">
  <div class="col-md-12">
    <div class="allcontent">
      <div class="nameproject">
        <h3>Project name : {{wifiInfo[tempIndex].projectName}}</h3><br>
        <button data-toggle="modal" data-target="#basicModal" type="button" class="btn btn-primary" data-dismiss="modal" style="float:left">เพิ่ม Access Point</button>
      </div>
      <div class="tablecontrainer">
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
                  ตำแหน่งที่ติดตั้ง
                  </center>
                </th>
                <th>
                  <center>
                    Channel
                  </center>
                </th>
                <th>
                  <center>
                  ดูรายละเอียด
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
                <div class="form-group">
                  <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Name" v-model="newAccessPoint.apName">
                </div>
                <div class="form-group">
                  <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Serial Number" v-model="newAccessPoint.serial">
                </div>
                <div class="form-group">
                  <input type="text" id="addProject" name="addProject" class="form-control" placeholder="MAC Address" v-model="newAccessPoint.mac">
                </div>
                <div class="form-group">
                  <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Location" v-model="newAccessPoint.location">
                </div>
                <div class="form-group">
                  <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Channel" v-model="newAccessPoint.channel">
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addAccessPoint(wifiInfo, tempIndex)" type="button" class="btn btn-primary" data-dismiss="modal">+ Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import eachAccessPoint from './eachAccessPoint'

export default {
  props: ['wifiInfo', 'tempIndex', 'newAccessPoint', 'addAccessPoint', 'removeAp', 'editAp', 'editaccesspoint', 'editApSave', 'apIndex', 'wifidetail', 'apDetail'],
  components: {
    eachAccessPoint
  }
}
</script>

<style lang="css">
.allcontent {
  margin-top: 5%;
}
.tablecontrainer {
  margin-top: 5%;
}
.nameproject {
  margin-bottom: 3%;
  float: left;
}
</style>
