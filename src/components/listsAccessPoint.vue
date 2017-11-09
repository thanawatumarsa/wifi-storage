<template lang="html">
  <div class="col-md-9 col-md-offset-2">
    {{wifiInfo[tempIndex].projectName}}
    <table class="table table">
        <thead>
          <tr>
            <th data-toggle="modal" data-target="#basicModal">
              <center>
              #
            </center>
            </th>
            <th>
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
            </th>
          </tr>
        </thead>
      </table>

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
export default {
  props: ['wifiInfo', 'tempIndex', 'newAccessPoint', 'addAccessPoint']
}
</script>

<style lang="css">
</style>
